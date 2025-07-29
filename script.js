const dummyEvents = [
  { name: "The Moon, the Earth and Us by Oliver Jeffers", lat: 43.651, lon: -79.383, distance: 0.5 },
  { name: "Macroscope by Linda Qian", lat: 43.653, lon: -79.387, distance: 1.2 },
  { name: "Snail work (for the lake) by Shannon Garden-Smith", lat: 43.649, lon: -79.376, distance: 1.8 }
];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showNearbyEvents, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showNearbyEvents(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;

  const nearby = dummyEvents.filter(e => e.distance < 2); 
  const eventsContainer = document.getElementById("events");

  if (nearby.length === 0) {
    eventsContainer.innerHTML = "<p>No events nearby.</p>";
    return;
  }

  eventsContainer.innerHTML = nearby.map(e => `
    <div class="event-card">
      <h2>${e.name}</h2>
      <p>Distance: ${e.distance} km</p>
    </div>
  `).join("");
}

function showError(error) {
  const eventsContainer = document.getElementById("events");
  eventsContainer.innerHTML = "<p> Unable to access your location. Please enable location permissions.</p>";
}
