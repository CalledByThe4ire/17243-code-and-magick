'use strict';

var utils = require('./utils');
var BaseComponent = require('./base-component');
var ReviewData = require('./review-data');
var loadImage = require('./load-image');

/**
 * блок переменных для шаблонизации
 */
var templateElement = document.getElementById('review-template');

var reviewToClone = (('content' in templateElement) ?
  templateElement.content :
  templateElement)
  .querySelector('.review');

/**
 * Создает элемент {Review} на основе шаблона,
 * описанного в теге template с данными {ReviewData}
 * @param {ReviewData} data
 * @constructor
 */
var Review = function(data) {
  this.data = new ReviewData(data);
  // наследует св-ва и методы, объявленные в конструкторе BaseComponent
  // в данном случае в св-во element, унаследованное от BaseComponent,
  // запишутся данные, переданные в методе call 2-м параметром
  BaseComponent.call(this, reviewToClone.cloneNode(true));

  var rating = this.element.querySelector('.review-rating');
  var ratingMarks = ['', '-two', '-three', '-four', '-five'];
  rating.classList.add('review-rating' + ratingMarks[this.data.getReviewMark() - 1]);

  var img = this.element.querySelector('.review-author');
  var imgWidth = 124;
  var imgHeight = 124;

  img.alt = img.title = this.data.getAuthorName();


  loadImage(this.data.getAuthorPic(), function(isOk) {
    if (isOk) {
      img.src = this.data.getAuthorPic();
      img.width = imgWidth;
      img.height = imgHeight;
    } else {
      this.element.classList.add('review-load-failure');
    }
  }.bind(this));

  this.element.querySelector('.review-text').textContent = this.data.getReviewDescription();
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');

  this.updateUsefulness = this.updateUsefulness.bind(this);

  this.quizAnswerYes.addEventListener('click', this.updateUsefulness);
  this.quizAnswerNo.addEventListener('click', this.updateUsefulness);

  // Вызываем на ReviewData метод setAnswerActive в случае,
  // если меняется "полезность" (onChangeUsefulness)
  this.data.onUsefulnessChange = this.setAnswerActive.bind(this);

};

// записывает в св-во __proto__ объекта Review ссылку на BaseComponent
utils.inherit(Review, BaseComponent);

/**
 * Передает в параметр функции обратного вызова setReviewUsefulness
 * логическое значение, в зависимости от которого меняется
 * свойство reviewUsefulness объекта ReviewData
 *
 * @param {MouseEvent} evt
 */
Review.prototype.updateUsefulness = function(evt) {
  var flag = evt.target.classList.contains('review-quiz-answer-yes');
  this.data.setReviewUsefulness(flag);
};

Review.prototype.quizAnswerActive = 'review-quiz-answer-active';

/**
 * Отмечает один из вариантов ответа ("Да" или "Нет")
 * @param {Boolean} flag
 */
Review.prototype.setAnswerActive = function(flag) {
  this.quizAnswerYes.classList.toggle(this.quizAnswerActive, flag);
  this.quizAnswerNo.classList.toggle(this.quizAnswerActive, !flag);
};

/**
 * Удаляет обработчики с элементов выбора варианта ответа
 */
Review.prototype.remove = function() {
  this.quizAnswerYes.removeEventListener('click', this.updateUsefulness);
  this.quizAnswerNo.removeEventListener('click', this.updateUsefulness);
  // расширяет метод remove, добавляя логику из аналогичного метода,
  // описанную в объекте prototype класса BaseComponent
  BaseComponent.prototype.remove.call(this);
};

module.exports = Review;
