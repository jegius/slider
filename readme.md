# Простой Слайдер на Чистом JavaScript

Простой слайдер на JavaScript позволяет разрабатывать карусель изображений на основе данных, представленных в виде JSON в атрибуте `images` элемента `.slider`. Чтобы использовать его, необходимо иметь определенные знания о JavaScript и DOM.

## Установка

- Расположите ваш HTML таким образом, чтобы элемент `.slider` имел атрибут `images`, содержащий JSON-массив с URL-адресами изображений. Например:

```HTML
<div class="slider" images='[
    "https://get.pxhere.com/photo/man-person-road-street-color-streetphotography-candid-infrastructure-photograph-snapshot-berlin-streetphoto-leica-strase-strasenfotografie-leicaq-strasenfoto-streetpassionaward-chriscandid-schirrmacher-276714.jpg",
    "https://live.staticflickr.com/7315/11244847213_5d7048b270_b.jpg",
    "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/10/Cover-1.jpg"
]'></div>
```

- Подключите скрипт `index.js` через тег `<script>`.

## Использование

После инициализации скрипта путем загрузки страницы, слайдер будет автоматически создан на основе предоставленных изображений и пронумерованы в соответствии с их порядком в массиве JSON.

## Структура

- `.slider`: основной элемент слайдера, в который вкладываются все прочие элементы.
    - `.slider-container`: контейнер, в котором содержатся все слайды.
        - `.slider__item`: каждый отдельный слайд.
    - `.slider__control`: контейнер, в котором содержатся элементы управления слайдером.
        - `.slider__control-item`: каждый отдельный элемент управления для перехода к соответствующему слайду.

## Стилизация

Классы элементов могут быть стилизованы с помощью CSS для получения требуемого внешнего вида. Приведенный выше код не содержит встроенных стилей, поэтому вы можете настроить внешний вид, как хотите.

# JavaScript Слайдер

В этом документе разбирается код простого слайдера, созданного на чистом JavaScript.

## Основное описание кода

1. Исходный код начинается с выбора основного контейнера для слайдера:

```JavaScript
const slider = document.querySelector('.slider');
```

2. Создается контейнер для слайдов и добавляется в основной контейнер:

```JavaScript
const sliderContainer = document.createElement('div');
sliderContainer.classList.add('slider-container');
slider.append(sliderContainer);
```

3. Создается боковое управление слайдером и добавляется в основной контейнер:

```JavaScript
const control = document.createElement('div');
control.classList.add('slider__control')
slider.append(control);
```

4. Затем извлекается массив URL-адресов изображений из атрибута `images` основного контейнера:

```JavaScript
const imageUrls = JSON.parse(slider.getAttribute('images'));
```

5. Создается функция `createItem`, которая создает элемент управления слайдом:

```JavaScript
function createItem(index, control) {
  const item = document.createElement('div');
  item.classList.add('slider__control-item');
  item.setAttribute('index', index);
  control.append(item)
}
```

6. Также создается функция `renderControlItem`, которая создает элемементы управления для каждого слайда:

```JavaScript
function renderControlItem(_, index) {
  const sliderControl = slider.querySelector('.slider__control');

  if (sliderControl) {
    createItem(index, sliderControl);
  }

  return _;
}
```

7. Создается функция `renderSlide`, которая создает слайд с изображением по URL:

```JavaScript
function renderSlide(url, index) {
  const slide = document.createElement('div');
  slide.classList.add('slider__item');
  sliderContainer.append(slide);
  slide.setAttribute('style', `background-image: url(${url});`);
  slide.setAttribute('index', index);
  return slide
}
```

8. Создается функция `changeSlide`, которая меняет активный слайд и соответствующий ему элемент управления:

```JavaScript
function changeSlide(index) {
  position = index * slideWidth;
  sliderContainer.style.transform = `translateX(-${position}px)`;
  const activeControlItem = slider.querySelector('.slider__control-item_active');
  const newActiveControlItem = slider.querySelector(`.slider__control-item[index="${index}"]`);

  if (activeControlItem) {
    activeControlItem.classList.remove('slider__control-item_active');
  }

  if (newActiveControlItem) {
    newActiveControlItem.classList.add('slider__control-item_active');
  }
}
```

9. Инициализируются переменные для управления размером и позиционированием сладов, а также создаются сами слайды и элементы управления:

```JavaScript
const sliderSize = slider.getBoundingClientRect().width;

const slides = imageUrls
  .map(renderControlItem)
  .map(renderSlide);

slides.forEach(item => item.style.width = `${sliderSize}px`);

const slideWidth = sliderSize;
let position = 0;

sliderContainer.style.width = `${sliderSize * slides.length}px`;

control.addEventListener('click', ({target}) => {
  const index = target.getAttribute('index');
  if (index) {
    changeSlide(Number(index));
  }
});

changeSlide(0);  // Инициирует первый слайд как активный
```

## Содержание

- [Основное описание кода](#основное-описание-кода)

## Требования

- HTML5
- ECMAScript 6

## Инструкции

Данный слайдер позволяет листать изображения влево или вправо. Он автоматически генерирует элементы управления для каждого изображения, чтобы позволить непосредственное переключение на конкретное изображение.

## Конфигурация

Код не предполагает дополнительной конфигурации.


## Лицензия

Этот проект является открытым исходным кодом и доступен в соответствии с условиями MIT.