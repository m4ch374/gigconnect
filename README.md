# Capstone Project - GigConnect

GigConnect is a web platform that connects professionals with companies offering
projects.

The following installation instructions assume a Debian-based Linux environment
with access to sudo permissions. Run all commands from the root of the project
folder (i.e. inside the `capstone-project-3900f11acockatoos-main` folder).

## How to Setup the Project
Run the command: `sh setup.sh` and wait until `Setup completed successfully!` is
displayed. This may take a few minutes. After the script completes,
**close and reopen the terminal** to finish setup.

This script installs all the necessary libraries required for our project to
run. You only need to run this script *once* to perform the initial setup.

The setup script performs the following steps:
1.  Update package index files from their sources
2.  Install cURL
3.  Install nvm and Node v18
4.  Install PostgreSQL
5.  Create new user and database on the PostgreSQL server
6.  Generate .env file for the backend server
7.  Install npm packages for backend
8.  Sync the database with the Prisma schema
9.  Create admin account in the database
10. Install npm packages for frontend

## How to Run the Project
Run the command: `sh run_project.sh` and open the displayed URL in a web browser.

This script starts the frontend and backend servers. To stop running the
project, use CTRL-C in the terminal as usual.

The run project script performs the following steps:
1. Start the PostgreSQL server
2. Build and start the frontend server
3. Build and start the backend server
