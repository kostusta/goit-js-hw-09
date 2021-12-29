const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[ data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick(event) {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  event.target.disabled = true;
  anableStopBtn();
}

function onStopBtnClick(event) {
  clearInterval(intervalId);
  intervalId = null;

  event.target.disabled = true;
  anableStartBtn();
}

function anableStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function anableStopBtn() {
  refs.stopBtn.removeAttribute('disabled');
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
