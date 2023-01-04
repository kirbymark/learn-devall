console.log('Starting my code... ');
let questionNumber = 0;
const response_q1 = document.getElementById("response_q1");
const response_q2 = document.getElementById("response_q2");
const bullet = String.fromCodePoint(0x2714); 

function calcDaysAway(date) {
       
    const millToDays = 1000*60*60*24;

    const today = new Date();
    let today_dd = String(today.getDate()).padStart(2, '0');
    let today_mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let today_yyyy = today.getFullYear();

    const todayDate = new Date(today_yyyy+"-"+today_mm+"-"+today_dd)
    let millsecondsAway = (date - todayDate)
    let remainder = millsecondsAway % millToDays;
    let numberOfDaysAway = (millsecondsAway - remainder) / millToDays;
    console.log(`Today is ${todayDate}`);
    console.log(`days is ${(date - todayDate)/millToDays}`);
    return numberOfDaysAway;
};

function determineNextBirthday() {

    const birthdayYear = new Date().getFullYear();
    console.log(`year is ${birthdayYear}`);

    const dob_month_selected = document.getElementById("dob_month");
    const birthdayMonth = dob_month_selected.selectedIndex + 1;
    console.log(`month is ${birthdayMonth}`)
    const birthdayDay = document.getElementById("dob_day").value;
    console.log(`day is ${birthdayDay}`);

    const birthdayDate = new Date(birthdayYear+"-"+birthdayMonth+"-"+birthdayDay)
    console.log(`Date is ${birthdayDate}`);
    response_q2.innerText = `${bullet} Your birthday is ${calcDaysAway(birthdayDate)} days away`;

};

function runChatbot() {

    event.preventDefault();

    const question = document.getElementById("question");

    const answer = document.getElementById("answer").value;



    if (questionNumber === 0) {
        response_q1.innerText = `${bullet} Your name is, ${answer}.`;
        question.innerText = "when is your birthday?";
        questionNumber++;
    } else
    {
        determineNextBirthday(); 
        
         question.innerText = "What is your favorite Holiday ?";
    };

};

const answerForm = document.getElementById('answerForm');
const birthdayForm = document.getElementById('birthdayForm');

birthdayForm.style.display = "none";


answerForm.addEventListener('submit', function (event) {
  
  runChatbot();
  answerForm.style.display = "none";
  birthdayForm.style.display = "block";

});

birthdayForm.addEventListener('submit', function (event) {
  
    runChatbot();
  
  });