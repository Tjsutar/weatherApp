// Selecting elements from the DOM
const temprateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Set default value for target
let target = "London";

// Define a function to fetch weather data from the API
const fetchData = async (target) => {

    try {

      const url = `http://api.weatherapi.com/v1/current.json?key=4479c80051c340979b5120031230803&q=${target}`;
    
      const response = await fetch(url);
    
      const data = await response.json();
    
      const {
        current: {
          temp_c,
          condition: { text, icon },
        },
        location: { name, localtime },
      } = data;
    
      console.log(temp_c);
    
      // Update the DOM with weather data
      updateDom(temp_c, name, localtime, icon, text);
    
    } catch (error) {
      alert("Location not found");
    }

};

// Define a function to update the DOM with weather data
function updateDom(temprate, city, time, emoji, text) {
  
  temprateField.innerText = `${temprate}°` ;
  cityField.innerText = city;

  // Extract the time, date, and day from the time string
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullname(new Date(exactDate).getDay()) ;

  // Update the DOM with the extracted time, date, and day
  dateField.innerText = `${exactTime} - ${exactDay} - ${exactDate}`;

  emojiField.src = emoji;
  weatherField.innerText = text;
}

// Call fetchData with the default target value
fetchData(target);

// Define a function to get the full name of a day of the week from its number
function getDayFullname(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturday";
    
    default:
      break;
  }
}

// Define a function to handle the form submission
const search = (e) =>{
    e.preventDefault();

    // Get the search input value
    target = searchField.value;

    // Call fetchData with the new target value
    fetchData(target);
};

// Add an event listener to the form
form.addEventListener("submit", search);
