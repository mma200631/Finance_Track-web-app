import db from "./db.js";

// Get all transactions and include the category name for each transaction
const getAllTransactions = async () => {
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
        ORDER BY t.transaction_date DESC;
    `;

    const result = await db.query(query);

    return result.rows;
};


// Get all the categories from the database
const getAllCategories = async () => {
    const query = `
        SELECT *
        FROM finance_categories
        ORDER BY category_name;
    `;

    const result = await db.query(query);

    return result.rows;
};


// Add a new transaction to the database
const addTransaction = async (
    description,
    amount,
    transactionType,
    categoryId
) => {

    const query = `
        INSERT INTO transactions (
            description,
            amount,
            transaction_type,
            category_id
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        description,
        amount,
        transactionType,
        categoryId
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};


// Find one transaction using its ID
const getTransactionById = async (id) => {

    const query = `
        SELECT *
        FROM transactions
        WHERE transaction_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
};


// Update an existing transaction
const updateTransaction = async (
    id,
    description,
    amount,
    transactionType,
    categoryId
) => {

    const query = `
        UPDATE transactions
        SET
            description = $1,
            amount = $2,
            transaction_type = $3,
            category_id = $4
        WHERE transaction_id = $5
        RETURNING *;
    `;

    const values = [
        description,
        amount,
        transactionType,
        categoryId,
        id
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};


// Delete a transaction using its ID
const deleteTransaction = async (id) => {

    const query = `
        DELETE FROM transactions
        WHERE transaction_id = $1
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result;
};


// Get the total income, total expenses and current balance for the dashboard
const getDashboardSummary = async () => {

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

        FROM transactions;
    `;

    const result = await db.query(query);

    const totalIncome = Number(result.rows[0].total_income);
    const totalExpenses = Number(result.rows[0].total_expenses);

    // Calculate the balance by subtracting expenses from income
    const balance = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        balance
    };
};


// Get the five most recent transactions for the dashboard
const getRecentTransaction = async () => {

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
        ORDER BY t.transaction_date DESC, t.transaction_id DESC
        LIMIT 5;
    `;

    const result = await db.query(query);

    return result.rows;
};


// Export all the functions so they can be used by the controllers
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