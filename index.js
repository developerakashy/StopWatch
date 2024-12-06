const hourPara = document.querySelector(".hour");
const minutePara = document.querySelector(".minute");
const secondPara = document.querySelector(".second");
const millisecondPara = document.querySelector(".ms");

const hourColonMinute = document.querySelector(".hour-colon-minute")

const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset");
const timelapsBtn = document.querySelector(".time-laps");

const lapsHourColonMinute = document.querySelector(".laps-hour-colon-minute");

const lapsHour = document.querySelector(".laps-hour");
const lapsMinute = document.querySelector(".laps-minute");
const lapsSecond = document.querySelector(".laps-second");
const lapsMillisecond = document.querySelector(".laps-millisecond");

const lapsList = document.querySelector('.laps-list')
const lapsDisplay = document.querySelector('.laps-display')
const lapsTime = document.querySelector('.laps-time')

let highestLapTime = 0
let lowestLapTime = 100000

let timeCaptured = 0
let lapTimeCaptured = 0

let totalMillisecond = 0
let millisecond = 0

let totalLapMillisecond = 0
let lapMillisecond = 0

let timeInterval
let lapTimingsArray = []

let millisecondCount = 0
let secondCount = 0
let minuteCount = 0
let hourCount = 0

let lapMillisecondCount = 0
let lapSecondCount = 0
let lapMinuteCount = 0
let lapHourCount = 0

playBtn.addEventListener('click', (e) => startOrResumeTheStopWatch(e))
pauseBtn.addEventListener('click', (e) => pauseTheStopWatch(e))

timelapsBtn.addEventListener('click', showAndResetTimeLaps)
resetBtn.addEventListener('click', resetTheStopWatch)

function updateCurrentTiming(){

  millisecond = Math.floor((Date.now() - timeCaptured) / 10) + totalMillisecond
  lapMillisecond = Math.floor((Date.now() - lapTimeCaptured) / 10) + totalLapMillisecond

  let second = Math.floor(millisecond / 100)
  let minute = Math.floor(second / 60)
  let hour = Math.floor(minute / 60)

  let lapSecond = Math.floor(lapMillisecond / 100)
  let lapMinute = Math.floor(lapSecond / 60)
  let lapHour = Math.floor(lapMinute / 60)

  millisecondCount = ((millisecond % 100) / 10)
  secondCount = second % 60 < 10 ? `0${second % 60}` : second % 60
  minuteCount = minute % 60 < 10 ? `0${minute % 60}` : minute % 60
  hourCount = hour < 10 ? `0${hour}` : hour

  lapMillisecondCount = ((lapMillisecond % 100) / 10)
  lapSecondCount = lapSecond % 60 < 10 ? `0${lapSecond % 60}` : lapSecond % 60
  lapMinuteCount = lapMinute % 60 < 10 ? `0${lapMinute % 60}` : lapMinute % 60
  lapHourCount = lapHour < 10 ? `0${lapHour}` : lapHour

  showUpdatedTime()

}


function showUpdatedTime(){
  millisecondPara.textContent = millisecondCount
  secondPara.textContent = secondCount
  minutePara.textContent = minuteCount
  hourPara.textContent = hourCount

  lapsMillisecond.textContent = lapMillisecondCount
  lapsSecond.textContent = lapSecondCount
  lapsMinute.textContent = lapMinuteCount
  lapsHour.textContent = lapHourCount

  if(Number(hourCount) > 0){
      hourPara.classList.remove('hidden')
      hourColonMinute.classList.remove('hidden')
  }

  if(Number(lapHourCount) > 0){
    lapsHour.classList.remove('hidden')
    lapsHourColonMinute.classList.remove('hidden')
  }

}


function startOrResumeTheStopWatch(e){
    timeCaptured = Date.now()
    lapTimeCaptured = Date.now()
    timeInterval = setInterval(updateCurrentTiming, 100)

    let element = e.currentTarget

    playBtn.classList.add('hidden')
    pauseBtn.classList.remove('hidden')
    resetBtn.classList.remove('visibility-hidden')
    timelapsBtn.classList.remove('visibility-hidden')

    setTimeout(function(){
      resizeBtn(element)
    }, 0)

}

