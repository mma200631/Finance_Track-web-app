CREATE TABLE finance_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO finance_categories (category_name)
VALUES
('Salary'),
('Food'),
('Transport'),
('Shopping'),
('Entertainment'),
('Bills'),
('Health'),
('Other');


CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('Income', 'Expense')),
    transaction_date DATE DEFAULT CURRENT_DATE,
    category_id INT REFERENCES finance_categories(category_id)
);

INSERT INTO transactions
(description, amount, transaction_type, transaction_date, category_id)
VALUES
('Monthly Salary', 250000.00, 'Income', CURRENT_DATE, 1),
('Bought Groceries', 15000.00, 'Expense', CURRENT_DATE, 2),
('Bus Fare', 3000.00, 'Expense', CURRENT_DATE, 3);