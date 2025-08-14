document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-up");

  function runCounter(counter) {
    counter.textContent = "0+";
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 200; // Speed control

    function updateCount() {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count) + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + "+";
      }
    }

    updateCount();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
      }
    });
  }, { threshold: 0.5 }); // trigger when 50% visible

  counters.forEach(counter => observer.observe(counter));
});

const slider = document.getElementById("slider");

// Duplicate ONLY the inner items
const items = Array.from(slider.children);
items.forEach(item => {
  const clone = item.cloneNode(true);
  slider.appendChild(clone);
});

let scrollAmount = 0;

function animateSlider() {
  scrollAmount += 1; // Change speed if needed
  if (scrollAmount >= slider.scrollWidth / 2) {
    scrollAmount = 0;
  }
  slider.scrollLeft = scrollAmount;
  requestAnimationFrame(animateSlider);
}

animateSlider();

function setupInfiniteRightSlider(sliderId, direction = 'right', speed = 0.5) {
  const wrapper = document.getElementById(sliderId);
  const track = wrapper.querySelector('.slider-track');

  // Clone items to allow seamless loop
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPos = 0;

  function animate() {
    scrollPos += (direction === 'right' ? speed : -speed);

    // Reset scroll when halfway through (seamless loop)
    if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
      scrollPos = 0;
    }

    wrapper.scrollLeft = scrollPos;
    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize both sliders
setupInfiniteRightSlider('slider1', 'right', 0.4); // scroll left-to-right


function setupInfiniteLeftSlider(sliderId, direction = 'left', speed = 0.5) {
  const wrapper = document.getElementById(sliderId);
  const track = wrapper.querySelector('.slider-track');

  // Clone items to allow seamless loop
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollPos = 0;

  function animate() {
    scrollPos += (direction === 'left' ? speed : -speed);

    // Reset scroll when halfway through (seamless loop)
    if (Math.abs(scrollPos) >= track.scrollWidth / 2) {
      scrollPos = 0;
    }

    wrapper.scrollLeft = scrollPos;
    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize both sliders
document.addEventListener("DOMContentLoaded", () => {
  const sliderImages = [
    "assests/herothree.jpeg",
    "assests/heroone.png",
    "assests/herotwo.webp",
    "assests/herothree.png",
  ];

  let currentIndex = 0;
  const heroSlider = document.getElementById("heroSlider");
  const dots = document.querySelectorAll("#heroDots .dot");
  const nextBtn = document.getElementById("nextBtn");
  const preBtn = document.getElementById("preBtn");

  // Preload images
  const preloadedImages = [];

  function preloadImage(index) {
    if (!preloadedImages[index]) {
      const img = new Image();
      img.src = sliderImages[index];
      preloadedImages[index] = img;
    }
  }

  function updateSlider(index) {
    currentIndex = index;

    // Lazy load image: first set opacity 0, then load image, then fade in
    heroSlider.style.opacity = 0;

    // Preload current image
    preloadImage(currentIndex);

    // Wait a little for fade-in effect
    setTimeout(() => {
      heroSlider.style.backgroundImage = `url('${sliderImages[currentIndex]}')`;
      heroSlider.style.transition = "opacity 0.5s ease-in-out";
      heroSlider.style.opacity = 1;
    }, 100); // small delay for lazy effect

    // Preload next image in advance for smooth transition
    preloadImage((currentIndex + 1) % sliderImages.length);

    updateDots();
    console.log(`Slide changed to: ${currentIndex}`);
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("bg-white");
        dot.classList.remove("bg-transparent");
      } else {
        dot.classList.add("bg-transparent");
        dot.classList.remove("bg-white");
      }
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      updateSlider(i);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      updateSlider((currentIndex + 1) % sliderImages.length);
    });
  }

  if (preBtn) {
    preBtn.addEventListener("click", () => {
      updateSlider((currentIndex - 1 + sliderImages.length) % sliderImages.length);
    });
  }

  // Auto slide every 5 seconds
  setInterval(() => {
    updateSlider((currentIndex + 1) % sliderImages.length);
  }, 5000);

  updateSlider(0);
});
