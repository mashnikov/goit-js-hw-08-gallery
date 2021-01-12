import galleryArr from './gallery-items.js';
// =======================================================================================
// 1) создание разметки галереи изображений:
//    - создаем функцию, которая получает объект из массива gallery,
//      с помощью createElements создает разметку и возращает ее
//    - проходимся циклом циклом по массиву, создаем такую разметку
//      для каждого элемента(объекта) массива и вешаем ее внутрь списка ul('js-gallery')
//    - галерея состоит из li,
//      на которой есть ссылка, в которой на href хранится ссылка на большое изображение,
//      у img в src стоит ссылка на маленькое изображение,
//      а в data-source - на большое изображение

const refs = {
    gallery: document.querySelector('ul.js-gallery'),
    lightbox: document.querySelector('div.lightbox'),
    closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('div.lightbox__overlay'),
    lightboxImage: document.querySelector('img.lightbox__image'),
};

// ===========================
// функция получает объект из массива, создает элементы разметки галереи,
// добавляет классы и атрибуты

function createGallery(obj, i) {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');

    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', obj.original);

    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', obj.preview);
    galleryImage.setAttribute('alt', obj.description);
    galleryImage.dataset.source = obj.original;
    galleryImage.dataset.index = i;
    galleryItem.appendChild(galleryLink).appendChild(galleryImage);
    // console.log(galleryItem);
    return galleryItem;
}

// ===========================
// перебираем массив методом map, создаем разметку для каждого элемента(объекта) массива

const galleryItemsCollection = galleryArr.map((galleryArrItem, i) =>
    createGallery(galleryArrItem, i),
);
// console.log(galleryItemsCollection);

// ===========================
// вешаем разметку внутрь списка ul('js-gallery') - распыляем массив galleryItemsCollection

refs.gallery.append(...galleryItemsCollection);

// =======================================================================================
// 2) Реализация делегирования на галерее ul.js-gallery и получение url большого изображения:
//    - повесить прослушивание клика на ul
refs.gallery.addEventListener('click', onGalleryClick);

//    - при клике в картинку - получиьт url большого изображения
//      (вывести в console.log  значение атрибута data-source)
//      использовать (получить) dataset, event.target, source

function onGalleryClick(event) {
    event.preventDefault();
    //    - удостовериться, что пользователь клиекает именно в картинку
    if (event.target.nodeName !== 'IMG') {
        // console.log('кликнули не по картинке, ничего не делаем!');
        return;
    }

    const tagImg = event.target;
    const largeImgURL = tagImg.dataset.source;
    const largeImgALT = tagImg.getAttribute('alt');

    // console.log(largeImgURL);
    // console.log(largeImgALT);

    onOpenModal();

    refs.lightboxImage.setAttribute('alt', largeImgALT);

    setLargeImgURL(largeImgURL);
}

function setLargeImgURL(url) {
    refs.lightboxImage.src = url;
}

function removeLargeImgURL() {
    refs.lightboxImage.src = '';
}

// =======================================================================================
// 3) Открытие модального окна по клику на элементе галереи.
//    Закрытие модального окна по клику на кнопку.
//    Закрытие модального окна по клику на область оверлея div.lightbox__overlay.
//    Закрытие модального окна по нажатию клавиши ESC.
//    создать функции openModal, closeModal

// создание функции открытия модального окна
function onOpenModal() {
    window.addEventListener('keydown', onEscapePress);
    refs.lightbox.classList.add('is-open');
}

// создание функции закрытия модального окна
function onCloseModal() {
    window.removeEventListener('keydown', onEscapePress);
    refs.lightbox.classList.remove('is-open');
    removeLargeImgURL();
    refs.lightboxImage.setAttribute('alt', '');
}

// создание функции закрытия модального окна при клике на область оверлея
function onLightboxOverlayClick(event) {
    if (event.target === event.currentTarget) {
        onCloseModal();
    }
}

// создание функции закрытия модального окна при нажатии клавиши ESC
function onEscapePress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
        // console.log('нажали ESC');
    }
}

// закурытие модального окна при клике на кнопку:
refs.closeBtn.addEventListener('click', onCloseModal);

// закурытие модального окна при клике на серую область оверлея:
refs.lightboxOverlay.addEventListener('click', onLightboxOverlayClick);

// 4) пролистывание галереи кнопками влево/вправо
//    - пока открыто модальное окно необходимо зарегистрировать
//      прослушивание кнопок "влево" и "вправо" на клавиатуре (keypress или keydown)
//    - при клике на картинку необходимо получить индекс картинки, с которой начинается пролистывание
//      создаем переменную activeIndex, в которую во время клика записываем активный (текущий) индекс из data-index
//      когда листаем вправо - увеличиваем индекс на +1, влево - уменьшаем на -1 =Ю идем в массив, берем картинку с таким индексом и подставляем в большой Image
//      img.src = arr[index + 1].original
//      если индекс равен нулю или концу масива -> return (ничего не делаем)
