const { SlashCommandBuilder } = require('@discordjs/builders');
    module.exports= {
        data: new SlashCommandBuilder()
            .setName('moveme')
            .setDescription('Move me to another channel for a specified time')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('The channel where you want to be moved')
                    .setRequired(true))
            .addIntegerOption(option =>
                option.setName('duration')
                    .setDescription('The duration in minutes for how long you want to be moved')
                    .setRequired(true)),
        async execute(interaction) {
            const targetChannel = interaction.options.getChannel('channel');
            const duration = interaction.options.getInteger('duration');
    
            const member = interaction.member;
    
            if (!member.voice.channel) {
                return interaction.reply('You need to be in a voice channel to use this command.');
            }
    
            const originalChannel = member.voice.channel;
    
            await member.voice.setChannel(targetChannel);
            await interaction.reply(`You have been moved to ${targetChannel.name} for ${duration} minutes.`);
    
            const endTime = Date.now() + duration * 60 * 1000;
    
            // Function to keep the user in the target channel
            const keepInChannel = async () => {
                if (Date.now() < endTime) {
                    if (member.voice.channel && member.voice.channel.id !== targetChannel.id) {
                        await member.voice.setChannel(targetChannel);
                    }
                    setTimeout(keepInChannel, 5000);
                } else {
                    await member.voice.setChannel(originalChannel);
                    interaction.followUp(`You have been moved back to ${originalChannel.name}.`);
                }
            };
    
            keepInChannel();
        }
    };
