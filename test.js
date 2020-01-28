function randomFollowInterval(time) {
  return Math.floor(Math.random() * parseInt(time,10)) * 1000
}

function bigFollow(handles, settings) {
  var base = "https://www.instagram.com/"
  const urlList = handles
  var count = 0;
  var list = urlList.map(x => base + x);
//open the first url and cache the window object reference
  const win = window.open(list[0] + "/?count=" + count, "_blank");
//stats tracker
  var followCount = urlList.length;
  var privateFollow = [];
  var followed = [];

//variable for keeping track of array position(urls)
var i = 1;

var int = setInterval(() => {
  // update the location with next array value
  var button = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button");
  if (!button) {
    button = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > button");
  }
  if (!button) {
  //if account is private click private button
   if (win.document.querySelector('#react-root > section > main > div > div > article > div._4Kbb_._54f4m > div > h2')) {
      var number_post = win.document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span").innerHTML
      if (Number(number_post) > 0) {
        var private_button = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > button");
        privateFollow.push(win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > h1").innerHTML);
        private_button.click();
        count = count + 1
      } else {
        console.log(private_button);
      }
   } else if (win.document.querySelector("body > div > div.page.-cx-PRIVATE-Page__body.-cx-PRIVATE-Page__body__ > div > div > h2")) {
      console.log(button);
   }
  } else if (button.innerHTML == 'Following') {
    console.log(button);
  } else if (button.innerHTML == 'Follow') {
    //if account is public click follow
      var numberPost = win.document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span").innerHTML
      if (Number(numberPost) > 0) {
        followed.push(win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > h1").innerHTML);
        button.click();
        count = count + 1
     } else {
       console.log(button);
     }
  }

  win.location = list[i] + "/?count=" + count;
  //check value of i and increment, if reached the max value then clear the interval
  if (i++ >= 67) {
     clearInterval(int)
     console.log("followed:" + count )
     // //send message to update Followed
     // chrome.runtime.sendMessage({
     //  lastFollowed: Date.now()
     // });
     // chrome.storage.sync.set({'count': count}, function (){
     //   alert('finished with success');
     // })
   }
}, 10000)
}

first = [
"techsofcolor",
"quikliq_",
"blackequitynetwork",
"nailzbyheav",
"black_nasdaq",
"bri_vs_tay",
"thebrandingfactory_",
"techbosslady",
"blackownedsuccessstory",
"mojoknowz",
"tck_zone",
"officialblackla",
"fisiontech",
"mrmindphul",
"brielaura_photovideo",
"brielaurahope",
"kristinaxwill",
"socriss_hon",
"blackequitynetwork",
"black_nasdaq",
"blacknasdaqproductions",
"cjtech_",
"tech_commander",
"techforourculture",
"coolblknerd",
"enlightenapp18",
"drtooley",
"cartercreationspublishinghouse",
"urban_revolution",
"fedup.co",
"trafficsalesandprofit",
"3rdgeers"
]


bigFollow(first)
