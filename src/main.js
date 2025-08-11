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

 // Ниже - отправка формы с обраоткой на стороне серврера через send.php
 document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const toast = document.getElementById("form-toast");
  const formData = new FormData(form);

  // Блокируем кнопку и меняем текст на "Отправка..."
  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Отправка...";

  // --- ВАРИАНТ 1: РЕАЛЬНАЯ ОТПРАВКА НА СЕРВЕР send.php ---
  // fetch("send.php", {
  //   method: "POST",
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(data => {
  //   toast.textContent = data.message;
  //   toast.className = "toast show " + (data.success ? "success" : "error");

  //   if (data.success) {
  //     form.reset();
  //   }

  //   setTimeout(() => {
  //     toast.className = "toast"; // скрыть сообщение
  //   }, 8000);
  // })
  // .catch(() => {
  //   toast.textContent = "Сервер недоступен. Попробуйте позже.";
  //   toast.className = "toast show error";
  //   setTimeout(() => {
  //     toast.className = "toast";
  //   }, 4000);
  // })
  // .finally(() => {
  //   submitBtn.disabled = false;
  //   submitBtn.textContent = originalText;
  // });

  
  // --- ВАРИАНТ 2: ШАБЛОННАЯ ОТПРАВКА (для демонстрации без PHP) ---
  setTimeout(() => {
    toast.textContent = "Спасибо! Ваш ответ получен!";
    toast.className = "toast show success";
    form.reset();

    setTimeout(() => {
      toast.className = "toast"; // скрыть сообщение
    }, 8000);

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }, 1500);
  
});

//активация карты по клику на нее
window.onload = function () {
    window.deactivateOverlay = function (el) {
        el.style.pointerEvents = 'none';
        el.style.opacity = '0';
    }

    window.activateMap = function (container) {
        const overlay = container.querySelector('.map-overlay');
        if (overlay) {
            overlay.style.pointerEvents = 'none';
            overlay.style.opacity = '0';
        }
    }

    window.deactivateMap = function (container) {
        const overlay = container.querySelector('.map-overlay');
        if (overlay) {
            overlay.style.pointerEvents = 'auto';
            overlay.style.opacity = '1';
        }
    }
}


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
