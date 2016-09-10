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

  this.hide = this.hide.bind(this);
  this.prev = this.prev.bind(this);
  this.next = this.next.bind(this);
}

/**
 * Устанавливает изображение, предшествующее текущему,
 * пока верно условие
 */
Gallery.prototype.prev = function() {
  if (this.activePicture !== 0) {
    this.setActivePicture(this.activePicture - 1);
  }
};

/**
 * Устанавливает изображение, следующее за текущим,
 * пока верно условие
 */
Gallery.prototype.next = function() {
  if (this.activePicture !== this.pictures.length - 1) {
    this.setActivePicture(this.activePicture + 1);
  }
};

/**
 * Отрисовывает изображение
 * @param number
 */
Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;

  var pictureElement = new Image();
  pictureElement.src = this.pictures[this.activePicture];

  if (this.pictureElement) {
    this.pictureContainer.replaceChild(pictureElement, this.pictureElement);
  } else {
    this.pictureContainer.appendChild(pictureElement);
  }

  this.pictureElement = pictureElement;

  this.currentPicture.textContent = number + 1;
};

/**
 * Открывает галерею по клику на изображение,
 * добавляет обработчики событий управляющим элементам галереи
 * @param {Number} number: порядковый номер (индекс) изображения
 */
Gallery.prototype.show = function(number) {
  this.closeGallery.addEventListener('click', this.hide);
  this.toggleLeft.addEventListener('click', this.prev);
  this.toggleRight.addEventListener('click', this.next);
  this.setActivePicture(number);
  this.galleryContainer.classList.remove('invisible');
};

/**
 * Прячет галерею, удаляет обработчики событий на управляющих элементах
 */
Gallery.prototype.hide = function() {
  this.galleryContainer.classList.add('invisible');
  this.closeGallery.removeEventListener('click', this.hide);
  this.toggleLeft.removeEventListener('click', this.prev);
  this.toggleRight.removeEventListener('click', this.next);
};

module.exports = Gallery;
