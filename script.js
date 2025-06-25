// Fotoğraf linklerini buradan kolayca değiştirebilirsin
const photoUrls = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=facearea&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=facearea&w=256&h=256&q=80",
  // ... daha fazla fotoğraf linki ekleyebilirsin
];

// Kalp şekli için matematiksel fonksiyon (parametrik)
function heartShape(t, scale = 1) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return [x * scale, -y * scale];
}

const gallery = document.getElementById("heart-gallery");
let zoom = 1;
let selectedIdx = null;

function renderHeartGallery() {
  gallery.innerHTML = "";
  const n = photoUrls.length;
  const scale = 18 * zoom;
  for (let i = 0; i < n; i++) {
    const t = Math.PI * 2 * (i / n);
    const [x, y] = heartShape(t, scale);
    const img = document.createElement("img");
    img.src = photoUrls[i % photoUrls.length];
    img.className = "heart-photo" + (selectedIdx === i ? " selected" : "");
    img.style.left = `${300 + x - 24}px`;
    img.style.top = `${275 + y - 24}px`;
    img.onclick = () => {
      selectedIdx = i;
      renderHeartGallery();
    };
    gallery.appendChild(img);
  }
}

// Zoom özelliği (scroll ile)
gallery.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoom += e.deltaY < 0 ? 0.1 : -0.1;
  if (zoom < 0.5) zoom = 0.5;
  if (zoom > 2.5) zoom = 2.5;
  renderHeartGallery();
});

renderHeartGallery(); 