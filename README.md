# Anonymous telegram chat

At the time of publication on March 18, 2024, Telegram does not have a built-in anonymous chat function. 
The Darkside Bot is a Telegram bot designed to facilitate anonymous communication between users without the need to use fake accounts.


## How It Works
Telegram privides a function of anonymous posting by channel's admin. So we use it to imitate anonymous chat. 
When a channel administrator posts a message in one of the channels, the bot captures this message and relays this message to the other channel, ensuring that the message appears to come from the bot itself, thus maintaining the anonymity of the original poster.
The maximum number of admins in one channel = 50. We combine two channels, so we get 100 potential chat participants.
Replies is supported by tracking and matching messages ID.

<img src="https://private-user-images.githubusercontent.com/102902511/313987180-288a3522-de68-41a6-8b17-92cf737df9a1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTA4MzkwMTIsIm5iZiI6MTcxMDgzODcxMiwicGF0aCI6Ii8xMDI5MDI1MTEvMzEzOTg3MTgwLTI4OGEzNTIyLWRlNjgtNDFhNi04YjE3LTkyY2Y3MzdkZjlhMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMzE5JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDMxOVQwODU4MzJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02YTAwYjBmMWY0MjhhMDBmNzUxMWIyMTk0OWI0YTMwMTgwM2JlZTcyZGE5ODVmNmNkM2I2NmExYWNkYThlZDYwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.DCUumBRSStpsnrDTKHcYDfBU3AVhZ6ujDHeIX9bnmlU" width="500" />


## Setup 

Setup is a bit tricky considering that this bot created just for fun, but I've tried to make instruction as detailed as possible. However, as a result you will get tg bot with free hosting from google! 
The code is divided into 2 parts - entry and main. Entry part will be deployed as a web app to get updates from tg. The Main part will be deployed as a library so you won't need to make a new deployment to enable last changes. Just push a save button.

1. Create a new bot and obtain the bot token.
2. Create two Telegram channels and add your bot as an administrator to both.
3. Create a Google Spreadsheet and navigate to Extensions -> Apps Script. Enable the BetterLog library (1DSyxam1ceq72bMHsE6aOVeOl94X78WCwiYPytKi7chlg4x5GqiNXSw0l) for logging.
4. Insert the code from the file named “entry.gs”. Replace the Logger line with your Google Spreadsheet ID found in the spreadsheet's URL.
5. Replace the placeholder in token = "<Your Bot Token>" with your bot's token.
6. At https://script.google.com/home, create another App Script not linked to the Google Spreadsheet. Insert the content from the “main.gs” file. Enable the BetterLog library from Step 3. Fill in your bot's token in botToken1 and your Google Spreadsheet ID in logfileID. Select and execute the "createProperties" function to create cache store.
7. Start a new deployment, choose Library as the type, and grant all requested permissions.
8. Navigate to the project settings to copy the script identifier (looks like 1NZ6fnXLmQcvsgD2ESz4VSWp9sj8HbSRdpQskL402M8m0ohVrkJyycPcY).
9. In the spreadsheet-linked script (entry), enable the library with the identifier from Step 8. For the "Identifier*" field, you use Darkside_connector_gen.
10. Deploy again as in Step 7, but choose Web Application. After deployment, copy the script's URL and use it in the setWebhook1 function. Execute setWebhook1.
11. Test by posting a message in either channel and check the Google Spreadsheet for a log entry.
12. From the log, extract the chat ID and insert it into the ChatID1 field in the secondary script for the first channel. Repeat for the second channel and insert its ID into ChatID2
13. Periodically clear the script's properties created through createProperties to prevent exceeding Google's quota.
