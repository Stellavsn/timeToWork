const { SlashCommandBuilder } = require('@discordjs/builders');
  
module.exports= {
    data: new SlashCommandBuilder()
        .setName('moveme')
        .setDescription('Moving you !'),
    
        async execute(interaction) {
            // Logique de commande pour déplacer l'utilisateur dans un autre canal
            try {
                // Afficher l'ID du canal vocal cible
                const targetChannelId = '1234843539544866856'; // Remplacez 'ID_DU_NOUVEAU_CANAL' par l'ID du canal où vous souhaitez déplacer l'utilisateur
                console.log('Trying to move member to channel with ID:', targetChannelId);
    
                // Déplacer l'utilisateur dans le canal vocal cible
                await interaction.member.voice.setChannel(targetChannelId); 
                setTimeout(()=> {
                    VoiceChannel.updateOverwrite(message.author,{
                        CONNECT : null
                    });
                }, 3600000);
                
                // Répondre à l'interaction avec un message de confirmation
                await interaction.reply('You have been moved!');
            } catch (error) {
                // Gérer les erreurs et envoyer un message d'erreur à l'utilisateur
                console.error('Error while moving member:', error);
                await interaction.reply({ content: 'There was an error while moving you!', ephemeral: true });
            }
        },
    };

   