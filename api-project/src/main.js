
const main = document.querySelector(".main");
const apiDisplay = document.getElementById("api-display");

let characters = [];        // array

 async function getCharacters() {
  try {
    const response = await fetch(`https://api.disneyapi.dev/character`);


    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }


    const data = await response.json();
    console.log(data);


    document.getElementById("api-display").textContent = data.data.name;
    displayItems(characters);
  }
  catch (error) {
    console.log(error); 
  }
}

  function displayItems(list) {
  main.innerHTML = "";

  list.forEach((character) => {
    main.insertAdjacentHTML(
      "beforeend",
      `
      <div class="main">
        <h2>${character.name}</h2>
        <img src="${character.imageUrl}">
        <button class="more" data-id="${character._id}">Show More</button>
      </div>
      `
    );
  });
}
displayItems(characters);
const buttons = document.querySelectorAll(".more");


async function getSingleCharacter(id) {
  try {
    const response = await fetch(
      `https://api.disneyapi.dev/characters/${id}`
    );
    const data = await response.json();

    const character = data.data;

    apiDisplay.innerHTML = `
      <h2>${character.name}</h2>
      <p>Films: ${character.films.join(",") || "None"}</p>
      <p>TV Shows: ${character.tvShows.join(",") || "None"}</p>
    `;

  
  } 
    catch (error) {
    console.error(error);
  }
}

getCharacters();




/* if statement put here */

 