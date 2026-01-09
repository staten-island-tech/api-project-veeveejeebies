
const main = document.querySelector(".main");
const searchCharacters = document.getElementById("search-characters");
let getCharacters = []; 


 async function getCharacters() {
  try {
    const response = await fetch("https://api.disneyapi.dev/characters");
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    allCharacters = data.data;

    document.getElementById("api-display").textContent = allCharacters[0].name; 
  
    displayItems(allCharacters);

  }
    catch (error) {
    console.log(error);
  }
}

 async function filterCharacters() {
  try {
     const response = await fetch(`https://api.disneyapi.dev/character`);


    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }


    const filtered = await response.json();
    console.log(data);


    document.getElementById("api-display").textContent = data.data.name;
    displayItems(data);
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
        <div class="item">
          <h1 class="title">${character.name}</h1>
          <img src="${character.imageUrl}" alt="${character.name}">
        </div>
      `
    );
  });
}

getCharacters();