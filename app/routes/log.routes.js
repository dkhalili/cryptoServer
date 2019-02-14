module.exports = (app) => {
    const log = require('../controllers/log.controller.js');


    // Get all Logs of Accounts
    app.get('/account/logs', log.getLogs);

    // Get Logs by fromAddress
    app.get('/account/logs/fromAccount/:address', log.getFromLogs);

    // Get Logs by toAddress
    app.get('/account/logs/toAccount/:address', log.getToLogs);





    // // Retrieve all Notes
    // app.get('/users', users.findAll);

    // // Retrieve a single Note with noteId
    // app.get('/users/:userId', users.findOne);

    // // Update a Note with noteId
    // app.put('/user/:userId', users.update);

    // // Delete a Note with noteId
    // app.delete('/users/:userId', users.delete);
}