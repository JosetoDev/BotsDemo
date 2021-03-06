var  restify = require('restify');
var  builder = require('botbuilder');


//levantar el server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s', server.name, server.url);

});

//no te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

//ahora utilizaremos un Unversal Bot
var bot = new builder.UniversalBot(connector); 
server.post('/api/messages', connector.listen());

//dialogos
bot.dialog('/', [
    function(session){
        builder.Prompts.text(session, 'Como te llamas?');
    },
    function (session, results) {
        let msj = results.response;
        session.send(`hola: ${msj}!`);

        session.beginDialog('/preguntarLugar')
    },
    function(session, results){
        session.send(`Saludos para ${results.response}`)
    }
]);

bot.dialog('/preguntarLugar', [
    function(session){
        builder.Prompts.text(session, '¿Donde Estas?');
    },
    function (session, results) {        
        session.endDialogWithResult(results);
    } 
]);