// script.js
document.addEventListener("DOMContentLoaded", function () {
    const words = [
        "Web Developer",
        "Graphic Designer",
        "Frontend Designer",
        "Software Tester",
        "Programmer",
    ];
    let wordIndex = 0,
        charIndex = 0,
        isDeleting = false;
    const typingText = document.querySelector(".typing-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        let displayText = currentWord.substring(0, charIndex);

        typingText.textContent = displayText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, isDeleting ? 500 : 1500);
        }
    }

    typeEffect();
});

function generateBoxes() {
    const overlay = document.querySelector(".overlay");

    overlay.innerHTML = "";

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // Calculate the size of the cards based on the viewport size
    const boxSize = Math.min(viewportWidth, viewportHeight) / 13; // Adjust the divisor for more or fewer cards
    // const boxSize = 30;

    const cols = Math.ceil(viewportWidth / boxSize);
    const rows = Math.ceil(viewportHeight / boxSize);

    const totalBoxes = cols * rows;

    overlay.style.setProperty("--box-size", `${boxSize}px`);

    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `${boxSize}px`; // Set card width
        box.style.height = `${boxSize}px`; // Set card height
        overlay.appendChild(box);
    }
    overlay.style.height = `${Math.ceil(viewportHeight / boxSize) * boxSize}px`;
}

function applyOverlayMask(e) {
    const boxContainer = document.querySelector(".box_container");
    const overlayEl = document.querySelector(".overlay");

    // Get X and Y position for both mouse and touch
    let x, y;

    if (e.touches) {
        // For touch devices
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        // For mouse
        x = e.clientX;
        y = e.clientY;
    }
    overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
}

function hideOverlay() {
    const overlayEl = document.querySelector(".overlay");
    overlayEl.style = "--opacity: 0;"; // Hides the overlay
}
// Run the function when page loads
document.addEventListener("DOMContentLoaded", generateBoxes);
// Update grid when window resizes
window.addEventListener("resize", generateBoxes);

// Mouse movement for overlay
document.body.addEventListener("pointermove", applyOverlayMask);
document.body.addEventListener("touchmove", applyOverlayMask, {
    passive: true,
});

// Hide overlay when mouse leaves the window or touch ends
document.body.addEventListener("pointerleave", hideOverlay);
document.body.addEventListener("touchend", hideOverlay);
document.body.addEventListener("touchcancel", hideOverlay);
