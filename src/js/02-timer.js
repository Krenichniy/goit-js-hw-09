import flatpickr from 'flatpickr';

import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  userInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  seconds: document.querySelector('span[data-seconds]'),
  minutes: document.querySelector('span[data-minutes]'),
  hours: document.querySelector('span[data-hours]'),
  days: document.querySelector('span[data-days]'),
};

refs.btnStart.setAttribute('disabled', '');

const timer = {
  intervalValid: null,
  userDate: null,
  start() {
    this.intervalValid = setInterval(() => {
      const currentTime = Date.now();
      const timeDelta = this.userDate - currentTime;

      if (timeDelta <= 0) {
        this.stop();
        return;
      }
      const timeCounter = convertMs(timeDelta);

      updateUserInterface(timeCounter);
      refs.btnStart.setAttribute('disabled', '');
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalValid);
    refs.btnStart.setAttribute('disabled', '');
  },

  checkDate(selectedDate) {
    const chooseDate = Date.parse(selectedDate);
    const dateNow = Date.now();
    if (chooseDate <= dateNow) {
      Notiflix.Notify.failure('Please enter valid date in the future');
      calendar.open();
    } else {
      refs.btnStart.removeAttribute('disabled', '');
      Notiflix.Notify.success('Timer is ready to start!');

      this.userDate = chooseDate;
    }
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.checkDate(selectedDates[0]);
  },
};

const calendar = flatpickr(refs.userInput, options);

function updateUserInterface({ days, hours, minutes, seconds }) {
  refs.seconds.textContent = seconds;
  refs.minutes.textContent = minutes;
  refs.hours.textContent = hours;
  refs.days.textContent = days;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));
