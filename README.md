# Finance Tracker

A full stack JavaScript application for people who want to keep track of their finances.

## Technologies Used

- React.js
- Webpack
- Material UI
- Javascript 
- Postgres
- HTML5
- CSS3
- Heroku
- Argon2
- JSON webtoken
- Express.js
- Babel

## Live Demo

Try the application live at (https://income-expense-manager.herokuapp.com/)

## Features

- Users can register for an account
- User can sign in 
- User can sign out 
- User can add an income
- User can add an expense
- User can see a breakdown of income and expenses 

## Stretch Features

- Users can see a monthly breakdown 

## Preview

![Animation 2](https://user-images.githubusercontent.com/93169062/170407495-ca673268-1a6a-4898-b38a-2ae1f2e46c1e.gif)

![Animation 1](https://user-images.githubusercontent.com/93169062/170409215-4dae4b53-9bc1-48c0-9467-3c68e70b7fad.gif)

## Development

### System Requirements

- Node.js 16 or higher
- NPM 6 or higher
- Postgres 

### Getting Started

1. Clone the repository.

    ```shell
    git clone (https://github.com/Dustin-Davis/Finance-Tracker.git)
    cd finance-tracker
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Fill in the empty values of the .env.example file and copy it.

    ```shell
    cp .env.example .env
    ```

1. Start PostgreSQL.

    ```shell
    sudo service postgresql start
    ```

1. Create a database (make sure it matches .env.example)

    ```shell
    createdb (yourDatabaseName)
    ```

1. Import your database into Postgres.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
    
1. View your database through Pgweb.

    ```shell
    pgweb --db=(yourDatabaseName)
    ```
    
    
