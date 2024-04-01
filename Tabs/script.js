const about=document.querySelector(".about");
const btns=document.querySelectorAll(".tab-btn");
const articles=document.querySelectorAll(".content");

about.addEventListener("click", function (e) {
    // console.log(e.target.dataset.id);
    const id=e.target.dataset.id; //history 
    console.log(id);

    if(id){ //id=history 

        btns.forEach(function (btn) {
            btn.classList.remove("active");
        })
        e.target.classList.add("active"); //<button class="tab-btn" data-id="history">history</button>

        //remove active class from all contents
        articles.forEach((article)=>{
            article.classList.remove("active");
        })

        const particular_content=document.getElementById(id); //<div class="content " id="history"> </div>
        particular_content.classList.add('active');
    }
})
