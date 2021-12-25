import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.2.min.css'

const refs = {
  datetimePicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

//
//-----Date Picker Initialisation-----
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDateHandler(selectedDates);
  },
};

const fp = flatpickr(refs.datetimePicker, options);

//
//-----Date Selection Handler-----

function selectedDateHandler(selectedDates) {
  const currentDate = new Date();

  if (currentDate.getTime() >= selectedDates[0].getTime()) {
    Notify.failure('Please choose a date in the future');
    disableStartBtn();
    return;
  }

  anableStartBtn();
}

function disableStartBtn() {
  refs.startBtn.setAttribute('disabled', 'true');
}

function anableStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

//
//-----Time Countdown-----

class Timer {
  constructor({ timerInstance, timerRenderFn }) {
    this.intervalId = null;
    this.timerInstance = timerInstance;
    this.timerRenderFn = timerRenderFn;
  }

  timeCountdownStart() {
    const countdownTime = this.timerInstance.selectedDates[0].getTime();

    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const ms = countdownTime - currentTime;

      if (ms < 0) {
        return;
      }

      const timeObject = this.convertMs(ms);
      this.timerRenderFn(timeObject);
    }, 1000);
  }

  addLeadingZero(value,) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  timerInstance: fp,
  timerRenderFn: remainingTimeRender,
});

//
//----- Timer Render-----

refs.startBtn.addEventListener('click', onStartBtnClisk);

function onStartBtnClisk() {
  timer.timeCountdownStart();
}

function remainingTimeRender({ days, hours, minutes, seconds }) {
  refs.days.textContent = (days);
  refs.hours.textContent = (hours);
  refs.minutes.textContent = (minutes);
  refs.seconds.textContent = (seconds);
}

//
//-----Time Countdown-----

// let intervalId = null;

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function timeCountdownStart() {
//   const countdownTime = fp.selectedDates[0].getTime();

//   if (intervalId) {
//     return;
//   }

//   intervalId = setInterval(() => {
//     const currentTime = new Date().getTime();
//     const ms = countdownTime - currentTime;

//     if (ms < 0) {
//       return;
//     }

//     const timeObject = convertMs(ms);
//     remainingTimeRender(timeObject);
//   }, 1000);
// }
