const Discord = require('discord.js')
const { Client, Partials } = require('discord.js')
const client = new Client({ intents: 131071, partials: Object.values(Partials).filter(x => typeof x === "string"), shards: 'auto' })
const { botid, token } = require("./ayarlar.json")
require("./slash")(client)
const db = require("croxydb")
db.setReadable(true)
const axios = require('axios');
const cheerio = require('cheerio');
const discordModals = require('discord-modals')
discordModals(client);
// * ETİKETE TEPKİ
client.on('messageCreate', async message => {

    const embedetiket = new Discord.EmbedBuilder()
    .setColor('Blue')
    .setDescription(`**/yardım** Komutu ile Komutlarımı Görebilirsiniz`)
    if (message.content === `<@${botid}>`) {
      message.channel.send({ embeds: [embedetiket] })
    }

})

//setup

client.on('modalSubmit', (modal, message) => {
  if(modal.customId === 'riotid') {
    const id = modal.getTextInputValue('nick')
    const lasturl = id.replace(" ", "%20")
    const lasturl1 = lasturl.replace("#", "%23")

    const url = "https://tracker.gg/valorant/profile/riot/"+ lasturl1 +"/overview"
    axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);
      
  
      const firstStatValue = $('.stat__value').first().text();
      console.log(firstStatValue)

      const { EmbedBuilder } = require('discord.js');
      const exampleEmbed = new EmbedBuilder()
      .setTitle(`Başarılı!`)
      .addFields(
        { name: `Riot ID:`, value: id },
        { name: `Rank:`, value: firstStatValue },
      )
      .setDescription(`Artık kefo'yu kullanarak takım arkadaşları edinebilirsin.`)
      .setColor("Blurple")
      modal.reply({ embeds: [exampleEmbed] }).catch(err => console.log(err))
      db.set(`rank_${modal.member.id}`, firstStatValue)
      db.set(`riotid_${modal.member.id}`, id)
      db.push(`${firstStatValue[0]}${firstStatValue[1]}_oyuncular`, modal.member.id)
  
    })
    .catch(error => {
      //console.error('Hata:', error);
      modal.reply("Hesabını tracker.gg'ye bağlaman gerekiyor.")
    })
  }
})

// ! TOKEN
client.login(token)