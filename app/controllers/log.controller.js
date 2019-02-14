const Log = require('../models/log.model.js');

// Retrieve and return all logs from the database.
exports.getLogs = (req, res) => {
    Log.find()
    .then(logs => {
        res.send(logs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving logs."
        });
    });
};


// Retrieve and return all logs from the database.
exports.getFromLogs = (req, res) => {
    //Validate
    if(!req.params.address) {
        return res.status(400).send({
            message: "Address can not be empty"
        });
    }
    Log.find({fromAddress : req.params.address})
    .then(logs => {
        res.send(logs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving logs."
        });
    });
};



// Retrieve and return all logs from the database.
exports.getToLogs = (req, res) => {

        //Validate
    if(!req.params.address) {
        return res.status(400).send({
            message: "Address can not be empty"
        });
    }
    
    Log.find({toAddress : req.params.address})
    .then(logs => {
        res.send(logs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving logs."
        });
    });
};



