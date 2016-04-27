// import { Meteor } from 'meteor/meteor';

var Things = new Mongo.Collection("things");

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.Mailgun.config({
      username: process.env.MAILGUN_SMTP_LOGIN,
      password: process.env.MAILGUN_SMTP_PASSWORD,
      port: process.env.MAILGUN_SMTP_PORT
    });
});

// Meteor.startup(() => {
//   process.env.MAIL_URL = "smtp://postmaster@ghost-trap.com:holly588me@smtp.mailgun.org:587";
// });

Meteor.methods({
  // TODO: Configure outgoing mail server. See thread at https://community.c9.io/t/send-email-from-my-app/1262
  emailAndDisposeThing: function(id) {
      var thing = Things.findOne({_id: id});

      if (thing && thing.user && thing.user.emails && thing.user.emails[0]) {
        var to = thing.user.emails[0].address;

        console.log("Emailing", id, "to", to);
        this.unblock();

        console.log("about to send email..." + to + thing.description);

        Meteor.Mailgun.send({
            to: to,
            from: 'coombs.l@gmail.com',
            subject: thing.description,
            text: "Bad idea?",
            html: "Bad idea?"
        });


        // Things.remove(id);

        console.log("email sent!");
      }
      else {
        console.log("Couldn't find thing or email", id, thing);
      }

  }
});