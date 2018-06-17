const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");

const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("over the server", {type: "WATCHING"});

});
bot.on("guildMemberAdd", member => {
  console.log(`${member.id} just joined the server`);
  member.guild.channels.find("name", "welcome").send(`**Welcome To The Server ${member}**`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;





  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


if(cmd == `${prefix}test`)return  message.channel.send("test sucessful!");

  if(cmd ===`${prefix}info`){
    let sicon = message.guild.displayAvatarURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#990077")
    .setThumbnail(sicon)
    .addField("IP:", "The Servers IP is damagefactions.mc.gg")
    .addField("Forums:", "forums page is coming soon!")


    return message.channel.send(serverembed);
  }

 if(cmd === `${prefix}kick`){

   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

   if(!kUser) return message.channel.send(`User not found.`);
   let kReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("no permissions");

   let kembed = new Discord.RichEmbed()
   .setDescription("Kicked...")
   .setColor("ba0000")
   .addField("you have been kicked from Damage factions by:", `${message.author.username}`)
   .addField("kicked for:", kReason);

   message.guild.member(kUser).send(kembed).then(message.guild.member(kUser).kick(kReason));
   message.channel.send("kicked User");
   return;
 }
 if(cmd === `${prefix}ban`){

   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

   if(!bUser) return message.channel.send(`User not found.`);
   let bReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("no permissions");

   let bembed = new Discord.RichEmbed()
   .setDescription("You have Been banned")
   .setColor("#000000")
   .addField("you have been banned from Damage factions by:", `${message.author.username}`)
   .addField("banned for:", bReason);

   message.guild.member(bUser).send(bembed);
   message.guild.member(bUser).ban(bReason);
   message.channel.send("banned User");
   return;
 }
 if(cmd === `${prefix}warn`){
   let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));



   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("no permissions");
   let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
   if(!wUser) return message.channel.send("User not found");
   let reason = args.join(" ").slice(22);

   if(!warns[wUser.id]) warns[wUser.id] = {
     warns: 0
   };

   warns[wUser.id].warns++;

   fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
     if (err) console.log(err);
   });

   let wembed = new Discord.RichEmbed()
   .setDescription("Warning!")
   .setAuthor(message.author.username)
   .setColor("#FF0000")
   .addField("Warned For:", reason)
   .addField("This Is Warning no.", warns[wUser.id].warns);


  let warnchannel = message.guild.channels.find(`name`, "issues");
  if(!warnchannel) return message.channel.send("wheres the channel..")

   warnchannel.send(wembed);

   message.channel.send("***warned User***");

   return;
 }
 if(message.content.includes('abuse')){
   message.reply("stfu");
   return;
 }
 if(cmd === `${prefix}warns`){
  const fs = require("fs");

   let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("Couldn't find user");
    let warnlevel = warns[wUser.id].warns;
    if(!warnlevel) return message.channel.send("no warnings")

    message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);
   return;

 }

 if(cmd ===`${prefix}server`){
  let sicon = message.guild.displayAvatatURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Information")
  .setColor("#990077")
  .setThumbnail(sicon)
  .addField("IP:", "The Servers IP is damagefactions.mc.gg")
  .addField("Forums:", "forums page is coming soon!")


  return message.channel.send(serverembed);
}


  if(cmd === `${prefix}help`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Help & Commands")
    .setColor("#42eef4")
    .setThumbnail(bicon)
    .addField("Bot Name:", bot.user.username)
    .addField("Commands:",)
    .addField("-report:", "**-report** this command allows you to report players anonymously")
    .addField("-support:", "**-support** shows all the links for supporting the server.")
    .addField("-nick", `**-nick** allows you to change you're nickname eg: -nick example`)
    console.log(`${message.author.username} has just used -help`)

    return message.author.send(botembed), message.channel.send(`${message.author} sent you the help menu`);
  }

  if(cmd === `${prefix}report`) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Reason", rreason);

    let warnchannel = message.guild.channels.find(`name`, "issues");
    if(!warnchannel) return message.channel.send("wheres the channel..")

     warnchannel.send(reportEmbed);
    message.delete().catch(O_o=>{});

    console.log(`${message.author.username} has just used -report`)
    console.log(`${message.author.username} has just failed to ues used -report`.red)
    return;
  }
    if(cmd === `${prefix}helpreport`) {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let newhelp = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ba0000")
    .addField("Reporting a player:", "do -report @<Username> followed by the reason")
    .addField(" eg;", `-report ${message.author} Cussing`)
    .addField("if a bug", "if its a bug use @RedW0lfStoneYT for the player")

    return message.channel.send(newhelp);
    console.log(`${message.author.username} has just used -helpreport`)
  }
  if(cmd === `${prefix}support`) {
    let donate = new Discord.RichEmbed()
    .setDescription("Donate to support!")
    .setColor("#42f4b0")
    .addField("Please donate.", "donating helps keep DamageFactions up and also goes twoard updating the discordbot.")
    .addField("where can you donate?", "you can donate directly to the bot Dev here: https://www.paypal.me/RedWolfStoneYT")
    .addField("How can i keep the server up?", "you can help keep the server up by donating here: http://damagefactions.buycraft.net");

    return message.channel.send(donate);
  }

  if(cmd === `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("***you can not run this command.***");
    if(!args[0]) return message.channel.send("no sorry");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`cleared ${args[0]} messages`).then(msg => msg.delete(10));
    })
  }
  if(cmd === `${prefix}admin`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("you cant do this command sorry");
    let bicon = bot.user.displayAvatarURL;
    let adminembed = new Discord.RichEmbed()
    .setDescription("Help & Commands")
    .setColor("#42eef4")
    .setThumbnail(bicon)
    .addField("Bot Name:", bot.user.username)
    .addField("Commands:","(the things in ``<>`` must be added)")
    .addField("-clear <ammount>:", "Clears the chat (maximum of 99)")
    .addField("-kick <@DISCORDNAMD>", `kicks the mentioned uers eg: -kick ${message.author} listen ffs`)
    .addField("-ban <@DISCORDNAME>", `Bans user from the discord server eg: -ban ${message.author} dox thret`)
    .addField("-warn <@DISCORDNAME>", `warns user eg: -warn ${message.author} using -admin`)


    return message.author.send(adminembed), message.channel.send(`${message.author} sent you the list of admin commands`);
  }
  if(cmd === `#metalisgood`){
    let replies = ["#Metal-for-days.", "YEEESSSS!", "Yo RedW0lfStoneYT this person agrees."];
    let ans = Math.floor((Math.random() * replies.length));
    let agree = new Discord.RichEmbed()
    .setColor("#88695")
    .addField(`${message.author}`)
    .addField("all i have to say is...", replies[ans]);

    return message.channel.send(replies[ans]);
  }
  // if(cmd === `#metalisbad`){
  //   let replies = ["No #Metal-for-days.", "WHYYYY!", `-warn ${message.author} GRRRR!`, "Yo RedW0lfStoneYT this person is being a bully.", "I understand you have your opinion but please dont let RedW0lfStoneYT know about this."];
  //   let ans = Math.floor((Math.random() * replies.length));
  //   console.log(`${message.author.id} said metal is bad DDOS NOW!`)
  //   let agree = new Discord.RichEmbed()
  //   .setColor("#88695")
  //   .addField(`${message.author}`)
  //   .addField("all i have to say is...", replies[ans]);
  //
  //   return message.channel.send(replies[ans]);
  // }
  bot.on('guildMemberAdd', member => {
    member.guild.channels.get('channelID').send("Welcome");
  });
