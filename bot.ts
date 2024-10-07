import { Bot, InlineKeyboard } from "grammy";
import { BOT_TOKEN } from './secrets/bot_token.js';
import { GetTimeAndZone, GetTimeInCountry } from './getTime.js'
import { timeZoneAndCountry, Country } from './timeZonesList.js'

//Create a new bot
const bot = new Bot(BOT_TOKEN);
const local_time = new Date();
const timeWithZone = GetTimeAndZone();


bot.command("time", async(ctx) => ctx.reply(`It's ${timeWithZone}`));
bot.command("time_details", async(ctx) => ctx.reply(`It's ${local_time}`))

bot.on("message", async(ctx) => {
  console.log(ctx.message); // => @botname

  const botUsername = `@TimeSync`;

    // Checking if the message includes a mention of the bot
  if (ctx.message.text && ctx.message.text.includes(botUsername)) {
    const textAfterMention = ctx.message.text.trim().replace(`${botUsername}`, '').trim();
      
    // Get the first word after the mention
    const firstWord = textAfterMention.split(' ')[0] as Country; // THIS MIGHT REQUIRE REVAMP
    if (firstWord in timeZoneAndCountry) {
      const timeZone = timeZoneAndCountry[firstWord];
      const currentTime = GetTimeInCountry(timeZone);

      ctx.reply(`The time for ${firstWord} is ${currentTime}`);
    } else {
      ctx.reply(`No time zone found for ${firstWord}. Please check the country name.`);
    }
  }
});

// TODO
// function time_zone_sync(user_time, user_country, list_of_countries_to_convert_for)


//This function would be added to the dispatcher as a handler for messages coming from the Bot API
bot.on("message", async (ctx) => {
  //Print to console
  console.log(
    `${ctx.from.first_name} wrote ${
      "text" in ctx.message ? ctx.message.text : ""
    }`,
  );
});


//Start the Bot
bot.start();
