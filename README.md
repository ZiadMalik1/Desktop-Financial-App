# malikBandit
## An ElectronJS Desktop Application for Financial Insight

Bootstrapped with React

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## What is it?

Initially started as a simple desktop application to help keep track of Stock Investment portfolios across multiple platforms to allow for cohesion, malikBandit is now working towards becoming an all around Financial Advisor application. It makes use of the following technologies

- Springboot Standalone API - Retrieval of User Portfolio Information (Stock Tickers, Historical Total Data)
- React Application - Bootstrapped with ElectronJS to allow for ease of use right from your Desktop
- Plaid API - Allows for retrieval of Bank Account balances / Credit Card balances to allow for a more overall overview of a user's Net Worth progression
- Yahoo Finance API Web Sockets - Get Live Feed on Stock Tickers to give user a detailed look into how their portfolios are performing day to day
- Several React UI Frameworks such as MaterialUI - Dashboard Components
- JWT Authentication - Allow for more end-to-end security across the entire application
- postgreSQL Database - Basic SQL Database used to store user information protected by JWT Authentication


## How it works

Users are allowed to add stocks they own and details such as date purchased and shares owned which is then posted to a SpringBoot Backend which stores the information within a postgreSQL Database. This information is retrieved on call from the frontend where we also make use of the Yahoo Finance API to provide live stock information on the stocks stored for the user such as:

- Current Price
- 50 Day Average Price
- Moving average convergence divergence
- Relative Strength Index

To name a few indicators that allow the user to have insight on their stock performances. The API also makes a daily entry to the database on the total of the user's assets subtracted by their debts to get an estimated net worth. This networth is then indexed within a graph on the dashboard of the user's frontend and allows them to visually see how their networth is progressing.

## Why malikBandit

The audience I am targeting are the Stock Fanatics who use multiple platforms to invest. Today, your banks have the ability to allow you to invest. However, different platforms bring different advantages and therefore, you can have shares spread across different platforms rendering them hard to keep track of in terms of progression. This application will not only allow you to keep track of your portfolio, but also your net worth in general. Hopefully in the future, using A.I and Machine Learning, we will be able to give users financial advice regarding their day to day spending.
