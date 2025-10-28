/* Register SW + simple UI logic */
let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch(console.error);
  });
}

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

// Load sites
async function loadSites() {
  try {
    const res = await fetch('data/sites.json');
    const sites = await res.json();
    const container = document.getElementById('sitesContainer');
    container.innerHTML = '';

    for (const site of sites) {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <span class="badge">${site.city || ''}</span>
        <h3>${site.name}</h3>
        <p>Accesos rápidos</p>
        <div class="actions">
          <a class="action" href="${site.booking_url || '#'}" target="_blank" rel="noopener">Reservar</a>
          <a class="action" href="tel:${(site.phone||'').replace(/\s+/g,'')}" >Llamar</a>
          <a class="action" href="https://wa.me/${(site.whatsapp||'').replace(/\s+/g,'')}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="action" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.maps_query || site.name)}" target="_blank" rel="noopener">Cómo llegar</a>
          <a class="action" href="${site.website || '#'}" target="_blank" rel="noopener">Web</a>
          <a class="action" href="mailto:${site.email || ''}">Email</a>
        </div>
      `;
      container.appendChild(card);
    }
  } catch (e) {
    console.error(e);
    document.getElementById('sitesContainer').innerHTML = '<p>⚠️ No se pudo cargar la información. Revisa tu conexión.</p>';
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastUpdated').textContent = new Date().toLocaleString();

loadSites();
