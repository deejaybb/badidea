// import { Meteor } from 'meteor/meteor';

var Things = new Mongo.Collection("things");

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.Mailgun.config({
      username: 'postmaster@sandboxdec8208b643e438e9561fa21f42ac5bd.mailgun.org',
      password: '791c0a9cb05928b979c0bd2db31a2bff',
      port: '587'
    });
});

// Meteor.startup(() => {
//   process.env.MAIL_URL = "smtp://postmaster@ghost-trap.com:holly588me@smtp.mailgun.org:587";
// });

Meteor.methods({
  // TOOD: Configure outgoing mail server. See thread at https://community.c9.io/t/send-email-from-my-app/1262
  emailAndDisposeThing: function(id) {
      var thing = Things.findOne({_id: id});

      if (thing && thing.user && thing.user.emails && thing.user.emails[0]) {
        var to = thing.user.emails[0].address;

        console.log("Emailing", id, "to", to);
        this.unblock();

        // console.log("about to send email..." + to + thing.description);

        // Meteor.Mailgun.send({
        //     to: to,
        //     from: 'postmaster@sandboxdec8208b643e438e9561fa21f42ac5bd.mailgun.org',
        //     subject: thing.description,
        //     text: "Bad idea?",
        //     html: "Bad idea?"
        // });

        // Email.send({
        //     to: to,
        //     from: 'drippingectoplasm@gmail.com',
        //     subject: thing.description,
        //     text: "Bad idea?",
        //     html: ''
        // });

        // console.log("email sent!");
      }
      else {
        console.log("Couldn't find thing or email", id, thing);
      }

      // Things.remove(id);
  }
});