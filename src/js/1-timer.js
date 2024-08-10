import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const refs = {
timer: document.querySelector('.timer'),
startBtn: document.querySelector('[data-start]'),
days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
minutes: document.querySelector('[data-minutes]'),
seconds: document.querySelector('[data-seconds]'),
picker: document.querySelector('#datetime-picker'),
};




let userDate = null;
let interval = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function validateDate(selectedDate) {
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please select a date in the future',
    });
    return false;
    }
    return true;
  }

  function startTimer() {
    interval = setInterval(() => {
      const now = new Date();
      const timeRemaining = userDate - now;
      if (timeRemaining <= 0) {
        clearInterval(interval);
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      refs.days.textContent = String(days).padStart(2, '0');
      refs.hours.textContent = String(hours).padStart(2, '0');
      refs.minutes.textContent = String(minutes).padStart(2, '0');
      refs.seconds.textContent = String(seconds).padStart(2, '0');
    }, 1000);
   }

const picker = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
      if (validateDate(userDate)) {
          refs.startBtn.disabled = false;
      } else {
          refs.startBtn.disabled = true;
      }
  },
});

refs.startBtn.addEventListener('click', () => { 
  if (userDate) {
      clearInterval(interval); 
      startTimer();
  }
});
