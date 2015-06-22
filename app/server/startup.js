Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://xdesign:obckveYF85Yn@smtp.sendgrid.net:587';
	ServerSession.set('code', '');
	ServerSession.set('email', '');

	if (Codes.find({used: false}).count() == 0) {
		Email.send({
			from: 'info@homebuyerdiscounts.com',
			to: 'gibby@thinkx.net,hunter@thinkx.net',
			subject: 'HBD Radio Codes Used',
			text: 'All HBD Radio Codes are used.'
		});
	}
});

Kadira.connect('izh7ZbPvu9DYrc7in', 'b332b9e9-90c3-4416-abff-6d1674c1c621');