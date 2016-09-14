'use strict';
/**
 * @typedef {Object} ReviewData
 * Отзыв
 * @property {String} authorName
 * @property {String} authorPic
 * @property {Number} reviewCreationDate
 * @property {String} reviewDescription
 * @property {Number} reviewMark
 * @property {Number} reviewUsefulness
 */

/**
 * Конструктор класса ReviewData
 * @param data
 * @constructor
 */
var ReviewData = function(data) {
  this.authorName = data.author.name;
  this.authorPic = data.author.picture;
  this.reviewCreationDate = data.created;
  this.reviewDescription = data.description;
  this.reviewMark = data.rating;
  this.reviewUsefulness = data.review_usefulness;
};

ReviewData.prototype.getAuthorName = function() {
  return this.authorName;
};

ReviewData.prototype.getAuthorPic = function() {
  return this.authorPic;
};

ReviewData.prototype.getReviewCreationDate = function() {
  return this.reviewCreationDate;
};

ReviewData.prototype.getReviewDescription = function() {
  return this.reviewDescription;
};

ReviewData.prototype.getReviewMark = function() {
  return this.reviewMark;
};

ReviewData.prototype.getReviewUsefulness = function() {
  return this.reviewUsefulness;
};

ReviewData.prototype.onUsefulnessChange = function() {

};

/**
 * Изменяет св-во reviewUsefulness
 * в зависимости от переданного значения
 * @param {Boolean} flag
 */
ReviewData.prototype.setReviewUsefulness = function(flag) {
  if (flag) {
    this.reviewUsefulness++;
  } else {
    this.reviewUsefulness--;
  }
  this.onUsefulnessChange(flag);
};

module.exports = ReviewData;
