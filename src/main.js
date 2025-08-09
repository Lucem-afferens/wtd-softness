import './sass/style.scss'


//Intersection Observer API

// This for "anim"
// settings
let options = {
    root: null,
    rootMargin: '-20px 0px',
    threshold: 0.5
}

//callback function
let callback = function(entries, observer) {
    entries.forEach(entry => {
        //если элемент является наблюдаемым
        if (entry.isIntersecting) {
            //давим класс active к нему
            entry.target.classList.add('active');
            //можно отписаться от наблюдения:
            //observer.unobserve(entry.target);
        } else { // удаляем класс active, если элемент не виден
            entry.target.classList.remove('active');
        }
    });
}

//наблюдатель
let observer = new IntersectionObserver(callback, options);

//опрееляем элементы, за которыми наблюдаем
let targets = document.querySelectorAll('.anim')
targets.forEach(target => {
    observer.observe(target);
});



//For Main Arrow
//количество пикселей на прокрутку страницы   
const hideAfter = 300;

// функция для скрытия/появления элемента
function checkScroll() {
    const element = document.querySelector('.main__arrow');
    if (window.scrollY > hideAfter) {
        element.classList.remove('visible');
    } else {
        element.classList.add('visible');  
    }
}

//вызываем функцию при скролле
window.addEventListener('scroll', checkScroll)

document.getElementById('non-alcoholic').addEventListener('change', function() {
    let checkboxes = document.querySelectorAll('input[name="drinking[]"]:not(#non-alcoholic)');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = this.checked;
    });
});

const countdown = document.querySelector('.countdown');
const targetDate = new Date('2027-08-12T00:00:00');
 
function updateCountdown() {
  const now = new Date();
  const remainingTime = targetDate - now;
 
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
 
  document.getElementById('days').innerText = days.toString().padStart(2, '0');
  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
 
// Обновляем счетчик каждую секунду
setInterval(updateCountdown, 1000);


// audio play
const playStopIcon = document.getElementById('playStopIcon');
const audio = document.getElementById('audio');
const play = document.querySelector('.audio-btn__play'),
      stop = document.querySelector('.audio-btn__stop');

window.addEventListener('load', () => {
    if (audio.paused) {
        play.classList.add('btn-hidden'),
        stop.classList.remove('btn-hidden');
    } else {
        play.classList.remove('btn-hidden'),
        stop.classList.add('btn-hidden');
    }
});

playStopIcon.addEventListener('click', function () {
    if (audio.paused) {
        audio.play(),
        play.classList.remove('btn-hidden'),
        stop.classList.add('btn-hidden');
    } else {
        audio.pause(),
        play.classList.add('btn-hidden'),
        stop.classList.remove('btn-hidden');
    }
}
);



// Preloader
let loaded = false; // флаг, чтобы код выполнился один раз

function markLoaded() {
  if (!loaded) {
    loaded = true;
    document.getElementById('loading-screen').classList.add('loaded');
    document.body.classList.add('loaded');
    document.body.style.overflow = 'auto';
  }
}

const img1 = new Image();
img1.src = 'img/bg_main_1440.webp';
img1.onload = markLoaded;

const img2 = new Image();
img2.src = 'img/bg_main_1440_2x.webp';
img2.onload = markLoaded;
