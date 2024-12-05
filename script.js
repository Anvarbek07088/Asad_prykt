const mainContent = document.getElementById("main-content");

// Har bir qo‘riqxona uchun ma'lumot va xarita yaratish
regionsData.forEach((region, index) => {
  // Sektsiya yaratish
  const section = document.createElement("div");
  section.classList.add("section");

  // Ma'lumotlarni qo‘shish
  section.innerHTML = `
        <h2>${region.name}</h2>
        <p><strong>Tavsif:</strong> ${region.description}</p>
        <p><strong>Tashkil etilgan:</strong> ${region.established}</p>
        <p><strong>Hudud:</strong> ${region.region}</p>
        <p><strong>Muhofaza darajasi:</strong> ${region.protectedStatus}</p>
        <div id="map-${index}" class="map-container"></div>
    `;

  // Sektsiyani asosiy kontentga qo‘shish
  mainContent.appendChild(section);

  // Xarita yaratish
  const map = L.map(`map-${index}`).setView(region.coordinates, 10);

  // OSM qatlami qo‘shish
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Marker qo‘shish
  L.marker(region.coordinates)
    .addTo(map)
    .bindPopup(`<b>${region.name}</b><br>${region.description}`);
});
