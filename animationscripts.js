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
// JS
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

  [imgCurrent, imgNext].forEach((img) => {
    img.classList.add("absolute", "w-full", "h-full", "object-cover");
    img.setAttribute("draggable", "false");
    heroSlider.appendChild(img);
  });

  imgCurrent.src = sliderImages[0];

  // Preload images
  const preloadedImages = [];
  function preloadImage(index) {
    if (!preloadedImages[index]) {
      const img = new Image();
      img.src = sliderImages[index];
      preloadedImages[index] = img;
    }
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === currentIndex);
      dot.classList.toggle("bg-transparent", i !== currentIndex);
    });
  }

  function slideTo(index) {
    const nextIndex = (index + sliderImages.length) % sliderImages.length;
    const direction = index > currentIndex ? 1 : -1;

    imgNext.src = sliderImages[nextIndex];

    // Reset positions
    imgCurrent.style.transition = "none";
    imgNext.style.transition = "none";
    imgNext.style.transform = `translateX(${direction * 100}%)`;
    imgCurrent.style.transform = "translateX(0)";

    void imgNext.offsetWidth; // force reflow

    // Animate
    imgCurrent.style.transition = "transform 0.6s ease-in-out";
    imgNext.style.transition = "transform 0.6s ease-in-out";
    imgCurrent.style.transform = `translateX(${direction * -100}%)`;
    imgNext.style.transform = "translateX(0)";

    setTimeout(() => {
      imgCurrent.src = sliderImages[nextIndex];
      imgCurrent.style.transition = "none";
      imgCurrent.style.transform = "translateX(0)";
      imgNext.style.transition = "none";
      imgNext.style.transform = "translateX(100%)";
      currentIndex = nextIndex;
      updateDots();
      preloadImage((currentIndex + 1) % sliderImages.length);
    }, 600);
  }

  // Dots click
  dots.forEach((dot, i) => dot.addEventListener("click", () => {
    slideTo(i);
    resetAutoSlide();
  }));

  // Auto-slide
  let autoSlideTimer = setInterval(() => slideTo(currentIndex + 1), 5000);
  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => slideTo(currentIndex + 1), 5000);
  }

  // Next/Prev buttons
  nextBtn.addEventListener("click", () => { slideTo(currentIndex + 1); resetAutoSlide(); });
  preBtn.addEventListener("click", () => { slideTo(currentIndex - 1); resetAutoSlide(); });

  updateDots();
  preloadImage(0);

  // Drag/Swipe
  let isDragging = false, startX = 0, currentTranslate = 0, nextIndexDrag = 0;

  function getNextIndex(direction) {
    return (currentIndex + direction + sliderImages.length) % sliderImages.length;
  }

  function dragStart(e) {
    isDragging = true;
    startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    imgCurrent.style.transition = "none";
    imgNext.style.transition = "none";
     heroSlider.style.cursor = "move";
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    currentTranslate = currentX - startX;
    const direction = currentTranslate < 0 ? 1 : -1;
    nextIndexDrag = getNextIndex(direction);
    imgNext.src = sliderImages[nextIndexDrag];

    const width = heroSlider.offsetWidth;
    imgCurrent.style.transform = `translateX(${currentTranslate}px)`;
    imgNext.style.transform = `translateX(${currentTranslate < 0 ? width + currentTranslate : -width + currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;

    const width = heroSlider.offsetWidth;
    const threshold = width / 6;
     heroSlider.style.cursor = "move";

    if (Math.abs(currentTranslate) > threshold) {
      const direction = currentTranslate < 0 ? 1 : -1;
      imgCurrent.style.transition = "transform 0.3s ease-out";
      imgNext.style.transition = "transform 0.3s ease-out";
      imgCurrent.style.transform = `translateX(${direction * -width}px)`;
      imgNext.style.transform = `translateX(0)`;

      setTimeout(() => {
        imgCurrent.src = sliderImages[nextIndexDrag];
        imgCurrent.style.transition = "none";
        imgCurrent.style.transform = "translateX(0)";
        imgNext.style.transition = "none";
        currentIndex = nextIndexDrag;
        updateDots();
        resetAutoSlide();
      }, 300);
    } else {
      imgCurrent.style.transition = "transform 0.3s ease-out";
      imgNext.style.transition = "transform 0.3s ease-out";
      imgCurrent.style.transform = "translateX(0)";
      imgNext.style.transform = currentTranslate < 0 ? `translateX(${width}px)` : `translateX(-${width}px)`;
    }
    currentTranslate = 0;
  }

  heroSlider.addEventListener("mousedown", dragStart);
  heroSlider.addEventListener("mousemove", dragMove);
  heroSlider.addEventListener("mouseup", dragEnd);
  heroSlider.addEventListener("mouseleave", dragEnd);
  heroSlider.addEventListener("touchstart", dragStart, { passive: true });
  heroSlider.addEventListener("touchmove", dragMove, { passive: true });
  heroSlider.addEventListener("touchend", dragEnd);
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
