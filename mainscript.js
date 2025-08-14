
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




// footer dropdown
function toggleQuickLinkAboutUs(e) {
    e.preventDefault();
    e.stopPropagation();
    closeQuickLinkDropdowns();
    document.getElementById("quickLinkAboutUsDropdown").classList.toggle("hidden");
}

function toggleQuickLinkJoinUs(e) {
    e.preventDefault();
    e.stopPropagation();
    closeQuickLinkDropdowns();
    document.getElementById("quickLinkJoinUsDropdown").classList.toggle("hidden");
}

function toggleQuickLinkMissionSub(e, btn) {
    e.preventDefault();
    e.stopPropagation();
    const sub = document.getElementById("quickLinkMissionSubItems");
    const isOpen = !sub.classList.contains("hidden");
    document.getElementById("quickLinkMissionSubItems").classList.add("hidden");
    if (!isOpen) sub.classList.remove("hidden");
}

function closeQuickLinkDropdowns() {
    document.getElementById("quickLinkAboutUsDropdown")?.classList.add("hidden");
    document.getElementById("quickLinkMissionSubItems")?.classList.add("hidden");
    document.getElementById("quickLinkJoinUsDropdown")?.classList.add("hidden");
}

// Close all dropdowns when clicking outside
document.addEventListener("click", function () {
    closeQuickLinkDropdowns();
});
