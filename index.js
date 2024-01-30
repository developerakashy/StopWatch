var hour = document.querySelector(".hourCount");
var minute = document.querySelector(".minuteCount");
var hourColon = document.querySelector(".hourName");
var minuteColon = document.querySelector(".minuteName");
var timeMs = document.querySelector(".time-ms");
var hourBeforeColon = document.querySelector(".hour");
var minuteBeforeColon = document.querySelector(".minute");
var second = document.querySelector(".secondCount");
var ms = document.querySelector(".msCount");

var timePeriodOfHour = 0;
var timePeriodOfMinute = 0;
var timePeriodOfsecond = 0;
var timePeriodOfMs = 0;

hour.textContent = timePeriodOfHour;
minute.textContent = timePeriodOfMinute;
second.textContent = timePeriodOfsecond;
ms.textContent = timePeriodOfMs;

hourBeforeColon.style.display = "none";
minuteBeforeColon.style.display = "none";
minuteColon.style.display = "none";
hourColon.style.display = "none";

var removetwodigitKeeperMs = () => {
  document.querySelectorAll(".zero-keeper")[3].style.display = "none";
};

var addtwodigitKeeperMs = () => {
  document.querySelectorAll(".zero-keeper")[3].style.display = "revert";
};

var removetwodigitKeeperS = () => {
  document.querySelectorAll(".zero-keeper")[2].style.display = "none";
};

var addtwodigitKeeperS = () => {
  document.querySelectorAll(".zero-keeper")[2].style.display = "revert";
};

var removetwodigitKeeperM = () => {
  document.querySelectorAll(".zero-keeper")[1].style.display = "none";
};

var addtwodigitKeeperM = () => {
  document.querySelectorAll(".zero-keeper")[1].style.display = "revert";
};

var removetwodigitKeeperH = () => {
  document.querySelectorAll(".zero-keeper")[0].style.display = "none";
};

var addtwodigitKeeperH = () => {
  document.querySelectorAll(".zero-keeper")[0].style.display = "revert";
};

const HourChanger = () => {
  if (timePeriodOfHour === 9) {
    removetwodigitKeeperH();
  }
  timePeriodOfHour += 1;
  hour.textContent = timePeriodOfHour;
};

const minuteChanger = () => {
  if (timePeriodOfMinute === 59) {
    HourChanger();
    hourBeforeColon.style.display = "revert";
    hourColon.style.display = "revert";
    hourBeforeColon.style.display = "flex";
    timeMs.style.width = "134%";
    let mediaQuery = window.matchMedia("(width < 350px)");
    if (mediaQuery.matches) {
      timeMs.style.width = "100%";
    }
    addtwodigitKeeperM();
    timePeriodOfMinute = 0;
    minute.textContent = timePeriodOfMinute;
  } else {
    if (timePeriodOfMinute === 9) {
      removetwodigitKeeperM();
    }
    timePeriodOfMinute += 1;
    minute.textContent = timePeriodOfMinute;
  }
};

const secondChanger = () => {
  if (timePeriodOfsecond === 59) {
    minuteChanger();
    minuteBeforeColon.style.display = "revert";
    minuteColon.style.display = "revert";
    minuteBeforeColon.style.display = "flex";
    addtwodigitKeeperS();
    timePeriodOfsecond = 0;
    second.textContent = timePeriodOfsecond;
  } else {
    if (timePeriodOfsecond === 9) {
      removetwodigitKeeperS();
    }
    timePeriodOfsecond += 1;
    second.textContent = timePeriodOfsecond;
  }
};

const msChanger = () => {
  if (timePeriodOfMs === 99) {
    addtwodigitKeeperMs();
    timePeriodOfMs = 0;
    ms.textContent = timePeriodOfMs;
  } else {
    if (timePeriodOfMs === 9) {
      removetwodigitKeeperMs();
    }
    timePeriodOfMs += 1;
    ms.textContent = timePeriodOfMs;
  }
};

var playPauseButton = document.querySelector(".playPause");
var pause = document.querySelector(".pause");
var reset = document.querySelector(".reset");
var timelaps = document.querySelector(".time-laps");
var displayTime = document.querySelector(".display-time");
var displayHour = document.querySelector(".display-hour");
var displayMinute = document.querySelector(".display-min");
var displaySecond = document.querySelector(".display-sec");
var displayMs = document.querySelector(".display-ms");
var lapsDisplay = document.querySelector(".laps-display");
var lapsCountDisplay = document.querySelector(".numbering");
var lapsCount = 0;

// lapsDisplay.style.display = "none";
reset.style.display = "none";
pause.style.display = "none";
timelaps.style.display = "none";
var textCount = 0;

const blinknone = () => {
  document.querySelector(".time").style.display = "none";
  document.querySelector(".time-ms").style.display = "none";
};

const blinkrevert = () => {
  document.querySelector(".time").style.display = "revert";
  document.querySelector(".time-ms").style.display = "revert";
  document.querySelector(".time").style.display = "flex";
  document.querySelector(".time-ms").style.display = "flex";
};

playPauseButton.addEventListener("click",(event)=>{
   event.preventDefault();
  pause.style.transition = "border-radius .5s 0s,width .5s 0s";
  setTimeout(()=>{
    pause.style.width = "240px";
    pause.style.borderRadius = "40px";
    playPauseButton.style.width = "140px";
    playPauseButton.style.borderRadius = "30px";

  },10)
})

