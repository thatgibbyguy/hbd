var Schemas = {};

Codes = new Mongo.Collection('codes');

Schemas.codeSchema = new SimpleSchema({
	code:{
		type: String,
		label: "Discount Code"
	},
	used:{
		type: Boolean,
		label: "Redeemed Yet?"
	}
});

Codes.attachSchema(Schemas.codeSchema);

People = new Mongo.Collection('people');

Schemas.peopleSchema = new SimpleSchema({
	email:{
		type: String,
		label: "Person's Email"
	},
	code:{
		type: String,
		label: "Code Supplied"
	},
	hasCode:{
		type: Boolean,
		label: "Do they have a code?"
	},
	url:{
		type: String,
		label: "What URL where they on?"
	}
});

People.attachSchema(Schemas.peopleSchema);