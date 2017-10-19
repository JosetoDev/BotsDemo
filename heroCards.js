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
       var heroCard = new builder.HeroCard(session)
            .title('esta es una tarjeta tipo hero card')
            .subtitle('Este es el subtitulo')
            .text('siga a jose en Twitter: @josetobenito')
            .images([
                builder.CardImage.create(session,
                    'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')                
                ])
            .buttons([
                    builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Aprende')
                ]);
    
        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(heroCard);
        session.send(msj);
    }      
]);