// Only executed by web browser
//declare a collection in the mongo database
var Things = new Mongo.Collection("things");

//this code executes only on the client
if (Meteor.isClient) {
  Template.body.rendered = function(){
    $('.middle').hide();  
    $('.swallow-btn').hide(); 
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
      $('.swallow-btn').show();
      
      var contentContainer = $(".middle");
      contentContainer.show();
      // contentContainer.removeClass('giene');
      contentContainer.removeClass('hidden');
      
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
        event.preventDefault();
        $('.swallow-btn').hide();
        // making hidepoint wherever it needs to be on page
        var $hidePoint = $('.send');
        var $container = $('.middle');
    
        var buttonHeight = $hidePoint.height();
        var buttonWidth = $hidePoint.width();
    
        var buttonOffset = $hidePoint.offset();
        var containerOffset = $container.offset();
        
        var diffX = containerOffset.left - buttonOffset.left - buttonWidth*0.5;
        var diffY = containerOffset.top - buttonOffset.top - buttonHeight*0.5;
        
        var origin = -diffX + 'px ' + -diffY + 'px';
        
        console.log(origin);
        
        $container
            .css({
              transformOrigin: origin  
            })
            .toggleClass('hidden');  
      
    }
  });

}