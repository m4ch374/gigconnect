#!/bin/sh

# Run postgres server
sudo service postgresql start

# Run frontend server
cd frontend || exit
npm run build > /dev/null
npm run preview &

# Run backend server
cd ../backend || exit
npm run dev < /dev/null > /dev/null 2>&1

# Cleanup on exit
cd ../
sudo service postgresql stop
pkill -P $$
