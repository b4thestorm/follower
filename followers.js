//this is a content script -  need to exchange messages from content script and background script

function unfollow(request) {
  var handles;
  var followingButton;
  var startTimeout;
  var base = "https://www.instagram.com/"

  if (request.command === 'unfollow') {
    handles = localStorage.getItem('followList'+ request.listCount)
    handles = handles.split(',').slice(0,request.quantityUnfollow)
  }

  if (request.command === 'nuclear') {
    handles = request['unfollowPayload']
  }

  const win = window.open(base + handles[0] + '/', "_blank");
  var i = 1;
  var interval = setInterval(function(){
    //check that the button says 'Following'
    followingButton = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button");
    if (followingButton === null) {
      followingButton = win.document.querySelector("#react-root > section > main > div > header > section > div.nZSzR > button");
    }

    if (followingButton.innerHTML === 'Following') {
      followingButton.click();

      startTimeout = setTimeout(function(){
        alert('was successful');
        }, 100);
      clearTimeout(startTimeout)

      win.document.querySelector("body > div.RnEpo.Yx5HN > div > div > div.mt3GC > button.aOOlW.-Cab_").click()
    }

     win.location = base + handles[i];
     if (i++ > handles.length - 1) {
      //localStorage.setItem('followList', followList)
      if (request.command === 'nuclear') {
        chrome.runtime.sendMessage({
         lastSession: Date.now(),
         command: 'nuclear'
        });
      }

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
  if (i++ >= Number(settings['max'])) {
     clearInterval(int)
     console.log("followed:" + count )
     //send message to update Followed
     chrome.runtime.sendMessage({
      lastFollowed: Date.now()
     });
     chrome.storage.sync.set({'count': count}, function (){
       alert('finished with success');
     })
   }
}, 30000)
}

function countFollows(listNumber) {
  var base = "https://www.instagram.com/"
  var count = 0;
  var followGained = 0
  var handles = localStorage.getItem('followList' + listNumber)
   if (handles === null) {
     return alert('No list to Follow');
   } else {
     handles = handles.split(",")
   }
  var params = {'gainedFollowers': 0, 'command': 'counted-followers'}

  if (handles === undefined) {
    return console.log('no followed list')
  }

  var urlList = handles.map(handle => base + handle + "/");
  const win = window.open(urlList[0], "_blank");
  var clearLoop = setInterval(() => {
    if (win.document.querySelector('#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button') !== null) {
      if (win.document.querySelector('#react-root > section > main > div > header > section > div.nZSzR > div.Igw0E.IwRSH.eGOV_._4EzTm > span > span.vBF20._1OSdk > button').innerHTML === 'Follow Back') {
        params['gainedFollowers'] = followGained++
      }
    }

     win.location = urlList[count]
     if (count++ >= handles.length - 1) {
       console.log(params)
       chrome.runtime.sendMessage({
        gainedFollowers: params
       });
      clearInterval(clearLoop)
     }
  }, 3000)
}

 function grabFollowing() {
   var scrollCount = 1000;
   document.querySelector('#react-root > section > main > div > header > section > ul > li:nth-child(3) > a').click()
   var cancel = setInterval(function(){
       document.querySelector('body > div.RnEpo.Yx5HN > div > div.isgrP').scroll({
         top: scrollCount,
         left: 0,
         behavior: 'smooth'
       })
       scrollCount = scrollCount + 150
   }, 3000) }

 function cleanPayload(list, quantity) {
   var humanPayload = Array.from(list)
   var cleaned = humanPayload.map(x => x.innerText.split('\n')[0]);
   cleaned = cleaned.slice(0, Number(quantity))
   return cleaned
 }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request['command'] === 'follow') {
    if (window.location.href.includes(request['handle'])) {
    console.log(request) //{follow: "15", max: "100", days: "1", handle: "mr.sanders", redirect_url: "https://www.instagram.com/mr.sanders"}
    document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(2) > a").click()
    var scrollCount = 1000;
    var numberOfFollowers = 0;
    var checkFollowers = 0;
    var done = false;
    var followerPayLoad;
    localStorage.setItem('followList', [])  //reset follow list  TODO: Change reset follow list
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
        checkFollowers = document.querySelectorAll('body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div > li')
        followerPayLoad = cleanPayload(checkFollowers, request['max'])
        localStorage.setItem('followList' + request['counting'], followerPayLoad + '')

       //send followers to background
        chrome.runtime.sendMessage({
          followers: followerPayLoad,
          counting: request['counting']
        });
        //start following
        bigFollow(followerPayLoad, request);
        // copy(cleanPayload)
      }
    }
    }, 3000);
  } else if (window.location.href.includes(request['handle']) === false) {
      alert('please try again from: www.instagram.com/' + request['handle'])
   }
  } else if (request['command'] === 'unfollow') {

      unfollow(request);

  } else if (request['command'] === 'count-follows') {

      countFollows(request.listNumber);
  } else if (request['command'] === 'clear group') {
      //clear cache for list
      localStorage.removeItem('followList' + request.listNumber)
  } else if (request['command'] === 'nuclear') {
    //TODO: make it say, hey you have to be on some url
    if (window.location.href.includes(request.handle)) {
      document.querySelector('#react-root > section > main > div > header > section > ul > li:nth-child(3) > a').click();
      var sCount = 1000;
      var nfollowers = 0;
      var cFollowers = 0;
      var done = false;
      //scrolling
      var cancel = setInterval(function(){
        document.querySelector('body > div.RnEpo.Yx5HN > div > div.isgrP').scroll({
          top: sCount,
          left: 0,
          behavior: 'smooth'
       });

      sCount = sCount + 150
      cFollowers = document.querySelectorAll('body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div > li').length
      if (cFollowers > 100) {
        done = true
        clearInterval(cancel)
        if (done){
          cFollowers = document.querySelectorAll('body > div.RnEpo.Yx5HN > div > div.isgrP > ul > div > li')
          var unfollowerPayLoad = cleanPayload(cFollowers, 100)
          request['unfollowPayload'] = unfollowerPayLoad
          unfollow(request)
        }
      }
    }, 3000);
   }
  }
 });

// }




  //capturing data
