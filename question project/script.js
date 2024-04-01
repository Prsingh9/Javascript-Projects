

//select all the questions(articles)
const questions= document.querySelectorAll(".question");

// console.log(questions);

//apply forEach on questions
questions.forEach((que)=>{  //que=a1 , a2 , a3
// console.log(que);

//select the btn element
const btn=que.querySelector(".question-btn");

btn.addEventListener("click",function (){
    console.log("demo");
    que.classList.toggle("show");

    questions.forEach((item)=>{
        if(item!==que){
            item.classList.remove("show")
        }
    })
})
})

