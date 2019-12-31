document.addEventListener('DOMContentLoaded', function() {
   var params = {}
   var followSpeed;
   var maxPerDay;
   var daysUnfollow;
   var followHandle;
   var myHandle;
   var url;
   var follow;
   var followers;
   var followWindow;
   var authToken;
   var counting;

   if (localStorage.getItem('followGroupCount') === null) {
     localStorage.setItem('followGroupCount', 0)
   }

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

  document.getElementById('followNoOne').addEventListener('click', function(event){
    tabToggle(event)
  })
///////////////////////////////////////////////////////////////////////////////////////
 function setCurrentFollowGroup() {
  if (Number(localStorage.getItem('followGroupCount')) === 0) {
    localStorage.setItem('followGroupCount', 1)
  } else {
     var number = Number(localStorage.getItem('followGroupCount'))
     if (number < 4) {
       localStorage.setItem('followGroupCount', number + 1) //won't go over 3
     } else if (number === 4) {
       localStorage.setItem('followGroupCount', 1)
     }
  }
 }

 function selectedGroup(groupName) {
   var radios = Array.prototype.slice.call(document.getElementsByName(groupName))
   var selected = []
   radios.forEach(function(radio) {
     if (radio.checked === true) {
       selected.push(radio)
     }
  })
  return selected[0].value
 }


   if (chrome.storage.sync.get('count', function(data) { data['count'] })) {
     document.getElementById('followed').innerHTML = chrome.storage.sync.get('count', function(data) { data['count'] })
   } else {
     document.getElementById('followed').innerHTML = 0;
   }

   if (localStorage.getItem('followsGained') !== null) {
     document.getElementById('followGained').innerHTML = localStorage.getItem('followsGained')
   } else {
     document.getElementById('followGained').innerHTML = 0
   }

   document.getElementById('follow').addEventListener('click', function(event) {
    setCurrentFollowGroup();
    followSpeed = document.getElementById('followSpeed').value
    maxPerDay = document.getElementById('maxPerDay').value
    followHandle = document.getElementById('followHandle').value
    counting = localStorage.getItem('followGroupCount')
    url = 'https://www.instagram.com/' + followHandle

      params['follow'] = followSpeed
      params['max'] = maxPerDay
      params['handle'] = followHandle
      params['redirect_url'] = url
      params['counting'] = counting
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
    chrome.storage.sync.get('count', function(data) {
      follow = document.getElementById("followed")
        if (data['count'] === undefined) {
          follow.innerHTML = 0
        } else {
          follow.innerHTML = data['count'];
        }
    })

    document.getElementById('update').addEventListener('click', function(event){
      //whatever global variable counting is currently set to.
      params = {'command': 'count-follows', 'listNumber': selectedGroup('gainGroup')}
      if (counting !== 0) {
        chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, params)
        })
      }
    })

    function lastFollowTime(timeAgo) {
      if (timeAgo === null) {
        return 0 + 'mins ago'
      }

      var timeDifference =  Date.now() - timeAgo
      var time = Math.floor(timeDifference/3600000);
      if (time < 1 ) {
        time = Math.floor((timeDifference/1000)/60);
        return time + 'mins ago'
      } else if (time >= 1) {
        if (time === 1) {
          return time + 'hour ago'
        } else {
          return time + 'hours ago'
        }
      } else {
         return 0 + 'mins ago'
      }
    }

    function fillRecentWindow(counter) {
      followWindow = document.querySelector('textarea');
      followers  = localStorage.getItem('followList' + counter)

      if (followers !== null) {
       followWindow.innerHTML = followers;
     } else if (followers === null) {
       followWindow.innerHTML = 'no one has been followed yet';
     }
    }

     var unfollowRadios = document.getElementsByName('unfollowGroup');
     for (radio in unfollowRadios) {
       unfollowRadios[radio].onclick = function() {
         time = localStorage.getItem('lastFollowed' + this.value)
         document.getElementById('lastFollowed').innerHTML = lastFollowTime(time)
         fillRecentWindow(this.value)
       }
     }

     //returns the time group limit
     //grabs the time from localStorage and sets it to lastfollowed innerHTML
     function selectedGroupLimit() {
       var group1 = document.getElementById('grp1');
       var group2 = document.getElementById('grp2');
       var group3 = document.getElementById('grp3');
       var list;

       if (group1.checked === true) {
         list = localStorage.getItem('followList1')
         // time = localStorage.getItem('lastFollowed1')
         // document.getElementById('lastFollowed').innerHTML = lastFollowTime(time)
       } else if (group2.checked === true) {
         list = localStorage.getItem('followList2')
         // time = localStorage.getItem('lastFollowed2')
         // document.getElementById('lastFollowed').innerHTML = lastFollowTime(time)
       } else if (group3.checked === true) {
         list = localStorage.getItem('followList3')
         // time = localStorage.getItem('lastFollowed3')
         // document.getElementById('lastFollowed').innerHTML = lastFollowTime(time)
       }
      return list.split(',').length
     }



     function quantityUnFollow() {
       var limit = selectedGroupLimit();
       var userLimit = Number(document.getElementById("toUnfollow").innerHTML)
       if (userLimit > limit) {
          return limit
       } else if (userLimit > 0 && userLimit < limit){
          return userLimit
       } else {
          return limit
       }
     }

    document.getElementById('clrgrp').addEventListener('click', function(event) {
      var group1 = document.getElementById('grp1');
      var group2 = document.getElementById('grp2');
      var group3 = document.getElementById('grp3');
      var list;
      params = {'command': 'clear group', 'listNumber': selectedGroup('unfollowGroup')}

      if (group1.checked === true) {
        localStorage.removeItem('followList1')
        params['listNumber'] = '1'
      } else if (group2.checked === true) {
        localStorage.removeItem('followList2')
        params['listNumber'] = '2'
      } else if (group3.checked === true) {
        localStorage.removeItem('followList3')
        params['listNumber'] = '3'
      }

      chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, params)
      })
    })

    document.getElementById('unfollow').addEventListener('click', function(event){
      params['listCount'] = selectedGroup('unfollowGroup');
      params['quantityUnfollow'] = quantityUnFollow();
      params['command'] = 'unfollow';
      //params['myHandle'] = myHandle;
      //passing command to start unfollow if on current window
      if (params['quantityUnfollow'] > 0) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
           chrome.tabs.sendMessage(tabs[0].id, params);
        });
      } else {
       alert('No one to unfollow yet')
      }
    })

  document.getElementById('nuclear-option').addEventListener('click', function(tabs) {
    params['command'] = 'nuclear';
    params['handle'] = document.getElementById('myHandle').value
    var timeNow = Math.floor(Date.now())
    var lastSession  = Math.floor(localStorage.getItem('lastSession')) + 3600000
    // if (timeNow > lastSession) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, params);
      })
    // }
  })

  //TODO: fix time counter for lastSession
    if (localStorage.getItem('lastSession') !== null ) {
      var unixTime = localStorage.getItem('lastSession')
      document.getElementById('lastSession').innerHTML = lastFollowTime(unixTime)
    }


