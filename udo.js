if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.startup(function(){
      Meteor.Mandrill.config({
        username: "USERNAME",
        key: "KEY"
      });
    });

    Meteor.methods({
      sendMail: function(to, subject, htmlText){
        Meteor.Mandrill.send({
          to: to,
          from: "MAIL",
          subject: subject,
          html: htmlText
        });
      }
    });
  });
}