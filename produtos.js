/* produtos.js - versão final unificada com formulário pessoal + pagamento */
document.addEventListener("DOMContentLoaded", () => {

  /* ------------------ LOGIN ------------------ */
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

  /* ------------------ HEADER STICKY ------------------ */
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 80);
    });
  }

  /* ------------------ MENU MOBILE ------------------ */
  const menu = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  if (menu) {
    menu.onclick = () => {
      menu.classList.toggle('bx-x');
      if (navbar) navbar.classList.toggle('open');
    };
  }

  /* ------------------ SLIDER DE PRODUTOS ------------------ */
  const productContainers = [...document.querySelectorAll('.product-container')];
  const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
  const preBtn = [...document.querySelectorAll('.pre-btn')];

  productContainers.forEach((item, i) => {
    try {
      let containerWidth = item.getBoundingClientRect().width;
      if (nxtBtn[i]) nxtBtn[i].addEventListener('click', () => item.scrollLeft += containerWidth);
      if (preBtn[i]) preBtn[i].addEventListener('click', () => item.scrollLeft -= containerWidth);
    } catch(e) {}
  });

  /* ------------------ ANIMAÇÃO HOVER PRODUTOS ------------------ */
  const produtos = document.querySelectorAll('.product-card');
  produtos.forEach(produto => {
    produto.addEventListener('mouseenter', () => {
      produto.style.transform = 'scale(1.05)';
      produto.style.transition = '0.3s';
    });
    produto.addEventListener('mouseleave', () => {
      produto.style.transform = 'scale(1)';
    });
  });

  /* ------------------ CARRINHO ------------------ */
  let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

  const abrirCarrinhoBtn = document.getElementById("abrirCarrinho");
  const carrinhoModal = document.getElementById("carrinhoModal");
  const itensCarrinhoEl = document.getElementById("itensCarrinho");
  const totalCarrinhoEl = document.getElementById("totalCarrinho");
  const fecharCarrinhoBtn = document.getElementById("fecharCarrinho");
  const comprarBtn = document.getElementById("comprarBtn");

  /* ------------------ MODAL FORMULÁRIO PESSOAL ------------------ */
  const formularioModal = document.getElementById("formularioCompra");
  const fecharFormBtn = document.getElementById("fecharForm");
  const compraForm = document.getElementById("compraForm");
  const cpfInput = document.getElementById("cpf");
  const telInput = document.getElementById("telefone");
  const nomeInput = document.getElementById("nomeCliente");
  const cepInput = document.getElementById("cep");
  const formaPagamento = document.getElementById("formaPagamento");

  /* ------------------ SOM E TOAST ------------------ */
  const somAddCarrinho = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_3b8b962c64.mp3?filename=pop-94319.mp3");
  somAddCarrinho.volume = 0.45;
  function tocarSomAdd() { try { somAddCarrinho.currentTime=0; somAddCarrinho.play().catch(()=>{}); } catch(e){} }
  function mostrarMensagem(texto) {
    const existente = document.querySelector('.mensagem-add');
    if(existente) existente.remove();
    const msg = document.createElement('div');
    msg.className='mensagem-add'; msg.textContent=texto;
    document.body.appendChild(msg);
    setTimeout(()=>msg.classList.add('show'),50);
    setTimeout(()=>{ msg.classList.remove('show'); setTimeout(()=>msg.remove(),400); },2500);
  }

  /* ------------------ FUNÇÕES AUX ------------------ */
  function parsePreco(texto){
    if(!texto) return 0;
    let clean = texto.replace(/[^\d.,]/g,'').replace(/\./g,'').replace(',', '.');
    const n = parseFloat(clean);
    return isNaN(n)?0:n;
  }
  function formatBRL(num){ return Number(num).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

  /* ------------------ RENDER CARRINHO ------------------ */
  function renderCarrinho() {
    if(!itensCarrinhoEl||!totalCarrinhoEl||!comprarBtn) return;
    itensCarrinhoEl.innerHTML='';
    if(!carrinho.length){ itensCarrinhoEl.innerHTML='<p>Seu carrinho está vazio.</p>'; totalCarrinhoEl.textContent='Total: R$ 0,00'; comprarBtn.style.display='none'; return; }

    const ul=document.createElement('ul'); ul.style.listStyle='none'; ul.style.padding='0';
    carrinho.forEach((item,idx)=>{
      const li=document.createElement('li'); li.style.display='flex'; li.style.justifyContent='space-between'; li.style.alignItems='center';
      li.style.margin='8px 0'; li.style.padding='8px'; li.style.borderRadius='8px'; li.style.background='var(--first-color)'; li.style.color='var(--dark-color)';

      const left=document.createElement('div');
      left.innerHTML=`<strong>${item.nome}</strong><div style="font-size:0.85rem;opacity:0.8">${item.info||''}</div>`;
      const right=document.createElement('div'); right.style.display='flex'; right.style.gap='8px'; right.style.alignItems='center';

      const price=document.createElement('div'); price.textContent=formatBRL(item.preco);
      const remBtn=document.createElement('button'); remBtn.textContent='Remover'; remBtn.style.cursor='pointer';
      remBtn.onclick=()=>{ carrinho.splice(idx,1); localStorage.setItem('carrinho',JSON.stringify(carrinho)); renderCarrinho(); mostrarMensagem('Item removido do carrinho!'); };

      right.appendChild(price); right.appendChild(remBtn);
      li.appendChild(left); li.appendChild(right);
      ul.appendChild(li);
    });

    itensCarrinhoEl.appendChild(ul);
    const total = carrinho.reduce((s,it)=>s+Number(it.preco||0),0);
    totalCarrinhoEl.textContent=`Total: ${formatBRL(total)}`;
    comprarBtn.style.display='block';
  }

  /* ------------------ ABRIR/FECHAR MODAIS ------------------ */
  function abrirCarrinho(){ renderCarrinho(); if(carrinhoModal){carrinhoModal.style.display='flex'; carrinhoModal.setAttribute('aria-hidden','false');} }
  function fecharCarrinho(){ if(carrinhoModal){carrinhoModal.style.display='none'; carrinhoModal.setAttribute('aria-hidden','true');} }
  function abrirFormulario(){ fecharCarrinho(); if(formularioModal){formularioModal.style.display='flex'; formularioModal.setAttribute('aria-hidden','false');} }
  function fecharFormulario(){ if(formularioModal){formularioModal.style.display='none'; formularioModal.setAttribute('aria-hidden','true');} }

  if(abrirCarrinhoBtn) abrirCarrinhoBtn.addEventListener('click',abrirCarrinho);
  if(fecharCarrinhoBtn) fecharCarrinhoBtn.addEventListener('click',fecharCarrinho);
  if(comprarBtn) comprarBtn.addEventListener('click',abrirFormulario);
  if(fecharFormBtn) fecharFormBtn.addEventListener('click',fecharFormulario);

  window.addEventListener('click',(e)=>{
    if(e.target===carrinhoModal) fecharCarrinho();
    if(e.target===formularioModal) fecharFormulario();
  });

  /* ------------------ MÁSCARAS ------------------ */
  function mascaraCPF(v) {
  v = v.replace(/\D/g, "");         // Remove tudo que não é número
  v = v.substring(0, 11);           // Limita a 11 dígitos
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v;
}

function mascaraTel(v) {
  v = v.replace(/\D/g, "");         // Remove tudo que não é número
  v = v.substring(0, 11);           // Limita a 11 dígitos (DDD + número)
  if (v.length <= 10) {
    // Telefone fixo
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{4})(\d{0,4})$/, "$1-$2");
  } else {
    // Celular (com o 9)
    v = v.replace(/(\d{2})(\d)/, "($1) $2");
    v = v.replace(/(\d{5})(\d{4})$/, "$1-$2");
  }
  return v;
}

