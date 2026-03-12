let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
});

let loginLink = document.getElementById('login-link');
if (sessionStorage.getItem('logado') === 'true') {
    loginLink.textContent = 'Sair';
    loginLink.href = '#';
    loginLink.onclick = () => {
        if (confirm('Tem certeza que deseja sair?')) {
            sessionStorage.removeItem('logado');
            location.reload();
        }
    };
}

const form = document.getElementById('form-contato');
const msg = document.getElementById('msg-ok');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    msg.style.display = 'block';
});

function fecharBanner(id) {
    const banner = document.getElementById(id);
    if (banner) {
        banner.style.opacity = "0";
        banner.style.transform = "scale(.95)";
        setTimeout(() => banner.remove(), 250);
    }
}
