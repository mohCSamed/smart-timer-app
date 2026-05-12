let countdown;
let timeLeft;
let isPaused = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function updateDisplay(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    display.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isPaused) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        timeLeft = (hours * 3600) + (minutes * 60) + seconds;
    }

    if (timeLeft <= 0) return alert('يرجى تحديد وقت صالح!');

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    isPaused = false;
    pauseBtn.textContent = "إيقاف مؤقت";

    countdown = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert('انتهى الوقت!');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isPaused) {
        clearInterval(countdown);
        isPaused = true;
        pauseBtn.textContent = "استئناف";
        startBtn.disabled = true;
    } else {
        isPaused = false;
        pauseBtn.textContent = "إيقاف مؤقت";
        startTimer();
    }
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    isPaused = false;
    updateDisplay(0);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "إيقاف مؤقت";
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
