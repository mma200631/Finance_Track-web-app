import db from "./db.js";

// Get all transactions belonging to the logged-in user
const getAllTransactions = async (financeId) => {
    const query = `
        SELECT 
            t.transaction_id,
            t.description,
            t.amount,
            t.transaction_type,
            t.transaction_date,
            c.category_name
        FROM transactions t
        JOIN finance_categories c
            ON t.category_id = c.category_id
        WHERE t.finance_id = $1
        ORDER BY t.transaction_date DESC;
    `;

    const result = await db.query(query, [financeId]);

    return result.rows;
};


// Get all categories
const getAllCategories = async () => {
    const query = `
        SELECT *
        FROM finance_categories
        ORDER BY category_name;
    `;

    const result = await db.query(query);

    return result.rows;
};


// Add a new transaction for the logged-in user
const addTransaction = async (
    description,
    amount,
    transactionType,
    categoryId,
    financeId
) => {

    const query = `
        INSERT INTO transactions (
            description,
            amount,
            transaction_type,
            category_id,
            finance_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [
        description,
        amount,
        transactionType,
        categoryId,
        financeId
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};


// Find one transaction belonging to the logged-in user
const getTransactionById = async (id, financeId) => {

    const query = `
        SELECT *
        FROM transactions
        WHERE transaction_id = $1
        AND finance_id = $2;
    `;

    const result = await db.query(query, [id, financeId]);

    return result.rows[0];
};


// Update a transaction belonging to the logged-in user
const updateTransaction = async (
    id,
    description,
    amount,
    transactionType,
    categoryId,
    financeId
) => {

    const query = `
        UPDATE transactions
        SET
            description = $1,
            amount = $2,
            transaction_type = $3,
            category_id = $4
        WHERE transaction_id = $5
        AND finance_id = $6
        RETURNING *;
    `;

    const values = [
        description,
        amount,
        transactionType,
        categoryId,
        id,
        financeId
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};


// Delete a transaction belonging to the logged-in user
const deleteTransaction = async (id, financeId) => {

    const query = `
        DELETE FROM transactions
        WHERE transaction_id = $1
        AND finance_id = $2;
    `;

    const result = await db.query(query, [id, financeId]);

    return result;
};

// Get dashboard summary for the logged-in user
const getDashboardSummary = async (financeId) => {

    const query = `
        SELECT
            COALESCE(SUM(CASE
                WHEN transaction_type = 'Income'
                THEN amount
                ELSE 0
            END), 0) AS total_income,

            COALESCE(SUM(CASE
                WHEN transaction_type = 'Expense'
                THEN amount
                ELSE 0
            END), 0) AS total_expenses

        FROM transactions
        WHERE finance_id = $1;
    `;

    const result = await db.query(query, [financeId]);

    const totalIncome = Number(result.rows[0].total_income);
    const totalExpenses = Number(result.rows[0].total_expenses);

    const balance = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        balance
    };
};


// Get the five most recent transactions for the logged-in user
const getRecentTransaction = async (financeId) => {

    const query = `
        SELECT
            t.transaction_id,
            t.description,
            t.amount,
            t.transaction_type,
            t.transaction_date,
            c.category_name
        FROM transactions t
        JOIN finance_categories c
            ON t.category_id = c.category_id
        WHERE t.finance_id = $1
        ORDER BY t.transaction_date DESC, t.transaction_id DESC
        LIMIT 5;
    `;

    const result = await db.query(query, [financeId]);

    return result.rows;
};


export {
    getAllTransactions,
    getAllCategories,
    addTransaction,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getDashboardSummary,
    getRecentTransaction
};