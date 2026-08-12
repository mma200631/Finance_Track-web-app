# Overview

Finance Track is a web-based personal finance tracking application designed to help users record and manage their income and expenses in one place. The application allows users to create, view, edit, and delete financial transactions, organize transactions by category, and view a dashboard showing their total income, total expenses, and current balance.

The application was developed to strengthen my skills in building dynamic web applications with JavaScript, Node.js, Express, EJS, and PostgreSQL. My purpose for creating this software was to gain more practical experience connecting a server-side application to a relational database and using stored data to dynamically generate web pages.

### Running the Application Locally

To start the Finance Track application on a local computer, first open the project folder in a terminal and install the required dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

Once the server is running, open the following address in a web browser:

```text
http://localhost:3001
```

The home page will be displayed first.

The application uses PostgreSQL to store transaction and category information. The required database connection must be configured through the project's environment variables before starting the application.

### Software Demo Video

[Software Demo Video](https://youtu.be/0yP5T7I65o4)

# Web Pages

### Home Page

The Home page is the landing page for Finance Track. It introduces the purpose of the application and provides navigation to the Transactions and Dashboard pages. The page contains a custom finance illustration and dynamically generated page content such as the page title.

### Transactions Page

The Transactions page displays financial transactions stored in the PostgreSQL database. Each transaction displays its description, amount, transaction type, category, and date. The page is dynamically populated using information retrieved from the database.

From this page, users can select **Add Transaction** to create a new transaction. Users can also edit or delete existing transactions.

### New Transaction Page

The New Transaction page contains a form that allows users to enter a transaction description, amount, transaction type, and category. The category options are dynamically generated from the categories stored in the database.

When the form is submitted, the information is sent to the server and saved to PostgreSQL.

### Edit Transaction Page

The Edit Transaction page allows users to modify an existing transaction. The existing transaction information is retrieved from the database and populated into the form. After submitting the changes, the database is updated and the user can return to the Transactions page.

### Dashboard Page

The Dashboard provides a financial summary based on the transactions stored in the database. It dynamically calculates and displays total income, total expenses, and the current balance.

The balance is calculated by subtracting total expenses from total income. Because the dashboard retrieves the information from the database, its values change when transactions are added, edited, or deleted.

### Navigation Between Pages

The pages are connected through the navigation bar and links throughout the application. The Home page provides access to the Transactions and Dashboard pages. The Transactions page provides links to create, edit, and delete transactions, while the Dashboard provides quick links to add a transaction or view existing transactions.

# Development Environment

Finance Track was developed using **Visual Studio Code** as the primary code editor and **Node.js** as the JavaScript runtime environment. The application was tested locally using the Node.js development server and accessed through a web browser.

The application was developed using the following technologies and libraries:

* **JavaScript** — Server-side programming language
* **Node.js** — JavaScript runtime
* **Express.js** — Web application framework for handling routes and requests
* **EJS** — Templating engine used to dynamically generate HTML pages
* **PostgreSQL** — Relational database used to store transactions and categories
* **node-postgres (`pg`)** — Library used to connect the Node.js application to PostgreSQL
* **dotenv** — Used to load environment variables
* **Nodemon** — Used during development to automatically restart the server when code changes

# Useful Websites

* [Node.js Documentation](https://nodejs.org/docs/latest/api/)
* [Express.js Documentation](https://expressjs.com/)
* [EJS Documentation](https://ejs.co/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [node-postgres Documentation](https://node-postgres.com/)
* [MDN Web Docs](https://developer.mozilla.org/)

# Future Work

* Add user authentication so that each user can have a private account and their own financial transactions.
* Add charts and visual reports to help users understand their income and spending patterns.
* Add filtering and searching options for transactions by date, category, or transaction type.
* Add monthly and yearly financial summaries.
* Improve the mobile experience and add additional responsive design features.
* Deploy the application online so it can be accessed without running the development server locally.
