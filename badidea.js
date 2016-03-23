// Only executed by web browser
//declare a collection in the mongo database
var Things = new Mongo.Collection("things");

//this code executes only on the client
if (Meteor.isClient) {
  Template.body.rendered = function(){
    $('.middle').hide();  
  };
  
  Template.body.helpers({
    things: function() {
      
      return Things.find({}, {sort: {created: -1}, limit: 1}).fetch();
    },

  });
  
  Template.thing.events({
  //this is called whenever there is a click
  //event on a delete link in the "thing" template
    "click .delete": function(event) {
        
        //tell the browser not to reload the page
        event.preventDefault();
        
        //using the mongo id of this template's object, tell mongo to remove the object from the database
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
      //tell the browser not to reload the page by default
      event.preventDefault();
      
      var contentContainer = $(".middle");
      contentContainer.show();
      contentContainer.removeClass('giene');
      
      //Get the form HTML element, by definition its the target of the submit event
      var form = event.target;
      
      
      //insert a thing into the database collection
      Things.insert({
        description: form.description.value,
        created: new Date(),
      });

      form.description.value = '';

    }
    
  });
  
  Template.thing.events({
     "click .send": function(event) {
        event.preventDefault();
    },
    
    "click .release": function(event) {
        event.preventDefault();
        Things.remove({});
    }
  });

  Template.swallow.events({
    "click .swallow-btn": function(event){
      $('.middle').addClass('giene');
    }
  });

}