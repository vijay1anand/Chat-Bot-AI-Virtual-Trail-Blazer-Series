var restify = require('restify');
var builder = require('botbuilder');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
    
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());



// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);


//Root Dialog execute when user gives any input
bot.dialog("/",[
	function(session)
	{
		builder.Prompts.text(session,"Please enter your name.");
	},
	function(session,results)
	{
		session.userData.name=results.response;
		builder.Prompts.text(session,"Please enter your city.");
	},
	function(session,results)
	{
		session.userData.city=results.response;
		builder.Prompts.text(session,"Please enter your company name.");
	},
	function(session,results)
	{
		session.userData.company=results.response;
	    session.send("Information entered by you:\n\n Name : "+session.userData.name+"\nCity : "+session.userData.city+"\ncompany : "+session.userData.company);
	}
	]);

