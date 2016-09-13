'use strict';

module.exports = {
  /**
   * Продлевает цепочку прототипов,
   * записывая в св-во __proto__ объекта childObj
   * ссылку на объект parentObj
   * @param {Object} childObj
   * @param {Object} parentObj
   */
  inherit: function(childObj, parentObj) {
    childObj.prototype = Object.create(parentObj.prototype);
  },
  /**
   * Выполняет функцию fn не чаще одного раза в указанный в параметре delay период,
   * даже если она будет вызвана неоднократно в течение указанного периода
   * @param {Function} fn
   * @param {Number} delay
   * @return {Function}
     */
  throttle: function(fn, delay) {
    var thisMoment = 0;
    return function() {
      if ( Date.now() - thisMoment > delay ) {
        fn();
        thisMoment = Date.now();
      }
    };
  }
};
