import {
    getAllTransactions,
    getAllCategories,
    addTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} from "../model/transaction.js";


// Show all transactions for the logged-in user
const showTransactions = async (req, res) => {
    try {

        const financeId = req.session.financeUser.finance_id;

        const transactions = await getAllTransactions(financeId);

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


// Create a transaction for the logged-in user
const createTransaction = async (req, res) => {
    try {

        const financeId = req.session.financeUser.finance_id;

        const {
            description,
            amount,
            transaction_type,
            category_id
        } = req.body;

        await addTransaction(
            description,
            amount,
            transaction_type,
            category_id,
            financeId
        );

        req.flash("success", "Transaction added successfully.");

        res.redirect("/transactions");

    } catch (error) {

        console.error(error);

        req.flash("error", "Unable to save transaction.");

        res.redirect("/transactions/new");
    }
};


// Show the edit form for a user's transaction
const showEditTransaction = async (req, res) => {
    try {

        const financeId = req.session.financeUser.finance_id;
        const id = req.params.id;

        const transaction = await getTransactionById(id, financeId);

        if (!transaction) {
            req.flash("error", "Transaction not found.");
            return res.redirect("/transactions");
        }

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


// Update a user's transaction
const updateTransactionController = async (req, res) => {
    try {

        const financeId = req.session.financeUser.finance_id;
        const id = req.params.id;

        const {
            description,
            amount,
            transaction_type,
            category_id
        } = req.body;

        const transaction = await updateTransaction(
            id,
            description,
            amount,
            transaction_type,
            category_id,
            financeId
        );

        if (!transaction) {
            req.flash("error", "Transaction not found.");
            return res.redirect("/transactions");
        }

        req.flash("success", "Transaction updated successfully.");

        res.redirect("/transactions");

    } catch (error) {

        console.error(error);
        req.flash("error", "Unable to update transaction.");
        res.redirect("/transactions");
    }
};


// Delete a user's transaction
const deleteTransactionController = async (req, res) => {
    try {

        const financeId = req.session.financeUser.finance_id;
        const id = req.params.id;

        await deleteTransaction(id, financeId);

        req.flash("success", "Transaction deleted successfully.");

        res.redirect("/transactions");

    } catch (error) {

        console.error(error);
        req.flash("error", "Unable to delete transaction.");
        res.redirect("/transactions");
    }
};


export {
    showTransactions,
    showNewTransaction,
    createTransaction,
    showEditTransaction,
    updateTransactionController,
    deleteTransactionController
};