// DOM Elements
const searchBtn = document.getElementById('search-btn');
const countrySelect = document.getElementById('country-select');
const countryProfileDiv = document.getElementById('country-profile');

// World Bank API URL
const WORLD_BANK_API_URL = "https://api.worldbank.org/v2/country";

// Fetch the list of countries and populate the dropdown
function populateCountryDropdown() {
    axios.get(`${WORLD_BANK_API_URL}?format=json&per_page=300`)
    .then(response => {
        const countries = response.data[1]; // Access the list of countries
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.id;  // Country code as the value
            option.textContent = country.name;  // Country name as the display text
            countrySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
    });
}

// Fetch country profile using Axios
function fetchCountryProfile(countryCode) {
    const url = `${WORLD_BANK_API_URL}/${countryCode}?format=json`;
    
    axios.get(url)
    .then(response => {
        if (response.data[1]) {
            const countryData = response.data[1][0]; // Accessing the relevant part of the response
            displayCountryProfile(countryData);
        } else {
            countryProfileDiv.innerHTML = "<p>No data found for this country code. Please try again.</p>";
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        countryProfileDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    });
}

// Display country profile in the UI
function displayCountryProfile(country) {
    countryProfileDiv.innerHTML = `
        <h3>${country.name}</h3>
        <p><strong>Region:</strong> ${country.region.value}</p>
        <p><strong>Income Level:</strong> ${country.incomeLevel.value}</p>
        <p><strong>Capital City:</strong> ${country.capitalCity || 'N/A'}</p>
        <p><strong>Population (most recent):</strong> ${country.population || 'N/A'}</p>
        <p><strong>Country Code:</strong> ${country.id}</p>
        
    `;
    countryProfileDiv.style.backgroundColor = "#76b5c5";
    countryProfileDiv.style.borderRadius = "20px 20px";
    countryProfileDiv.style.width = "100%";
}

// Search button event listener
searchBtn.addEventListener('click', () => {
    const countryCode = countrySelect.value;
    if (countryCode) {
        fetchCountryProfile(countryCode);
    } else {
        alert('Please select a country from the list.');
    }
});

// Populate the country dropdown on page load
populateCountryDropdown();
