// Only executed by web browser
//declare a collection in the mongo database
var Things = new Mongo.Collection("things");

//this code executes only on the client
if (Meteor.isClient) {
  
  Template.body.helpers({
    //the things helper returns a list of things
    things: function() {
      //find all the things in the database and return them
  
      // var numberOfThings = Things.find().count();
      // console.log(numberOfThings);
      // console.log(Things.find().fetch());
  
      return Things.find({}, {sort: {created: -1}, limit: 1}).fetch();
    },

  });
  
  Template.thing.events({
  //this is called whenever there is a click
  //event on a delete link in the "thing" template
    "click .delete": function(event) {
        
        //tell the broswer not to do its default
        //which would be reload the page
        event.preventDefault();
        
        //using the mongo id of this template's object, tell
        //mongo to remove the object from the database
        Things.remove(this._id);
    }
  });
  
  Template.counter.events({
    // looking for events
  });
  
  Template.counter.helpers({
    thingscount: function() {
      return Things.find().count();
    }
  });
  
  Template.new.events({
    //this is called whenever something is submitted
    "submit": function(event) {
      //tell the browser not to do its default behavior
      //which would reload the page
      event.preventDefault();
      
      //Get the form HTML element
      //by definition its the target of the submit event
      var form = event.target;
      
      // var created_at = new Date();
      
      //insert a thing into the database collection
      Things.insert({
        title: form.title.value, 
        description: form.descript.value,
        category: form.category.value,
        created: new Date(),
      });
      
      //clear the text field
      form.title.value = '';
      form.descript.value = '';
      form.category.value = '';
    }
    
  });

}