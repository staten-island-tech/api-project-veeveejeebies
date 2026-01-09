const main = document.querySelector(".main");
const searchInput = document.getElementById("search-character");

let allCharacters = [];

async function getCharacters() {
  try {
    const response = await fetch("https://api.disneyapi.dev/characters");
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    allCharacters = data.data;

    document.getElementById("api-display").textContent =
      `Loaded ${allCharacters.length} characters`;

    displayItems(allCharacters);
  } catch (error) {
    console.error(error);
  }
}

function filterCharacters() {
  const searchUp = searchInput.value.toLowerCase();

  const filteredCharacters = allCharacters.filter((character) =>
    character.name.includes(searchUp)
  );

  displayItems(filteredCharacters);
}

function displayItems(list) {
  main.innerHTML = "";

  list.forEach((character) => {
    main.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
          <h1 class="title">${character.name}</h1>
          <img src="${character.imageUrl}" alt="${character.name}">
        </div>
      `
    );
  });
}

searchInput.addEventListener("input", filterCharacters);

getCharacters();