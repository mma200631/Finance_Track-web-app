import {
    getAllTransactions,
    getAllCategories,
    addTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from "../model/transaction.js";


// Show all transactions on the transactions page
const showTransactions = async (req, res) => {
    try {
        const transactions = await getAllTransactions();
        const title = "Transactions";

        res.render("transactions/index", {
            title,
            transactions
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading transactions.");
    }
};


// Show the form for adding a new transaction
const showNewTransaction = async (req, res) => {
    try {

        // Get the categories so they can be shown in the form
        const categories = await getAllCategories();

        res.render("transactions/new", {
            title: "Add Transaction",
            categories
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading page.");
    }
};


// Take the form data and create a new transaction
const createTransaction = async (req, res) => {
    try {

        // Get the information submitted from the form
        const {
            description,
            amount,
            transaction_type,
            category_id
        } = req.body;

        // Send the form data to the model to save it in the database
        await addTransaction(
            description,
            amount,
            transaction_type,
            category_id
        );

        // Go back to the transactions page after saving
        res.redirect("/transactions");

    } catch (error) {

        console.error(error);
        res.status(500).send("Unable to save transaction.");

    }
};


// Show the edit form for a selected transaction
const showEditTransaction = async (req, res) => {
    try {

        // Get the transaction ID from the URL
        const id = req.params.id;

        // Find the transaction that the user wants to edit
        const transaction = await getTransactionById(id);

        // Get the categories for the edit form
        const categories = await getAllCategories();

        res.render("transactions/edit", {
            title: "Edit Transaction",
            transaction,
            categories
        });

    } catch (error) {

        console.error(error);
        res.status(500).send("Unable to load transaction.");

    }
};


// Update the transaction after the edit form is submitted
const updateTransactionController = async (req, res) => {
    try {

        // Get the transaction ID from the URL
        const id = req.params.id;

        // Get the updated information from the form
        const {
            description,
            amount,
            transaction_type,
            category_id
        } = req.body;

        // Send the updated information to the model
        await updateTransaction(
            id,
            description,
            amount,
            transaction_type,
            category_id
        );

        // Go back to the transactions page after updating
        res.redirect("/transactions");

    } catch (error) {

        console.error(error);
        res.status(500).send("Unable to update transaction.");

    }
};


// Delete a transaction
const deleteTransactionController = async (req, res) => {
    try {

        // Get the transaction ID from the URL
        const id = req.params.id;

        // Delete the transaction from the database
        await deleteTransaction(id);

        // Go back to the transactions page
        res.redirect("/transactions");

    } catch (error) {
        console.error(error);
        res.status(500).send("Unable to delete transaction.");
    }
};


// Export the controller functions so the routes can use them
export {
    showTransactions,
    showNewTransaction,
    createTransaction,
    showEditTransaction,
    updateTransactionController,
    deleteTransactionController
};