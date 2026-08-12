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

const route = express.Router();


// Show the home page
route.get("/", (req, res) => {
    res.render("home", {
        title: "Finance Track"
    });
});


// Show all transactions
route.get("/transactions", showTransactions);


// Show the form for adding a transaction
route.get("/transactions/new", showNewTransaction);

// Save a new transaction
route.post("/transactions", createTransaction);


// Show the edit form for a transaction
route.get("/transactions/:id/edit", showEditTransaction);

// Update an existing transaction
route.post("/transactions/:id/edit", updateTransactionController);


// Delete a transaction
route.post("/transactions/:id/delete", deleteTransactionController);


// Show the dashboard
route.get("/dashboard", showDashboard);


// Export the router
export default route;