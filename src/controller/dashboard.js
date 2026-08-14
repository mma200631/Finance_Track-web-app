import {
    getDashboardSummary,
    getRecentTransaction
} from "../model/transaction.js";


// Get the information needed to display the dashboard
const showDashboard = async (req, res) => {
    try {
        // Get the logged-in user's finance ID from the session
        const financeId = req.session.financeUser.finance_id;

        // Get this user's total income, expenses and balance
        const summary = await getDashboardSummary(financeId);

        // Get this user's five most recent transactions
        const recentTransaction = await getRecentTransaction(financeId);

        const title = "Dashboard";

        // Send the data to the dashboard view
        res.render("dashboard/index", {
            title,
            summary,
            recentTransaction
        });

    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Unable to load dashboard.");
    }
};


// Export the controller so the route can use it
export { showDashboard };