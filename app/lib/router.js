Router.configure({
	layoutTemplate: 'appLayout',
	loadingTemplate: 'loading',
	trackPageView: true
});

Router.route('/',{
	name: 'home',
	waitOn: function() { return Meteor.subscribe('codes'); },
});

Router.route('/thanks',{
	//waitOn: function(){ return Meteor.subscribe('people'); },
	name: 'thanks'
});

// Router.route('/', function () {
// 	console.log('home');
//   this.render('home', {
//     //data: function () { return Items.findOne({_id: this.params._id}); }
//   });
// });
