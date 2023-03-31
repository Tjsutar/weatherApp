const temprateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "London";

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
    
      updateDom(temp_c, name, localtime, icon, text);
    
    } catch (error) {
      alert("Location not found");
    }

};

function updateDom(temprate, city, time, emoji, text) {
  
  temprateField.innerText = `${temprate}°` ;
  cityField.innerText = city;

  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  const exactDay = getDayFullname(new Date(exactDate).getDay()) ;

    dateField.innerText = `${exactTime} - ${exactDay} - ${exactDate}`;

  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

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

const search = (e) =>{
    e.preventDefault();

    target = searchField.value;

    fetchData(target);
};

form.addEventListener("submit", search);
