Template.appLayout.rendered = function () {
	ServerSession.set('url',document.URL);
};

Template.signup.rendered = function () {
	signUp = function(){
		var userEmail = $('#email').val(),
			re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			validEmail = re.test(userEmail);

		codeAvailable = '';

		emailInUse = '';

		if(Codes.find({used: false}).count() < 1){
			codeAvailable = false;
		}
		else{
			codeAvailable = true;
		}

		if(People.findOne({email:userEmail})){
			emailInUse = true;
		}
		else{
			emailInUse = false;
		}

		if (userEmail == '' || validEmail == false) {
			sweetAlert({
				title:"Please Enter A Valid Email",
				type:"error"
			});
		}
		else if (emailInUse == true) {
			sweetAlert({
				title:"That email is already in use",
				type:"error"
			});
		}
		else{

			Meteor.call('grabCode',userEmail,codeAvailable,function(){
				
				window.location.replace("/thanks");
				//test = this;
			});
		}
	}

};

Template.signup.events({
	'click #email-submit':function(e,tmpl) {

		signUp();
		
	},
	'keypress #email':function(e,tmpl){
		if (e.which === 13) {
			signUp();
	    }
	}
});

Template.thanks.rendered = function () {
	Meteor.call('emailCode');
};