const Account = require('../models/account.model.js');

// Create and Save a new User
exports.register = (req, res) => {

    // Validate request
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "Email can not be empty"
    //     });
    // }
    // if (req.body.request == "register") {
        // Create a Account
        const account = new Account({
            privateKey: "asd",
            address: "dsa",
            balance: 200,
        });
        // Save Account in the database
        account.save()
        .then(data => {
            var responseObj = 
                { 
                "responseTo" : "register",
                "privateKey" : "asd",
                "address" : "dsa",
                "balance" : 200
                }

            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Account."
            });
        });

    // }


    
};


exports.getBalance = (req, res) => {
    //Get Balance function
    // if (req.query.request == "getBalance") {

        //Validate
        if(!req.query.address) {
            return res.status(400).send({
                message: "Address can not be empty"
            });
        }

        //Find account by address
        Account.findOne({ address: req.query.address })
        .then(account => {
            if(!account) {
                return res.sendStatus(404).send({
                    message: "Account not found with address " + req.query.address
                });            
            }

            var responseObj = 
                { 
                "responseTo" : "getBalance",
                "balance" : account.balance,
                "uuid" : account.id,
                "address" : account.address
                }


            res.send(responseObj);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.sendStatus(404).send({
                    message: "Account not found with address " + req.query.address
                });                
            }
            return res.sendStatus(500).send({
                message: "Error retrieving account with address " + req.query.address
            });
        });

    // }





};





exports.restoreWallet = (req, res) => {



    //Restore Wallet Function
   // if (req.query.request == "restoreWallet") {
    
        //Validate
        if(!req.query.privateKey) {
            return res.status(400).send({
                message: "privateKey can not be empty"
            });
        }


        //Find account by address
        Account.findOne({ privateKey: req.query.privateKey })
        .then(account => {
            if(!account) {
                return res.sendStatus(404).send({
                    message: "Account not found with privateKey " + req.query.privateKey
                });            
            }

            var responseObj = 
                { 
                "responseTo" : "restoreWallet",
                "balance" : account.balance,
                "uuid" : account.id,
                "address" : account.address,
                "privateKey" : account.privateKey
                }


            res.send(responseObj);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.sendStatus(404).send({
                    message: "Account not found with privateKey " + req.query.privateKey
                });                
            }
            return res.sendStatus(500).send({
                message: "Error retrieving account with privateKey " + req.query.privateKey
            });
        });

    // }

};




// Update an account identified by the address in the request
exports.sendCoin = (req, res) => {

    //Validate Request
    if(!req.body.fromAddress || !req.body.toAddress) {
        return res.status(400).send({
            message: "From Address and To Address can not be empty"
        });
    }


    var totalFromBalance;
    var totalToBalance;

        var responseObj = 
        { 
            responseTo : "sendCoin",
            fromAddress : req.body.fromAddress,
            toAddress : req.body.toAddress,
            toBalance : totalFromBalance,
            fromBalance : totalToBalance
        }

    // Find From Account
    Account.findOne({ address: req.body.fromAddress })
    .then(account => {
        if(!account) {
            return res.status(404).send({
                message: "Account not found with address " + req.body.fromAddress
            });
        }

            totalFromBalance = parseFloat(account.balance) - parseFloat(req.body.amount);

            //Validate balance available
            if(totalFromBalance < 0.0) {
                return res.status(400).send({
                    message: "Insufficient Funds"
                });
            }

            //Update the Balance of From Address
            Account.findOneAndUpdate({ address: req.body.fromAddress }, {
                balance: totalFromBalance,
            }, {new: true})
            .then(account => {
                if(!account) {
                    return res.status(404).send({
                        message: "Account not found with address " + req.body.fromAddress
                    });
                }


                // res.send(account);
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Account not found with address " + req.body.fromAddress
                    });                
                }
                return res.status(500).send({
                    message: "Error updating account with address " + req.body.fromAddress
                });
            });

            responseObj.fromBalance = totalFromBalance;






            // Find To Account
            Account.findOne({ address: req.body.toAddress })
            .then(account => {
                if(!account) {
                    return res.status(404).send({
                        message: "Account not found with address " + req.body.toAddress
                    });
                }

                    totalToBalance = parseFloat(account.balance) + parseFloat(req.body.amount);

                    //Update the Balance of From Address
                    Account.findOneAndUpdate({ address: req.body.toAddress }, {
                        balance: totalToBalance,
                    }, {new: true})
                    .then(account => {
                        if(!account) {
                            return res.status(404).send({
                                message: "Account not found with address " + req.body.toAddress
                            });
                        }




                        // res.send(account);
                    }).catch(err => {
                        if(err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "Account not found with address " + req.body.toAddress
                            });                
                        }
                        return res.status(500).send({
                            message: "Error updating account with address " + req.body.toAddress
                        });
                    });



                // res.send("balance: " + totalBalance);

                responseObj.fromBalance = totalFromBalance;
                responseObj.toBalance = totalToBalance;


                res.send(responseObj);

            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Account not found with address " + req.body.fromAddress
                    });                
                }
                return res.status(500).send({
                    message: "Error updating account with address " + req.body.fromAddress
                });
            });




    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Account not found with address " + req.body.fromAddress
            });                
        }
        return res.status(500).send({
            message: "Error updating account with address " + req.body.fromAddress
        });
    });











};




// // Retrieve and return all users from the database.
// exports.findAll = (req, res) => {
//     User.find()
//     .then(users => {
//         res.send(users);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving users."
//         });
//     });
// };

// // Find a single user with a userId
// exports.findOne = (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });            
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving user with id " + req.params.userId
//         });
//     });
// };

// // Update a user identified by the userId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     // if(!req.body.email) {
//     //     return res.status(400).send({
//     //         message: "User can not be empty"
//     //     });
//     // }

//     // Find user and update it with the request body
//     User.findByIdAndUpdate(req.params.userId, {
//         name: req.body.name || "First Last",
//         email: req.body.email
//     }, {new: true})
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating user with id " + req.params.userId
//         });
//     });
// };

// // Delete a user with the specified userId in the request
// exports.delete = (req, res) => {
//     User.findByIdAndRemove(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });
//         }
//         res.send({message: "User deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete user with id " + req.params.userId
//         });
//     });
// };
