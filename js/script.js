window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
       for (let i = a; i < tabContent.length; i++) {
           tabContent[i].classList.remove('show');
           tabContent[i].classList.add('hide');
       }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
           tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer

    let deadline = '2019-04-10';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {

        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 100);



        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (('' + t.hours).length < 2) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }

            if (('' + t.minutes).length < 2) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            if (('' + t.seconds).length < 2) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }





            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        moreTabs = document.querySelectorAll('.description-btn'),
        infoTabs = document.querySelector('.info');

    more.addEventListener('click', function() {
        showPopup(more);

    });

    close.addEventListener('click', function() {
        closePopup(more);

    });

    function showPopup(button) {
        overlay.style.display = 'block';
        button.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function closePopup(button) {
        overlay.style.display = 'none';
        button.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    moreTabs.forEach((item) => {
        item.addEventListener('click', function() {

        });
    });


    infoTabs.onclick = function(event) {
        let target = event.target;
        if (target && target.classList.contains('description-btn')) {
            for(let i = 0; i < moreTabs.length; i++ ) {
                if (target == moreTabs[i] ) {
                    showPopup(moreTabs[i]);
                }

            }
        } else if (target && target.classList.contains('popup-close')) {
            for(let i = 0; i < moreTabs.length; i++ ) {
                if (target == close ) {
                    closePopup(moreTabs[i]);
                }
        }
    }
};


// Form

let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так'

};

let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);


        let formData = new FormData(form);

        function postForm(formData) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                request.onreadystatechange = function() {
                    if(request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4 && request.status == 200) {
                        resolve();


                    } else {
                        reject();
                    }
                };
                request.send(formData);
            });


        }

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postForm(formData)
        .then(() => statusMessage.innerHTML = message.loading)
        .then(() => statusMessage.innerHTML = message.success)
        .catch(() => statusMessage.innerHTML = message.failure)
        .then(clearInput());

});

//Form2



let form2 = document.getElementById('form'),
    input2 = form2.getElementsByTagName('input'),
    statusMessage2 = document.createElement('div');

    statusMessage2.classList.add('status');
    input2[0].setAttribute("name", "email");
    input2[1].setAttribute("name", "phone");

    form2.addEventListener('submit', function(event2) {
        event2.preventDefault();
        form2.appendChild(statusMessage2);


        let formData2 = new FormData(form2);

        function postForm(formData) {
            return new Promise(function(resolve, reject) {
                let request2 = new XMLHttpRequest();
                request2.open('POST', 'server.php');
                request2.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                request2.onreadystatechange = function() {
                    if(request2.readyState < 4) {
                        resolve();
                    } else if(request2.readyState === 4) {
                        if (request2.status == 200 && request2.status < 300) {
                            resolve();
                        } else {
                            reject();
                        }
                    }
                };
                request2.send(formData);
            });


        }

        function clearInput() {
            for (let i = 0; i < input2.length; i++) {
                input2[i].value = '';
            }
        }

        postForm(formData2)
        .then(() => statusMessage2.innerHTML = message.loading)
        .then(() => statusMessage2.innerHTML = message.success)
        .catch(() => statusMessage2.innerHTML = message.failure)
        .then(clearInput());

});

//slider

let slideIndex = 3,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

function showSlides(n) {

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    slides.forEach((item) => {
        item.style.display = 'none';
    });
    dots.forEach((item) => item.classList.remove('dot-active'));
    slides[slideIndex-1].style.display = 'block';
    dots[slideIndex-1].classList.add('dot-active');
}

showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener('click', () => {
    plusSlides(-1);
});

next.addEventListener('click', () => {
    plusSlides(1);
});

dotsWrap.addEventListener('click', (event) => {
    for (let i = 1; i < dots.length + 1; i++) {
        if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
            currentSlide(i);
        }
    }
});


//Calculator

let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    PersonsSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.innerHTML = total;

    persons.addEventListener('change', function() {
        PersonsSum += this.value;
        total = (daysSum + PersonsSum) * 4000;

        if(!restDays.value || !persons.value) {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum += this.value;
        total = (daysSum + PersonsSum) * 1000;

        if(!restDays.value || !persons.value ) {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });


    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.value;
            //totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });




});
