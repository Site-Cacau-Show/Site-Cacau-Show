# 🍫 Projeto Interdisciplinar — Site Cacau Show

## 📌 Sobre o Projeto

Este projeto consiste no desenvolvimento de uma plataforma web inspirada no e-commerce da Cacau Show, criada como parte de um projeto interdisciplinar acadêmico.

A aplicação foi desenvolvida utilizando tecnologias de Front-End e Back-End modernas, integrando:

- HTML5
- CSS3
- JavaScript
- Python
- Django
- Django REST Framework
- PostgreSQL
- Supabase

O sistema possui funcionalidades voltadas para uma loja virtual, incluindo:

- Cadastro e login de usuários
- Catálogo de produtos
- Carrinho de compras
- Gerenciamento de pedidos
- Sistema de feedbacks
- Integração com banco de dados PostgreSQL via Supabase
- API REST utilizando Django REST Framework

---

# 🏗 Arquitetura do Projeto

O projeto está dividido em duas partes principais:

## Front-End

Responsável pela interface visual da aplicação.

### Tecnologias

- HTML5
- CSS3
- JavaScript

### Estrutura

```text
CSSs/
JS/
Imgs/
*.html
```

### Principais páginas

| Página | Função |
|---|---|
| `index.html` | Página inicial |
| `login.html` | Login de usuários |
| `cadastro.html` | Cadastro de usuários |
| `produtos.html` | Catálogo de produtos |
| `estoque.html` | Controle de estoque |
| `carrinho.html` | Carrinho de compras |
| `contato.html` | Página de contato |
| `adm.html` | Área administrativa |
| `cadastrados.html` | Visualização de usuários cadastrados |

---

# ⚙️ Back-End

O Back-End foi desenvolvido com Django utilizando arquitetura baseada em APIs REST.

## Tecnologias utilizadas

- Python
- Django
- Django REST Framework
- PostgreSQL
- Supabase
- CORS Headers

---

# 📂 Estrutura do Back-End

```text
backend/
│
├── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── loja/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   ├── admin.py
│   └── migrations/
│
└── manage.py
```

---

# 🗄 Banco de Dados

O sistema utiliza PostgreSQL hospedado em um servidor Supabase.


---

# 🧩 Modelagem do Sistema

## Modelo Feedback

Responsável pelo armazenamento de mensagens enviadas pelos usuários.

### Campos

| Campo | Tipo |
|---|---|
| nome | CharField |
| mensagem | TextField |
| imagem | ImageField |
| criado_em | DateTimeField |

---

## Modelo Produto

Representa os produtos disponíveis na loja.

### Campos

| Campo | Tipo |
|---|---|
| nome | CharField |
| descricao | TextField |
| preco | DecimalField |
| estoque | IntegerField |
| imagem_url | TextField |

---

## Modelo Carrinho

Relaciona um usuário ao seu carrinho de compras.

### Relacionamentos

- OneToOne com `User`

---

## Modelo CarrinhoItem

Representa os produtos adicionados ao carrinho.

### Relacionamentos

- ForeignKey para `Carrinho`
- ForeignKey para `Produto`

---

## Modelo Pedido

Armazena os pedidos realizados pelos usuários.

### Campos

| Campo | Tipo |
|---|---|
| usuario | ForeignKey |
| data | DateTimeField |
| status | CharField |
| total | DecimalField |

---

## Modelo PedidoItem

Itens vinculados aos pedidos.

### Relacionamentos

- ForeignKey para `Pedido`
- ForeignKey para `Produto`

---

# 🔌 API REST

A aplicação utiliza Django REST Framework para exposição das rotas da API.

## Endpoints principais

| Endpoint | Método | Função |
|---|---|---|
| `/register/` | POST | Cadastro de usuários |
| `/login/` | POST | Login de usuários |
| `/produtos/` | GET/POST | Gerenciamento de produtos |
| `/carrinho/` | GET/POST | Gerenciamento do carrinho |
| `/pedidos/` | GET/POST | Gerenciamento de pedidos |
| `/feedbacks/` | GET/POST | Sistema de feedbacks |

---

# 🔐 Sistema de Autenticação

O sistema utiliza autenticação nativa do Django.

## Fluxo de registro

1. Usuário envia username e senha
2. API valida os dados
3. Usuário é criado utilizando `create_user()`
4. Retorno de sucesso

## Fluxo de login

1. Usuário envia credenciais
2. Django autentica utilizando `authenticate()`
3. Sessão é iniciada utilizando `login()`

---

# 🌐 Integração Front-End + Back-End

A comunicação entre Front-End e Back-End ocorre através de requisições HTTP utilizando JavaScript.

## Tecnologias utilizadas

- Fetch API
- JSON
- Django REST Framework

---

# 🎨 Interface Visual

O projeto possui estilização personalizada utilizando CSS.

## Recursos utilizados

- Layout responsivo
- Organização por arquivos CSS separados
- Utilização de imagens e banners promocionais
- Estrutura semelhante a um e-commerce real

---

# 📦 Dependências

## Instalação

```bash
pip install django
pip install djangorestframework
pip install psycopg2
pip install django-cors-headers
pip install pillow
```

---

# ▶️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/Site-Cacau-Show/Site-Cacau-Show
```

## 2. Acessar a pasta do projeto

```bash
cd Site-Cacau-Show
```

## 3. Entrar na pasta backend

```bash
cd backend
```

## 4. Criar ambiente virtual

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 5. Instalar dependências

```bash
pip install -r requirements.txt
```

Caso o arquivo requirements.txt não exista:

```bash
pip install django djangorestframework psycopg2 django-cors-headers pillow
```

---

## 6. Executar migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 7. Rodar servidor

```bash
python manage.py runserver
```

---

# 📸 Funcionalidades Implementadas

## Usuários

- Cadastro
- Login
- Autenticação

## Produtos

- Cadastro de produtos
- Listagem
- Controle de estoque

## Carrinho

- Adição de itens
- Controle de quantidade

## Pedidos

- Registro de pedidos
- Controle de status

## Feedbacks

- Envio de comentários
- Upload de imagens

---

# 🧠 Conceitos Aplicados

Durante o desenvolvimento foram aplicados diversos conceitos de Engenharia de Software e Desenvolvimento Web:

- CRUD completo
- API REST
- ORM do Django
- Integração Front-End e Back-End
- Persistência de dados
- Relacionamentos entre tabelas
- Arquitetura cliente-servidor
- Consumo de APIs
- Organização modular do sistema
- Integração com banco em nuvem

---

# 👨‍💻 Equipe

Projeto por:

Gustavo Avelino,
Pedro Benetti,
Vitória Barroso,
Joaquim Jorge


