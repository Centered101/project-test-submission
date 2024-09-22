let noClickCount = 0;

function changeImage(newSrc) {
  document.getElementById("mainImage").src = newSrc;
}

function resetImage() {
  document.getElementById("mainImage").src = "doyou.png";
}
function handleNoClick() {
  noClickCount++;
  if (noClickCount < 10) {
    shrinkNoButton();
    moveNoButton();
  } else {
    showPage("noPage");
  }
}

function shrinkNoButton() {
  const noButton = document.getElementById("noButton");
  const currentPadding = parseFloat(getComputedStyle(noButton).padding);
  const currentFontSize = parseFloat(getComputedStyle(noButton).fontSize);

  noButton.style.padding = `${currentPadding * 0.9}px`;
  noButton.style.fontSize = `${currentFontSize * 0.9}px`;
}

function moveNoButton() {
  const noButton = document.getElementById("noButton");
  const container = noButton.parentElement;
  const containerRect = container.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxLeft = containerRect.width - buttonRect.width;
  const maxTop = containerRect.height - buttonRect.height;

  const randomLeft = Math.random() * maxLeft;
  const randomTop = Math.random() * maxTop;

  noButton.style.position = "absolute";
  noButton.style.left = `${randomLeft}px`;
  noButton.style.top = `${randomTop}px`;
}

function showPage(pageId) {
  document.getElementById("mainPage").classList.add("hidden");
  document.getElementById("lovePage").classList.add("hidden");
  document.getElementById("noPage").classList.add("hidden");
  document.getElementById(pageId).classList.remove("hidden");
}