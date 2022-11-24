"use strict"

// const divApi = document.getElementById("api");

// const i = document.getElementById("search");

// const btn = document.getElementById("btn");

// btn.addEventListener("click", call =>{
//     let s = i.value;
//     console.log(s);
//     fetch(`https://lt-nlgservice.herokuapp.com/rest/english/conjugate?verb=${s}`)
//     .then((res) => res.json()).then(data => divApi.innerText = JSON.stringify(data, null));
// })

// fetch('https://lt-nlgservice.herokuapp.com/rest/english/conjugate?verb=change')
//     .then((res) => res.json()).then(data => console.log(data));

const mySearch = document.getElementById("search");
const autoComplete = document.getElementById("autoComplete");

mySearch.addEventListener("input", i =>{
    //console.log(i.target.value);
    autoComplete.innerHTML = '';
    fetch(`https://api.datamuse.com/words?sp=${i.target.value}??`)
    .then(res=> res.json())
    .then(data => {
        for(let {word} of data){
            console.log(word)
            const li = document.createElement('li');
            li.innerText = word;
            autoComplete.appendChild(li);
        }
        if(mySearch.value === '') autoComplete.innerHTML = '';
    });
    
})

// mySearch.addEventListener("keyup", e =>{
//     console.log("tasto premuto")
//     autoComplete.innerHTML = '';
// })