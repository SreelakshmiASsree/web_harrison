
const missionBtn = document.getElementById("missionButton");
const missionDropdown = document.getElementById("missionDropdown");

missionBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Toggle dropdown
  missionDropdown.classList.toggle("hidden");

  // Toggle active blue color
  missionBtn.classList.toggle("text-blue-500");
  missionBtn.classList.toggle("text-gray-800");
});



document.addEventListener("click", function (event) {
  const menu = document.getElementById("aboutUsMenu");
  if (!menu.contains(event.target)) {
    document.getElementById("aboutUsDropdown").style.display = "none";
    document.getElementById("missionSubItems").style.display = "none";
  }
});





