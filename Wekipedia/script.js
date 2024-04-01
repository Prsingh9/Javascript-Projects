let searchText= document.querySelector('#searchText');
let searchNow=document.querySelector('#searchNow');
let searchResult=document.querySelector('.searchResult'); //dynamic content will be displayed here


searchNow.addEventListener('click',()=>{
    if(searchText.value !== ""){
        let wikiURL=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchText.value}`;

        fetch(wikiURL)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{ //data=response.json()
            console.log(data);
            searchResult.innerHTML =``; 
            data.query.search.forEach(items=>{
                let finalURL=`https://en.wikipedia.org/?curid=${items.pageid}`;

                searchResult.insertAdjacentHTML('afterbegin',
                    `<div class="searchResultContent">
                    <a href="${finalURL}" target="_blank" class="title">${items.title}</a>
                    <a href="${finalURL}" target="_blank" class="link">${finalURL}</a>
                    <p>${items.snippet}</p>
                </div>`
                )
            })
        })
    }
})
