import galleryArr from './gallery-items.js';

// создание разметки галереи изображений
// - создаем функцию, которая получает объект из массива gallery,
//   с помощью createElements создает разметку и возращает ее
// - проходимся циклом циклом по массиву, создаем такую разметку
//   для каждого элемента(объекта) массива и вешаем ее внутрь списка ul('js-gallery')
// - галерея состоит из li,
//   на которой есть ссылка, в которой на href хранится ссылка на большое изображение,
//   у img в src стоит ссылка на маленькое изображение,
//   а в data-source - на большое изображение

const refs = {
    gallery: document.querySelector('ul.js-gallery'),
};

// ========================================================
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

// ========================================================
// перебираем массив методом map, создаем разметку для каждого элемента(объекта) массива

const galleryItemsCollection = galleryArr.map((galleryArrItem, i) =>
    createGallery(galleryArrItem, i),
);
// console.log(galleryItemsCollection);

//=========================================================
// вешаем разметку внутрь списка ul('js-gallery') - распыляем массив galleryItemsCollection

refs.gallery.append(...galleryItemsCollection);
