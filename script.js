// --- CÓDIGO PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {

    // --- ENVIO DE FEEDBACK COM AVATAR ---
    const btnEnviarFeedback = document.getElementById('btn-enviar-feedback');
    const inputNome = document.getElementById('feedback-nome');
    const inputMensagem = document.getElementById('feedback-mensagem');
    const inputAvatar = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    const avatarContainer = document.querySelector('.avatar-container');

    if (avatarContainer && inputAvatar && avatarPreview) {
        avatarContainer.addEventListener('click', () => inputAvatar.click());

        inputAvatar.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => avatarPreview.src = e.target.result;
                reader.readAsDataURL(file);
            }
        });
    }

    if (btnEnviarFeedback) {
        btnEnviarFeedback.addEventListener('click', () => {
            const nome = inputNome.value.trim();
            const mensagem = inputMensagem.value.trim();
            const avatarFile = inputAvatar.files[0];

            if (!nome || !mensagem) {
                alert('Por favor, preencha seu nome e a mensagem.');
                return;
            }

            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('mensagem', mensagem);
            if (avatarFile) formData.append('avatar', avatarFile);

            fetch('salvar_feedback.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Feedback enviado com sucesso! Obrigado.');
                    inputNome.value = '';
                    inputMensagem.value = '';
                    inputAvatar.value = '';
                    avatarPreview.src = 'https://via.placeholder.com/200';
                } else {
                    alert('Erro ao enviar feedback: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro de rede. Tente novamente.');
            });
        });
    }

    // --- SLIDER MANUAL ---
    let list = document.querySelectorAll('.item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let count = list.length;
    let active = 0;

    if (next && prev) {
        next.onclick = () => {
            document.querySelector('.item.active')?.classList.remove('active');
            active = (active + 1) % count;
            list[active].classList.add('active');
        };

        prev.onclick = () => {
            document.querySelector('.item.active')?.classList.remove('active');
            active = (active - 1 + count) % count;
            list[active].classList.add('active');
        };
    }

    // --- HEADER FIXO AO ROLAR ---
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("sticky", window.scrollY > 80);
        });
    }

    // --- MENU RESPONSIVO ---
    let menu = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');
    if (menu && navbar) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('open');
        };
    }

    // --- LOGIN / LOGOUT ---
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        function atualizarBotao() {
            const logado = localStorage.getItem("logado") === "true";
            loginBtn.textContent = logado ? "Sair" : "Entrar";
        }

        atualizarBotao();

        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const logado = localStorage.getItem("logado") === "true";

            if (!logado) {
                sessionStorage.setItem("paginaAnterior", window.location.href);
                window.location.href = "login.html";
            } else {
                if (confirm("Tem certeza que deseja sair?")) {
                    localStorage.removeItem("logado");
                    atualizarBotao();
                    window.location.reload();
                }
            }
        });
    }

    // --- FEEDBACK SIMPLES (SEM UPLOAD) ---
    const btnEnviarSimples = document.querySelector(".btn-enviar");
    const feedbackMsg = document.getElementById("feedback-msg");
    const nomeInputSimples = document.querySelector(".input-nome");
    const feedbackTextarea = document.querySelector(".textarea-feedback");

    if (btnEnviarSimples && nomeInputSimples && feedbackTextarea) {
        btnEnviarSimples.addEventListener("click", (e) => {
            e.preventDefault();

            if (!nomeInputSimples.value.trim() || !feedbackTextarea.value.trim()) {
                alert("Por favor, preencha seu nome e feedback antes de enviar.");
                return;
            }

            nomeInputSimples.value = "";
            feedbackTextarea.value = "";

            if (feedbackMsg) {
                feedbackMsg.style.display = "block";
                setTimeout(() => feedbackMsg.style.display = "none", 3000);
            }
        });
    }

    // --- SWIPER SLIDER ---
    if (typeof Swiper !== "undefined") {
        new Swiper('.slider-wrapper', {
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }
});