# 🚗 Sistema Web de Gestão de Veículos

Uma aplicação Web de página única (SPA) desenvolvida em React para o gerenciamento e listagem de veículos. O projeto permite realizar operações completas de CRUD (Create, Read, Update, Delete) consumindo uma API REST simulada com JSON Server.

Este projeto foi desenvolvido como requisito de avaliação acadêmica e implementa boas práticas de componentização, controle de estado e roteamento no front-end.

## 🛠️ Tecnologias Utilizadas

* **React:** Biblioteca principal para construção da interface de usuário.
* **React Router Dom:** Gerenciamento de rotas e navegação entre as páginas.
* **Tailwind CSS:** Estilização da interface de forma responsiva e moderna através de classes utilitárias.
* **Axios:** Cliente HTTP para comunicação e requisições à API.
* **JSON Server:** Simulação de um banco de dados e back-end RESTful.

## ⚙️ Funcionalidades Implementadas

* **Listagem (Read):** Exibição de todos os veículos cadastrados em uma interface responsiva.
* **Cadastro (Create):** Formulário de adição de novos veículos com validações de campos obrigatórios, formato de placa (Regex) e integridade de ano.
* **Edição (Update):** Atualização dos dados de veículos já existentes no banco.
* **Exclusão (Delete):** Remoção de registros do banco de dados simulado.
* **Filtros e Detalhes:** Navegação dinâmica para visualizar informações específicas de cada veículo.

---

## 🚀 Como executar o projeto localmente

Para rodar este projeto em sua máquina, será necessário iniciar a API falsa (JSON Server) e a aplicação React simultaneamente em terminais diferentes.

### 1. Clonando o repositório
Abra o seu terminal e rode o comando abaixo para baixar o código:
```bash
git clone [https://github.com/heltonrsnet-cpu/gestao-veiculos.git](https://github.com/heltonrsnet-cpu/gestao-veiculos.git)
cd gestao-veiculos
```

### 2. Instalando as dependências
Baixe todas as bibliotecas necessárias para o projeto funcionar:
```bash
npm install
```

### 3. Iniciando a API Simulada (JSON Server)
A aplicação espera que o banco de dados esteja rodando na porta `3001`. Em seu terminal, execute:
```bash
npx json-server --watch db.json --port 3001
```
*(Mantenha este terminal aberto e rodando)*.

### 4. Iniciando a Aplicação React
Abra uma **nova aba ou janela** do seu terminal, acesse a pasta do projeto novamente e inicie o servidor de desenvolvimento:
```bash
npm run dev 
# ou npm start, dependendo de como o projeto foi criado (Vite ou Create React App)
```
A aplicação será aberta automaticamente no seu navegador padrão (geralmente no endereço `http://localhost:5173` ou `http://localhost:3000`).
