
// Extract the required classes from the discord.js module
const { Client, Attachment, RichEmbed  } = require('discord.js');

// Import the native fs module
const fs = require('fs');

// Create an instance of a Discord client
const client = new Client();
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    client.user.setActivity('faire de la merde', { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
    console.log('I am ready!');
});

// -------------------------------------------------------------------- -> Envoie une réponse si le message est [..]
client.on('message', message => {
    // console.log(message);
    // If the message is '!memes'
    if (message.content === '!bot.js') { //--------------------------------------- -> Renvoie le dossier bot.js
        // Get the buffer from the 'memes.txt', assuming that the file exists
        const buffer = fs.readFileSync('./bot.js');
        const attachment = new Attachment(buffer, 'bot.js');
        // Send the attachment in the message channel with a content
        message.channel.send(`${message.author}, here are your bot.js!`, attachment);
    }
// -------------------------------------------------------------------- -> Renvoie 'Au secours !' au message 'Jeanne'
    // If the message is "ping"
    if (message.content === '!Jeanne') {
        // Send "pong" to the same channel
        message.channel.send('Au secours !');
    }
// -------------------------------------------------------------------- -> Renvoie le profil de l'auteur au message '?'
    // If the message is "!status"
    if (message.content === '!status') {

        var user, id, imageURL, createdAt, img, tag, idAvatar, typingSinceIn, lastMessage, userNote, presence, dateNow;

        typingSinceIn = message.author.typingSinceIn;
        user = message.author.username;
        id = message.author.id;
        imageURL = message.author.avatarURL;
        createdAt = message.author.createdAt;
        dateNow = new Date();
        var localDateNow = dateNow.toLocaleDateString();
        tag = message.author.tag;
        lastMessage = message.author.lastMessage;
        userNote = message.author.note;
        presence = message.author.presence;
        // img = 'https://images-ext-1.discordapp.net/external/fJSqIxkkqWr58zwlHVWlVs_5fmJREdKY2LMOWwdlH1E/%3Fwidth%3D268%26height%3D473/https/media.discordapp.net/attachments/333923963485028362/628907790609416193/474f0bb.jpg';
        // idAvatar = message.author.avatar;

        const embed = new RichEmbed()
            // Set the title of the field
            .setTitle('Profil utilisateur')
            .setThumbnail(imageURL)
            .addField('Pseudo', user)
            .addField('ID de l\'utilisateur', id)
            .addField('Lien image de profil', imageURL)
            .addField('Date d\'aujourd\'hui ', localDateNow)
            .addField('Compte créé le', createdAt)
            .addField('Tag Discord', tag)
            .addField('Last message', lastMessage)
            .addField('User\'s note', userNote)
            .addField('Status', presence)
            .setTimestamp(typingSinceIn)
            .setColor(0xFF0000)
            // .setImage(img)
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
// -------------------------------------------------------------------- -> Renvoie un message privé à l'auteur de la commande !help
    if (message.content === '!help') {
        message.author.send('Vous avez utilisé la commande !help.' +
            'Voici donc la liste des commandes que je suis capable d\'utiliser :   \n\n'+
            '!help  : Envoi un message privé à l\'auteur avec les commandes du bot.  \r' +
            '!Jeanne : Retourne un phrase défini à l\'auteur. \r' +
            '!status : Retourne quelques éléments du status de l\'auteur. \r' +
            '!bot.js : Retourne le fichier bot.js de Rayleigh à l\'auteur. \r')
            .then(message => console.log(`Sent message: ${message.content}`))
            .catch(console.error);

        // message.author.send(message.guild.name);
    }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NjI4OTA5ODc3MTcwOTI5NjY1.XZSJvQ.x_WrWXzC65_nb4T0_p2gvCul9gg');