console.log('Starting my code... ')

let questionNumber = 0
const response_q1 = document.getElementById('response_q1')
const response_q2 = document.getElementById('response_q2')
const response_q3 = document.getElementById('response_q3')
const response_q4 = document.getElementById('response_q4')
const last_line_hr = document.getElementById('last_line_hr')
const thanks = document.getElementById('thanks')
const bullet = String.fromCodePoint(0x2714)

const dob_month_selected = document.getElementById('dob_month')
const birthdayMonth = dob_month_selected.selectedIndex + 1
const birthdayDay = document.getElementById('dob_day').value

function calcDaysAway(date) {
  const millToDays = 1000 * 60 * 60 * 24

  const today = new Date()

  let numberOfDaysAway = Math.ceil((date - today) / millToDays)
  if (numberOfDaysAway < 0) {
    numberOfDaysAway = 365 + numberOfDaysAway
  }
  return numberOfDaysAway
}

function calcBirthdayDaysAway() {
  let birthdayYear = new Date().getFullYear()
  console.log(`year is ${birthdayYear}`)

  // const dob_month_selected = document.getElementById('dob_month')
  //   const birthdayMonth = dob_month_selected.selectedIndex + 1
  // //   console.log(`month is ${birthdayMonth}`)
  //   const birthdayDay = document.getElementById('dob_day').value
  //   console.log(`day is ${birthdayDay}`)

  let birthdayDate = new Date(
    birthdayYear + '-' + birthdayMonth + '-' + birthdayDay
  )
  //   console.log(`Date is ${birthdayDate}`)
  return calcDaysAway(birthdayDate)
}

function calcHolidayDaysAway() {
  const holiday_selected = document.getElementById('holidays')
  const favoriteHoliday = holidays.options[holiday_selected.selectedIndex].value
  console.log(`Holiday selected is: ${favoriteHoliday}`)

  let mm = 1,
    dd = 1

  switch (favoriteHoliday) {
    case 'Chinese New Year':
      mm = 1
      dd = 22
      break
    case 'New Year':
      mm = 1
      dd = 1
      break
    case 'Xmas':
      mm = 12
      dd = 25
      break
    case 'Halloween':
      mm = 10
      dd = 31
      break
    case 'Hannukah':
      mm = 12
      dd = 7
      break
    case 'Kwanza':
      mm = 12
      dd = 26
      break
    case 'Ramadan':
      mm = 3
      dd = 26
      break
    default:
      mm = 1
      dd = 1
  }
  let holidayYear = new Date().getFullYear()
  let holidayDate = new Date(holidayYear + '-' + mm + '-' + dd)
  console.log(`Holiday Date is: ${holidayDate}`)
  return [calcDaysAway(holidayDate), favoriteHoliday]
}

function runChatbot() {
  event.preventDefault()

  const question = document.getElementById('question')

  const answer = document.getElementById('answer').value

  if (questionNumber === -1) {
    response_q1.innerHTML =""
    response_q2.innerHTML =""
    response_q3.innerHTML =""
    response_q4.innerHTML =""
    last_line_hr.style.visibility = 'hidden'
    thanks.innerHTML =""
    question.innerHTML ="What is your name?"
    answerForm.style.display = 'block'
    birthdayForm.style.display = 'none'
    holidayForm.style.display = 'none'
    ageForm.style.display = 'none'

  } else if (questionNumber === 0) {
    response_q1.innerText = `${bullet} Your name is, ${answer}.`
    question.innerText = 'when is your birthday?'
  } else if (questionNumber === 1) {
    response_q2.innerText = `${bullet} Your birthday is ${calcBirthdayDaysAway()} days away`
    question.innerText = 'What is your favorite Holiday ?'
  } else if (questionNumber === 2) {
    calcHolidayDaysAway()
    response_q3.innerText = `${bullet} your favorite holiday, ${
      calcHolidayDaysAway()[1]
    }, is ${calcHolidayDaysAway()[0]} days away`
    question.innerText = 'How old are you?'
  } else if (questionNumber === 3) {
    let thisYear = new Date().getFullYear()
    const age = document.getElementById('age').value
    const dob_month_selected = document.getElementById('dob_month')
    // const birthdayMonth = dob_month_selected.selectedIndex + 1
    // const birthdayDay = document.getElementById('dob_day').value
    let birthdayDate = new Date(
      thisYear + '-' + birthdayMonth + '-' + birthdayDay
    )
    let birthyear = thisYear - age
    if (birthdayDate - new Date() > 0) {
      birthyear--
    }
    response_q4.innerText = `${bullet} Your were born in ${birthyear}`
    question.style.display = 'none'
    last_line_hr.style.visibility = 'visible'
    thanks.innerText = `Thanks for chating!`
  }
  questionNumber++
}

const answerForm = document.getElementById('answerForm')
const birthdayForm = document.getElementById('birthdayForm')
const holidayForm = document.getElementById('holidayForm')
const ageForm = document.getElementById('ageForm')
const restartButton = document.getElementById('restartButton')

birthdayForm.style.display = 'none'
holidayForm.style.display = 'none'
ageForm.style.display = 'none'

answerForm.addEventListener('submit', function (event) {
  runChatbot()
  answerForm.style.display = 'none'
  birthdayForm.style.display = 'block'
})

birthdayForm.addEventListener('submit', function (event) {
  runChatbot()
  birthdayForm.style.display = 'none'
  holidayForm.style.display = 'block'
})

holidayForm.addEventListener('submit', function (event) {
  runChatbot()
  holidayForm.style.display = 'none'
  ageForm.style.display = 'block'
})

ageForm.addEventListener('submit', function (event) {
  runChatbot()
  ageForm.style.display = 'none'
})

restartButton.addEventListener('click', function (event) {
  console.log('reloading')
  questionNumber = -1
  runChatbot()
  // location.reload()
})
