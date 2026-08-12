import {
    getDashboardSummary,
    getRecentTransaction
} from "../model/transaction.js";


// Get the information needed to display the dashboard
const showDashboard = async (req, res) => {

    // Get the total income, expenses and balance
    const summary = await getDashboardSummary();

    // Get the five most recent transactions
    const recentTransaction = await getRecentTransaction();

    const title = "Dashboard";

    // Send the data to the dashboard view
    res.render("dashboard/index", {
        title,
        summary,
        recentTransaction
    });
};


// Export the controller so the route can use it
export { showDashboard };