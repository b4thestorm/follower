chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    localStorage.setItem("followList" + request.counting, request.followers + '')

    if (request.command === 'counted-followers') {
      localStorage.setItem('followsGained', request.gainedFollowers['gainedFollowers'])
    }
    if (request.command === 'nuclear') {
      localStorage.setItem('lastSession', request.lastSession + '')
    }
  }
);
