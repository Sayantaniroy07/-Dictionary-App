const form = document.querySelector('form');
const restltdiv = document.querySelector('.result');

form.addEventListener('submit', (e) =>{
     e.preventDefault();//prevent from autosubmit
    getWorfInfo(form.elements[0].value);//getting word info from form's first children-->input
});

const getWorfInfo = async (word)=>{
    // alert("Word "+ word) //getting the input value from above
    try{
    restltdiv.innerHTML="Fetching data...."
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await response.json();


    let definitions=data[0].meanings[0].definitions[0];

    restltdiv.innerHTML= `
    <h2><strong>Word :</strong> ${data[0].word}</h2>
    <p class="partOfSpeetch">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>  
      <p><strong>Example:</strong>${definitions.example === undefined ? "Not Found" : definitions.example}</p>
    <p><strong>Antonyms: </strong></p>
    `;
    //fetching antonyms.....
    if(definitions.antonyms.length === 0){
        restltdiv.innerHTML += `<span> Not Found </span>`
    }else{
        for(let i = 0; i<definitions.antonyms.length;i++){
            restltdiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`
        }
    }
    // Adding read more button.....
     restltdiv.innerHTML+= `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

     }catch(error){
        restltdiv.innerHTML = `<p>Sorry the word could not be found!`
    }
    // console.log(data);
}