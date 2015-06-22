Template.home.helpers({
	availableCodes: function () {
		return Codes.find({used: false}).count();
	}
	// shareData: function () {
	// 	return{
	// 		title: "Free Membership at HomeBuyer Discounts",
	// 		author: "HomeBuyer Discounts",
	// 		article: "website",
	// 		site_name: "HomeBuyer Discounts"
	// 	}
	// }
});

Template.thanks.helpers({
	theCode: function () {
		if(ServerSession.get('code').length > 0){
			return ServerSession.get('code');
		}
	}
});