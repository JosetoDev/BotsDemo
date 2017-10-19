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
    function(session, results, next){
        builder.Prompts.text(session, 'Como te llamas?');
    },
    function (session, results) {
        session.dialogData.nombre = results.response;
        builder.Prompts.number(session, `Ok: ${session.dialogData.nombre}. cual es tu edad?`);
    },
    function(session, results){
        session.dialogData.edad = results.response;
        builder.Prompts.time(session, 'que hora es?');
    },
    function(session, results){
        session.dialogData.hora =builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.choice(session, 'cual prefieres?', 'Mar|Montaña', { listStyle: builder.ListStyle.button });
    },
    function(session, results){
        session.dialogData.preferencia = results.response.entity;
        builder.Prompts.confirm(session, 'quieres ver un resumen?', { listStyle: builder.ListStyle.button });
    },
    function(session, results){
        if(results.response){
            session.endDialog(`me contaste que tu nombre es **${session.dialogData.nombre}**, tienes **${session.dialogData.edad}** años, etc`);
        }
        else {
            session.endDialog('Adios');
        }
    }
]);

