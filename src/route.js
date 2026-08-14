import express from "express";

import {
    showTransactions,
    showNewTransaction,
    createTransaction,
    showEditTransaction,
    updateTransactionController,
    deleteTransactionController
} from "./controller/transaction.js";

import { showDashboard } from "./controller/dashboard.js";
import { showFinanceRegistrationForm,processFinanceRegistration,showFinanceLoginForm, processFinanceLogin, logOutFinanceUser, requireLogin } from "./controller/financeAuth.js";

const route = express.Router();


// Show the home page
route.get("/", (req, res) => {
    res.render("home", {
        title: "Finance Track"
    });
});


// Show all transactions
route.get("/transactions", requireLogin, showTransactions);


// Show the form for adding a transaction
route.get("/transactions/new",requireLogin, showNewTransaction);

// Save a new transaction
route.post("/transactions",requireLogin, createTransaction);


// Show the edit form for a transaction
route.get("/transactions/:id/edit",requireLogin, showEditTransaction);

// Update an existing transaction
route.post("/transactions/:id/edit",requireLogin, updateTransactionController);


// Delete a transaction
route.post("/transactions/:id/delete",requireLogin, deleteTransactionController);


// Show the dashboard
route.get("/dashboard", requireLogin, showDashboard);

route.get('/register', showFinanceRegistrationForm);
route.post('/register', processFinanceRegistration);
route.get('/login', showFinanceLoginForm);
route.post('/login', processFinanceLogin);
route.post('/logout', logOutFinanceUser);


// Export the router
export default route;