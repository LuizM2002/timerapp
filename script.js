const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let interval;
let initialSeconds;
let tickTockAudio = document.getElementById("ticTacSound");

tickTockAudio.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
});

function startCountdown(counterId) {
  var counterElement = document.getElementById(counterId);
  var counterValue = parseInt(counterElement.value);
  if (isNaN(counterValue) || counterValue < 0) {
    alert("Por favor, insira um número válido.");
    return;
  }
  var minutes = counterValue;
  var seconds = minutes * 60;
  initialSeconds = seconds;
  var timerElement = document.getElementById('timer');
  var timeExpiredMessage = document.getElementById('time-expired-message');

  clearInterval(interval); // Limpa qualquer intervalo existente

  interval = setInterval(function() {
    var remainingMinutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    timerElement.textContent = formatTime(remainingMinutes) + ":" + formatTime(remainingSeconds);
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      timeExpiredMessage.classList.add('expired');
      tickTockAudio.pause();
    }
  }, 1000);

  tickTockAudio.currentTime = 0;
  tickTockAudio.play();
}

function resetCountdown() {
  clearInterval(interval); // Limpa qualquer intervalo existente
  var timerElement = document.getElementById('timer');
  var timeExpiredMessage = document.getElementById('time-expired-message');
  timerElement.textContent = "00:00";
  initialSeconds = 0;
  timeExpiredMessage.classList.remove('expired');
  tickTockAudio.pause();
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function getInputMinutes(counterId) {
  var counterElement = document.getElementById(counterId);
  var counterValue = parseInt(counterElement.value);
  return counterValue;
}

// Defina a função para entrar em tela cheia
function enterFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
}

let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

// Chame a função enterFullscreen() para entrar em tela cheia diretamente
enterFullscreen();

window.addEventListener(
  "resize",
  function (event) {
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;
    maxColumns = cw / fontSize;
  },
  true
);


let charArr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "А",
  "В",
  "Г",
  "Д",
  "Є",
  "Ѕ",
  "З",
  "И",
  "Ѳ",
  "І",
  "К",
  "Л",
  "М",
  "Н",
  "Ѯ",
  "Ѻ",
  "П",
  "Ч",
  "Р",
  "С",
  "Т",
  "Ѵ",
  "Ф",
  "Х",
  "Ѱ",
  "Ѿ",
  "Ц",
];

let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 13;
let maxColumns = cw / fontSize;


let frames = 0;

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    this.value =
      charArr[Math.floor(Math.random() * (charArr.length - 1))].toUpperCase();
    this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

    ctx.fillStyle = "rgba(0,255,0)";
    ctx.font = fontSize + "px sans-serif";
    ctx.fillText(this.value, this.x, this.y);
    this.y += this.speed;

    if (this.y > ch) {
      this.y = (Math.random() * ch) / 2 - 50;
      this.x = Math.floor(Math.random() * maxColumns) * fontSize;
      this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
    }
  }
}

let update = () => {
  if (fallingCharArr.length < maxCharCount) {
    let fallingChar = new FallingChar(
      Math.floor(Math.random() * maxColumns) * fontSize,
      Math.floor(Math.random() * ch)
    );
    fallingCharArr.push(fallingChar);
  }

  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, cw, ch);

  for (let el of fallingCharArr) {
    el.draw(ctx);
  }

  frames++;

  if (frames % 30 === 0) {
    fallingCharArr.shift();
  }

  requestAnimationFrame(update);
};

update();
