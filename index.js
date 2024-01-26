const { Client, Intents } = require('discord.js');
const { token, serverId, voiceChannelId } = require('./settings.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.on('ready', () => {
    console.log(`Eingeloggt als ${client.user.tag}`);

    // Status
    client.user.setActivity('auf NiraV', { type: 'PLAYING' });

    

    // Rufe die Funktion updateMemberCount beim Start auf
    updateMemberCount();
    
    // Aktualisierungsintervall
    setInterval(updateMemberCount, 10 * 60 * 1000);
});

client.login(token);

// Member Counter Aktualisieren
function updateMemberCount() {
    const guild = client.guilds.cache.get(serverId);
    
    if (!guild) {
        console.error('Server nicht gefunden.');
        return;
    }

    const memberCount = guild.memberCount;

    const channel = guild.channels.cache.get(voiceChannelId);

    if (channel && channel.type === 'GUILD_VOICE') {
        channel.setName(`👥 │Mitglieder: ${memberCount}`)
            .then(updatedChannel => console.log(`Aktualisierter Kanalname: ${updatedChannel.name}`))
            .catch(error => console.error(`Fehler beim Aktualisieren des Kanalnamens: ${error}`));
    } else {
        console.error('Voice-Channel nicht gefunden oder ist kein GUILD_VOICE-Channel.');
    }
}
function updateMemberCount() {
    const guild = client.guilds.cache.get(serverId);
    
    if (!guild) {
        console.error('Server nicht gefunden.');
        return;
    }

    const memberCount = guild.memberCount;

    const channel = guild.channels.cache.get(voiceChannelId);

    if (channel && channel.type === 'GUILD_VOICE') {
        // Leere die Caches vor dem Setzen des Kanalnamens
        client.channels.fetch(channel.id).then(ch => {
            ch.setName(`🔉 │Mitglieder: ${memberCount}`)
                .then(updatedChannel => console.log(`Aktualisierter Kanalname: ${updatedChannel.name}`))
                .catch(error => console.error(`Fehler beim Aktualisieren des Kanalnamens: ${error}`));
        }).catch(error => console.error(`Fehler beim Abrufen des Kanals: ${error}`));
    } else {
        console.error('Voice-Channel nicht gefunden oder ist kein GUILD_VOICE-Channel.');
    }
}




