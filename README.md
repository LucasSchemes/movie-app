# 🎬 Movie App - Pixel Breeders Challenge

Sistema fullstack para gerenciamento de catálogos de filmes, construído com foco em escalabilidade, performance e boas práticas de arquitetura.

## Stack Tecnológica

* **Frontend:** React + TypeScript + Vite + Tailwind CSS
* **Backend:** Python (Flask)
* **Banco de Dados:** MySQL 8.0
* **Infraestrutura:** Docker & Docker Compose

---

## Arquitetura 

### API RESTful
A comunicação entre o frontend e o backend foi estruturada seguindo os princípios **REST**, utilizando:
* **Métodos HTTP adequados:** `GET` para listagem, `POST` para cadastro, `DELETE` para remoção.
* **Status Codes:** Retornos apropriados (Ex: `201 Created` para sucessos de inserção, `404 Not Found` para recursos inexistentes).
* **JSON:** Padrão de troca de dados.

### Paginação (Server-side)
Para garantir a performance do sistema conforme o catálogo cresce, foi implementada a **paginação de dados**.
* Em vez de carregar mil filmes de uma vez, o backend entrega pequenos "lotes" (20 filmes por vez).

### Estratégias de Cache
Otimizamos o carregamento através de:
* **Browser Caching:** Cabeçalhos HTTP que instruem o navegador a armazenar ativos estáticos.
* **Otimização de Query:** Indexação no MySQL para que buscas e filtragens sejam quase instantâneas.

### Persistência e Docker
O projeto utiliza **Docker Volumes** para garantir que os dados do banco de dados não sejam voláteis. Mesmo que o container seja destruído e recriado, os filmes cadastrados permanecem salvos no host.

---

## Como Executar

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passos
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/LucasSchemes/movie-app.git](https://github.com/LucasSchemes/movie-app.git)
    cd movie-app
    ```

2.  **Suba a aplicação:**
    ```bash
    docker compose up -d
    ```

3.  **Acesse:**
    * **Aplicação:** [http://localhost:5173](http://localhost:5173)

---