/////Installation stuff

    chrome.identity.getAuthToken({'interactive': true}, function(token) {
      var license;
      var CWS_LICENSE_API_URL = 'https://www.googleapis.com/chromewebstore/v1.1/userlicenses/';
      var req = new XMLHttpRequest();
          req.open('GET', CWS_LICENSE_API_URL + chrome.runtime.id);
          req.setRequestHeader('Authorization', 'Bearer ' + token);
          req.setRequestHeader('Content-Type', 'application/json')

          req.onreadystatechange = function() {
            if (req.readyState == 4) {
              license = JSON.parse(req.responseText);
              //verifyAndSaveLicense(license);
              var timeOfInstall = parseInt(license.createdTime);
              var accessLevel = license.accessLevel;

              var trialEndDate = timeOfInstall + 604800000;
              var now = Math.floor(Date.now());

              if (accessLevel === 'FREE' && now < trialEndDate) {
                console.log('You are on a free trial')
              } else if (accessLevel === 'FREE' && now > trialEndDate) {
                chrome.tabs.executeScript({
                  code: "window.location.href = 'https://chrome.google.com/webstore/detail/instagarden/eoifihmcbclogfdfodgaonbfiaemmokj'"
                });
              } else if (accessLevel === 'FULL') {
                console.log('you have a full account');
              }

             console.log(license);
            }
          }
         req.send();



    });






});
//chrome://identity-internals/
