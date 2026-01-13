import "./style.css";

const main = document.querySelector(".main");
const searchBar = document.getElementById("search-characters");

let allCharacters = [];

async function getCharacters() {
  try {
    const response = await fetch("https://api.disneyapi.dev/character");
    if (response.status !== 200) throw new Error("Failed to fetch data");

    const data = await response.json();
    allCharacters = data.data;

    displayItems(allCharacters);
  } catch (error) {
    console.error(error);
  }
}

function filterCharacters() {
  const searchUp = searchBar.value.toLowerCase();

  const filteredCharacters = allCharacters.filter(character =>
    character.name.toLowerCase().includes(searchUp)
  );

  displayItems(filteredCharacters);
}

function displayItems(list) {
  main.innerHTML = "";

  list.forEach(character => {
    main.insertAdjacentHTML(
      "beforeend",
      `
      <div class="main">
        <img class="h-48 w-full object-cover" src="${character.imageUrl || ""}" alt="${character.name}">

        <div class="card-body">
          <h2 class="card-title">${character.name}</h2>

          <div class="card-actions justify-end">
            <button class="btn btn-primary moreInfo">More Info</button>
          </div>
        </div>
      </div>
      `
    );
  });

  addInfoButtons(list); 
}

function addInfoButtons(list) {
  const buttons = document.querySelectorAll(".moreInfo");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      showInfo(list, index);
    });
  });
}

function showInfo(list, index) {
  const charsiu = list[index];

  document.getElementById("showCharacter").style.display = "block";

  document.getElementById("info").innerHTML = `
    <h2>${charsiu.name}</h2>
    <img src="${charsiu.imageUrl || ""}" >

    <p>Films: ${charsiu.films.length ? charsiu.films.join(", ") : "None"}</p>                             
    <p>Short Films: ${charsiu.shortFilms.length ? charsiu.shortFilms.join(", ") : "None"}</p>
    <p>TV Shows: ${charsiu.tvShows.length ? charsiu.tvShows.join(", ") : "None"}</p>
    <p>Video Games: ${charsiu.videoGames.length ? charsiu.videoGames.join(", ") : "None"}</p>
    <p>Park Attractions: ${charsiu.parkAttractions.length ? charsiu.parkAttractions.join(", ") : "None"}</p>
    <p>Allies: ${charsiu.allies.length ? charsiu.allies.join(", ") : "None"}</p>
    <p>Enemies: ${charsiu.enemies.length ? charsiu.enemies.join(", ") : "None"}</p>
  `;
}

document.getElementById("exitBtn").addEventListener("click", function () {
  document.getElementById("showCharacter").style.display = "none";
});

searchBar.addEventListener("input", filterCharacters);
getCharacters();
