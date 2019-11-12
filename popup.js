document.addEventListener('DOMContentLoaded', function() {
   var params = {}
   var followSpeed;
   var maxPerDay;
   var daysUnfollow;
   var followHandle;
   var myHandle;


  var els = document.getElementsByClassName('tabcontent');
  els[0].style.display = 'block';
///////////////////////////////////////////////////////////////////////////////////////
  function tabToggle(event) {
    var els = document.getElementsByClassName('tabcontent');
    for(var i = 0; i < els.length; i++) {
      els[i].style.display = 'none';
    }
    document.getElementById(event.target.id + '-1').style.display = "block"
  }

  document.getElementById('follows').addEventListener('click', function(event){
    tabToggle(event)
  });

  document.getElementById('unfollows').addEventListener('click', function(event){
    tabToggle(event)
  });
///////////////////////////////////////////////////////////////////////////////////////

   if (chrome.storage.sync.get('count', function(data) { data['count'] })) {
     document.getElementById('followed').innerHTML = chrome.storage.sync.get('count', function(data) { data['count'] })
   } else {
     document.getElementById('followed').innerHTML = 0;
   }

   document.getElementById('follow').addEventListener('click', function(event) {
    followSpeed = document.getElementById('followSpeed').value
    maxPerDay = document.getElementById('maxPerDay').value
    followHandle = document.getElementById('followHandle').value
    var url = 'https://www.instagram.com/' + followHandle

      params['follow'] = followSpeed
      params['max'] = maxPerDay
      params['handle'] = followHandle
      params['redirect_url'] = url
      params['command'] = 'follow'

    //should be stored in Google Chrome api storage
     chrome.storage.sync.set({'settings': params});
   //sets up values and takes us to a page to start grabbing follower
     // window.open('https://www.instagram.com/' + params['handle'], '_blank');
     // var url = 'https://www.instagram.com/' + params['handle']
     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, params);
      });
    });

    //count followers gained
    document.getElementById('update').addEventListener('click', function(event){
      chrome.storage.sync.get('count', function(data) {
        var follow = document.getElementById("followed")
        follow.innerHTML = data['count'];
      })
    })

    document.getElementById('unfollow').addEventListener('click', function(event){
      myHandle = document.getElementById('myHandle').value
      params['command'] = 'unfollow';
      params['myHandle'] = myHandle;
      //passing command to start unfollow if on current window
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         chrome.tabs.sendMessage(tabs[0].id, params);
      });
    })

/////////// populate values

    var followWindow = document.querySelector('textarea');
    var followers;
    chrome.storage.sync.get('followList', function(data) {
      followers = data['followList'];
    });
    if (followers !== 'undefined') {
     followWindow.innerHTML = followers;
   } else {
     followWindow.innerHTML = 'no one has been followed yet';
   }


});
