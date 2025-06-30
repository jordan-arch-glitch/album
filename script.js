function reveal(el) {
    const next = el.nextElementSibling;
	if (next.style.display !== "none") {
		next.style.display = "none";
	} else {
		next.style.display = "block";
	}
}
const audio = document.getElementById("audio");
// Salva o tempo atual ao sair da página
window.addEventListener('beforeunload', () => {
  if (audio) {
	let saveTimeout;
	clearTimeout(saveTimeout);
	saveTimeout = setTimeout(() => {
	  localStorage.setItem('audioTime', audio.currentTime);
	}, 0);
  }
});
// Retoma do tempo salvo ao carregar
window.addEventListener('DOMContentLoaded', () => {
  const time = localStorage.getItem('audioTime');
  if (audio && time) audio.currentTime = time;
});
// Mostrar as páginas com transição suave para melhorar a experiência do usuário,
// criando uma entrada visual agradável e destacando cada página gradualmente.
window.addEventListener("load", () => {
	const transitionDelay = 300; // Delay between transitions in milliseconds
	const paginas = document.querySelectorAll(".pagina");
	paginas.forEach((_pagina, i) => {
		function addShowClassWithDelay(pagina, delay) {
			setTimeout(() => pagina.classList.add("show"), delay);
		}
		paginas.forEach((pagina, i) => {
			addShowClassWithDelay(pagina, transitionDelay * i);
		});
		setTimeout(() => requestAnimationFrame(applyTransition), transitionDelay * i);
	});
});
function iniciarCarrossel(container) {
  let scrollPos = 0;
  container._carrosselInterval = setInterval(() => {
    if (scrollPos >= container.scrollWidth - container.clientWidth) {
      scrollPos = 0;
    } else {
      scrollPos += container.clientWidth / 2;
    }
    container.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, 3000);
}
function pausarCarrossel(container) {
  clearInterval(container._carrosselInterval);
}
function retomarCarrossel(container) {
  iniciarCarrossel(container);
}

document.querySelectorAll('.carrossel').forEach(carrossel => {
    const imgs = carrossel.querySelectorAll('img');
    const prevBtn = carrossel.querySelector('.prev');
    const nextBtn = carrossel.querySelector('.next');
    let index = 0;
    let autoScroll;

    function showSlide(i) {
        if (i < 0) index = imgs.length - 1;
        else if (i >= imgs.length) index = 0;
        else index = i;
        imgs[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }

    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;

    function startAuto() {
        stopAuto();
        autoScroll = setInterval(nextSlide, 3000);
    }
    function stopAuto() {
        if (autoScroll) clearInterval(autoScroll);
    }

    carrossel.addEventListener('mouseenter', stopAuto);
    carrossel.addEventListener('mouseleave', startAuto);
    carrossel.addEventListener('touchstart', stopAuto);
    carrossel.addEventListener('touchend', startAuto);

    // Swipe (toque)
    let startX = 0;
    carrossel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    carrossel.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) prevSlide();
        else if (startX - endX > 50) nextSlide();
    });

    showSlide(0);
    startAuto();
});

const audioPlayer = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const musicSeek = document.getElementById('musicSeek');

if (audioPlayer && playPauseBtn && musicSeek) {
    playPauseBtn.onclick = () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶️';
        }
    };
    audioPlayer.ontimeupdate = () => {
        musicSeek.value = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    };
    musicSeek.oninput = () => {
        audioPlayer.currentTime = (musicSeek.value / 100) * audioPlayer.duration;
    };
}

function atualizarTimer() {
    // Data do primeiro encontro (exemplo: 2022-06-18 00:00:00)
    const inicio = new Date('2022-06-18T00:00:00');
    const agora = new Date();

    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    let horas = agora.getHours() - inicio.getHours();
    let minutos = agora.getMinutes() - inicio.getMinutes();
    let segundos = agora.getSeconds() - inicio.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        // Ajusta dias considerando o mês anterior
        const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
        dias += mesAnterior.getDate();
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    // Calcula semanas
    let semanas = Math.floor(dias / 7);
    dias = dias % 7;

    document.getElementById('timer').textContent =
        `${anos} anos, ${meses} meses, ${semanas} semanas, ${dias} dias, ` +
        `${horas} horas, ${minutos} minutos, ${segundos} segundos`;
}
setInterval(atualizarTimer, 1000);
atualizarTimer();

window.addEventListener('click', () => {
    const audio = document.getElementById('audio');
    if (audio && audio.paused) {
        audio.play();
    }
}, { once: true });

document.querySelectorAll('.slider-fade').forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let index = 0;
    let autoScroll;

    function showSlide(i) {
        slides[index].classList.remove('active');
        index = (i + slides.length) % slides.length;
        slides[index].classList.add('active');
    }

    function nextSlide() { showSlide(index + 1); }
    function prevSlide() { showSlide(index - 1); }

    if (nextBtn) nextBtn.onclick = nextSlide;
    if (prevBtn) prevBtn.onclick = prevSlide;

    function startAuto() {
        stopAuto();
        autoScroll = setInterval(nextSlide, 3000);
    }
    function stopAuto() {
        if (autoScroll) clearInterval(autoScroll);
    }

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // Swipe para mobile
    let startX = 0;
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAuto();
    });
    slider.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) prevSlide();
        else if (startX - endX > 50) nextSlide();
        startAuto();
    });

    showSlide(0);
    startAuto();
});

// Efeito de estrelas brilhando
function criarEstrelas(qtd = 80) {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    starsContainer.innerHTML = '';
    for (let i = 0; i < qtd; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${1.5 + Math.random()}s`;
        starsContainer.appendChild(star);
    }
}
criarEstrelas();
