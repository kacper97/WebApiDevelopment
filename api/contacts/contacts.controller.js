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
 
// Update an existing contact in datastore.
exports.update = function(req, res) {
     var index = _.findIndex(datastore.contacts , 
               function(contact) {
                  return contact.phone_number == req.params.id
            })  
         if (index != -1) {
         datastore.contacts.splice(index, 1, 
               {id:index,name: req.body.name, address: req.body.address , 
                         phone_number: req.body.phone_number });
          return res.sendStatus(200);
          }
          else {
             return res.sendStatus(404);
           }
 
         
};
 
// Deletes a contact from datastore.
exports.destroy = function(req, res) {
       var elements = _.remove(datastore.contacts , 
           function(contact) {
              return contact.phone_number == req.params.id;
        });  
     if (elements.length == 1) {
        return res.sendStatus(200);
      } else {
         return res.sendStatus(404);
      }
};