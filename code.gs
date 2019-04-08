//程式參考 http://www.pre-practice.net/2018/08/line-botliff.html
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("index")
                    .addMetaTag("viewport", "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0")
                    //頁面採用RWD設計，必須加上addMetaTag('viewport', 'width=device-width, initial-scale=1')才能讓手機上有RWD的效果
                    // https://developers.google.com/apps-script/reference/html/html-output#addMetaTag(String,String)
                    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
                    // 讓頂端灰色Warning Banner消失的解決方案 https://issuetracker.google.com/issues/63521070#comment33
                    // https://developers.google.com/apps-script/reference/html/html-output#setxframeoptionsmodemode
}


var CHANNEL_ACCESS_TOKEN = "13b69ebd3194432002bf135047c422bd";

//註冊LIFF app的設定方式 https://developers.line.biz/en/docs/liff/registering-liff-apps/
var appId = "你自己在LINE Developer的Messaging API註冊的LIFF URL";

function doPost(e) {
  var contents = e.postData.contents;
  var obj = JSON.parse(contents)
  var events = obj["events"];
  for(var i = 0; i < events.length; i++){
    if(events[i].type == "message"){
      reply_message(events[i]);
    }
  }
}

function reply_message(e) {
  if (e.message.type == "text") {
    if (e.message.text == "hello") {
  var postData = {
    "replyToken" : e.replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : appId
      }
    ]
  };
  }
  var options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(postData)
  };
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
  }
}