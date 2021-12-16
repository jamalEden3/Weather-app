/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=f8f9d85e892886dc6bc6913ea9d8cf28&units=metric";

const server = "http://127.0.0.1:4000";

const error = document.getElementById("error");

const generateData = () => {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherData(zip).then((data) => {
        if(data) {
            const {
                main: { temp, temp_max },
                name,
                weather: [{ description }],
            } = data;
            /* const {main:{temp},} = data */

            const info = {
                newDate,
                name,
                temp: Math.round(temp),
                max_temp: Math.round(temp_max),
                description,
                feelings
            };
            postData(server + "/add" , info);

            updateUI();
            document.getElementById("zip").value = "";
            document.getElementById("feelings").value = "";
        }
    });
};

document.getElementById("generate").addEventListener("click", generateData);

const getWeatherData = async (zip) => {
    try {
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();

        if (data.cod != 200) {
            error.innerHTML = data.message;
            throw `${data.message}`
        }
        return data
    }
    catch(error) {
        console.log(error);
    }
    
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
        document.getElementById("date").innerHTML = data.newDate;
        document.getElementById('city').innerHTML = data.name;
        document.getElementById('temp').innerHTML = data.temp + '&degC';
        document.getElementById('description').innerHTML = data.description;
        document.getElementById('content').innerHTML = data.feelings;
        document.getElementById('error').innerHTML = data.res.error + '&#128064;';
    }
    catch (error){
        console.log(error)
    }
    
}

const checkForm = () => {
    document.getElementById('city').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('description').innerHTML = '';
    document.getElementById('content').innerHTML = '';
    document.getElementById('date').innerHTML = '';
    document.getElementById('error').innerHTML = '';
}

