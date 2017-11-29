var _ = require('lodash')
var datastore = require('../datastore');  // Will be removed later
var Contact = require('./contact.model');  // NEW line

// Get all contacts
exports.index = function handleError(res, err) {
    return res.status(500).json(err);
}

exports.index = function(req, res) {
      Contact.find(function (err, contacts) {
        if(err) { return handleError(res, err); }
        console.log('index ok' + contacts[0]);
        return res.status(200).json(contacts);
      });
} ;

// Creates a new contact in datastore.
exports.create = function(req, res) {
      Contact.create(req.body, function(err, contact) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(contact);
      });
};
 
// Update an existing contact in wdatastore.
exports.update = function(req, res) {
   Contact.findById(req.params.id, function (err, contact) {
        if(err) { return handleError(res, err); }
        contact.name = req.body.name
        contact.address = req.body.address
        contact.phone_number = req.body.phone_number
        contact.save(function (err) {
            if(err) { return handleError(res, err); }
            return res.sendStatus(200, 'Update successful');
        });
    });
 }
 
         
 
// Deletes a contact from datastore.
exports.destroy = function(req, res) {
    Contact.findById(req.params.id, function (err, contact) {
        if(err) { return handleError(res, err); }        
        contact.remove(function (err) {
            if(err) { return handleError(res, err); }
            return res.sendStatus(200,'Deleted');
        });
    })
}
