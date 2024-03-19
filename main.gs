var botToken1 = "<YOUR_BOT_TOKEN>";
var chatID1 = "<YOUR_CHAT_ID1>";
var chatID2 = "<YOUR_CHAT_ID2>";
var logfileID = "<YOUR_LOGFILEID>";
var key = "mesIds"; // Unique key for your script properties

function createProperties() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var data = {
    "from1to2": {},
    "from2to1": {},
  };
  scriptProperties.setProperty(key, JSON.stringify(data));
  //Logger.log(scriptProperties.getProperty(key));
}

function showProperties() {
  var scriptProperties = PropertiesService.getScriptProperties();
  //Logger.log(scriptProperties.getProperty(key));
}

function doPost(e) {
  try {
    Logger = BetterLog.useSpreadsheet(logfileID);
    var update = JSON.parse(e.postData.contents);
    if ('channel_post' in update) {
      //Logger.log("doPost -> channel post in update");
      var channelPost = update.channel_post; 
      var messageID = channelPost.message_id;
      var chatID = update.channel_post.sender_chat.id;
      //Logger.log("chatID=%s, chatID1=%s, chatID2=%s", chatID, chatID1, chatID2);
      if ("reply_to_message" in channelPost) {
        if (chatID == chatID1) {
              //Logger.log("sending reply to channel 2");
              var textAndComment = "M: " + update.channel_post.text;  // "M" means men, my channels had gender division
              forwardReplytoChannel2(messageID, channelPost.reply_to_message.message_id, textAndComment); 
        } else if (chatID == chatID2) {
              //Logger.log("sending reply to channel 1");
              var textAndComment = "W: " + update.channel_post.text;  // "W" means women, my channels had gender division
              forwardReplytoChannel1(messageID, channelPost.reply_to_message.message_id, textAndComment);  
        }
      } else if (chatID == chatID1) {
          //Logger.log("sending message to channel 2");
          var textAndComment = "M: " + update.channel_post.text; // "M" means men, my channels had gender division
          forwardMessagetoChannel2(messageID, textAndComment); 
      } else  if (chatID == chatID2) {
          var textAndComment = "W: " + update.channel_post.text; // "W" means women, my channels had gender division
          //Logger.log("sending message to channel 1");
          forwardMessagetoChannel1(messageID, textAndComment);  
      }
    }
  } catch (err) {
    err = (typeof err === 'string') ? new Error(err) : err;
    Logger.log('%s: %s (line %s, file "%s"). Stack: "%s" . While processing %s.', err.name || '',
      err.message || '', err.lineNumber || '', err.fileName || '', err.stack || '', '');
  }
}

function forwardMessagetoChannel1(message_Id1, textAndComment) {
  var apiUrl = "https://api.telegram.org/bot" + botToken1 + "/copyMessage";
  // Prepare the payload
  var payload = {
    'method': 'post',
    'payload': {
      'chat_id': chatID1,
      'from_chat_id': chatID2,  // Same chat for forwarding within the same chat
      'message_id': message_Id1,
      'disable_notification': true,  // Optional: Disable notification
      'allow_sending_without_reply': true,  // Optional: Allow sending without a reply
    }
  };
  var response = UrlFetchApp.fetch(apiUrl, payload);
  var responseData = JSON.parse(response.getContentText());
  var message_Id2 = responseData.result.message_id;
  editMessage(chatID1, message_Id2, textAndComment);
  storeMessageMapping2(message_Id1, message_Id2);
}


function forwardMessagetoChannel2(message_Id1, textAndComment) {
  var apiUrl = "https://api.telegram.org/bot" + botToken1 + "/copyMessage";
  var payload = {
    'method': 'post',
    'payload': {
      'chat_id': chatID2,
      'from_chat_id': chatID1,  // Same chat for forwarding within the same chat
      'message_id': message_Id1,
      'disable_notification': true,  // Optional: Disable notification
      'allow_sending_without_reply': true,  // Optional: Allow sending without a reply
    }
  };
  var response = UrlFetchApp.fetch(apiUrl, payload);
  var responseData = JSON.parse(response.getContentText());
  var message_Id2 = responseData.result.message_id;
  editMessage(chatID2, message_Id2, textAndComment);
  storeMessageMapping1(message_Id1, message_Id2);
}


