//this is a content script -  need to exchange messages from content script and background script
// document.addEventListener('DOMContentLoaded', function() {
function unfollow(settings) {
  var base = "https://www.instagram.com/"
  debugger
  var handles = chrome.storage.sync.get('followList') //make sure thid returns a value
  console.log(handles)
  const win = window.open(base + handles[0] + '/', "_blank");
  var i = 1;

  var interval = setInterval(function(){
    //check that the button says 'Following'
     var followingButton = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button").click();

       var startTimeout= setTimeout(function(){
          alert('was successful');
       }, 100);
       clearTimeout(startTimeout)
       //supposedly runs after 61secs
       win.document.querySelector("body > div.RnEpo.Yx5HN > div > div > div.mt3GC > button.aOOlW.-Cab_").click()
       //remove unfollowed handle
       
     win.location = base + handles[i];
     if (i++ > 2) {
      clearInterval(interval)
     }
  }, 60000)
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
  if (i++ >= Number(settings['max']) - 1) {
     clearInterval(int)
     console.log("followed:" + count )
     //send message to update Followed
     chrome.storage.sync.set({'count': count}, function (){
       alert('finished with success');
     })
   }
}, 30000)
}

//## Click button to start scraping followers
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if (request['command'] === 'follow') {
    console.log(request) //{follow: "15", max: "100", days: "1", handle: "mr.sanders", redirect_url: "https://www.instagram.com/mr.sanders"}
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a").click()
    var scrollCount = 1000;
    var numberOfFollowers = 0;
    var checkFollowers = 0;
    var done = false;

    //scrolling
    var cancel = setInterval(function(){
      document.querySelector('body > div.RnEpo.Yx5HN > div > div.isgrP').scroll({
        top: scrollCount,
        left: 0,
        behavior: 'smooth'
     });

    scrollCount = scrollCount + 150
    checkFollowers = document.querySelectorAll('body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div > li').length

    //TODO: change checkFollowers to settings variable
    if (checkFollowers > Number(request['max'])){
      done = true;
      clearInterval(cancel)
      //capture followers
      if (done) {
        humanPayload = document.querySelectorAll('body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div > li')
        humanPayload = Array.from(humanPayload)
        cleanPayload = humanPayload.map(x => x.innerText.split('\n')[0]);

        //save then use the payload to kick off bigfollow
        chrome.storage.sync.set({'followList': cleanPayload}, function (){
          console.log("successfully set");
        });
        //start following
        bigFollow(cleanPayload, request);
        // copy(cleanPayload)
      }
    }
    }, 3000);
  } else if (request['command'] === 'unfollow') {
    unfollow();
  }

});




// }




  //capturing data

// });
