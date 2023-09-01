import { BASE_URL } from './config.js';
import formattedDate from './utils.js';

const cards = document.querySelector('.cards');
const searchBtn = document.querySelector('.searchBox button');
const input = document.querySelector('#input');

const fetchData = () => {
  const pincode = input.value.trim();
  cards.innerHTML = '';

  if (!pincode) {
    alert('Enter pincode in the search box');
    return;
  }

  if (pincode.length !== 6) {
    alert('Enter a valid 6-digit pincode');
    return;
  }

  cowinData(pincode);
};

const cowinData = (pincode) => {
  const url = `${BASE_URL}/findByPin?pincode=${pincode}&date=${formattedDate()}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const sessions = data?.sessions || [];
      if (sessions.length > 0) {
        const content = sessions
          .map((session) => {
            const details = [
              ['Center Address', session.address],
              ['Vaccine Name', session.vaccine],
              ['Date Of Vaccination', session.date],
              ['Minimum Age Limit', session.min_age_limit],
              ['Available Capacity', session.available_capacity],
              ['Block Name', session.block_name],
              ['District Name', session.district_name],
              ['Available Slots', session.slots.join(' | ')],
            ];

            const detailsHTML = details
              .map(
                ([label, value]) =>
                  `<h3><span class="category">${label} - </span>${value}</h3>`
              )
              .join('');

            return `
            <div class="card">
              <h1><span class="category">Center Name - </span>${session.name}</h1>
              <div class="innerCard">
                ${detailsHTML}
              </div>
            </div>`;
          })
          .join('');

        cards.innerHTML = content;
      } else {
        alert('No Vaccinations Available');
      }
    })
    .catch(() => {
      alert('Some error occurred');
    });
};

input.addEventListener('keypress', (e) => {
  if (e.which === 13) fetchData();
});

searchBtn.addEventListener('click', fetchData);
