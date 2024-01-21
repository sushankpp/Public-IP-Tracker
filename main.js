let API_URL =
  'https://geo.ipify.org/api/v2/country,city?apiKey=at_InTOYkKFYKoUY6uFQFPmYRUlk6zVt&ipAddress=';

const ipTrack = document.getElementById('ip-tracker');
const IPSearch = document.getElementById('ip-search');
const error = document.getElementById('error');

// fetch(API_URL)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error('error', error);
//   });

function searchIpAddress() {
  const IPAddress = IPSearch.value.trim();

  if (IPAddress !== '') {
    API_URL += IPAddress;

    fetchAndDisplay(API_URL);
  } else {
    error.innerHTML = 'please enter a valid IP Address';
  }
}

function createDetailsElement(ipAdd) {
  const detailsEl = document.createElement('div');
  detailsEl.classList.add('details-showcase');

  detailsEl.innerHTML = `
    <div class="ip-address" id="ip-address">
          <p class="h2">ip address</p >
          <p class="ip-value">${ipAdd.ip}</p>
        </div>

        <div class="location" id="location">
          <p class="h2">location</p >
          <p class="address">${ipAdd.location.city},${ipAdd.location.country}</p>
        </div>

        <div class="timezone" id="timezone">
          <p class="h2">timezone</p >
          <div class="time">${ipAdd.location.timezone}</div>
        </div>

        <div class="isp-name">
          <p class="h2">isp</p >
          <div class="isp">${ipAdd.isp}</div>
        </div>
    `;

  return detailsEl;
}

function fetchAndDisplay() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((Ipdata) => {
      const detailsContainer = createDetailsElement(Ipdata);
      ipTrack.appendChild(detailsContainer);

      console.log(Ipdata);

      const { lat, lng } = Ipdata.location;
      L.marker([lat, lng])
        .addTo(mymap)
        .bindPopup(`${Ipdata.location.city}, ${Ipdata.location.country}`)
        .openPopup();
    })
    .catch((error) => {
      console.error('error', error);
    });
}

var mymap = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(mymap);

L.marker([51.5, -0.09]).addTo(mymap).bindPopup('A sample marker!').openPopup();
