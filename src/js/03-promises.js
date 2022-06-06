import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  btnToCreatePromise: document.querySelector('button'),
};

let formData = {};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      }
      // Reject
      reject({ position, delay });
    }, delay);

    // if (amount <= 3) {
    //   clearInterval(promisesCounter);
    //   return;
    // }
  });
}

function promisesCounter() {
  event.preventDefault();
  const { delay, step, amount } = formData;

  for (let i = 0; i < amount; i += 1) {
    const userDelay = delay + step * i;
    createPromise(i + 1, userDelay)
      .then(onPromiseSuccess)
      // .then(({ position, delay }) => {
      //   Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      // })
      .catch(onPromiseError);
    // .catch(({ position, delay }) => {
    //   Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    // });
  }
}

function onPromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onPromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌Rejected promise ${position} in ${delay}ms`);
}

function getInputValue(event) {
  formData[event.target.name] = event.target.valueAsNumber;
}

refs.form.addEventListener('input', getInputValue);
refs.form.addEventListener('submit', promisesCounter);