function pauseTheStopWatch(e){
    totalMillisecond = millisecond
    totalLapMillisecond = lapMillisecond
    clearInterval(timeInterval)

    let element = e.currentTarget

    playBtn.classList.remove('hidden')
    pauseBtn.classList.add('hidden')
    timelapsBtn.classList.add('visibility-hidden')

    setTimeout(function(){
      resizeBtn(element)
    }, 0)

}

function resizeBtn(btn){
    btn = btn.classList.contains('pause-btn')

    playBtn.style.width = btn ? '100px' : '170px';
    pauseBtn.style.width = btn ? '100px' : '170px';
    playBtn.style.borderRadius = btn ? '50%' : '40px';
    pauseBtn.style.borderRadius = btn ? '50%' : '40px';
}

function showAndResetTimeLaps(){

  lapsTime.style.display = 'flex'

  let isHighestLap = false
  let isLowestLap = false

  if(lapMillisecond > highestLapTime){
    highestLapTime = lapMillisecond
    lapTimingsArray = lapTimingsArray.map(lap => lap.isHighest ? {...lap, isHighest: false} : lap)
    isHighestLap = true
  }

  if(lapMillisecond < lowestLapTime){
    lowestLapTime = lapMillisecond
    lapTimingsArray = lapTimingsArray.map(lap => lap.isLowest ? {...lap, isLowest: false} : lap)
    isLowestLap = true
  }

  let lapTimeStr = Number(lapHourCount) ?
                  `${lapHourCount}:${lapMinuteCount}:${lapSecondCount}.${lapMillisecondCount}` :
                  `${lapMinuteCount}:${lapSecondCount}.${lapMillisecondCount}`

  let overallTimeStr = Number(hourCount) ?
                      `${hourCount}:${minuteCount}:${secondCount}.${millisecondCount}` :
                      `${minuteCount}:${secondCount}.${millisecondCount}`

  const lapInfo = {
    lapTime: lapTimeStr,
    overallTime: overallTimeStr,
    isHighest: isHighestLap,
    isLowest: isLowestLap
  }

  lapTimingsArray.push(lapInfo)
  resetTimeLaps()
  showTimeLaps()

}

function showTimeLaps(){
  lapsList.innerHTML = ``


  setTimeout(function(){
    document.querySelector('.running-time').style.marginTop = '20px'
    lapsDisplay.style.display = 'flex'
  }, 0)


  lapTimingsArray.forEach((lap, index) => {
    const li = document.createElement('li')

    if(lap.isHighest && !lap.isLowest){
      li.classList.add('red')
    }

    if(lap.isLowest && !lap.isHighest){
      li.classList.add('green')
    }

    li.innerHTML = `
      <p>${index < 9 ? `0${index + 1}` : index + 1}</p>
      <p>${lap.lapTime}</p>
      <p>${lap.overallTime}</p>
    `
    lapsList.prepend(li)

  })
}

function resetTimeLaps(){
  lapMillisecondCount = 0
  lapSecondCount = 0
  lapMinuteCount = 0
  lapHourCount = 0

  totalLapMillisecond = 0
  totalMillisecond = millisecond
  timeCaptured = Date.now()
  lapTimeCaptured = Date.now()
  clearInterval(timeInterval)
  timeInterval = setInterval(updateCurrentTiming, 100)


  lapsHour.classList.add('hidden')
  lapsHourColonMinute.classList.add('hidden')
}


function resetTheStopWatch(){
  resetTimeLaps()
  clearInterval(timeInterval)

  lapsDisplay.style.display = 'none'
  lapsTime.style.display = 'none'

  millisecondCount = 0
  secondCount = `00`
  minuteCount = `00`
  hourCount = 0

  totalMillisecond = 0
  totalLapMillisecond = 0
  lapTimeCaptured = 0
  timeCaptured = 0

  hourPara.classList.add('hidden')
  hourColonMinute.classList.add('hidden')

  setTimeout(function(){
    document.querySelector('.running-time').style.marginTop = '100px'

    playBtn.style.width = '100px'
    playBtn.style.borderRadius = '50%'
    pauseBtn.style.width = '100px'
    pauseBtn.style.borderRadius = '50%'
  }, 0)

  resetBtn.classList.add('visibility-hidden')
  timelapsBtn.classList.add('visibility-hidden')

  pauseBtn.classList.add('hidden')
  playBtn.classList.remove('hidden')

  lapsList.innerHTML = ''
  lapTimingsArray = []

  highestLapTime = 0
  lowestLapTime = 100000

  showUpdatedTime()

}
