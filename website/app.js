/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();



/* const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = ",&appid=f8f9d85e892886dc6bc6913ea9d8cf28"; */

const server = "http://127.0.0.1:4000";


const catchWeatherData = () => {
    const cityName = document.getElementById("cityName").value;
    const feelings = document.getElementById("feelings").value;

    fetchWeatherData(cityName).then((data) => {
        console.log(data)
        if(data) {
            const {
                main:{temp, temp_max, temp_min},
                sys:{country}, 
                name} = data;
   
                const info = {
                    newDate,
                    name,
                    temp: Math.round(temp),
                    max_temp: Math.round(temp_max),
                    min_temp: Math.round(temp_min),
                    country,
                    feelings
                };
                postData(server + "/add" , info);
        }
        
           

            updateUI();
            document.getElementById("cityName").value = "";
            document.getElementById("feelings").value = "";
            document.getElementById('city').innerHTML = "";
            document.getElementById('temp').innerHTML = "";
            document.getElementById('data__MXtemp').innerHTML = "";
            document.getElementById('data__MINtemp').innerHTML = "";
            document.getElementById('date').innerHTML = ""
        
    });
};

document.getElementById("generate").addEventListener("click", catchWeatherData);

const fetchWeatherData = async (cityName) => {
    const key = 'f8f9d85e892886dc6bc6913ea9d8cf28';
    const data =  await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',&appid=' + key)
        .then(res => res.json())
        .then(data => {return data});
        return data;
};

const postData = async (url="", info={}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(info),
    });
    try {
        const newData = await res.json();
        console.log("You've just saved data");
        return newData
    } catch (error){
        console.log(error)
    }
}

const updateUI = async () => {
    const res = await fetch(server + "/all");
    try {
        const data = await res.json();
        if (data) {
            document.getElementById('city').innerHTML = data.name;
            document.getElementById('temp').innerHTML = data.temp + '&degC';
            document.getElementById('data__MXtemp').innerHTML = 'Maximum degree: ' + data.max_temp + '&degC';
            document.getElementById('data__MINtemp').innerHTML = 'Minimum degree: ' + data.min_temp + '&degC';
            document.getElementById('country').innerHTML = 'Country:  ' + data.country;
            document.getElementById("date").innerHTML = data.newDate;
        }
        
        /* ;
        document.getElementById('description').innerHTML = data.description;
        document.getElementById('content').innerHTML = data.feelings;
        document.getElementById('error').innerHTML = data.res.error + '&#128064;';
         */
    }
    catch (error){
        console.log(error)
    }
    
}

const checkForm = () => {
    document.getElementById('city').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('date').innerHTML = '';
    document.getElementById('country').innerHTML = '';
    document.getElementById('data__MXtemp').innerHTML = '';
    document.getElementById('data__MINtemp').innerHTML = '';
}

