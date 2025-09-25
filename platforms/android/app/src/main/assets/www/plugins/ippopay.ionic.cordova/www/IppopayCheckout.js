cordova.define("ippopay.ionic.cordova.IppopayCheckout", function(require, exports, module) {
var IppopayCheckout = module.exports = {
  open: function (options, successCallback, errorCallback) {
    if (successCallback) {
      IppopayCheckout.callbacks['payment.success'] = function (response) {
        successCallback(response.transaction_id);
      }
    }

    if (errorCallback) {
      IppopayCheckout.callbacks['payment.cancel'] = errorCallback;
    }

    cordova.exec(
      IppopayCheckout.pluginCallback,
      IppopayCheckout.pluginCallback,
      'Checkout',
      'open',
      [
        JSON.stringify(options)
      ]
    );
  },

  pluginCallback: function (response) {
    if (JSON.parse(response)['success']) {
      IppopayCheckout.callbacks['payment.success'](response);
    }
    else {
      IppopayCheckout.callbacks['payment.cancel'](response);
    }
  },

  callbacks: {},

  on: function (event, callback) {
    if (typeof event === 'string' && typeof callback === 'function') {
      IppopayCheckout.callbacks[event] = callback;
    }
  },

  onResume: function (event) {
    if (event.pendingResult && event.pendingResult.pluginServiceName === 'Checkout') {
      IppopayCheckout.pluginCallback(event.pendingResult.result);
    }
  }
};

});
