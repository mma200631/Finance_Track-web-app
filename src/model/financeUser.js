import db from './db.js';

// Create a new Finance Track user
const createFinanceUser = async(name, email, passwordHash) =>{
    const query= `
        INSERT INTO finance_users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING finance_id, name, email;
    `;

    const queryParams= [name, email, passwordHash ];
    const result= await db.query(query, queryParams);
    return result.rows[0];
};

//Find a finance track user by their email

const getFinanceUserByEmail = async(email)=>{
    const query= `
        SELECT *
        FROM finance_users
        WHERE email = $1;
    `;
    const queryParams = [email];
    const result = await db.query(query, queryParams);
    return result.rows[0];
};

export{createFinanceUser, getFinanceUserByEmail};
