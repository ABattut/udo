if (Meteor.isClient) {
	Template.hello.events({
		'click #btn-submit': function(){
			var to = $('#email').val(),
				message = $('#message').val(),
				from = $('#name').val(),
				goodArray = [false, false];
			
			if(to=="")
				$('#email').addClass('error');
			else{
				$('#email').removeClass('error');
				goodArray[0]=true;
			}
			if(message=="")
				$('#message').addClass('error');
			else{
				$('#message').removeClass('error');
				goodArray[1]=true;
			}
			
			if(goodArray[0] && goodArray[1]){
				var subject = "J'ai un message pour vous";
				if(from!=""){
					subject+= " de "+from;
					message+= "\n \n"+from;
				}
				console.log(message);
				Meteor.call('sendMail', to, subject, message, function(){
					$('#email').val("");
					$('#message').val("");
					$('#name').val("");
					$('#status').text("Message envoyé !");
				});
			}
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function(){
		Meteor.Mandrill.config({
			username: "USER",
			key: "KEY"
		});
	});

	Meteor.methods({
		sendMail: function(to, subject, htmlText){
			Meteor.Mandrill.send({
				to: to,
				from: "USER",
				subject: subject,
				html: htmlText
			});
		}
	});
}