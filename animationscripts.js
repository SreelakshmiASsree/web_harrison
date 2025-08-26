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
  const heroImg = heroSlider.querySelector("img"); // <-- grab the <img>
  const dots = document.querySelectorAll("#heroDots .dot");
  const nextBtn = document.getElementById("nextBtn");
  const preBtn = document.getElementById("preBtn");

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

    heroImg.style.opacity = 0; // fade out
    preloadImage(currentIndex);

    setTimeout(() => {
      heroImg.src = sliderImages[currentIndex]; // <-- update image src
      heroImg.style.transition = "opacity 0.5s ease-in-out";
      heroImg.style.opacity = 1; // fade in
    }, 100);

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

  setInterval(() => {
    updateSlider((currentIndex + 1) % sliderImages.length);
  }, 5000);

  updateSlider(0);
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
