module.exports = (app) => {
    const account = require('../controllers/account.controller.js');

    // Create a new Account
    app.post('/account', account.register);

    // Get Balance of Account by address
    app.get('/account/getBalance', account.getBalance);

    // Restore Account by key
    app.get('/account/restoreWallet', account.restoreWallet);

    // Send Coin from one address to another
    app.put('/account', account.sendCoin);





    // // Retrieve all Notes
    // app.get('/users', users.findAll);

    // // Retrieve a single Note with noteId
    // app.get('/users/:userId', users.findOne);

    // // Update a Note with noteId
    // app.put('/user/:userId', users.update);

    // // Delete a Note with noteId
    // app.delete('/users/:userId', users.delete);
}