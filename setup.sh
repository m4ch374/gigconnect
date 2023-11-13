#!/bin/sh

echo 'Starting setup...'
sudo apt-get update > /dev/null

# Install cURL
if command -v curl > /dev/null
then
    echo 'cURL is already installed, skipping...'
else
    echo 'Installing cURL...'
    sudo apt-get install curl -y > /dev/null
fi

# Install nvm
if command -v nvm > /dev/null
then
    echo 'nvm is already installed, skipping...'
else
    echo 'Installing nvm...'
    # Commands below from: https://github.com/nvm-sh/nvm#installing-and-updating
    curl -s -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash > /dev/null
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi

# Install node and set default version
echo 'Installing node...'
nvm install 18 > /dev/null
nvm alias default 18 > /dev/null

# Install postgres
if command -v psql > /dev/null
then
    echo 'Postgres is already installed, skipping...'
else
    echo 'Installing postgres...'
    sudo apt-get install postgresql -y > /dev/null
fi

# Create postgres user with password and database
sudo service postgresql start
sudo --login --user=postgres psql -c "CREATE USER gig WITH PASSWORD 'gig123';" > /dev/null
sudo --login --user=postgres createdb -O gig gig > /dev/null

# Generate JWT secret
jwt_secret=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")

# Create backend .env file
echo 'Generating .env file...'
cd backend || exit
cat > .env << EOF
DATABASE_URL="postgresql://gig:gig123@localhost/gig"
PORT=8080
JWT_SECRET="$jwt_secret"
EOF

# Install packages for backend
echo 'Installing npm packages for backend...'
npm install > /dev/null 2>&1

# Sync database with Prisma schema
echo 'Syncing database with Prisma schema...'
npx prisma db push > /dev/null 2>&1

# Create admin account in database
email=admin@example.com
pwd=admin123
salt=$(node -e "console.log(require('crypto').randomBytes(16).toString('hex'))")
keylen=32
hash=$(node -e "console.log(require('crypto').scryptSync('$pwd', '$salt', $keylen).toString('hex'))")
cmd="INSERT INTO \"Admin\" (email, password) VALUES ('$email', '$salt.$hash');"
sudo --login --user=postgres psql -d gig -c "$cmd" > /dev/null

# Install packages for frontend
echo 'Installing npm packages for frontend...'
cd ../frontend || exit
npm install > /dev/null 2>&1

echo 'Finishing setup...'
cd ../
sudo service postgresql stop

echo 'Setup completed successfully! Please close and reopen your terminal to complete the installation process.'
