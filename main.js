import axios from "axios";

const buttonMail = document.querySelector("#mail");
const buttonHighway = document.querySelector("#highway");
const buttonChurch = document.querySelector("#church");
const content = document.querySelector(".content");
const ul = document.createElement('ul')

// navigator.geolocation.getCurrentPosition((position) => {
//   const lat = position.coords.latitude;
//   const lon = position.coords.longitude;
//   console.log(lat, lon)
// })

  
async function fetchMail() {
  const stoppingMail = `https://yandex.ru/maps/213/moscow/stops/stop__9643717/?ll=37.826208%2C55.777070&tab=overview&z=16`;
  try {
    const response = await axios.get("http://localhost:3000", {
      params: {
        stopping: stoppingMail
      }
    });
    const data = response.data; 
    ul.innerHTML = data;
    content.append(ul)

  } catch (error) {
    console.error(error); 
  }
}

async function fetchHighway() {
  const stoppingHighway =
    "https://yandex.ru/maps/213/moscow/stops/stop__9643755/?ll=37.842545%2C55.780370&tab=overview&z=16";
  try {
    const response = await axios.get("http://localhost:3000", {
      params: {
        stopping: stoppingHighway,
      },
    });
    const data = response.data;
    ul.innerHTML = data;
    content.append(ul);
  } catch (error) {
    console.error(error);
  }
}

async function fetchChurch() {
   const stoppingChurch =
    "https://yandex.ru/maps/213/moscow/stops/stop__9646059/?ll=37.842783%2C55.769091&tab=overview&z=16.72";
  try {
    const response = await axios.get("http://localhost:3000", {
      params: {
        stopping: stoppingChurch,
      },
    });
    const data = response.data;
    ul.innerHTML = data;
    content.append(ul);
  } catch (error) {
    console.error(error);
  }
}

buttonMail.addEventListener("click", fetchMail);
buttonHighway.addEventListener("click", fetchHighway);
buttonChurch.addEventListener("click", fetchChurch);
