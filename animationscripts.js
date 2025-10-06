//number counter

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count-up");

  function runCounter(counter) {
    counter.textContent = "0+";
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 200;

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
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

//slider certificate

const slider = document.getElementById("slider");

const items = Array.from(slider.children);
items.forEach(item => {
  const clone = item.cloneNode(true);
  slider.appendChild(clone);
});

let scrollAmount = 0;

function animateSlider() {
  scrollAmount += 1;
  if (scrollAmount >= slider.scrollWidth / 2) {
    scrollAmount = 0;
  }
  slider.scrollLeft = scrollAmount;
  requestAnimationFrame(animateSlider);
}

animateSlider();


//left and right slider 

function setupInfiniteSlider(sliderId, direction = 'right', speed = 0.5) {
  const wrapper = document.getElementById(sliderId);
  const track = wrapper.querySelector('.slider-track');

  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // Start scroll position for left slider at half of the track
  let scrollPos = (direction === 'left') ? track.scrollWidth / 2 : 0;

  function animate() {
    if (direction === 'right') {
      scrollPos += speed;
      if (scrollPos >= track.scrollWidth / 2) scrollPos = 0;
    } else {
      scrollPos -= speed;
      if (scrollPos <= 0) scrollPos = track.scrollWidth / 2;
    }

    wrapper.scrollLeft = scrollPos;
    requestAnimationFrame(animate);
  }

  animate();
}

// Slider 1 → Right
setupInfiniteSlider('slider1', 'right', 0.4);

// Slider 2 → Left
setupInfiniteSlider('slider2', 'left', 0.4);



// Initialize both sliders hero section
document.addEventListener("DOMContentLoaded", () => {
  const sliderImages = [
    "assests/herobanner_img.jpg",
    "assests/heroone.png",
    "assests/herotwo.webp",
    "assests/herothree.png",
  ];

  let currentIndex = 0;
  const heroSlider = document.getElementById("heroSlider");
  const dots = document.querySelectorAll("#heroDots .dot");
  const nextBtn = document.getElementById("nextBtn");
  const preBtn = document.getElementById("preBtn");

  // Create two images for sliding
  const imgCurrent = document.createElement("img");
  const imgNext = document.createElement("img");

  imgCurrent.classList.add("absolute", "w-full", "h-full", "object-cover");
  imgNext.classList.add("absolute", "w-full", "h-full", "object-cover");

  heroSlider.appendChild(imgCurrent);
  heroSlider.appendChild(imgNext);

  const preloadedImages = [];

  // Preload images
  function preloadImage(index) {
    if (!preloadedImages[index]) {
      const img = new Image();
      img.src = sliderImages[index];
      preloadedImages[index] = img;
    }
  }

  // Update dots
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

  // Slide animation function
  function slideTo(index) {
    const nextIndex = (index + sliderImages.length) % sliderImages.length;

    imgNext.src = sliderImages[nextIndex];
    imgNext.style.transform = "translateX(100%)"; // start off-screen right

    // Force reflow to trigger transition
    void imgNext.offsetWidth;

    imgCurrent.style.transition = "transform 0.5s ease-in-out";
    imgNext.style.transition = "transform 0.5s ease-in-out";

    imgCurrent.style.transform = "translateX(-100%)"; // slide out left
    imgNext.style.transform = "translateX(0)"; // slide in

    // Swap after transition
    setTimeout(() => {
      imgCurrent.src = sliderImages[nextIndex];
      imgCurrent.style.transition = "none";
      imgCurrent.style.transform = "translateX(0)";
      imgNext.style.transition = "none";
    }, 600);

    currentIndex = nextIndex;

    // Update dots and preload next image
    updateDots();
    preloadImage((currentIndex + 1) % sliderImages.length);
  }

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      slideTo(i);
    });
  });

  // Next/Prev buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      slideTo(currentIndex + 1);
    });
  }

  if (preBtn) {
    preBtn.addEventListener("click", () => {
      slideTo(currentIndex - 1);
    });
  }

  // Auto slide every 5 seconds
  setInterval(() => {
    slideTo(currentIndex + 1);
  }, 5000);

  // Initialize first image
  imgCurrent.src = sliderImages[0];
  preloadImage(0);
  updateDots();
});



window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const pageContent = document.getElementById("pageContent");

  console.log("JS loaded, found elements:", preloader, pageContent);

  if (preloader && pageContent) {

    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      preloader.style.display = "none";
      pageContent.classList.remove("hidden");
      console.log("Content shown");
    }, 500);
  }
});

//footer 

function toggleQuickLinkAboutUs(e) {
  e.preventDefault();
  e.stopPropagation();

  const dropdown = document.getElementById("quickLinkAboutUsDropdown");
  const isOpen = !dropdown.classList.contains("hidden");

  closeQuickLinkDropdowns();

  if (!isOpen) {
    dropdown.classList.remove("hidden");
  }
}

function toggleQuickLinkJoinUs(e) {
  e.preventDefault();
  e.stopPropagation();

  const dropdown = document.getElementById("quickLinkJoinUsDropdown");
  const isOpen = !dropdown.classList.contains("hidden");

  closeQuickLinkDropdowns();

  if (!isOpen) {
    dropdown.classList.remove("hidden");
  }
}

function toggleQuickLinkMissionSub(e) {
  e.preventDefault();
  e.stopPropagation();

  const sub = document.getElementById("quickLinkMissionSubItems");
  const isOpen = !sub.classList.contains("hidden");


  sub.classList.add("hidden");

  if (!isOpen) {
    sub.classList.remove("hidden");
  }
}


function closeQuickLinkDropdowns() {
  document.getElementById("quickLinkAboutUsDropdown")?.classList.add("hidden");
  document.getElementById("quickLinkJoinUsDropdown")?.classList.add("hidden");
  document.getElementById("quickLinkMissionSubItems")?.classList.add("hidden");
}


document.addEventListener("click", function (e) {

  if (
    e.target.closest("#quickLinkAboutUsDropdown") ||
    e.target.closest("#quickLinkJoinUsDropdown") ||
    e.target.closest("#quickLinkMissionSubItems")
  ) {
    closeQuickLinkDropdowns();
    return;
  }


  if (!e.target.closest("#quickLinkAboutUsMenu") && !e.target.closest("#quickLinkJoinUsMenu")) {
    closeQuickLinkDropdowns();
  }
});
