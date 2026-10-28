var currentTime = new Date().toLocaleString();
var timeText = document.querySelector("#timeElement");
setInterval(() => {
    timeText.innerHTML = currentTime;
},1000);

var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenOpen = document.querySelector("#welcomeOpen");
var notesScreen = document.querySelector("#notes")
var notesopen = document.querySelector("#notesopen")
var terradleopen = document.querySelector("#terradleopen")
var terradlescreen = document.querySelector("#terradle")
var musicScreen = document.querySelector("#music")
var musicopen = document.querySelector("#musicopen")
var topBar = document.querySelector("#top")
var musicplay = document.querySelector("#musicplay")
var musicprevious = document.querySelector("#musicprevious")
var musicnext = document.querySelector("#musicnext")
var musictitle = document.querySelector("#song")
var audio = document.querySelector("#audio")
var selectedIcon = undefined
var biggestIndex = 1;

var index = 0;
var songs = [
  {title:"Overworld", src: "./assets/Music-Overworld_Day.mp3"},
  {title:"Snow",src:"./assets/Music-Snow.mp3"},
  {title:"Underground",src:"./assets/Music-Underground.mp3"},
  {title:"Plantera",src:"./assets/Music-Plantera.mp3"},
  {title:"Day remix",src:"./assets/Music-Contest_Winner.mp3"}

]

function loadSong() {
  audio.src = songs[index].src;
  musictitle.innerHTML = songs[index].title;
}
function toggleMusic() {
  if (audio.paused) {
    audio.play()
    musicplay.innerHTML = "⏹️";
  }
  else {
    audio.pause();
    musicplay.innerHTML = "▶️"
  }
}
function nextSong() {
  index = (index+1)% songs.length;
  loadSong()
  toggleMusic()
}
function previousSong() {
  index = (index-1+songs.length)%songs.length;
  loadSong();
  toggleMusic();
}

musicplay.addEventListener("click", toggleMusic)
musicnext.addEventListener("click", nextSong)
musicprevious.addEventListener("click",previousSong)

loadSong()


var content = [
  {
    title: "Welcome",
    date: "2026-10-27",
    content: `<p contenteditable="True">Super epic notes for any <strong>cool</strong> person. Also this notepad can be used for random things like writing, typing and maybe even texting!!</p>`
  }]
function setNotesContent(index) {
  var notesContent = document.querySelector("#notescontent")
  notesContent.innerHTML = content[index].content
}
setNotesContent(0)

function addToSideBar(index) {
  var sidebar = document.querySelector("#notesidebar")
  var note = content[index]
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `
  <p style="margin:0;">
    ${note.title}
  </p>
  <p style="margin:0; font-size:12px;">
    ${note.date}
  </p>
  `;
  newDiv.addEventListener("click",() => {
    setNotesContent(index)
  })
  sidebar.appendChild(newDiv)
}
for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}


welcomeScreenOpen.addEventListener("click", (e) => {openWindow(welcomeScreen)});
notesopen.addEventListener("click",(e) => {handleIconTap(notesopen,notesScreen)});
terradleopen.addEventListener("click",(e)=> {handleIconTap(terradleopen,terradlescreen);})
musicopen.addEventListener("click",(e) => {handleIconTap(musicopen,musicScreen)})

initialize("welcome")
initialize("notes")
initialize("terradle")
initialize("music")

function initialize(element) {
  var screen = document.querySelector("#"+element)
  addWindowTapHandling(screen)
  closableLogic(element)
  dragElement(screen)
}

function closableLogic(element) {
  var screen = document.querySelector("#"+element)
  var screenClose = document.querySelector("#"+element+"close")
  screenClose.addEventListener("click", () => closeWindow(screen))
}
function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => handleWindowTap(element))
}
function handleWindowTap(element) {
  biggestIndex ++
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
  
}

function selectIcon(element) {
  element.classList.add("selected")
  selectedIcon = element
}
function deselectIcon(element) {
  element.classList.remove("selected")
  selectedIcon = undefined
}
function handleIconTap(element,window) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  }
  else {
    selectIcon(element)
  }
}
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "flex"
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

// Make the DIV element draggable:
// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}