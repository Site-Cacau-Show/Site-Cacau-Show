document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMsg = document.getElementById("successMsg");
  const togglePwd = document.getElementById("togglePwd");
  const pwd = document.getElementById("password");
  const confirmPwd = document.getElementById("confirmPassword");
  const cpfInput = document.getElementById("cpf");
  const telInput = document.getElementById("telefone");

  if (togglePwd && pwd) {
    togglePwd.addEventListener("click", function () {
      const isPwd = pwd.type === "password";
      pwd.type = isPwd ? "text" : "password";
      togglePwd.textContent = isPwd ? "🙈" : "👁️";
    });
  }

  if (cpfInput) {
    cpfInput.addEventListener("input", function () {
      let v = cpfInput.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      cpfInput.value = v;
    });
  }

  if (telInput) {
    telInput.addEventListener("input", function () {
      let v = telInput.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/^(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
      telInput.value = v;
    });
  }

  if (!form) return;
  form.addEventListener("submit", function (e) {
    // NÃO impedir o envio ao servidor (remova e.preventDefault())
    // apenas valide antes de enviar:
    if (!form.checkValidity()) {
      form.reportValidity();
      e.preventDefault(); // aqui apenas quando inválido
      return;
    }

    if (pwd.value !== confirmPwd.value) {
      document.querySelector('[data-for="confirmPassword"]').textContent =
        "❌ As senhas não coincidem.";
      e.preventDefault();
      return;
    } else {
      document.querySelector('[data-for="confirmPassword"]').textContent = "";
    }

    // opcional: colocar loading, mas deixar o submit seguir (não chame e.preventDefault())
    if (submitBtn) submitBtn.classList.add("loading");
    if (successMsg) successMsg.style.display = "none";

    // se quiser dar feedback, deixe o php redirecionar ou retornar mensagem
  });
});

const form = document.getElementById("cadastroForm");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // impede reload da página

    const username = document.getElementById("email").value; // vamos usar email como username
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // validação simples
    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            document.getElementById("successMsg").style.display = "block";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            alert("Erro: " + data.error);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Erro ao conectar com o servidor");
    });
});
