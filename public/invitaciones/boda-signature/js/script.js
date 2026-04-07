// ============ CONFIGURACIÓN ============
const pathParts = window.location.pathname
  .split("/")
  .filter((p) => p && p !== "index.html");
const adminIndex = pathParts.indexOf("admin");
const INVITACION_ID =
  adminIndex > 0
    ? pathParts[adminIndex - 1]
    : pathParts.length > 1
      ? pathParts[1]
      : pathParts[0];
const isLocal =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1") ||
  window.location.hostname.match(/^192\.168\.|^10\.|^172\./);
const API_URL = isLocal
  ? `http://${window.location.hostname}:8787`
  : "https://api.markentas.com";

// ============ HELPER ============
function getEl(id) {
  return document.getElementById(id);
}

// ============ MÚSICA ============
function iniciarMusica() {
  const audio = getEl("audio");
  const btnMusica = getEl("btn-musica");
  if (!audio || !btnMusica) return;

  audio.play().then(() => {
    btnMusica.classList.add("playing");
  }).catch(() => {
    console.log("Navegador bloquó reproducción automática");
  });
}

function toggleMusica() {
  const audio = getEl("audio");
  const btnMusica = getEl("btn-musica");
  if (!audio || !btnMusica) return;

  if (audio.paused) {
    audio.play();
    btnMusica.classList.add("playing");
  } else {
    audio.pause();
    btnMusica.classList.remove("playing");
  }
}

// ============ COUNTDOWN ============
function initCountdown() {
  const countdownSection = getEl("countdown");
  if (!countdownSection) return;

  const fecha = countdownSection.dataset.fecha || "2026-03-15";
  const hora = countdownSection.dataset.hora || "21:00";
  const targetDate = new Date(`${fecha}T${hora}:00`).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = getEl("days");
    const hoursEl = getEl("hours");
    const minutesEl = getEl("minutes");
    const secondsEl = getEl("seconds");

    if (distance < 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days < 10 ? `0${days}` : days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    if (minutesEl) minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsEl) secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============ SLIDER ============
function initSlider() {
  const slides = document.querySelectorAll(".slider-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const wrapper = getEl("sliderWrapper");
  if (!slides.length || !wrapper) return;

  let currentSlide = 0;
  let autoSlideInterval;
  let isTransitioning = false;

  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentSlide = index;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    setTimeout(() => { isTransitioning = false; }, 600);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  window.addEventListener("load", startAutoSlide);
}

// ============ MODAL ============
function openModal() {
  const modal = getEl("modal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(event) {
  const modal = getEl("modal");
  if (!modal) return;
  
  if (!event || event.target === modal || event.target.classList.contains("modal-cerrar")) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".count-block, .slider-container, .fecha-container, .frase-container, .ubicacion-container, .dresscode-container, .regalos-container, .instagram-container, .especial-container, .confirmar-container, .footer-container"
  );
  
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ============ NOTIFICACIONES ============
function mostrarNotificacion(mensaje, tipo = "info") {
  const contenedor = getEl("notificaciones");
  if (!contenedor) return;

  const notificacion = document.createElement("div");
  notificacion.className = `notificacion ${tipo}`;
  const iconos = { info: "fa-info-circle", exito: "fa-check-circle", error: "fa-exclamation-circle" };
  notificacion.innerHTML = `<i class="fas ${iconos[tipo] || iconos.info}"></i><span>${mensaje}</span>`;
  contenedor.appendChild(notificacion);
  setTimeout(() => { notificacion.remove(); }, 5000);
}

function mostrarDemo() {
  mostrarNotificacion("Demo - Esta invitación es una demostración. ¡Gracias por revisar el demo!", "info");
}

// ============ GALERÍA DE INVITADOS ============
let fotosLightbox = [];

async function cargarGaleria() {
  const grid = getEl("galeriaGrid");
  if (!grid) return;

  try {
    const response = await fetch(`${API_URL}/api/imagenes/${INVITACION_ID}`);
    const fotos = await response.json();

    if (fotos.length === 0) {
      grid.innerHTML = '<p class="galeria-vacio">¡Sé el primero en subir tu foto!</p>';
      return;
    }

    fotosLightbox = fotos.map((f) => f.cloudinary_url);
    grid.innerHTML = fotos.map((foto, index) => `
      <div class="galeria-item" onclick="abrirLightbox(${index})">
        <img src="${foto.cloudinary_url}" alt="Foto de invitado" loading="lazy">
      </div>
    `).join("");
  } catch (error) {
    console.error("Error al cargar galería:", error);
  }
}

let fotosSeleccionadas = [];

function initGaleria() {
  const input = getEl("galeriaInput");
  if (!input) return;

  input.addEventListener("change", function (e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    fotosSeleccionadas = [];
    const previewGrid = getEl("galeriaPreviewGrid");
    if (previewGrid) previewGrid.innerHTML = "";

    let loadedCount = 0;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        fotosSeleccionadas.push(event.target.result);
        const img = document.createElement("img");
        img.src = event.target.result;
        if (previewGrid) previewGrid.appendChild(img);
        loadedCount++;
        if (loadedCount === files.length) {
          const preview = getEl("galeriaPreview");
          if (preview) preview.style.display = "block";
        }
      };
      reader.readAsDataURL(file);
    });
  });
}

