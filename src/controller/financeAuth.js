import bcrypt from 'bcrypt';
import { createFinanceUser, getFinanceUserByEmail } from '../model/financeUser.js';

const showFinanceRegistrationForm = async(req, res)=> {
    const title ='Register';
    res.render('register', {title});

};

// Process the Finance Track registration form
const processFinanceRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the email is already registered
        const exsistingUser = await getFinanceUserByEmail();
        if(exsistingUser){
            req.flash('error', 'An account with that email already exist');
            return res.redirect('/register');
        }

        //hash the password before storing it 
            const salt = await bcrypt.genSalt(10);
            const passwordHash= await bcrypt.hash(password, salt)
        
        //Create the user in the dadtabase
        const userId = await createFinanceUser(name, email, passwordHash);
        // Tell the user that registration was successful
        req.flash('success', 'Registartion Successfull! Please log in.');

        // send the user to the login page

        res.redirect('/login');
    } catch(error){
        console.error('Error registering finanace track user:');

        req.flash('error', 'An error occurred during registration! please try again.')
        res.redirect('/register')
    };        
}

const showFinanceLoginForm= async(req, res)=> {
    const title = 'Login'
    res.render('login', {title})
};

const processFinanceLogin = async(req, res)=>{
    const{email, password} = req.body;
    try{
        //find finance track user by their email

        const user = await getFinanceUserByEmail(email);
        if(!user){
            req.flash('error', 'Invalid email or password')
            return res.redirect('/login')
        }

         // Compare the password entered with the stored password hash
         const passwordMatch = await bcrypt.compare(
            password, 
            user.password_hash
         );

        //check if the password is correct
        if(!passwordMatch){
            req.flash('error', ' Invalid email or password')
            return res.redirect('/login');
        }

        //store the logged user in a session
        req.session.financeUser = {
            finance_id: user.finance_id,
            name: user.name,
            email : user.email
        };

        //show a success message after login

        req.flash('success', 'Login successful');
        res.redirect('/dashboard');
    }catch (error) {
        console.error("Error logging in Finance Track user:", error);

        req.flash("error", "Unable to log in. Please try again.");

        res.redirect("/login");
    }
};

const logOutFinanceUser = async(req, res)=> {
    try{
        delete req.session.financeUser;
        req.flash('success', 'Logout successful')

        res.redirect('/');
    }catch (error) {
        console.error("Error logging out Finance Track user:", error);

        req.flash("error", "Unable to log out. Please try again.");

        res.redirect("/dashboard");
    }

}

const requireLogin = async(req, res, next)=> {
    if(!req.session.financeUser){
        req.flash('error', 'Please log in to access this page')
        return res.redirect('/login')
    }

    next();

}



export{showFinanceRegistrationForm, processFinanceRegistration, showFinanceLoginForm, processFinanceLogin, logOutFinanceUser, requireLogin};