// mantém exatamente igual
if (cpfInput) cpfInput.addEventListener('input', (e) => e.target.value = mascaraCPF(e.target.value));
if (telInput) telInput.addEventListener('input', (e) => e.target.value = mascaraTel(e.target.value));

if (cepInput) {
  cepInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 5) v = v.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = v.substring(0, 9);
  });
}

  /* ------------------ SUBMISSÃO FORMULÁRIO PESSOAL ------------------ */
  if(compraForm) compraForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!nomeInput.value.trim()||!cpfInput.value.trim()||!telInput.value.trim()||!cepInput.value.trim()||!formaPagamento.value){
      alert('Preencha todos os campos corretamente.');
      return;
    }
    // Após dados preenchidos, abre modal de pagamento
    abrirPagamento();
  });

  /* ------------------ ADICIONAR AO CARRINHO ------------------ */
  function adicionarAoCarrinho(nome,preco,info=''){
    const logado = loginBtn && loginBtn.textContent.trim().toLowerCase()==='sair';
    if(!logado){ alert('Você precisa estar logado para adicionar ao carrinho!'); return; }
    carrinho.push({nome, preco:Number(preco), info});
    localStorage.setItem('carrinho',JSON.stringify(carrinho));
    tocarSomAdd(); mostrarMensagem('Item adicionado ao carrinho!');
  }

  function attachProductButtons(){
    const botoes=document.querySelectorAll('.card-btn,.card__button,a.card__button,[data-add-cart],.add-cart');
    botoes.forEach(btn=>{
      if(btn.dataset.carrinhoIniciado) return;
      btn.dataset.carrinhoIniciado='1';
      btn.addEventListener('click',(e)=>{
        try{e.preventDefault();}catch(err){}
        const card=e.target.closest('.product-card,.card,.card__data,.product-card')||e.target.closest('div');
        if(!card){ mostrarMensagem('Não foi possível identificar o produto.'); return; }
        const nomeEl=card.querySelector('.product-brand,.card__title,h2,.card__title');
        const nome=nomeEl?nomeEl.textContent.trim():(card.getAttribute('data-nome')||'Produto');
        const precoEl=card.querySelector('.price,.card__preci,.actual-price,span.price,.preco');
        let preco=precoEl?parsePreco(precoEl.textContent):0;
        if(!preco){ const txt=card.textContent||''; const match=txt.match(/(\d{1,3}([.,]\d{3})*[.,]\d{2})/); preco=match?parsePreco(match[0]):0; }
        adicionarAoCarrinho(nome,preco);
      });
    });
  }
  attachProductButtons();
  new MutationObserver(()=>attachProductButtons()).observe(document.body,{childList:true,subtree:true});
  if(abrirCarrinhoBtn && carrinho.length>0) abrirCarrinhoBtn.setAttribute('data-qtd',String(carrinho.length));

    /* ------------------ MODAL PAGAMENTO ------------------ */
  function abrirPagamento(){
    const pagamentoModal = document.createElement('div');
    pagamentoModal.classList.add('pagamento-modal');
    pagamentoModal.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background: rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center;
      z-index:10000;
    `;

    pagamentoModal.innerHTML = `
      <div class="pagamento-content" style="
        background:#fff; padding:20px; border-radius:10px; text-align:center;
        max-width:400px; width:80%; box-shadow:0 0 10px rgba(0,0,0,0.3);
      ">
        <h2>Formas de Pagamento</h2>
        <select id="tipoPagamento" style="margin-top:10px; padding:5px;">
          <option value="">Selecione</option>
          <option value="credito">Cartão de Crédito</option>
          <option value="debito">Cartão de Débito</option>
          <option value="pix">Pix</option>
        </select>
        <div id="detalhesPagamento" style="margin-top:15px;"></div>
        <button id="confirmarPagamento" style="
          margin-top:15px; padding:10px 15px; background:#3bb77e;
          color:#fff; border:none; border-radius:8px; cursor:pointer;
        ">Confirmar Pagamento</button>
      </div>
    `;

    document.body.appendChild(pagamentoModal);

    const tipoPagamento = pagamentoModal.querySelector('#tipoPagamento');
    const detalhesPagamento = pagamentoModal.querySelector('#detalhesPagamento');
    const confirmarPagamento = pagamentoModal.querySelector('#confirmarPagamento');

    tipoPagamento.addEventListener('change', () => {
      detalhesPagamento.innerHTML = '';

      if (tipoPagamento.value === 'credito' || tipoPagamento.value === 'debito') {
        detalhesPagamento.innerHTML = `
          <input type="text" placeholder="Número do cartão" style="width:90%;padding:8px;margin-bottom:8px;"><br>
          <input type="text" id="validade" placeholder="CVV" style="width:90%;padding:8px;margin-bottom:8px;"><br>
          <input type="text" placeholder="Validade (MM/AA)" style="width:90%;padding:8px;margin-bottom:8px;"><br>
          <input type="text" placeholder="Nome do titular" style="width:90%;padding:8px;">
        `;
      } else if (tipoPagamento.value === 'pix') {
        const codigoPix = "PIX-" + Math.random().toString(36).substring(2,10).toUpperCase();
        const qr = document.createElement('img');
        qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${codigoPix}`;
        qr.alt = "QR Code Pix";
        qr.style.marginTop = "10px";
        detalhesPagamento.innerHTML = `<p style="font-size:14px;">Código: ${codigoPix}</p>`;
        detalhesPagamento.appendChild(qr);
      }
    });

