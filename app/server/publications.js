Meteor.publish('codes',function(){
	return Codes.find();
});

Meteor.publish('people',function(){
	return People.find({},{fields: {email: 0, code: 0, hasCode: 0,url:0}});
});