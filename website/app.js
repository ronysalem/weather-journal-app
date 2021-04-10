
/* Global Variables */
const apiKey = '16df7ba35d52532c1ccc256ff6c3bb0c';
const generateBtn = document.getElementById('generate');
let zipCode = '';
const output = document.getElementById('output')
// UI elements to be updated 
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const feelings = document.getElementById('content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

//-----function to get data from weather API-------//
async function getWeatherFromApi (zip){
    const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    
    } catch (err) {
        console.log('opps there is error from open weather API' + err);
    }
}

//------------function to post data to acceptData route------------//
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify({
          date: data.date,
          temp:data.temp,
          feelings:data.feelings
      })
    });
  }

// function Update ui to get data from post route and updating ui by the fetched data //
async function updateUI(){
    const response = await fetch ('/getData');
    try{
        const serverData = await response.json();
        // console.log(serverData);
        
        date.innerHTML= `date : ${serverData.date}`;
        temp.innerHTML= `temp : ${serverData.temp}`;
        feelings.innerHTML= `feeling : ${serverData.feelings}`;
}

        catch(err){
            console.log("error getting data from server"+err);
        }
}
// adding event Listener on generate button and fetching data from weather API 
generateBtn.addEventListener('click', function () {

    //   storing the entered value when clicking on button as on loading page the value will be empty 
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if (zipCode.length==0) {
        alert("please enter a zip code");
    }
    //  chaining promises 
    // first getting data from api then posting data and saving it in sever object finally updating UI with all data 
    getWeatherFromApi(zipCode).then(function(data){
        postData('/acceptData',{temp:data.main.temp , date:newDate, feelings:feelings});
    }).then(function(){
        updateUI();
    }
    );
    // showing output after executing chaining promises
    output.hidden=false;

    // hide the output and erase the input fields after 3.5 secs 
    setTimeout(() => {
        output.hidden=true;
        document.getElementById('zip').value='';
        document.getElementById('feelings').value='';
    }, 3500);

});




