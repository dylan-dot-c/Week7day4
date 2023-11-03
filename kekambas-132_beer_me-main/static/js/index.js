console.log("Hey it is me, the index!");
pageLoader();

// Function to load the page and set event listeners
function pageLoader() {
  console.log("Loading the page with functionality...");
  // Get the color buttons
  const colorButtons = document.getElementsByClassName("light-dark-button");
  for (let btn of colorButtons) {
    btn.addEventListener("click", changeBackgroundColor);
  }

  // Get the nav links and add the changeView event listener
  const navLinks = document.getElementsByClassName("nav-link");
  for (let link of navLinks) {
    link.addEventListener("click", changeView);
  }

  const findBrewsForm = document.querySelector("#find-brews-form");
  findBrewsForm.addEventListener("submit", findBreweries);
}

// Create a function that will change the background color
function changeBackgroundColor(e) {
  console.log("Clicked Color Button");
  console.log(e.target.value);
  if (e.target.value === "Dark") {
    document.body.style.backgroundColor = "#C96E12";
  } else {
    document.body.style.backgroundColor = "#FFF897";
  }
}

// Create a function to make this a Single Page App (SPA) by swapping visible divs
function changeView(e) {
  // Turn off the element(s) that are visible
  const toTurnOff = document.getElementsByClassName("is-visible");
  for (let element of toTurnOff) {
    element.classList.replace("is-visible", "is-invisible");
    let navLink = document.getElementsByName(element.id)[0];
    navLink.classList.remove("active");
  }
  // Turn on the element based on the link we clicked
  let idToTurnOn = e.target.name;
  const toTurnOn = document.getElementById(idToTurnOn);
  toTurnOn.classList.replace("is-invisible", "is-visible");
  e.target.classList.add("active");
}

function findBreweries(e) {
  e.preventDefault();
  console.log(e, e.target.city);

  const cityName = e.target.city.value;
  console.log(`Looking for brewies in ${cityName}...`);

  const url = `https://api.openbrewerydb.org/v1/breweries?by_city=${cityName}&per_page=10&page=1`;
  console.log(url);

  //    getting api data
  fetch(url)
    .then((res) => {
      //   console.log(res.json());
      return res.json();
    })
    .then((data) => {
      console.log(data);
      displayBreweries(data);
    })
    .catch((err) => console.error(err));

  // reset the city input to empty
  e.target.city.value = "";
}

// Callback function for findBreweries that will insert breweries into the table
function displayBreweries(data) {
  let table = document.getElementById("brewery-table");

  // Clear out the table of any current data
  table.innerHTML = "";

  // Create the brewery table headers
  const thead = document.createElement("thead");
  table.append(thead);
  let tr = document.createElement("tr");
  thead.append(tr);
  const tableHeadings = [
    "Name",
    "Type",
    "Street Address",
    "Address 2",
    "Address 3",
    "City",
    "State",
  ];
  tableHeadings.forEach((heading) => {
    let th = document.createElement("th");
    th.scope = "col";
    th.innerHTML = heading;
    tr.append(th);
  });

  let tbody = document.createElement("tbody");
  table.append(tbody);
  // write a row for each brewery in data
  for (let brewery of data) {
    let tr = document.createElement("tr");
    tbody.append(tr);

    newDataCell(
      tr,
      `<a href=${brewery.website_url} target="_blank">${brewery.name}</a>`
    );
    newDataCell(tr, brewery.brewery_type);
    newDataCell(tr, brewery.street);
    newDataCell(tr, brewery.address_2);
    newDataCell(tr, brewery.address_3);
    newDataCell(tr, brewery.city);
    newDataCell(tr, brewery.state);
  }
}

// Helper Function to create a new data cell for the table
function newDataCell(tr, value) {
  let td = document.createElement("td");
  td.innerHTML = value ?? "-";
  tr.append(td);
}
