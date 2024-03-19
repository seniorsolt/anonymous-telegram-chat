var SPREADSHEET_ID = "<YOUR_SPREADSHEET_ID>";
var BOT_TOKEN = "<YOUR_BOT_TOKEN>";
var WEB_APP_URL = "<YOUR_WEB_APP_URL>";

function doPost(e) {
  try {
      var Logger = BetterLog.useSpreadsheet(SPREADSHEET_ID);
      Logger.log(JSON.stringify(e));
      Darkside_connector_gen.doPost(e);
  } catch(err) {
        err = (typeof err === 'string') ? new Error(err) : err;
        var errorMessage = err.name || '' + ': ' + err.message || '' + ' (line ' + err.lineNumber || '' + ', file "' + err.fileName || '' + '"). Stack: "' + err.stack || '' + '" . While processing ';
        Logger.log(errorMessage);
  }
}

function setWebhook1() {
  var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/setWebhook?url=" + WEB_APP_URL);
  console.log(response.getContentText());
}

function deleteWebhook() {
  var response = UrlFetchApp.fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/deleteWebhook");
  console.log(response.getContentText());
}
