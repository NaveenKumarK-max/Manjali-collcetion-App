cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-x-socialsharing.SocialSharing",
      "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
      "pluginId": "cordova-plugin-x-socialsharing",
      "clobbers": [
        "window.plugins.socialsharing"
      ]
    },
    {
      "id": "cordova-sms-plugin.Sms",
      "file": "plugins/cordova-sms-plugin/www/sms.js",
      "pluginId": "cordova-sms-plugin",
      "clobbers": [
        "window.sms"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-nativestorage.mainHandle",
      "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
      "pluginId": "cordova-plugin-nativestorage",
      "clobbers": [
        "NativeStorage"
      ]
    },
    {
      "id": "cordova-plugin-nativestorage.LocalStorageHandle",
      "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
      "pluginId": "cordova-plugin-nativestorage"
    },
    {
      "id": "cordova-plugin-nativestorage.NativeStorageError",
      "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
      "pluginId": "cordova-plugin-nativestorage"
    },
    {
      "id": "cordova-plugin-apprate.AppRate",
      "file": "plugins/cordova-plugin-apprate/www/AppRate.js",
      "pluginId": "cordova-plugin-apprate",
      "clobbers": [
        "AppRate",
        "window.AppRate"
      ]
    },
    {
      "id": "cordova-plugin-apprate.locales",
      "file": "plugins/cordova-plugin-apprate/www/locales.js",
      "pluginId": "cordova-plugin-apprate",
      "runs": true
    },
    {
      "id": "cordova-plugin-apprate.storage",
      "file": "plugins/cordova-plugin-apprate/www/storage.js",
      "pluginId": "cordova-plugin-apprate",
      "runs": true
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    },
    {
      "id": "cordova-plugin-nativegeocoder.NativeGeocoder",
      "file": "plugins/cordova-plugin-nativegeocoder/www/NativeGeocoder.js",
      "pluginId": "cordova-plugin-nativegeocoder",
      "clobbers": [
        "nativegeocoder"
      ]
    },
    {
      "id": "cordova-plugin-request-location-accuracy.RequestLocationAccuracy",
      "file": "plugins/cordova-plugin-request-location-accuracy/www/android/RequestLocationAccuracy.js",
      "pluginId": "cordova-plugin-request-location-accuracy",
      "clobbers": [
        "cordova.plugins.locationAccuracy"
      ]
    },
    {
      "id": "cordova-plugin-googleplus.GooglePlus",
      "file": "plugins/cordova-plugin-googleplus/www/GooglePlus.js",
      "pluginId": "cordova-plugin-googleplus",
      "clobbers": [
        "window.plugins.googleplus"
      ]
    },
    {
      "id": "cordova-plugin-cashfree-pg.CFPaymentGateway",
      "file": "plugins/cordova-plugin-cashfree-pg/dist/CFPaymentGateway.js",
      "pluginId": "cordova-plugin-cashfree-pg",
      "clobbers": [
        "CFPaymentGateway"
      ]
    }
  ];
  module.exports.metadata = {
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "6.0.4",
    "cordova-sms-plugin": "1.0.4",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-nativestorage": "2.3.2",
    "cordova-plugin-apprate": "1.8.0",
    "cordova-plugin-geolocation": "4.1.0",
    "cordova-plugin-nativegeocoder": "3.5.1",
    "cordova-plugin-request-location-accuracy": "2.3.0",
    "cordova-plugin-googleplus": "8.5.2",
    "cordova-plugin-cashfree-pg": "1.0.6"
  };
});