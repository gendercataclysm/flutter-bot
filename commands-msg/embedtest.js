const { EmbedBuilder } = require('discord.js');

    module.exports = {
        name: 'embedtest',
            async execute(client, message){
                const exampleEmbed = new EmbedBuilder() //creates an instance of an embed
                .setColor(0x0099FF) //the embed sidebar color
             .setTitle('LOOK MY INFO NOWWWWW') //the title of the embed
             .setURL('https://viith3cat.carrd.co') //makes the title a clickable link
             .setAuthor({ name: 'disaster', iconURL: 'https://cdn.discordapp.com/attachments/937136487659606078/1087490785605324850/Tumblr_l_244239114075004.jpg', url: 'https://viith3cat.carrd.co' })
             //Sets an author tab above the title | name: text | iconURL: a link to the image of the author | url: makes the title clickable, with a link specified
             .setDescription('lorem ipsum yadda yadda')
                .setThumbnail('https://cdn.discordapp.com/attachments/937136487659606078/1087490785605324850/Tumblr_l_244239114075004.jpg')
                //Thumbnail is an image link right next to the title and description
                .addFields( //can parse either an array or what is shown below
                    { name: 'Regular field title', value: 'Some value here' }, // basic title-value combo
                    { name: '\u200B', value: '\u200B' }, //displays as nothing
                    { name: 'Inline field title', value: 'Some value here', inline: true }, //inline field (displays next to toehr inline fields)
                    { name: 'Inline field title', value: 'Some value here', inline: true }, //inline field 
                    { name: 'Inline field title', value: 'Some value here', inline: true }, //inline field
             )
             .setImage('https://cdn.discordapp.com/attachments/937136487659606078/1087757311726063626/Bfg.png') //big big image at bottom of embed
             .setTimestamp()
             .setFooter({ text: 'Some footer text here', iconURL: 'https://cdn.discordapp.com/attachments/937136487659606078/1087490785605324850/Tumblr_l_244239114075004.jpg' });
              //text all the way at the bottom of the embed | text: string | iconURL: picture
    
        message.channel.send({ embeds: [exampleEmbed] });
    },
};