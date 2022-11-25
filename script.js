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

// Event listener che riceve i dati api da datamuse.com
mySearch.addEventListener("input", i =>{    // Event listener per richiedere i dati ad ogni parola inserita
    //console.log(i.target.value);
    autoComplete.innerHTML = '';    // Cancellare lista parole
    fetch(`https://api.datamuse.com/words?sp=${i.target.value}??`) // Richiesta al database delle parole del vocabolario
    .then(res=> res.json())                                        // Trasformazione dei dati in oggetti
    .then(data => {                 // CallBack per inserire i risultati nella lista 
        for(let {word} of data){
            console.log(word)
            const li = document.createElement('li');
            li.addEventListener('click', e =>{  // Aggiunta event listener a tutti i li 
                mySearch.value = e.target.outerText;
                console.log(e.target.outerText);
                
            })
            li.innerText = word;
            autoComplete.appendChild(li);
           
        }
        if(mySearch.value === '') autoComplete.innerHTML = '';
    });
    
})


// Chiusura autoCompletamento ricerca quando si clicca in un qualsiasi punto della pagina

const body = document.getElementsByTagName('body')[0];

body.addEventListener('click', e =>{
    console.log('Sono il body');
    autoComplete.innerHTML = '';
})

// Impostare parola da coniugare

const btnImposta = document.getElementById('btnImposta');
const conjugate = document.getElementById('conjugate');

btnImposta.addEventListener('click', e =>{
    if(mySearch.value === '') conjugate.innerText = 'Conjugate => '
    conjugate.innerText = 'Conjugate => ' + mySearch.value;
    mySearch.value = '';
})



