function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  colorSwitcherStart: document.querySelector('button[data-start]'),
  colorSwitcherStop: document.querySelector('button[data-stop]'),
};

let changeColorOnClick = null;

refs.colorSwitcherStart.addEventListener('click', () => {
  changeColorOnClick = setInterval(() => {
    changeColor();
  }, 1000);
});

refs.colorSwitcherStop.addEventListener('click', () => {
  clearInterval(changeColorOnClick);
  refs.colorSwitcherStart.removeAttribute('disabled');
});

function changeColor() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
  refs.colorSwitcherStart.setAttribute('disabled', 'disabled');
}

// startBtn.addEventListener('click', () => {
//   timerId = setInterval(() => {
//     console.log(`I love async JS!  ${Math.random()}`);
//   }, 1000);
// });

// stopBtn.addEventListener('click', () => {
//   clearInterval(timerId);
//   console.log(`Interval with id ${timerId} has stopped!`);
// });
