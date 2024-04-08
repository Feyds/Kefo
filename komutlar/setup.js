const Discord = require('discord.js')
const { SlashCommandBuilder } = require('discord.js')
const puppeteer = require('puppeteer')

module.exports = {
    slash: true,                                //true Değeri Komutun Slash Olduğunu Gösteriyor
    yetki: 'SendMessages',                    //Kullanıcının Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    botyetki: 'Administrator',                 //Botun Hangi Yetkiye Sahip Olması Gerektiğini Gösteriyor
    cooldown: 5,                               //Komutun CoolDown Süresini(Saniye) Gösteriyor

    data: new SlashCommandBuilder()             //Slash Komut Oluşturma Alanı
    .setName('setup')
    .setDescription('setup'),
    /*
    .addStringOption(option =>
        option
            .setName('seçenek')
            .setDescription('Seçenek açıklaması')
            .setRequired(false)
    ),*/
    async execute(client, interaction) {        //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin
        

        const modal = new Discord.ModalBuilder()
        .setCustomId('riotid')
        .setTitle('Kefo Setup')

        const nick = new Discord.TextInputBuilder()
        .setCustomId('nick')
        .setLabel('Riot ID')
        .setPlaceholder("ANC Feyd#feyds")
        .setStyle(Discord.TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(45)

        const actionrow = new Discord.ActionRowBuilder().addComponents(nick)

        modal.addComponents(actionrow)

        await interaction.showModal(modal);
    }
}