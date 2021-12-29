const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[ data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    const randomBodyColor = getRandomHexColor();
    refs.body.style.backgroundColor = `${randomBodyColor}`;
  }, 1000);

  disableStartBtn();
  anableStopBtn();
}

function onStopBtnClick() {
  clearInterval(intervalId);
  intervalId = null;

  disableStopBtn();
  anableStartBtn();
}

function disableStartBtn() {
  refs.startBtn.setAttribute('disabled', 'true');
}

function anableStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function disableStopBtn() {
  refs.stopBtn.setAttribute('disabled', 'true');
}

function anableStopBtn() {
  refs.stopBtn.removeAttribute('disabled');
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
