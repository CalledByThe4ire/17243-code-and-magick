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
  this.reviewQuiz = this.element.querySelector('.review-quiz');
  this.quizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.quizAnswerNo = this.element.querySelector('.review-quiz-answer-no');

  this.setQuizState = this.setQuizState.bind(this);

  this.quizAnswerYes.addEventListener('click', this.setQuizState);
  this.quizAnswerNo.addEventListener('click', this.setQuizState);
};

// записывает в св-во __proto__ объекта Review ссылку на BaseComponent
utils.inherit(Review, BaseComponent);

/**
 * Делает активным выбранный вариант ответа
 * @param {MouseEvent} evt
 */
Review.prototype.setQuizState = function(evt) {
  var flag;
  var quizActive = this.reviewQuiz.querySelector('.review-quiz-answer-active');
  if (quizActive !== null) {
    quizActive.classList.remove('review-quiz-answer-active');
  }
  evt.target.classList.add('review-quiz-answer-active');

  flag = evt.target.classList.contains('review-quiz-answer-yes');
  this.data.setReviewUsefulness(flag);
};

/**
 * Удаляет обработчики с элементов выбора варианта ответа
 */
Review.prototype.remove = function() {
  this.quizAnswerYes.removeEventListener('click', this.setQuizState);
  this.quizAnswerNo.removeEventListener('click', this.setQuizState);
  // расширяет метод remove, добавляя логику из аналогичного метода,
  // описанную в объекте prototype класса BaseComponent
  BaseComponent.prototype.remove.call(this);
};

module.exports = Review;
