if (Meteor.isClient) {
	Template.hello.events({
		'click #btn-submit': function(){
			var to = $('#email').val(),
				htmlText = $('#message').val(),
				from = $('#name').val(),
				goodArray = [false, false];
			
			if(to=="")
				$('#email').addClass('error');
			else{
				$('#email').removeClass('error');
				goodArray[0]=true;
			}
			if(htmlText=="")
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
			username: "USERNAME",
			key: "KEY"
		});
	});

	Meteor.methods({
		sendMail: function(to, subject, htmlText){
			Meteor.Mandrill.send({
				to: to,
				from: "FROM",
				subject: subject,
				html: htmlText
			});
		}
	});
}