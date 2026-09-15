
const coffeeBtn = document.getElementById('menu-btn--coffee')
const dessertsBtn = document.getElementById('menu-btn--desserts')
const snacksBtn = document.getElementById('menu-btn--snacks')
const drinksContainer = document.getElementById('menu-container--1')
const dessertsContainer = document.getElementById('menu-container--2')
const snacksContainer = document.getElementById('menu-container--3')
const showMenuBtn = document.querySelector('.top-button')
const geolocationBtn = document.querySelector('.navbar-button')
const geolocationContainer = document.querySelector('.geolocation')
const aboutUsLink = document.getElementById('about-us')
const aboutUsContainer = document.querySelector('.about')
const menuLink = document.getElementById('header-menu')
const menuContainer = document.querySelector('.menu')
const reviewsLink = document.getElementById('header-reviews')
const reviewsContainer = document.querySelector('.reviews')
const contactsLink = document.getElementById('header-contacts')
const contactsContainer = document.querySelector('.geolocation')
const userCom = document.getElementById('userComment')
const aboutUsInFooter = document.getElementById('about-us')
const footerMenu = document.getElementById('menu-foot')
const footerReviews = document.getElementById('reviews-foot')
const footerContacts = document.getElementById('contacts-foot')


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingForm');
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const commentError = document.getElementById('commentError');
    const successMsg = document.getElementById('formSuccess');

    // Проверка имени
    function validateName(value) {
        if (!value.trim()) return 'Введите ваше имя';
        if (value.trim().length < 2) return 'Имя слишком короткое';
        return '';
    }

    // Проверка телефона
    function validatePhone(value) {
        if (!value.trim()) return 'Введите номер телефона';
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10) return 'Номер слишком короткий';
        if (!/^(7|8)\d{10}$/.test(cleaned)) return 'Введен некорректный номер';
        return '';
    }

    function validateComment(value) {
        if (!value.trim()) return 'Заполните поле';
        return '';
    }

    // Очистка ошибок при вводе
    nameInput.addEventListener('input', function () {
        if (this.value.trim().length >= 2) {
            this.classList.remove('error');
            nameError.textContent = '';
        }
    });

    phoneInput.addEventListener('input', function () {
        if (this.value.replace(/\D/g, '').length >= 10) {
            this.classList.remove('error');
            phoneError.textContent = '';
        }
    });

    userCom.addEventListener('input', function () {
        if (this.value.trim()) {
            this.classList.remove('error');
            commentError.textContent = '';   // ← очищаем span ошибки
        }
    })

    // Отправка формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Проверка имени
        const nameErr = validateName(nameInput.value);
        if (nameErr) {
            nameInput.classList.add('error');
            nameError.textContent = nameErr;
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameError.textContent = '';
        }

        // Проверка телефона
        const phoneErr = validatePhone(phoneInput.value);
        if (phoneErr) {
            phoneInput.classList.add('error');
            phoneError.textContent = phoneErr;
            isValid = false;
        } else {
            phoneInput.classList.remove('error');
            phoneError.textContent = '';
        }

        // Проверка комментария
        const comErr = validateComment(userCom.value);
        if (comErr) {
            userCom.classList.add('error');
            commentError.textContent = comErr;   // ← используем commentError
            isValid = false;
        } else {
            userCom.classList.remove('error');
            commentError.textContent = '';        // ← используем commentError
        }

        if (!isValid) return;

        if (!isValid) {
            form.classList.add('has-error');
            return;
        } else {
            form.classList.remove('has-error');
        }

        // ===== ОТПРАВКА В GOOGLE SHEET =====
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyHVUrtIoe3Urz0Opw2aRPwfFwCY1QSZDDMavPJNHFPsYrttsqGCU7a-9xWgC7CAU5ozw/exec';

        const formData = new FormData();
        formData.append('name', nameInput.value);
        formData.append('phone', phoneInput.value);
        formData.append('comment', document.getElementById('userComment').value);

        // ⚡ СНАЧАЛА показываем уведомление, потом отправляем
        // Показываем модалку Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('successModal'));
        modal.show();

        // Очищаем форму
        form.reset();

        // Очищаем ошибки
        nameError.textContent = '';
        phoneError.textContent = '';
        commentError.textContent = '';
        nameInput.classList.remove('error');
        phoneInput.classList.remove('error');
        userCom.classList.remove('error');

        // Отправка уходит в фоне — не ждём её
        fetch(scriptURL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).catch(error => {
            console.error('Ошибка:', error);
        });
    });
});

const arrContainers = [drinksContainer, dessertsContainer, snacksContainer]

for (let i = 0; i < arrContainers.length; i++) { arrContainers[i].classList.add('hidden') }
arrContainers[0].classList.remove('hidden')

coffeeBtn.addEventListener('click', (e) => {
    for (let i = 0; i < arrContainers.length; i++) { arrContainers[i].classList.add('hidden') }
    arrContainers[0].classList.remove('hidden')
})

dessertsBtn.addEventListener('click', (e) => {
    for (let i = 0; i < arrContainers.length; i++) { arrContainers[i].classList.add('hidden') }
    arrContainers[1].classList.remove('hidden')
})

snacksBtn.addEventListener('click', (e) => {
    for (let i = 0; i < arrContainers.length; i++) { arrContainers[i].classList.add('hidden') }
    arrContainers[2].classList.remove('hidden')
})

const scrollToBlock = (block) => {
    if (block) {
        block.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
};

aboutUsLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(aboutUsContainer)
})

menuLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(menuContainer)
})

reviewsLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(reviewsContainer)
})

showMenuBtn.addEventListener('click', (e) => {
    e.preventDefault()
    scrollToBlock(menuContainer)
})

geolocationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(geolocationContainer)
})

contactsLink.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(contactsContainer)
})

aboutUsInFooter.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(aboutUsContainer)
})

footerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(menuContainer)
})

footerReviews.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(reviewsContainer)
})

footerContacts.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToBlock(contactsContainer)
})

