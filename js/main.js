/* ============================================================
   Vitor Zener — Portfólio | main.js
   Menu mobile · máscara de CEP · consumo ViaCEP · validação · CTA
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Ano no rodapé ---------- */
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- Menu mobile ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // fecha ao clicar num link
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Referências do formulário ---------- */
  const form = document.getElementById("contatoForm");
  const cep = document.getElementById("cep");
  const cidade = document.getElementById("cidade");
  const cepStatus = document.getElementById("cepStatus");

  /* ---------- Máscara simples de CEP (00000-000) ---------- */
  if (cep) {
    cep.addEventListener("input", function () {
      let v = cep.value.replace(/\D/g, "").slice(0, 8);
      if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5);
      cep.value = v;
    });

    // dispara a busca ao sair do campo
    cep.addEventListener("blur", buscarCep);
  }

  /* ---------- Consumo da API ViaCEP ---------- */
  async function buscarCep() {
    const numeros = cep.value.replace(/\D/g, "");

    if (numeros.length === 0) {
      setStatus("", "");
      cidade.value = "";
      return;
    }
    if (numeros.length !== 8) {
      setStatus("CEP deve ter 8 dígitos.", "is-error");
      cidade.value = "";
      return;
    }

    setStatus("Consultando…", "");

    try {
      const resp = await fetch("https://viacep.com.br/ws/" + numeros + "/json/");
      if (!resp.ok) throw new Error("HTTP " + resp.status);

      const dados = await resp.json();

      if (dados.erro) {
        setStatus("CEP não encontrado.", "is-error");
        cidade.value = "";
        return;
      }

      cidade.value = dados.localidade + " / " + dados.uf;
      setStatus("Endereço localizado.", "is-ok");
    } catch (err) {
      setStatus("Falha ao consultar o CEP. Verifique a conexão.", "is-error");
      cidade.value = "";
    }
  }

  function setStatus(msg, cls) {
    if (!cepStatus) return;
    cepStatus.textContent = msg;
    cepStatus.className = "field__hint" + (cls ? " " + cls : "");
  }

  /* ---------- Validação ---------- */
  function validarEmail(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function mostrarErro(campo, mensagem) {
    const input = document.getElementById(campo);
    const alvo = document.querySelector('[data-error-for="' + campo + '"]');
    if (input) input.classList.toggle("is-invalid", Boolean(mensagem));
    if (alvo) alvo.textContent = mensagem || "";
  }

  /* ---------- Envio (ação do CTA, sem back-end) ---------- */
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome");
      const email = document.getElementById("email");
      const mensagem = document.getElementById("mensagem");
      let valido = true;

      // limpa
      ["nome", "email", "mensagem"].forEach(function (c) {
        mostrarErro(c, "");
      });

      if (!nome.value.trim()) {
        mostrarErro("nome", "Informe seu nome.");
        valido = false;
      }
      if (!email.value.trim()) {
        mostrarErro("email", "Informe seu e-mail.");
        valido = false;
      } else if (!validarEmail(email.value.trim())) {
        mostrarErro("email", "E-mail inválido.");
        valido = false;
      }
      if (!mensagem.value.trim()) {
        mostrarErro("mensagem", "Escreva sua mensagem.");
        valido = false;
      }

      if (!valido) return;

      // Sucesso: exibe agradecimento personalizado
      const primeiroNome = nome.value.trim().split(" ")[0];
      const successBox = document.getElementById("formSuccess");
      const successTitle = document.getElementById("successTitle");
      const successText = document.getElementById("successText");

      successTitle.textContent = "Obrigado, " + primeiroNome + "!";
      successText.textContent =
        "Sua mensagem foi registrada. O retorno costuma sair em até 2 dias úteis.";
      successBox.hidden = false;

      form.reset();
      setStatus("", "");
      cidade.value = "";
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
})();
