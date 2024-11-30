const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const millisecond = document.querySelector(".ms");

const minuteColonSecond = document.querySelector(".minute-colon-second")
const hourColonMinute = document.querySelector(".hour-colon-minute")

const playBtn = document.querySelector(".play-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset");
const timelapsBtn = document.querySelector(".time-laps");

const lapsHourColonMinute = document.querySelector(".laps-hour-colon-minute");
const lapsMinuteColonSecond = document.querySelector(".laps-minute-colon-second");

const lapsHour = document.querySelector(".laps-hour");
const lapsMinute = document.querySelector(".laps-minute");
const lapsSecond = document.querySelector(".laps-second");
const lapsMillisecond = document.querySelector(".laps-millisecond");

const header = document.querySelector('header')
const lapsList = document.querySelector('.laps-list')
const lapsDisplay = document.querySelector('.laps-display')

let highestLapTime = '2024-10-10T00:00:00'
let lowestLapTime = '2024-10-10T23:59:59'

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

function updateCurrentTiming(){
  millisecondCount += 1
  lapMillisecondCount += 1

    if(millisecondCount === 10){
      secondCount += 1
      millisecondCount = 0

      if(secondCount === 60){
        minuteCount += 1
        secondCount = 0

        if(minuteCount === 60){
          hourCount += 1
          minuteCount = 0

        }
      }
    }

    if(lapMillisecondCount === 10){
      lapSecondCount += 1
      lapMillisecondCount = 0

      if(lapSecondCount === 60){
        lapMinuteCount += 1
        lapSecondCount = 0

        if(lapMinuteCount === 60){
          lapHourCount += 1
          lapMinuteCount = 0

        }
      }
    }


    showUpdatedTime()

}


function showUpdatedTime(){
  millisecond.textContent = millisecondCount
  lapsMillisecond.textContent = lapMillisecondCount

  second.textContent = secondCount < 10 ? `0${secondCount}` : secondCount
  lapsSecond.textContent = lapSecondCount < 10 ? `0${lapSecondCount}` : lapSecondCount

  minute.textContent = minuteCount < 10 ? `0${minuteCount}` : minuteCount
  lapsMinute.textContent = lapMinuteCount < 10 ? `0${lapMinuteCount}` : lapMinuteCount

  hour.textContent = hourCount < 10 ? `0${hourCount}` : hourCount
  lapsHour.textContent = lapHourCount < 10 ? `0${lapHourCount}` : lapHourCount


  if(minuteCount > 0 || hourCount > 0){
    minute.classList.remove('hidden')
    minuteColonSecond.classList.remove('hidden')

    if(hourCount > 0){
        hour.classList.remove('hidden')
        hourColonMinute.classList.remove('hidden')
    }
  }

  if(lapMinuteCount > 0 || lapHourCount > 0){
    lapsMinute.classList.remove('hidden')
    lapsMinuteColonSecond.classList.remove('hidden')

    if(lapHourCount > 0){
      lapsHour.classList.remove('hidden')
      lapsHourColonMinute.classList.remove('hidden')
    }
  }


}





playBtn.addEventListener('click', (e) => startOrResumeTheStopWatch(e))
pauseBtn.addEventListener('click', (e) => pauseTheStopWatch(e))

timelapsBtn.addEventListener('click', showAndResetTimeLaps)
resetBtn.addEventListener('click', resetTheStopWatch)





function startOrResumeTheStopWatch(e){
    timeInterval = setInterval(updateCurrentTiming, 100)

    let element = e.currentTarget

    playBtn.classList.add('hidden')
    pauseBtn.classList.remove('hidden')
    resetBtn.classList.remove('hidden')
    timelapsBtn.classList.remove('hidden')

    setTimeout(function(){
      resizeBtn(element)
    }, 0)

}

function pauseTheStopWatch(e){
    clearInterval(timeInterval)

    let element = e.currentTarget

    playBtn.classList.remove('hidden')
    pauseBtn.classList.add('hidden')
    timelapsBtn.classList.add('hidden')

    setTimeout(function(){
      resizeBtn(element)
    }, 0)

}

