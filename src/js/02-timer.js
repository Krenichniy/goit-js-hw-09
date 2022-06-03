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

const timer = {
  start() {
    const startTime = new Date('2022-06-04 14:25:00');
    setInterval(() => {
      const currentTime = new Date();
      const timeDelta = startTime - currentTime;
      const timeCounter = convertMs(timeDelta);

      updateUserInterface(timeCounter);
      //   console.log(`${days} : ${hours}: ${minutes}: ${seconds}`);
    }, 1000);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.userInput, options);

// flatpickr.onClose();

function pad(value) {
  return String(value).padStart(2, '0');
}

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
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// function addLeadingZero(value) {
//   padStart();
// }

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');

refs.btnStart.addEventListener('click', timer.start);
