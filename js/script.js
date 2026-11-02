// ============================================
// TSHIMOLOGO FOOD BANK
// MAIN JAVASCRIPT FILE
// ============================================


// 1. UPDATE FOOTER YEAR

const currentYear = new Date().getFullYear();

document.querySelectorAll("#currentYear").forEach(function(element) {
    element.textContent = currentYear;
});


// 2. ENQUIRY FORM VALIDATION

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const type = document.getElementById("type").value;
        const message = document.getElementById("formMessage");

        let response = "";

        if (type === "Volunteering") {

            response = "Thank you, " + name +
                ". We appreciate your interest in volunteering. " +
                "Please contact our organisation for information " +
                "about available volunteer opportunities.";

        } else if (type === "Food Donation") {

            response = "Thank you, " + name +
                ". We appreciate your interest in donating food. " +
                "Please contact us to arrange your donation.";

        } else if (type === "Sponsorship") {

            response = "Thank you, " + name +
                ". We appreciate your interest in sponsoring " +
                "Tshimologo Food Bank. Our team can discuss " +
                "possible sponsorship arrangements with you.";

        } else {

            response = "Thank you, " + name +
                ". We appreciate your interest in working " +
                "with Tshimologo Food Bank. We will review " +
                "your enquiry.";

        }

        message.textContent = response;

        enquiryForm.reset();

    });

}


// 3. CONTACT FORM VALIDATION AND EMAIL PREPARATION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const phone = document.getElementById("contactPhone").value.trim();

        const type = document.getElementById("messageType").value;

        const message = document.getElementById("contactMessage").value.trim();

        const subject = encodeURIComponent("Website Message: " + type);

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\nPhone: " + phone +
            "\nMessage Type: " + type +
            "\nMessage: " + message
        );

        const emailAddress = "info@tshimologofoodbank.org";

        const emailLink = "mailto:" + emailAddress +
            "?subject=" + subject +
            "&body=" + body;

        const status = document.getElementById("contactMessageStatus");

        status.textContent =
            "Your information has been validated. Your email application will open so that you can send your message.";

        window.location.href = emailLink;

    });

}


// 4. GALLERY LIGHTBOX

const galleryImages = document.querySelectorAll(".gallery-item img");

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.setAttribute("role", "dialog");

    lightbox.setAttribute("aria-modal", "true");

    lightbox.setAttribute("aria-label", "Image preview");

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">&times;</button>
        <img src="" alt="Enlarged gallery photograph">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");

    const closeButton = lightbox.querySelector(".lightbox-close");

    galleryImages.forEach(function(image) {

        image.addEventListener("click", function() {

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");

            closeButton.focus();

        });

    });

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightboxImage.src = "";

    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

}


// 5. SERVICES SEARCH FUNCTIONALITY

const searchBox = document.getElementById("serviceSearch");

const serviceCards = document.querySelectorAll(".service-card");

if (searchBox) {

    searchBox.addEventListener("input", function() {

        const searchText = searchBox.value.toLowerCase();

        serviceCards.forEach(function(card) {

            const cardText = card.textContent.toLowerCase();

            if (cardText.includes(searchText)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// 6. ACCORDION FUNCTIONALITY

const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const content = button.nextElementSibling;

        const isOpen = content.classList.contains("active");

        content.classList.toggle("active", !isOpen);

        button.setAttribute("aria-expanded", String(!isOpen));

    });

});


// 7. TABS FUNCTIONALITY

const tabButtons = document.querySelectorAll(".tab-button");

tabButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const tabName = button.getAttribute("data-tab");

        document.querySelectorAll(".tab-button").forEach(function(item) {
            item.classList.remove("active");
        });

        document.querySelectorAll(".tab-content").forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selectedTab = document.getElementById(tabName);

        if (selectedTab) {
            selectedTab.classList.add("active");
        }

    });

});


// 8. SIMPLE FADE-IN ANIMATION

const fadeElements = document.querySelectorAll(".card, .gallery-item");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-in");

                observer.unobserve(entry.target);

            }

        });

    });

    fadeElements.forEach(function(element) {

        observer.observe(element);

    });

}