function resizeBtn(btn){
    btn = btn.classList.contains('pause-btn')

    playBtn.style.width = btn ? '100px' : '170px';
    pauseBtn.style.width = btn ? '100px' : '170px';
    playBtn.style.borderRadius = btn ? '50%' : '100px';
    pauseBtn.style.borderRadius = btn ? '50%' : '100px';
}

function showAndResetTimeLaps(){

  let isHighestLap = false
  let isLowestLap = false

  let lapHour = lapHourCount < 10 ? `0${lapHourCount}` : lapHourCount
  let lapMinute = lapMinuteCount < 10 ? `0${lapMinuteCount}` : lapMinuteCount
  let lapSecond = lapSecondCount < 10 ? `0${lapSecondCount}` : lapSecondCount
  let lapMillisecond = lapMillisecondCount

  let overallHour = hourCount < 10 ? `0${hourCount}` : hourCount
  let overallMinute = minuteCount < 10 ? `0${minuteCount}` : minuteCount
  let overallSecond = secondCount < 10 ? `0${secondCount}` : secondCount
  let overallMillisecond = millisecondCount

  resetTimeLaps()

  let timeString = `2024-10-10T${lapHour}:${lapMinute}:${lapSecond}.${lapMillisecond}`

  let currentLapTime = Date.parse(timeString)
  let previousHighestLapTime = Date.parse(highestLapTime)
  let previousLowestLapTime = Date.parse(lowestLapTime)


  if(currentLapTime > previousHighestLapTime){
    highestLapTime = timeString
    changeIsHighestToFalse()
  }
  if(currentLapTime < previousLowestLapTime){
    lowestLapTime = timeString
    changeIsLowestToFalse()
  }


  function changeIsHighestToFalse(){
    lapTimingsArray = lapTimingsArray.map(lap => lap.isHighest ? {...lap, isHighest: false} : lap)
    isHighestLap = true
  }

  function changeIsLowestToFalse(){
    lapTimingsArray = lapTimingsArray.map(lap => lap.isLowest ? {...lap, isLowest: false} : lap)
    isLowestLap = true
  }


  const lapInfo = {
    lapTime: `${lapHour}:${lapMinute}:${lapSecond}.${lapMillisecond}`,
    overallTime: `${overallHour}:${overallMinute}:${overallSecond}.${overallMillisecond}`,
    isHighest: isHighestLap,
    isLowest: isLowestLap
  }


  lapTimingsArray.push(lapInfo)

  showTimeLaps()

}

function showTimeLaps(){
  lapsList.innerHTML = ``

  if(!header.classList.contains('hidden')){
    header.classList.add('hidden')

    setTimeout(function(){
      document.querySelector('.running-time').style.marginTop = '20px'
      lapsDisplay.style.display = 'flex'
    }, 0)

  }


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

  lapsHour.classList.add('hidden')
  lapsHourColonMinute.classList.add('hidden')
  lapsMinute.classList.add('hidden')
  lapsMinuteColonSecond.classList.add('hidden')
}


function resetTheStopWatch(){
  millisecondCount = 0
  secondCount = 0
  minuteCount = 0
  hourCount = 0
  clearInterval(timeInterval)
  header.classList.remove('hidden')
  lapsDisplay.style.display = 'none'


  setTimeout(function(){
    document.querySelector('.running-time').style.marginTop = '100px'
  }, 0)

  resetBtn.classList.add('hidden')
  timelapsBtn.classList.add('hidden')

  pauseBtn.classList.add('hidden')
  playBtn.classList.remove('hidden')

  setTimeout(function(){
    playBtn.style.width = '100px'
    playBtn.style.borderRadius = '50%'
    pauseBtn.style.width = '100px'
    pauseBtn.style.borderRadius = '50%'
  }, 0)

  lapsList.innerHTML = ''
  lapTimingsArray = []

  highestLapTime = '2024-10-10T00:00:00'
  lowestLapTime = '2024-10-10T23:59:59'

  resetTimeLaps()
  showUpdatedTime()



}
