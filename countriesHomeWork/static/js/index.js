// alert("Welcome!");
console.log(document);

async function getCountryData(name) {
  endpoint = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,languages,flags,coatOfArms,currencies`;

  console.log(endpoint);

  const response = await fetch(endpoint);
  const data = await response.json();
  //   console.log(data);
  console.log(data, "jamaica");

  return data;
}

// getCountryData("jamaica");

function pageLoad() {
  // hydrating pages with listeners
  const countryForm = document.getElementById("countryForm");
  countryForm.addEventListener("submit", handleSubmit);
}

pageLoad();

async function handleSubmit(e) {
  e.preventDefault();
  const name = e.target.countryName.value;
  console.log(e, e.target, name);
  showSpinner();
  const data = await getCountryData(name);
  showData(data);
  e.target.countryName.value = "";
}

function showData(country) {
  const countryDiv = document.getElementById("countryData");
  if (country.status) {
    showError();
    return;
  }
  let data = country[0];
  const languages = [];
  const currencies = [];
  for (let lang in data.languages) {
    languages.push(data.languages[lang]);
  }
  for (let curr in data.currencies) {
    currencies.push(data.currencies[curr].name);
  }
  countryDiv.innerHTML = `
    <div class="d-flex gap-5 my-5 p-3 rounded-5 border border-warning w-75 mx-auto align-items-center  ">

    <div>
        <img src="${data.flags.svg}" width="200px" />
        <img src="${
          data.coatOfArms.svg
        }" width="200px" height="200px" class="object-fit-cover" />
    </div>
    <div class="w-50">
            <p class="text-warning fw-bold ">
            <span class="text-black">Country:</span>    ${
              data.name.common
            } <br />
            <span class="text-black">Capital:</span>    ${
              data.capital.join(", ") ?? " No Capital"
            } <br />
            <span class="text-black">Languages:</span>  ${languages.join(
              ", "
            )} <br />
            <span class="text-black">Currencies:</span>  ${currencies.join(
              ", "
            )} <br />
            </p>

    </div>
    </div>
    `;

  hideSpinner();
}

function showError() {
  const countryDiv = document.getElementById("countryData");
  hideSpinner();

  countryDiv.innerHTML = `
        <div class="w-50 text-center mx-auto my-5">
            <img src="/static/images/warning.png" width="150px" />
        <h3 class="text-warning">This Country cannot be found!</h3>
        </div>
     `;
}

function showSpinner() {
  const spinner = document.getElementById("spinner");
  const countryDiv = document.getElementById("countryData");
  countryDiv.innerHTML = "";
  spinner.style.display = "block";
}
function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}
