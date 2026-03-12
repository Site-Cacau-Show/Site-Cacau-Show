document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const form = document.getElementById("loginForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMsg = document.getElementById("successMsg");
  const togglePwd = document.getElementById("togglePwd");
  const pwd = document.getElementById("password");

  // --- Controle do botão Entrar / Sair ---
  if (loginBtn) {
    function setLoggedState() {
      loginBtn.innerText = "Sair";
      loginBtn.href = "#";
      loginBtn.onclick = function (e) {
        e.preventDefault();
        localStorage.removeItem("logado");
        location.reload();
      };
    }

    function setLoggedOutState() {
      loginBtn.innerText = "Entrar";
      loginBtn.href = "login.html";
      loginBtn.onclick = null;
    }

    if (localStorage.getItem("logado") === "true") {
      setLoggedState();
    } else {
      setLoggedOutState();
    }
  }

  // --- Se já estiver logado, volta para página anterior ---
  if (localStorage.getItem("logado") === "true") {
    try { window.history.back(); } catch (e) {}
    return;
  }

  if (!form) return;

  // --- Mostrar / ocultar senha ---
  if (togglePwd && pwd) {
    togglePwd.addEventListener("click", function () {
      const isPwd = pwd.type === "password";
      pwd.type = isPwd ? "text" : "password";
      togglePwd.textContent = isPwd ? "🙈" : "👁️";
    });
  }

  // --- Envio do formulário ---
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio real do formulário

    // Verifica se os campos obrigatórios estão válidos
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Mostra estado de "carregando"
    if (submitBtn) submitBtn.classList.add("loading");
    if (successMsg) successMsg.style.display = "none";

    // Simula processamento (ex: requisição ao servidor)
    setTimeout(function () {
      localStorage.setItem("logado", "true");
      if (submitBtn) submitBtn.classList.remove("loading");

      // Exibe mensagem de sucesso
      if (successMsg) {
        successMsg.style.display = "block";
      }

      setTimeout(function () {
        const voltar = sessionStorage.getItem("paginaAnterior") || "index.html";
        sessionStorage.removeItem("paginaAnterior");
        window.location.href = voltar;
      }, 1000);
    }, 1500);
  });
});
