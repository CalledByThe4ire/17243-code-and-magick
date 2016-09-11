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
  }
};
