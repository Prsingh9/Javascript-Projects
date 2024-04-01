
const arrayQuotes=[
    {
        author:"lorem1",
        quote:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ad."
    },

    {
        author:"lorem2",
        quote:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, animi?"
    },

    {
        author:"lorem3",
        quote:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, animi!"
    }
]

document.querySelector("button").addEventListener("click",()=>{
    const random= Number.parseInt(Math.random()*arrayQuotes.length);

    const {author,quote} = arrayQuotes[random]; //arrayQuotes[0]
                                                //author=lorem1,quote=Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ad.

    document.querySelector("#quoteOutput").textContent=`"${quote}"`;
    document.querySelector('#authorOutput').textContent=`--${author}`;
})