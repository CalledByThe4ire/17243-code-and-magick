'use strict';

/**
 * Конструктор объекта Gallery. Создает контейнер с управляющими элементами,
 * отрисовывает в нем выбранное пользователем изображение,
 * добавляет обработчики событий
 * @param {String[]} picturesList: массив из url для изображений
 * @constructor
 */
function Gallery(picturesList) {

  var overlay = document.querySelector('.overlay-gallery');
  this.galleryContainer = overlay;
  this.pictureContainer = overlay.querySelector('.overlay-gallery-preview');

  this.closeGallery = overlay.querySelector('.overlay-gallery-close');
  this.toggleLeft = overlay.querySelector('.overlay-gallery-control-left');
  this.toggleRight = overlay.querySelector('.overlay-gallery-control-right');

  this.currentPicture = overlay.querySelector('.preview-number-current');
  this.picturesCount = overlay.querySelector('.preview-number-total');

  this.pictures = picturesList;
  this.picturesCount.textContent = this.pictures.length;

  window.addEventListener('hashchange', this.onHashChange.bind(this));

  this.hide = this.hide.bind(this);
  this.prev = this.prev.bind(this);
  this.next = this.next.bind(this);
}

/**
 * Записывает в адресную строку url изображения, предшествующее текущему,
 * пока верно условие
 */
Gallery.prototype.prev = function() {
  if (this.activePicture !== 0) {
    this.setLocationHash(this.pictures[this.activePicture - 1]);
  }
};

/**
 * Записывает в адресную строку url изображения, следующее за текущим,
 * пока верно условие
 */
Gallery.prototype.next = function() {
  if (this.activePicture !== this.pictures.length - 1) {
    this.setLocationHash(this.pictures[this.activePicture + 1]);
  }
};

/**
 * Отрисовывает изображение
 * @param {Number | String} data
 */
Gallery.prototype.setActivePicture = function(data) {
  if (typeof data !== 'number') {
    data = this.pictures.indexOf(data);
  }

  this.activePicture = data;

  var pictureElement = new Image();
  pictureElement.src = this.pictures[this.activePicture];

  if (this.pictureElement) {
    this.pictureContainer.replaceChild(pictureElement, this.pictureElement);
  } else {
    this.pictureContainer.appendChild(pictureElement);
  }

  this.pictureElement = pictureElement;
  this.currentPicture.textContent = data + 1;
};

/**
 * Записывает в адресную строку переданный url
 * @param {String} url
 */
Gallery.prototype.setLocationHash = function(url) {
  location.hash = 'photo/' + url;
};

/**
 * В зависимости от состояния адресной строки
 * вызывает на объекте соответствующий метод
 */
Gallery.prototype.onHashChange = function() {
  var correctPath = location.hash.match(/#photo\/(\S+)/);
  if (correctPath) {
    this.show(correctPath[1]);
  } else {
    this.hide();
  }
};

/**
 * Открывает галерею по клику на изображение,
 * добавляет обработчики событий управляющим элементам галереи
 * @param {(Number | String)}  data: порядковый номер (индекс) изображения или url изображения
 */
Gallery.prototype.show = function(data) {
  this.closeGallery.addEventListener('click', this.hide);
  this.toggleLeft.addEventListener('click', this.prev);
  this.toggleRight.addEventListener('click', this.next);
  this.setActivePicture(data);
  this.galleryContainer.classList.remove('invisible');
};

/**
 * Прячет галерею, очищает адресную строку,
 * удаляет обработчики событий на управляющих элементах
 */
Gallery.prototype.hide = function() {
  this.galleryContainer.classList.add('invisible');
  this.closeGallery.removeEventListener('click', this.hide);
  this.toggleLeft.removeEventListener('click', this.prev);
  this.toggleRight.removeEventListener('click', this.next);
  location.hash = '';
};

module.exports = Gallery;