//   // if(cmd === `${prefix}NEWBOT:`){
//   // let bName = args.join(" ");
//   // let bFeat = args.join(" ").slice(15-26);      //let rreason = args.join(" ")
//   // let bWhy = args.join(" ").slice(30);
//   // let bot = new Discord.RichEmbed()
//   // .setDescription("Bot idea By:")
//   // .setColor("#ba0000")
//   //  .addField("Idea By", `${message.author}`)
//   //  .addField("Name:")
//   //  .addField("Features:", bFeat)
//   //  .addField("Why:", bWhy);
//   //
//   //  message.channel.send(bot)
//
//
// }
if (message.content.startsWith ("-nick")) {
  let nUser = message.member;
  let guildMember = message.guild.member(nUser);
  let nick = args.join(" ").slice(0, 15);
  if(!nUser) return message.channel.send("no User.")
  guildMember.setNickname(nick);
  return message.channel.send(`**changed your nick name to...** *"${nick}"*`);
        }
  if(cmd === `${prefix}hmmm`){
    let images = ["https://bit.ly/2ISKBkf", "https://bit.ly/2kzeBTT", "https://preview.ibb.co/i2Gs8J/image_22.jpg", "https://preview.ibb.co/bx7cay/image_21.jpg", "https://preview.ibb.co/gg4eoJ/image_20.jpg", "https://preview.ibb.co/g0GQTJ/image_19.jpg", "https://preview.ibb.co/mtiiFy/image_18.jpg", "https://preview.ibb.co/jmA8hd/image_17.jpg", "https://preview.ibb.co/hqeOFy/image_16.jpg", "https://preview.ibb.co/nnQ8hd/image_15.jpg", "https://preview.ibb.co/kgsX8J/image_13.jpg", "https://preview.ibb.co/cRgQTJ/image_12.jpg", "https://preview.ibb.co/hmQxay/image_11.jpg", "https://preview.ibb.co/j3zOFy/image_10.jpg", "https://preview.ibb.co/dbQxay/image_9.jpg", "https://preview.ibb.co/jtxX8J/image_8.jpg", "https://preview.ibb.co/iLY5TJ/image_7.jpg", "https://image.ibb.co/k5QkTJ/image_6.jpg", "https://preview.ibb.co/eEPZNd/image_5.jpg"];
    let ans = Math.floor((Math.random() * images.length));

    var embed = new Discord.RichEmbed()
    .setImage(images[ans]);

    message.author.send(embed);
    message.delete().catch(O_o=>{});
    return;
  }
  if(cmd === `${prefix}poll`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("this is a Admin command");
    let question = args.join(" ").slice(0, 18);
    let info = args.join(" ").slice(18);
    let poll = new Discord.RichEmbed()
    .setDescription("Should We Add:")
    .setColor("#8cffe6")
    .addField(question, info);

    let pchannel = message.guild.channels.find(`name`, "poll")

    pchannel.send(poll)
  }
});


bot.login(botconfig.token);
