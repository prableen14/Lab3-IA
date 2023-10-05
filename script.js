document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const slides = document.querySelectorAll(".slide");
    let touchStartX = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    }

    function nextSlide() {
        currentImageIndex = (currentImageIndex + 1) % slides.length;
        showSlide(currentImageIndex);
    }

    function prevSlide() {
        currentImageIndex = (currentImageIndex - 1 + slides.length) % slides.length;
        showSlide(currentImageIndex);
    }

    function autoAdvance() {
        nextSlide();
    }

    function getPageName(url) {
        var pageName = url.replace(/^\/|\.html$/g, '');
        return pageName;
    }

    // Add event listener for touchstart
    document.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
    });

    // Add event listener for touchend
    document.addEventListener("touchend", function (event) {
        if (touchStartX !== null) {
            const touchEndX = event.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            if (deltaX > 50) {
                prevSlide(); // Swipe right
            } else if (deltaX < -50) {
                nextSlide(); // Swipe left
            }
            touchStartX = null;
        }
    });

    // Add event listener for keyboard navigation
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            prevSlide();
        } else if (event.key === "ArrowRight") {
            nextSlide();
        }
    });

    var currentURL = window.location.pathname;

    // Check if the current URL matches a specific pattern
    if (currentURL) {
        var elementToStyle = document.getElementById(getPageName(currentURL));
        elementToStyle.style.borderBottom = 'solid 3px #585858';
    }

    if (currentURL == '/contact.html') {
        var form = document.getElementById('contactForm');
    
        // Add an event listener to intercept the form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission
    
            alert('Form submitted! We will contact you soon');
    
        });
    }

    showSlide(currentImageIndex);
    setInterval(autoAdvance, 5000);
});
