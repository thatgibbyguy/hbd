Meteor.methods({
	grabCode: function(email,codeAvailable){

		unusedCodeId = '';

		if(Codes.find({used: false}).count() > 1){
			var unusedCode = Codes.findOne({used: false});
			
			unusedCodeId = unusedCode._id;
			actualCode = unusedCode['code'];
			
			Codes.update({'_id':unusedCodeId},{$set:{used:true}});

		}

		People.insert({
			"email":email,
			"code":actualCode,
			"hasCode":codeAvailable,
			"url":ServerSession.get('url')
		});

		ServerSession.set('code', actualCode);
		ServerSession.set('email',email);
	},
	emailCode: function(){

		var emailHead = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Congratulations! You have been gifted a free annual membership to HomeBuyer Discounts!</title>',
				emailCSS = '<style>#outlook a{padding:0}body{width:100%!important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0}.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}#backgroundTable{margin:20px auto;padding:0;max-width:600px;width:100%!important;line-height:100%!important;border:6px solid #63AD99;background-image:url(http://thinkx.net/clients/certificate.jpg);background-repeat:no-repeat;background-position:50% 15%}img{outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}a img{border:none}.image_fix{display:block}p{margin:1em 0}table td{border-collapse:collapse}table{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}@media only screen and (max-device-width:480px){a[href^=tel],a[href^=sms]{text-decoration:none;color:#63AD99;pointer-events:none;cursor:default}.mobile_link a[href^=tel],.mobile_link a[href^=sms]{text-decoration:default;color:#63AD99!important;pointer-events:auto;cursor:default}}@media only screen and (min-device-width:768px) and (max-device-width:1024px){a[href^=tel],a[href^=sms]{text-decoration:none;color:#00f;pointer-events:none;cursor:default}.mobile_link a[href^=tel],.mobile_link a[href^=sms]{text-decoration:default;color:orange!important;pointer-events:auto;cursor:default}}</style>',
				emailBody = '</head><body><table cellpadding="0" cellspacing="0" border="0" id="backgroundTable"> <tr> <td valign="top"><table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center"> <div width="100%"><img src="http://thinkx.net/clients/present.jpg" style="margin-top:20px;"></div> <div style="color:#FFF; background-color:#1A2B46; text-indent:-9999px; background-image:url("http://thinkx.net/clients/congratulations.jpg"); width:308px; height:34px; margin-top:20px; margin-bottom:20px;text-indent:-9999px;"></div> </td> </tr> <tr> <td valign="top" align="center"> <p style="font-family: Helvetica, sans-serif; color:#888888; font-size: 24px;">You have been gifted a</p><span style="color:#1A2B46; font-size: 36px; font-family: Helvetica, sans-serif; font-weight:bold; line-height:40px;">Free Annual Membership to HomeBuyer Discounts!</span></p> </td> </tr> </table><hr width="80%"><table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td valign="top" align="center"><p style="font-family: Helvetica, sans-serif; color:#888888; font-size: 24px; font-style:italic; margin-bottom:5px;">Given by:</p><span data-query="realtorName" style="color:#63AD99; font-size: 36px; font-family: Helvetica, sans-serif; font-weight:bold; line-height:40px;">HomeBuyer Discounts</span></td></tr>',
				emailBodyNoCode = '</head><body><table cellpadding="0" cellspacing="0" border="0" id="backgroundTable"> <tr> <td valign="top"><table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td align="center"> <div width="100%"><img src="http://thinkx.net/clients/present.jpg" style="margin-top:20px;"></div> <div style="color:#FFF; background-color:#1A2B46; text-indent:-9999px; background-image:url("http://thinkx.net/clients/congratulations.jpg"); width:308px; height:34px; margin-top:20px; margin-bottom:20px;text-indent:-9999px;"></div> </td> </tr> <tr> <td valign="top" align="center"> <p style="font-family: Helvetica, sans-serif; color:#888888; font-size: 24px; line-height:1.2em;">You' + "'ve" + ' been added to </p><span style="color:#1A2B46; font-size: 36px; font-family: Helvetica, sans-serif; font-weight:bold; line-height:1.2em;">HomeBuyer Discounts Email List!</span></p> </td> </tr> </table><hr width="80%"><table cellpadding="0" cellspacing="0" border="0" align="center"><tr><td valign="top" align="center"><p style="font-family: Helvetica, sans-serif; color:#888888; font-size: 24px; font-style:italic; margin-bottom:5px; line-height:1.2em;">You will now be up to date with the latest at HomeBuyer Discounts.</p></td></tr>',
				emailCode =  '<tr><td valign="top" align="center"> <p style="font-family: Helvetica, sans-serif; color:#888888; font-size: 16px; line-height:20px;">To complete your membership,<br/>visit <a href="https://homebuyerdiscounts.com/homeowner-signup" target ="_blank" title="Homeowner Signup" style="font-weight:bold; color:#63AD99; text-decoration:none;">HomeBuyerDiscounts.com/Homeowner-Signup</a><br/>and enter the redemption code below:</p><span data-query="redemptionCode" style="font-family: Helvetica, sans-serif; color:#1A2B46; font-size: 16px; line-height:20px;">Redemption Code:' + ServerSession.get('code') + '</span></td></tr>',
				emailNoCode = '<tr><td valign="top" align="center"> <p style="font-family: Helvetica, sans-serif; color:#888888; font-size: 16px; line-height:20px;">Keep in touch for exciting new deals!<br/>Visit <a href="https://homebuyerdiscounts.com/homeowner-signup" target ="_blank" title="Homeowner Signup" style="font-weight:bold; color:#63AD99; text-decoration:none;">HomeBuyerDiscounts.com/Homeowner-Signup</a></td></tr>'
				emailClose = '<tr><td height="20px;">&nbsp;</td></tr></table> <table cellpadding="0" cellspacing="0" border="0" align="center" id="footer" bgcolor="#F0F1F1"><tr><td colspan="3" height="10px;">&nbsp;</td></tr><tr><td width="250px" valign="middle" align="center"><a href="http://HomeBuyerDiscounts.com" target="_blank" title="website"><img src="http://thinkx.net/clients/hbd_logo.jpg"></a></td> <td width="2px" valign="top" align="center" style="background-color:#888888;"></td><td width="30px" valign="top" align="center">&nbsp;</td><td width="318px" valign="top" align="left" style="font-family: Helvetica, sans-serif; color:#888888; font-size: 16px; line-height:20px;"><p class="mobile_link"><img src="http://thinkx.net/clients/phone_icon.jpg" alt="Phone" title="Phone" width="23px" height="23px" style="vertical-align:sub; margin-right:10px;"/>225-928-4119</p><p><img src="http://thinkx.net/clients/email_icon.jpg" style="vertical-align:sub; margin-right:10px;"><a href="mailto:info@homebuyerdiscounts.com" title="Email" style="color:#888888; text-decoration:none;">Info@HomeBuyerDiscounts.com</a></p><p><img src="http://thinkx.net/clients/location_icon.jpg" style="vertical-align:sub; margin-right:10px;">1500 Lobdell Avenue, Suite A<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Baton Rouge, LA 70806</p></td></tr><tr><td colspan="4" height="10px;">&nbsp;</td></tr> <tr><td colspan="4" height="10px;" style="background-color:#1A2B46;" align="center"><a href="http://HomeBuyerDiscounts.com" target="_blank" title="website" style="color:#FFF; font-size: 20px; font-family: Helvetica, sans-serif; font-weight:bold; line-height:40px; letter-spacing:2px; text-decoration:none;">HOMEBUYERDISCOUNTS.COM</a></td></tr></table></td></tr></table></body></html>';

		if (ServerSession.get('code') == '') {
			console.log('blank');
		}
		if(ServerSession.get('code') != '' && ServerSession.get('email') != ''){
			Email.send({
				from: 'info@homebuyerdiscounts.com',
				to: ServerSession.get('email'),
				subject: 'Your Free HomeBuyer Discounts Membership',
				html: emailHead + emailCSS + emailBody + emailCode + emailClose
			});

			console.log('sent with code');
		}
		if(ServerSession.get('code') == '' && ServerSession.get('email') != ''){
			Email.send({
				from: 'info@homebuyerdiscounts.com',
				to: ServerSession.get('email'),
				subject: 'Your Free HomeBuyer Discounts Membership',
				html: emailHead + emailCSS + emailBodyNoCode + emailNoCode + emailClose
			});

			console.log('sent without code');
		}

	}
});