function forwardReplytoChannel1(message_Id1, repliedMessageId1, textAndComment) {
  var apiUrl = "https://api.telegram.org/bot" + botToken1 + "/copyMessage";
  var scriptProperties = PropertiesService.getScriptProperties(); // Correctly define scriptProperties
  var cache = scriptProperties.getProperty(key);
  var cacheData = JSON.parse(cache);
  var repliedMessageId2 = cacheData.from2to1[repliedMessageId1];
  //Logger.log("sending message from 1 channel to 2, repliedMessageId1 = %s, repliedMessageId2 = %s", repliedMessageId1, repliedMessageId2 );

  // Prepare the payload
  var payload = {
    'method': 'post',
    'payload': {
      'chat_id': chatID1,
      'from_chat_id': chatID2,  // Same chat for forwarding within the same chat
      'message_id': message_Id1,
      'disable_notification': true,  // Optional: Disable notification
      'allow_sending_without_reply': true,  // Optional: Allow sending without a reply
      'reply_to_message_id': repliedMessageId2,
    }
  };
  var response = UrlFetchApp.fetch(apiUrl, payload);
  var responseData = JSON.parse(response.getContentText());
  var message_Id2 = responseData.result.message_id;
  editMessage(chatID1, message_Id2, textAndComment);
  storeMessageMapping2(message_Id1, message_Id2);
}


function forwardReplytoChannel2(message_Id1, repliedMessageId1, textAndComment) {
  var apiUrl = "https://api.telegram.org/bot" + botToken1 + "/copyMessage";
  var scriptProperties = PropertiesService.getScriptProperties(); // Correctly define scriptProperties
  var cache = scriptProperties.getProperty(key);
  var cacheData = JSON.parse(cache);
  var repliedMessageId2 = cacheData.from1to2[repliedMessageId1];
  //Logger.log("sending message from 2 channel to 1, repliedMessageId1 = %s, repliedMessageId2 = %s", repliedMessageId1, repliedMessageId2 );

  // Prepare the payload
  var payload = {
    'method': 'post',
    'payload': {
      'chat_id': chatID2,
      'from_chat_id': chatID1,  // Same chat for forwarding within the same chat
      'message_id': message_Id1,
      'disable_notification': true,  // Optional: Disable notification
      'allow_sending_without_reply': true,  // Optional: Allow sending without a reply
      'reply_to_message_id': repliedMessageId2,
    }
  };
  var response = UrlFetchApp.fetch(apiUrl, payload);
  var responseData = JSON.parse(response.getContentText());
  var message_Id2 = responseData.result.message_id;
  editMessage(chatID2, message_Id2, textAndComment);
  storeMessageMapping1(message_Id1, message_Id2);
}


function storeMessageMapping1(mesId1, mesId2) {
  var scriptProperties = PropertiesService.getScriptProperties(); // Correctly define scriptProperties
  var cache = scriptProperties.getProperty(key);
  var cacheData;
  if (cache) {
    cacheData = JSON.parse(cache);
  } else {
    cacheData.from1to2 = {};
    cacheData.from2to1 = {};
  }
  cacheData.from1to2[mesId1] = mesId2;
  cacheData.from2to1[mesId2] = mesId1;
  scriptProperties.setProperty(key, JSON.stringify(cacheData));
}


function storeMessageMapping2(mesId1, mesId2) {
  var scriptProperties = PropertiesService.getScriptProperties(); 
  var cache = scriptProperties.getProperty(key);
  var cacheData;
  if (cache) {
    cacheData = JSON.parse(cache);
  } else {
    cacheData.from1to2 = {};
    cacheData.from2to1 = {};
  }
  cacheData.from2to1[mesId1] = mesId2
  cacheData.from1to2[mesId2] = mesId1;
  scriptProperties.setProperty(key, JSON.stringify(cacheData));
}


function editMessage(chatId, messageId, newText) {
  var apiUrl = "https://api.telegram.org/bot" + botToken1 + "/editMessageText";
  var payload = {
    'method': 'post',
    'payload': {
      'chat_id': chatId,
      'message_id': messageId,
      'text': newText,
    }
  };
  UrlFetchApp.fetch(apiUrl, payload);
}

