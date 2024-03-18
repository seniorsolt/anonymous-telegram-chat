# Anonymous telegram chat

At the time of publication on March 18, 2024, Telegram does not have a built-in anonymous chat function. 
The Darkside Bot is a Telegram bot designed to facilitate anonymous communication between users without the need to use fake accounts.


How It Works
Telegram privides a function of anonymous posting by channel's admin. So we use it to imitate anonymous chat. 
When a channel administrator posts a message in one of the channels, the bot captures this message and relays this message to the other channel, ensuring that the message appears to come from the bot itself, thus maintaining the anonymity of the original poster.

![photo_2023-11-11_17-42-31](https://github.com/seniorsolt/anonymous-telegram-chat/assets/102902511/4767421b-a004-4f54-be39-da9210fd7648)

Setup 

Setup is a bit tricky considering that this bot created just for fun, but I tried to make a detailed description.
1. Create a new bot and obtain the bot token.
2. Create two Telegram channels and add your bot as an administrator to both.
3. Setup Google Sheets and Logger:
Create a Google Spreadsheet and navigate to Extensions -> Apps Script. Enable the BetterLog library (1DSyxam1ceq72bMHsE6aOVeOl94X78WCwiYPytKi7chlg4x5GqiNXSw0l) to log messages in the spreadsheet.
Insert the code from the file named “entry.gs”. Replace the placeholder in Logger = BetterLog.useSpreadsheet("<Your Spreadsheet ID>") with your Google Spreadsheet ID, which can be found in the URL of your spreadsheet. Replace the token = "<Your Bot Token>" placeholder with the token of your bot obtained from BotFather.
