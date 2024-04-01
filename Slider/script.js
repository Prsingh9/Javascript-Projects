const slides=document.querySelectorAll(".slide");
const nextBtn=document.querySelector(".nextBtn");
const prevBtn=document.querySelector(".prevBtn");

slides.forEach((slide,index)=>{
    slide.style.left=`${index*100}%`; //index=1*100=100%
})


let counter=0;

nextBtn.addEventListener('click',function(){
    counter++;
    display();
    console.log("clicked");
})

prevBtn.addEventListener('click',function(){
    counter--;
    display();
    console.log("clicked");
})

function display(){
    //CASE 1: when we want the circular display 
    // if(counter=== slides.length){ //when we are on last slide after that again counter will be zero
    //     counter=0;
    // }

    // if(counter<0){
    //     counter=slides.length-1;
    // }

    // CASE 2: When we dont want circular slide
if (counter < slides.length - 1) {   //if we are not on last slide display next button
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none"; //when we are on last slide remove next button
  }
  if (counter > 0) {                 //when we are not on first slide display previous button
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";       //remove prev button when we are on first slide
  }

    slides.forEach(function(slide){
        slide.style.transform=`translate(-${counter*100}%)`;
    })
}
prevBtn.style.display="none";

