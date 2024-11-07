document.addEventListener("DOMContentLoaded", () => {
    // Sample translations data
    const translations = {
        ENG: {
            heroTitle: "MODERN & ELEGANT",
            heroDescription: "Simple and beautiful design",
            qualityTitle: "Premium Quality",
            footer: "© 2024. All Rights Reserved.",
            home: "Home",
            contact: "Contact Us"
        },
        RUS: {
            heroTitle: "СОВРЕМЕННЫЙ И ЭЛЕГАНТНЫЙ",
            heroDescription: "Простой и красивый дизайн",
            qualityTitle: "Премиальное качество",
            footer: "© 2024. Все права защищены.",
            home: "Главная",
            contact: "Контакты"
        },
        UZB: {
            heroTitle: "ZAMONAVIY VA O'ZGARUVCHAN",
            heroDescription: "Oddiy va chiroyli dizayn",
            qualityTitle: "Mukammal sifat",
            footer: "© 2024. Barcha huquqlar himoyalangan.",
            home: "Asosiy",
            contact: "Aloqa"
        }
    };

    // Language switch function
    function changeLanguage(lang) {
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            } else {
                console.warn(`Translation for ${key} not found in ${lang}`);
            }
        });
    }

    // Event listeners for language buttons
    const langEngBtn = document.getElementById('lang-ENG');
    const langRusBtn = document.getElementById('lang-RUS');
    const langUzbBtn = document.getElementById('lang-UZB');

    if (langEngBtn) {
        langEngBtn.addEventListener('click', () => changeLanguage('ENG'));
    }
    if (langRusBtn) {
        langRusBtn.addEventListener('click', () => changeLanguage('RUS'));
    }
    if (langUzbBtn) {
        langUzbBtn.addEventListener('click', () => changeLanguage('UZB'));
    }

    // Default language initialization
    changeLanguage('ENG'); // Set default language

    // Form Submission to Telegram
    const TOKEN = '7427479878:AAHRFmdEO5AqhOqM-rYknRhjhrx_o9goxt0'; // Замените на ваш токен
    const chat_id = '-4546379989'; // Замените на ваш chat_id

    const form = document.querySelector('#contact-form');
    const nameInp = document.querySelector('#first-name');
    const lnameInp = document.querySelector('#last-name');
    const emailInp = document.querySelector('#email');
    const phoneInp = document.querySelector('#phone');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Не отправляем форму обычным способом

            // Получаем значения из полей
            const nameValue = nameInp.value;
            const lnameValue = lnameInp.value;
            const phoneValue = phoneInp.value;
            const emailValue = emailInp.value;

            console.log("Form submitted with:", nameValue, lnameValue, phoneValue, emailValue); // Логируем данные формы

            // Отправка данных
            sendData(nameValue, lnameValue, phoneValue, emailValue);
        });
    } else {
        console.error('Form not found');
    }

    async function sendData(name, lname, phone, email) {
        const info = `
            Name: ${name}
            Last Name: ${lname}
            Phone: ${phone}
            Email: ${email}
        `;

        console.log("Sending message to Telegram bot...");

        try {
            const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chat_id,
                    text: info,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Message sent successfully', data);
                alert('Your message has been sent!');
                form.reset();
            } else {
                const errorData = await response.json();
                console.error('Failed to send message:', errorData);
                alert('There was an error sending your message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again later.');
        }
    }

    // Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;

    function showSlide(index) {
        // Reset all slides to inactive
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        // Show the current slide
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Initialize the slider by showing the first slide
    showSlide(currentSlide);

    // Set up interval to change slides every 3 seconds
    setInterval(nextSlide, 3000);

    // Event listeners for manual slide control
    const nextBtn = document.querySelector('.carousel-control-next');
    const prevBtn = document.querySelector('.carousel-control-prev');

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
});