document.addEventListener("DOMContentLoaded", () => {
  const numeroCartao = document.getElementById("numeroCartao");
  const validade = document.getElementById("Validade (MM/AA)");
  const cvv = document.getElementById("cvv");

  // === Máscara: Número do Cartão (ex: 1234 5678 9012 3456)
  if (numeroCartao) {
    numeroCartao.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      v = v.substring(0, 16); // limita a 16 dígitos
      v = v.replace(/(\d{4})(?=\d)/g, "$1 ");
      e.target.value = v.trim();
    });
  }

  // === Máscara: Validade (ex: 12/28)
  if (validade) {
    validade.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      v = v.substring(0, 4); // limita a 4 dígitos
      if (v.length >= 3) {
        v = v.replace(/(\d{2})(\d{1,2})/, "$1/$2");
      }

      // Evita meses maiores que 12
      const [mes] = v.split("/");
      if (mes && parseInt(mes) > 12) v = "12" + (v.includes("/") ? v.substring(2) : "");

      e.target.value = v;
    });
  }

  // === Máscara: CVV (3 ou 4 dígitos)
  if (cvv) {
    cvv.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      e.target.value = v.substring(0, 4);
    });
  }
});

    confirmarPagamento.addEventListener('click', () => {
      alert('Compra finalizada com sucesso!');
      pagamentoModal.remove();
      carrinho = [];
      localStorage.removeItem('carrinho');
      renderCarrinho();
      fecharFormulario();
    });

    // Fechar ao clicar fora
    pagamentoModal.addEventListener('click', (e) => {
      if (e.target === pagamentoModal) pagamentoModal.remove();
    });
  }
})

// ======= MENU RESPONSIVO =======
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuIcon.classList.toggle("bx-x"); // se estiver usando ícones tipo boxicons
});

// Fecha o menu ao clicar em algum link
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  });
});

// Chama sempre que abre o modal de pagamento
document.addEventListener("click", (e) => {
  if (e.target.id === "tipoPagamento") {
    setTimeout(aplicarMascaras, 200);
  }
})

// Quando o modal de pagamento é aberto e o usuário escolhe cartão
document.addEventListener("change", (e) => {
  if (e.target.id === "tipoPagamento") {
    setTimeout(aplicarMascaras, 300);
  }
});



