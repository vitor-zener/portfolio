# Portfólio — Vitor Zener

Landing page de portfólio pessoal em **HTML, CSS e JavaScript puros** (sem frameworks,
sem etapa de build). Apresenta a atuação técnico-comercial em infraestrutura elétrica e
inclui formulário de contato com consumo da API **ViaCEP**.

---

## Índice

- [Recursos](#recursos)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Como executar localmente](#como-executar-localmente)
- [Fluxo Git (main + develop)](#fluxo-git-main--develop)
- [Publicar no GitHub](#publicar-no-github)
- [Hospedagem gratuita](#hospedagem-gratuita)
- [Personalização](#personalização)
- [Detalhes técnicos](#detalhes-técnicos)
- [Licença](#licença)

---

## Recursos

- Cabeçalho fixo com nome do projeto e navegação.
- Hero com título, slogan e **botões de chamada para ação** ("Saiba mais" e "Iniciar conversa").
- Seções **Sobre** e **Atuação** (cartões de competências).
- **Formulário de contato** (nome, e-mail, CEP, cidade e mensagem) com validação em JavaScript.
- **Consumo da API ViaCEP**: ao informar o CEP, cidade e UF são preenchidos automaticamente.
- **Ação do CTA**: ao enviar, exibe mensagem de agradecimento personalizada (sem back-end).
- Assinatura visual: **diagrama unifilar animado** (referência ao trabalho com painéis elétricos).
- Design responsivo e acessível (foco visível, suporte a `prefers-reduced-motion`).

---

## Estrutura de arquivos

```
vitor-zener-portfolio/
├── index.html          # Marcação da página
├── css/
│   └── styles.css      # Estilos e tokens de design
├── js/
│   └── main.js         # Menu, validação, ViaCEP e ação do CTA
├── assets/
│   └── favicon.svg     # Ícone da aba
├── .gitignore
├── LICENSE
└── README.md
```

---

## Como executar localmente

Não há dependências nem compilação. Opções:

**1. Abrir direto no navegador**
Dê duplo clique em `index.html`.

**2. Servidor local (recomendado — evita bloqueios de CORS/fetch)**
No VS Code, instale a extensão **Live Server** e clique em *"Go Live"*.

Ou via terminal, se tiver Python instalado:

```bash
# dentro da pasta do projeto
python -m http.server 5500
# acesse http://localhost:5500
```

---

## Fluxo Git (main + develop)

O projeto já está preparado para versionamento com duas branches:

- **`main`** — versão estável/publicada.
- **`develop`** — desenvolvimento e novas alterações.

Se você recebeu o `.zip` **com** a pasta `.git`, o repositório e as branches já existem —
confira com `git branch`. Caso queira inicializar do zero:

```bash
git init
git add .
git commit -m "chore: estrutura inicial do portfólio"

# renomeia a branch padrão para main (se necessário)
git branch -M main

# cria e entra na branch de desenvolvimento
git checkout -b develop
```

Fluxo de trabalho sugerido:

```bash
# trabalhe sempre em develop
git checkout develop
# ...edições...
git add .
git commit -m "feat: descrição da mudança"

# quando estiver estável, leve para main
git checkout main
git merge develop
```

---

## Publicar no GitHub

1. Crie um repositório vazio em <https://github.com/new> (sem README).
2. Conecte e envie as duas branches:

```bash
git remote add origin https://github.com/SEU-USUARIO/vitor-zener-portfolio.git
git push -u origin main
git push -u origin develop
```

> Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub.

---

## Hospedagem gratuita

**GitHub Pages** (mais direto para este projeto):

1. No repositório, vá em **Settings → Pages**.
2. Em *Source*, selecione a branch `main` e a pasta `/ (root)`.
3. Salve. O site ficará disponível em
   `https://SEU-USUARIO.github.io/vitor-zener-portfolio/`.

Alternativas com deploy automático a cada push: **Netlify** ou **Vercel** — basta
importar o repositório; nenhuma configuração de build é necessária (site estático).

---

## Personalização

Contato (e-mail, LinkedIn e Lattes) já está preenchido. Ajuste conforme necessário:

| Local | O que ajustar |
|-------|---------------|
| Seção **Sobre** / textos | Ajustar redação conforme preferência |
| `css/styles.css` (`:root`) | Alterar a paleta pelas variáveis de cor |

> As informações profissionais foram redigidas a partir do perfil informado. Revise
> nome, cargo e textos das seções antes de publicar.

### Ativar envio real do formulário

O formulário atual apenas exibe uma confirmação no navegador. Para receber as mensagens
por e-mail sem back-end, use um serviço como **Formspree** ou **Netlify Forms**:
adicione o atributo `action` com a URL do serviço no `<form>` e ajuste o `main.js`
para realizar o `POST` em vez de apenas mostrar a mensagem.

---

## Detalhes técnicos

- **Tipografia:** Archivo (títulos), IBM Plex Sans (texto) e IBM Plex Mono (rótulos e
  códigos), carregadas via Google Fonts.
- **Paleta:** petróleo-ardósia (`#0F1822`), cobre (`#D68A4A`) e ciano de instrumentação
  (`#46C8D8`).
- **API:** ViaCEP — `https://viacep.com.br/ws/{CEP}/json/`.
- **Compatibilidade:** navegadores modernos (Chrome, Firefox, Edge, Safari).

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE).
