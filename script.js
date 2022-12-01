"use strict"

let sceltaSearch;

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
const indicative = document.getElementById('indicative');

/* Funzione per reimpostare i giusti bordi agli imput modificati nella Fetch del bottone verifica*/

function impostaStileInput(){
    for(let i = 0; i<12; i++){
        
        for(let j = 0; j<6; j++){
            indicative.children[i].children[j+1].children[1].style.border='1px solid black';
            indicative.children[i].children[j+1].children[1].style.borderRadius='2px';
            indicative.children[i].children[j+1].children[1].style.padding='1px';
            indicative.children[i].children[j+1].children[1].value = '';
           
        }

    }
}

btnImposta.addEventListener('click', e =>{
    if(mySearch.value === '') conjugate.innerText = 'Conjugate to ';
    sceltaSearch = mySearch.value;
    conjugate.innerText = 'Conjugate to ' + mySearch.value;
    mySearch.value = '';
    impostaStileInput();
})

// Parte Main per la verifica dell'esercizio

const btnSubmit = document.getElementById('btnSubmit');

const simplePresent = document.getElementById('simplePresent');
// Button Verifica
btnSubmit.addEventListener('click', e => {
    console.log("ok btnSubmit, scelta: " + sceltaSearch);
    fetch(`https://lt-nlgservice.herokuapp.com/rest/english/conjugate?verb=${sceltaSearch}`,{
        mode: 'no-cors',
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        }})
    .then(res => res.json())
    .then(data => {
        const {conjugation_tables} = data; // Destrutturazione dati dell'API, Estrazione conjugation_tables
        for(let i = 0; i<12; i++){
            // let s = conjugation_tables.indicative[0].forms[i];
            console.log(conjugation_tables); // Tabella Indicative dentro conjugation_tables
            for(let j = 0; j<6; j++){
                console.log('Nel ciclo interno j');
                let valoreUtente = indicative.children[i].children[j+1].children[1].value;
                console.log(indicative.children[i].children[j+1].children[1]);
                console.log(valoreUtente); // Valori immessi dall'utente
                let valoreAPI = conjugation_tables.indicative[i].forms[j]; // Valori dall'API
                console.log(valoreAPI[1]);
                if(valoreAPI[1] !== valoreUtente){
                    indicative.children[i].children[j+1].children[1].style.border='2px solid red';
                }
                else{
                    indicative.children[i].children[j+1].children[1].style.border='2px solid green';
                }
                // EventListener Tasto Correzione

                indicative.children[i].children[j+1].children[2].addEventListener('click', e =>{
                    console.log('cliccato btn show!');
                    indicative.children[i].children[j+1].children[1].value = valoreAPI[1];
                })
            }
            //console.log(conjugation_tables.indicative[0].forms[i])
            // console.log('Valore api: ' + s[1]);
            // console.log(simplePresent.children[i+1]);
            // console.log(simplePresent.children[i+1].children[1].value)
            console.log(indicative.children[i]);


        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    })
})

// Button annulla

const btnAnnulla = document.getElementById('annulla');

btnAnnulla.addEventListener('click', e =>{
    if(mySearch.value === '') conjugate.innerText = 'Conjugate to '; 
    sceltaSearch = mySearch.value;
    conjugate.innerText = 'Conjugate to ' + mySearch.value;
    mySearch.value = '';
    impostaStileInput();
    window.scrollTo({ // Scroll inizio pagina in modo lento
        top: 0,
        behavior: 'smooth'
      });
})