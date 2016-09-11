'use strict';
/**
 * Конструктор класса BaseComponent
 * @param {HTMLElement} el
 * @constructor
 */
var BaseComponent = function(el) {
  this.element = el;
};

BaseComponent.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = BaseComponent;