pause.addEventListener("click",(event)=>{
  event.preventDefault();
 playPauseButton.style.transition = "border-radius .5s 0s,width .5s 0s";
 setTimeout(()=>{
   playPauseButton.style.width = "100px";
   playPauseButton.style.borderRadius = "50%";
   pause.style.width = "100px";
   pause.style.borderRadius = "50%";

 },10)
})

timelaps.addEventListener("click",(event)=>{
  event.preventDefault()
  document.querySelector(".running-timer").style.transition = "margin-top .5s 0s";
  setTimeout(()=>{
    document.querySelector(".overflow").style.height = "236px";
  },500)
})

 

playPauseButton.addEventListener("click", () => {
  var secondInterval = setInterval(secondChanger, 1000);
  var msInterval = setInterval(msChanger, 10);
  playPauseButton.style.display = "none";
  pause.style.display = "revert";
  
  reset.style.display = "revert";
  timelaps.style.display = "revert";

  pause.addEventListener("click", () => {
    clearInterval(secondInterval);
    clearInterval(msInterval);

    var blinkout = setInterval(blinkrevert, 500);
    var blinkin = setInterval(blinknone, 1000);

    playPauseButton.addEventListener("click", () => {
      clearInterval(blinkin);
      clearInterval(blinkout);
      blinkrevert();
    });
    reset.addEventListener("click", () => {
      clearInterval(blinkin);
      clearInterval(blinkout);
      blinkrevert();
    });
    pause.style.display = "none";
    playPauseButton.style.display = "revert";
    timelaps.style.display = "none";
  });

  reset.addEventListener("click", () => {
    var textlaps = document.querySelectorAll(".para-text");
    for (let i = 0; i < textCount; i++) {
      textlaps[i].style.display = "none";
    }
    timePeriodOfHour = 0;
    timePeriodOfMinute = 0;
    timePeriodOfsecond = 0;
    timePeriodOfMs = 0;
    minute.textContent = timePeriodOfMinute;
    hour.textContent = timePeriodOfHour;
    second.textContent = timePeriodOfsecond;
    ms.textContent = timePeriodOfMs;
    playPauseButton.style.display = "revert";
    pause.style.display = "none";
    clearInterval(secondInterval);
    clearInterval(msInterval);
    addtwodigitKeeperMs();
    addtwodigitKeeperS();
    hourBeforeColon.style.display = "none";
    minuteBeforeColon.style.display = "none";
    minuteColon.style.display = "none";
    hourColon.style.display = "none";
    timeMs.style.width = "85%";
    timelaps.style.display = "none";
    reset.style.display = "none";
    lapsDisplay.style.display = "none";
    document.querySelector(".running-timer").style.marginTop = "100px";
    document.querySelector(".action").style.marginTop = "45px";
    lapsCount = 0;
     playPauseButton.style.transition = "border-radius .5s 0s,width .5s 0s";
     setTimeout(()=>{
       playPauseButton.style.width = "100px";
       playPauseButton.style.borderRadius = "50%";
       pause.style.width = "100px";
       pause.style.borderRadius = "50%";
       document.querySelector("header").style.display = "revert";
     },200)
     document.querySelector(".overflow").style.height = "4vh"
  });
});



timelaps.addEventListener("click", () => {
  lapsDisplay.style.display = "revert";
  document.querySelector(".running-timer").style.marginTop = "10px";
  document.querySelector("header").style.display = "none";
  
  lapsCount += 1;
  if (timePeriodOfHour < 10) {
    var element = document.createElement("p");
    element.classList.add("para-text");
    displayHour.prepend(element);
    element.textContent = `0${timePeriodOfHour}h`;
    textCount += 1;
  } else {
    var element = document.createElement("p");
    element.classList.add("para-text");
    displayHour.prepend(element);
    element.textContent = `${timePeriodOfHour}h`;
    textCount += 1;
  }

  if (timePeriodOfMinute < 10) {
    var element = document.createElement("p");
    element.classList.add("para-text");
    displayMinute.prepend(element);
    element.textContent = `0${timePeriodOfMinute}m`;
    textCount += 1;
  } else {
    var element = document.createElement("p");
    element.classList.add("para-text");
    displayMinute.prepend(element);
    element.textContent = `${timePeriodOfMinute}m`;
    textCount += 1;
  }

  if (timePeriodOfsecond < 10) {
    var element = document.createElement("p");
    element.classList.add("para-text");
    displaySecond.prepend(element);
    element.textContent = `0${timePeriodOfsecond}.${timePeriodOfMs}s`;
    textCount += 1;
  } else {
    var element = document.createElement("p");
    element.classList.add("para-text");
    displaySecond.prepend(element);
    element.textContent = `${timePeriodOfsecond}.${timePeriodOfMs}s`;
    textCount += 1;
  }

  if (lapsCount < 10) {
    var element = document.createElement("p");
    element.classList.add("para-text");
    lapsCountDisplay.prepend(element);
    element.textContent = `#0${lapsCount}`;
    textCount += 1;
  } else {
    var element = document.createElement("p");
    element.classList.add("para-text");
    lapsCountDisplay.prepend(element);
    element.textContent = `#${lapsCount}`;
    textCount += 1;
  }
});
