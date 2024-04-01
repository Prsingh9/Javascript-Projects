
var questions = [
    {
      question: "What is the baby of a moth known as?",
      choices: ["baby", "infant", "kit", "larva"], //i=0 , i=1. i=2 , i=3
      correctAnswer: 3,  //index number from choices 
    },
    {
      question: "What is the adult of a kid called?",
      choices: ["calf", "doe", "goat", "chick"],
      correctAnswer: 2,
    },
    {
      question: "What is the young of buffalo called?",
      choices: ["calf", "baby", "pup", "cow"],
      correctAnswer: 0,
    },
    {
      question: "What is a baby alligator called?",
      choices: ["baby", "gator", "hatchling", "calf"],
      correctAnswer: 1,
    },
    {
      question: "What is a baby goose called?",
      choices: ["gooser", "gosling", "gup", "pup"],
      correctAnswer: 1,
    },
  ];

  var currentQuestion=0;
  var correctAnswer=0;
  var quizOver=false; 
  

window.addEventListener('DOMContentLoaded',function(e){
    displayCurrentQuestion();
    var quizMessage= document.querySelector(".quizMessage");
    quizMessage.style.display="none";

    document.querySelector(".nextButton").addEventListener('click',()=>{
      if (!quizOver) {   //!false=true , quiz is not over 
        var radioBtnsChecked= document.querySelector("input[type=radio]:checked");

        if(radioBtnsChecked === null){
          quizMessage.innerText="Please select an answer"
          quizMessage.style.display="block";
        }

        else{          //this else is used when user has checked the radio button
          // console.log(radioBtnsChecked.value);
          quizMessage.style.display="none"; //we should again make the display none 

          if(parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer){ //this will check if the value selected is 
            correctAnswer++;                                                                 //is same as the correct answer
          }

          currentQuestion++;  //go to next question ,5
 
          if(currentQuestion< questions.length){  // 5 <5
            displayCurrentQuestion();
          }
          else{
            displayScore(); //make this 1st
            document.querySelector('.nextButton').innerText="Play Again?";
            quizOver=true;
          }
        }

      } 
      
      else {            //quiz is over
      quizOver=false;  
      document.querySelector('.nextButton').innerText="Next Question";
      resetQuiz(); //this functoin 2nd
      displayCurrentQuestion();
      hideScore();  //3
      }
    })
})



//here we are declaring all the functions 

function displayCurrentQuestion(){
console.log("displaying current question");

//decalre variables
var question=questions[currentQuestion].question;
var questionClass= document.querySelector(".quizContainer > .question");
var choiceList= document.querySelector(".quizContainer > .choiceList");
var numChoices=questions[currentQuestion].choices.length;

//set the questionClass text to the current question
questionClass.innerText=question;

//remove all current <li> elements (if any)
choiceList.innerHTML="";

for(i=0; i<numChoices ;i++){ //i=0 ,i<4 ,,,i=0-3
  var choice=questions[currentQuestion].choices[i];

  var li=document.createElement("li");
  li.innerHTML= `<input type="radio" value="${i}" name="dynradio"/>`+ choice ;

  choiceList.appendChild(li);
}
}

function displayScore(){
  document.querySelector(".quizContainer > .result").innerText="You Scored: "+correctAnswer+" out of "+questions.length; //we are displaying the score 
  document.querySelector(".quizContainer > .result").style.display="block"; //making the element display style block
}

function hideScore(){
  document.querySelector(".result").style.display="none"; //we are making display none to hide the score
}

function resetQuiz(){  //this is used to reset the quiz
  currentQuestion=0; //make current question again to 0 index
  correctAnswer=0;// number of correct answers also to zero
  hideScore();       //if any previous score is present hide it
}

