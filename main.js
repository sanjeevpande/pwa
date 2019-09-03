(function() {
'use strict';

const Installer = function(root) {
  let promptEvent;

  const install = function(e) {
    if(promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice
        .then(function(choiceResult) {
          promptEvent = null;
          root.classList.remove('available');
        })
        .catch(function(installError) {
          promptEvent = null;
          root.classList.remove('available');
        });
    }
  };

  const installed = function(e) {
    promptEvent = null;
    root.classList.remove('available');
  };

  const beforeinstallprompt = function(e) {
    promptEvent = e;
    promptEvent.preventDefault();
    root.classList.add('available');
    return false;
  };

  // function displayNotification() {
  //   if (Notification.permission == 'granted') {
  //     navigator.serviceWorker.getRegistration().then(function(reg) {
  //       reg.showNotification('Hello world!');
  //     });
  //   }
  // }

  window.addEventListener('beforeinstallprompt', beforeinstallprompt);
  window.addEventListener('appinstalled', installed);

  root.addEventListener('click', install.bind(this));
  root.addEventListener('touchend', install.bind(this));

  Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        reg.showNotification('Hello world!');
      });
    }
  });


};

window.addEventListener('load', function() {
  const installEl = document.getElementById('installer');
  const installer = new Installer(installEl);
});
})();