function cancelarFotos() {
  fotosSeleccionadas = [];
  const input = getEl("galeriaInput");
  const preview = getEl("galeriaPreview");
  const previewGrid = getEl("galeriaPreviewGrid");
  
  if (input) input.value = "";
  if (preview) preview.style.display = "none";
  if (previewGrid) previewGrid.innerHTML = "";
}

async function subirFotos() {
  if (fotosSeleccionadas.length === 0) return;

  const btn = getEl("btnEnviar");
  const cantidad = fotosSeleccionadas.length;
  if (btn) {
    btn.textContent = `Enviando... (0/${cantidad})`;
    btn.disabled = true;
  }

  let exitosas = 0;
  let fallidas = 0;

  for (let i = 0; i < fotosSeleccionadas.length; i++) {
    if (btn) btn.textContent = `Enviando... (${i + 1}/${cantidad})`;

    try {
      const response = await fetch(`${API_URL}/api/imagenes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitacion_id: INVITACION_ID,
          image_base64: fotosSeleccionadas[i],
          tipo: "invitado",
        }),
      });
      const result = await response.json();
      if (result.success) exitosas++; else fallidas++;
    } catch (error) {
      fallidas++;
    }
  }

  if (exitosas > 0) mostrarNotificacion(`¡${exitosas} foto${exitosas > 1 ? "s" : ""} subida${exitosas > 1 ? "s" : ""} con éxito!`, "exito");
  if (fallidas > 0) mostrarNotificacion(`${fallidas} foto${fallidas > 1 ? "s" : ""} no se pudieron subir`, "error");

  cancelarFotos();
  cargarGaleria();
  if (btn) { btn.textContent = "Enviar todas"; btn.disabled = false; }
}

// ============ LIGHTBOX ============
let indiceLightbox = 0;
let touchStartX = 0;
let touchEndX = 0;

function abrirLightbox(index) {
  if (!fotosLightbox.length) return;
  indiceLightbox = index;
  const lightbox = getEl("lightbox");
  const img = getEl("lightbox-img");
  if (img && lightbox) {
    img.src = fotosLightbox[indiceLightbox];
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function cerrarLightbox() {
  const lightbox = getEl("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function navegarLightbox(direccion) {
  if (!fotosLightbox.length) return;
  indiceLightbox += direccion;
  if (indiceLightbox < 0) indiceLightbox = fotosLightbox.length - 1;
  else if (indiceLightbox >= fotosLightbox.length) indiceLightbox = 0;
  const img = getEl("lightbox-img");
  if (img) img.src = fotosLightbox[indiceLightbox];
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) navegarLightbox(1);
    else navegarLightbox(-1);
  }
}

function initLightbox() {
  const lightbox = getEl("lightbox");
  if (!lightbox) return;

  lightbox.addEventListener("click", function (e) {
    if (e.target === this) cerrarLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") cerrarLightbox();
    else if (e.key === "ArrowLeft") navegarLightbox(-1);
    else if (e.key === "ArrowRight") navegarLightbox(1);
  });

  lightbox.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener("touchend", (e) => { touchEndX = e.changedTouches[0].screenX; handleSwipe(); }, { passive: true });
}

// ============ CONFIRMACIÓN CON TOKEN ============
let cantidadConfirmacion = 1;
let cantidadMaxima = 1;
let datosInvitado = null;
let token = null;

function showConfirmarToken() {
  const normal = getEl("confirmarNormal") || getEl("rsvpNormal");
  const tokenEl = getEl("confirmarToken") || getEl("rsvpToken");
  const nombreEl = getEl("confirmarNombre") || getEl("rsvpNombre");
  const info = getEl("confirmarInfo") || getEl("rsvpInfo");
  const form = getEl("confirmarForm") || getEl("rsvpForm");
  const exito = getEl("confirmarExito") || getEl("rsvpExito");

  if (normal) normal.style.display = "none";
  if (tokenEl) tokenEl.style.display = "block";
  if (nombreEl && datosInvitado) nombreEl.textContent = `Hola ${datosInvitado.nombre}, te invito a mi fiesta`;
  if (info) info.textContent = `Somos ${cantidadConfirmacion} persona${cantidadConfirmacion > 1 ? "s" : ""}`;
  if (form) form.style.display = "block";
  if (exito) exito.style.display = "none";
}

function showYaConfirmado() {
  const normal = getEl("confirmarNormal") || getEl("rsvpNormal");
  const tokenEl = getEl("confirmarToken") || getEl("rsvpToken");
  const nombreEl = getEl("confirmarNombre") || getEl("rsvpNombre");
  const info = getEl("confirmarInfo") || getEl("rsvpInfo");
  const form = getEl("confirmarForm") || getEl("rsvpForm");
  const exito = getEl("confirmarExito") || getEl("rsvpExito");

  if (normal) normal.style.display = "none";
  if (tokenEl) tokenEl.style.display = "block";
  if (nombreEl) {
    nombreEl.textContent = "Asistencia Confirmada. Gracias";
    nombreEl.style.color = "#22c55e";
  }
  if (info) {
    const yaConfirmo = datosInvitado && datosInvitado.confirmacion === "si";
    const textoConfirmacion = yaConfirmo 
      ? `Asistirás con ${datosInvitado.confirmados || cantidadConfirmacion} persona${(datosInvitado.confirmados || cantidadConfirmacion) > 1 ? "s" : ""}`
      : "No asistirás";
    info.textContent = textoConfirmacion;
    info.style.fontWeight = "normal";
    info.style.color = "#f1f5f9";
  }
  if (form) form.style.display = "none";
  if (exito) exito.style.display = "none";
}

async function verificarToken() {
  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/api/invitado?token=${token}`);
    if (!response.ok) {
      console.error("Token inválido", response.status);
      return;
    }

    datosInvitado = await response.json();
    if (datosInvitado) {
      cantidadMaxima = datosInvitado.cantidad || 1;
      cantidadConfirmacion = cantidadMaxima;
      
      setTimeout(() => {
        // Si ya confirmó, mostrar estado de confirmación existente
        if (datosInvitado.confirmacion) {
          // Usar la cantidad que ya había confirmado
          cantidadConfirmacion = datosInvitado.confirmados || cantidadMaxima;
          showYaConfirmado();
        } else {
          // Mostrar formulario de confirmación
          showConfirmarToken();
          actualizarCantidad();
        }
      }, 100);
    }
  } catch (error) {
    console.error("Error verificando token:", error);
  }
}

function cambiarCantidad(delta) {
  const nuevaCantidad = cantidadConfirmacion + delta;
  if (nuevaCantidad >= 1 && nuevaCantidad <= cantidadMaxima) {
    cantidadConfirmacion = nuevaCantidad;
    actualizarCantidad();
  }
}

function actualizarCantidad() {
  const cantidadEl = getEl("cantidadPersonas");
  const infoEl = getEl("confirmarInfo") || getEl("rsvpInfo");
  if (cantidadEl) cantidadEl.textContent = cantidadConfirmacion;
  if (infoEl) infoEl.textContent = `Somos ${cantidadConfirmacion} persona${cantidadConfirmacion > 1 ? "s" : ""}`;
}

async function confirmarAsistencia(confirmacion) {
  if (!token) return;

  try {
    const response = await fetch(`${API_URL}/api/invitado/confirmar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        confirmacion: confirmacion,
        confirmados: confirmacion === "si" ? cantidadConfirmacion : 0,
      }),
    });

    const result = await response.json();
    if (result.success) {
      const form = getEl("confirmarForm") || getEl("rsvpForm");
      const exito = getEl("confirmarExito") || getEl("rsvpExito");
      if (form) form.style.display = "none";
      if (exito) exito.style.display = "block";
    }
  } catch (error) {
    console.error("Error confirmando:", error);
    mostrarNotificacion("Error al confirmar. Por favor revisa tu conexión a internet e intenta nuevamente.", "error");
  }
}

function initToken() {
  const urlParams = new URLSearchParams(window.location.search);
  token = urlParams.get("token");
  if (token) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', verificarToken);
    } else {
      verificarToken();
    }
  }
}

// ============ SALUDOS / LIBRO DE VISITAS ============
let saludosList = [];

async function cargarSaludos() {
  const lista = getEl("saludosLista");
  const badge = getEl("saludosBadge");
  if (!lista) return;

  try {
    const response = await fetch(`${API_URL}/api/saludos/${INVITACION_ID}`);
    saludosList = await response.json();

    if (badge) {
      badge.textContent = saludosList.length;
      badge.style.display = saludosList.length > 0 ? "flex" : "none";
    }

    if (saludosList.length === 0) {
      lista.innerHTML = '<p class="saludos-vacio">Sé el primero en escribir un mensaje</p>';
      return;
    }

    lista.innerHTML = saludosList.map((saludo) => `
      <div class="saludos-item">
        <p class="saludos-item-nombre">${saludo.nombre}</p>
        <p class="saludos-item-mensaje">${saludo.mensaje}</p>
        <p class="saludos-item-fecha">${formatDateSaludos(saludo.created_at)}</p>
      </div>
    `).join("");

    lista.scrollTop = lista.scrollHeight;
  } catch (error) {
    console.error("Error cargando saludos:", error);
  }
}

function formatDateSaludos(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-AR", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
  });
}

function abrirModalSaludos() {
  const modal = getEl("modalSaludos");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    cargarSaludos();
  }
}

function closeModalSaludos(event) {
  const modal = getEl("modalSaludos");
  if (!modal) return;
  
  if (!event || event.target === modal || event.target.classList.contains("modal-cerrar")) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

async function enviarSaludo() {
  const nombreInput = getEl("saludoNombre");
  const mensajeInput = getEl("saludoMensaje");
  const btn = document.querySelector(".saludos-btn");
  
  if (!nombreInput || !mensajeInput) return;
  
  const nombre = nombreInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  if (!nombre || !mensaje) {
    mostrarNotificacion("Por favor completa todos los campos", "error");
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }

  try {
    const response = await fetch(`${API_URL}/api/saludos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitacion_id: INVITACION_ID,
        nombre: nombre,
        mensaje: mensaje,
      }),
    });

    const result = await response.json();
    if (result.success) {
      if (nombreInput) nombreInput.value = "";
      if (mensajeInput) mensajeInput.value = "";
      cargarSaludos();
    } else {
      mostrarNotificacion("Error al enviar. Intenta de nuevo.", "error");
    }
  } catch (error) {
    mostrarNotificacion("Error al enviar. Intenta de nuevo.", "error");
  }

  if (btn) { btn.disabled = false; btn.textContent = "Enviar"; }
}

function initSaludos() {
  if (getEl("saludosBtn")) {
    cargarSaludos();
  }
}

// ============ INICIALIZACIÓN ============
document.addEventListener("DOMContentLoaded", function() {
  initCountdown();
  initSlider();
  initScrollAnimations();
  initSmoothScroll();
  initGaleria();
  initLightbox();
  initSaludos();
  initToken();
});
