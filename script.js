let countdown;
let timeLeft = 0;
let totalTime = 0;
let isPaused = false;
const CIRCUMFERENCE = 753.98;

const display    = document.getElementById('display');
const timerLabel = document.getElementById('timerLabel');
const startBtn   = document.getElementById('startBtn');
const pauseBtn   = document.getElementById('pauseBtn');
const resetBtn   = document.getElementById('resetBtn');
const ring       = document.getElementById('ringProgress');
const hoursInput   = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function updateDisplay(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    display.textContent =
        `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function updateRing(remaining, total) {
    if (total <= 0) { ring.style.strokeDashoffset = CIRCUMFERENCE; return; }
    const progress = remaining / total;
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
}

function setBodyState(state) {
    document.body.classList.remove('running','paused','finished');
    if (state) document.body.classList.add(state);
}

function setInputsDisabled(disabled) {
    hoursInput.disabled = disabled;
    minutesInput.disabled = disabled;
    secondsInput.disabled = disabled;
}

function startTimer() {
    if (!isPaused) {
        const h = parseInt(hoursInput.value) || 0;
        const m = parseInt(minutesInput.value) || 0;
        const s = parseInt(secondsInput.value) || 0;
        timeLeft = (h * 3600) + (m * 60) + s;
        totalTime = timeLeft;
    }
    if (timeLeft <= 0) { alert('يرجى تحديد وقت صالح!'); return; }

    startBtn.textContent  = 'يعمل...';
    startBtn.disabled     = true;
    pauseBtn.disabled     = false;
    isPaused              = false;
    setBodyState('running');
    setInputsDisabled(true);
    timerLabel.textContent = 'يعمل';

    updateRing(timeLeft, totalTime);

    countdown = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        updateRing(timeLeft, totalTime);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            setBodyState('finished');
            timerLabel.textContent = 'انتهى!';
            ring.style.strokeDashoffset = 0;
            setTimeout(() => { alert('⏰ انتهى الوقت!'); resetTimer(); }, 200);
        }
    }, 1000);
}

function pauseTimer() {
    if (!isPaused) {
        clearInterval(countdown);
        isPaused = true;
        setBodyState('paused');
        timerLabel.textContent = 'متوقف';
        pauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
        </svg>`;
        pauseBtn.title = 'استئناف';
    } else {
        isPaused = false;
        pauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>`;
        pauseBtn.title = 'إيقاف مؤقت';
        startTimer();
    }
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 0; totalTime = 0; isPaused = false;
    updateDisplay(0);
    updateRing(0, 1);
    ring.style.strokeDashoffset = CIRCUMFERENCE;
    startBtn.disabled  = false;
    startBtn.textContent = 'ابدأ';
    pauseBtn.disabled  = true;
    pauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="4" width="4" height="16" rx="1"/>
        <rect x="14" y="4" width="4" height="16" rx="1"/>
    </svg>`;
    pauseBtn.title = 'إيقاف مؤقت';
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
    setBodyState(null);
    setInputsDisabled(false);
    timerLabel.textContent = 'جاهز';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
