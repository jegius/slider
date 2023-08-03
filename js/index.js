const slider = document.querySelector('.slider')
const sliderContainer = document.createElement('div');

sliderContainer.classList.add('slider-container');
slider.append(sliderContainer);

const control = document.createElement('div');
const imageUrls = JSON.parse(slider.getAttribute('images'));

control.classList.add('slider__control')
slider.append(control);

function createItem(index, control) {
    const item = document.createElement('div');
    item.classList.add('slider__control-item');
    item.setAttribute('index', index);
    control.append(item)
}

function renderControlItem(_, index) {
    const sliderControl = slider.querySelector('.slider__control');

    if (sliderControl) {
        createItem(index, sliderControl);
    }

    return _;
}

function renderSlide(url, index, _) {
    const slide = document.createElement('div');
    const isString = typeof url === "string";
    slide.classList.add('slider__item');
    slide.setAttribute('index', index);

    if (isString) {
        slide.setAttribute('style', `background-image: url(${url});`);
    } else {
        url.map(itemUrl => {
            const child = document.createElement('div');
            child.classList.add('slider__item-child');
            child.setAttribute('style', `background-image: url(${itemUrl});`);
            slide.append(child);
        })
    }

    sliderContainer.append(slide);

    return slide
}

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

changeSlide(0);