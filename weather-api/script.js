const cityInput=document.querySelector("#city-input");
const searchButton=document.querySelector("#search-btn");
const currentWeatherDiv=document.querySelector(".current-weather");
const daysForecastDiv=document.querySelector(".days-forecast");

const API_KEY="YOUR_API_KEY"; 
console.log(API_KEY);

searchButton.addEventListener("click",()=>{ //when we click on search btn getCityCoordinates() function will be called
    getCityCoordinates();
})

//make getCityCoordinate function

const getCityCoordinates=()=>{
    //get the user entered city name and remove any extra space

    //cityName will be the name of city entered by user in input field
    const cityName=cityInput.value.trim(); //trim() removes whitespace from both sides of a string

   

    if(cityName===""){  //when input field is emplty
        return;    //return satement immediately exits the current function and no further code in the function is executed 
    }

    // console.log(cityName);

    const API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    //here we are fetching the data for a particular cityName using fetch API method
    fetch(API_URL)
    .then(response => response.json())
    .then(data =>{
        console.log(data);

        //if user will enter city name which doesn't exist , the length of the data array returned will be zero
        
        if(!data.length){  //true=1 , false=0 ,!0=1 =true
            return alert(`No Coordinates found for ${cityName}`);
        }

        //get latitude , longitude and name from data array first element, here we are using object destructuring as first element of array is an object
        const {lat ,lon,name }=data[0];
        // console.log(`the value of lat:${lat} , lon:${lon} for the city ${name}`);

        getWeatherDetails(name,lat,lon); //call the function getWeatherDetails

    })
    .catch(()=>{
        alert("An error occurred while fetching the coordinates!")
    })
}


//make getWeatherDetails function which returns weather details of passed latitude and longitude

const getWeatherDetails=(cityName, latitude, longitude)=>{

    //this api will return us the weather details for particular latitude and longitude
    const WEATHER_API_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
    .then(response => response.json())
    .then(data =>{ //data=response.json()
        console.log(data);

        //list is an array containing the weather forecast details inside data object
        const forecastArray=data.list;
        const uniqueForecastDays=new Set(); //this is a set which will store unique days

        //fiveDaysForeCast is a new array returned after applying filter method to forecastArray , this will return the unique Days and their weather information 
        const fiveDaysForeCast=forecastArray.filter( forecast =>{ //forecast is an iterator for iterating forecastArray
            
            //for each element of array , the getDate() method is used to extract the date for a particular day
            const forecastDate=new Date(forecast.dt_txt).getDate();
            console.log(forecastDate);

            //if condition checks whether the forecastDate is not already in uniqueForecastDays
            if(!uniqueForecastDays.has(forecastDate) && uniqueForecastDays.size<6){
                uniqueForecastDays.add(forecastDate);//if condition is satisfied , date is added to  uniqueForecastDays
                return true;  //this statement means that the current forecast element meets the condition and should be included in fiveDaysForeCast array
            }

            return false; //indicates that the forecast does not meet the condition and should be excluded from fiveDaysForeCast array
        }) 
        console.log(fiveDaysForeCast);
        
        //this will remove any previously displayed values before displaying new data 
        cityInput.value="";
        currentWeatherDiv.innerHTML="";
        daysForecastDiv.innerHTML="";

        fiveDaysForeCast.forEach( (weatherItem, index) => {  //fiveDaysForeCast is an array which contains weather details for 6 days 
            //weather item is the element of fiveDaysForeCast Array which is an object 

            const html=createWeatherCard(cityName,weatherItem,index); //createWeatherCard function returns an html for the particular index in each iteration for each WeatherItem element 

            console.log(html);
            if(index==0){  //if the index is zero i.e it is first element so it represents current day
                currentWeatherDiv.insertAdjacentHTML("beforeend",html); //update the HTML of currentWeatherDiv
            }
            else{
                daysForecastDiv.insertAdjacentHTML("beforeend",html);//when the index will be more than 0 , update the remaining 5 days card value
                //html is the card created in each iteration
            }
        });

    })

}

function createWeatherCard(cityName,weatherItem,index){
 if(index===0){
    return `<div class="mt-3 d-flex justify-content-between">
    <div>
        <h3 class="fw-bold">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
        <h6 class="my-3 mt-3">Temperature: ${((weatherItem.main.temp-273.15).toFixed(2))}°C</h6>
        <h6 class="my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6 class="my-3">Humidity: ${weatherItem.main.humidity}%</h6>
    </div>

    <div class="text-center me-lg-5">
      <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" >
      <h6>${weatherItem.weather[0].description}</h6>
     </div>
</div>`;
 } else{
    return `<div class="col mb-3">
    <div class="card border-0 bg-secondary text-white">
      <div class="card-body p-3 text-white">
        <h5 class="card-title fw-semibold"> (${weatherItem.dt_txt.split(" ")[0]})</h5>
        <h6 class="card-text my-3 mt-3">Temperature:${((weatherItem.main.temp-273.15).toFixed(2))}°C</h6>
        <h6 class="card-text my-3">Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6 class="card-text my-3">Humidity: ${weatherItem.main.humidity}%</h6>
      </div>  
    </div>
</div>`
 }
}

