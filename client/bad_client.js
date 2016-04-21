// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

// Only executed by web browser
//declare a collection in the mongo database
var Things = new Mongo.Collection("things");

//this code executes only on the client
if (Meteor.isClient) {

  Template.body.rendered = function(){
    $('.middle').hide();
    $('.swallow-btn').hide();
    // $('.all-things').hide();
    // $('.a-thing').hide();
  };

  // TODO: Just show a blank screen (except the login form) if !Meteor.user()
  // TODO: Only show things belonging to Meteor.user()
  Template.body.helpers({
    newthings: function() {
      return Things.find({user: Meteor.user()}, {sort: {created: -1}, limit: 1}).fetch();
    },

    allthings: function() {
      return Things.find({user: Meteor.user()}, {sort: {created: -1}}).fetch();
    },

  });

  Template.newthing.events({
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
      return Things.find({user: Meteor.user()}).count();
    },
    counterSize: function() {
      // counter enlargment
      var count = Things.find({user: Meteor.user()}).count();

      var counterWidth = 50 + (count*3);
      var counterHeight = counterWidth;

      var styles = {
        width: counterWidth + "px",
        height: counterHeight + "px",
        'border-radius': (counterWidth*0.5) + "px"
      }

      $('.counter').css(styles);
    }
  });

  Template.new.events({
    //this is called whenever something is submitted
    "submit": function(event) {
      //tell the browser not to reload the page by default
      event.preventDefault();
      // $('.swallow-btn').show();

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
        user: Meteor.user()
      });

      form.description.value = '';

      // play a sucking sound
      var suckIt = $("#sucking")[0];
      console.log(suckIt);
      suckIt.play();


      $(".middle").toggleClass('middle-animate');
      // This is for making it automatically trap
      var $container = $('.middle');



      setTimeout(function(){
        //move swallow event here
        $('.swallow-btn').hide();
        $container.toggleClass('hidden');
      }, 1000);
      // seconds it will take

      $('.a-thing').hide();
    }
  });

  Template.capture.events({

    "click .release": function(event) {
        event.preventDefault();

        var releaseIt = $("#releasing")[0];
        releaseIt.play();

        // $('.a-thing').hide();

        $('.all-things').show();
         // $('.all-things').addClass('release-things');
        // $('.a-thing').addClass('release-one');

        $('.a-thing').each(function(i, val){;
          //bigger number the longer it will take 500 100
          var speed = Math.floor(Math.random() * 1000) + 500;
          setTimeout(function(){
            $(val).show().addClass('release-one');
          }, speed * (i+1));
        });

        // TODO: Limit to things belonging to Meteor.user()
        var things = Things.find({user: Meteor.user()}).fetch();

        setTimeout(function(){
          $.each(things, function(i, thing) {
            setTimeout(function(){
              Meteor.call('emailAndDisposeThing', thing._id);
              //rate at which counter number counts down
              //Add this line to delete the things after releasing
              // Things.remove(thing._id);
            }, 300 * (i+1));
          });
          //how long it waits before it starts deleting things
        }, 500);
    }
  });


  Template.swallow.events({
    "click .swallow-btn": function(event){
        event.preventDefault();
    }
  });

}
