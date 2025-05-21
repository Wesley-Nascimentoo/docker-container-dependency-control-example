
# 📘 Exemplo prático: API com dependência usando Dockerize

## 📌 Objetivo

Este repositório tem como objetivo demonstrar, de forma simples, como utilizar o [Dockerize](https://github.com/jwilder/dockerize) para lidar com **containers que possuem dependências**, como é o caso de uma API que depende de um banco de dados MySQL.

A ideia é garantir que a aplicação **só inicie quando o banco de dados estiver realmente pronto para aceitar conexões** — evitando erros de conexão, tentativas em loop ou falhas intermitentes na inicialização.

---

## ⚙️ Passo 1 – Instalando o Dockerize na imagem da API

Dentro do seu `Dockerfile`, instale o Dockerize com o seguinte trecho:

```dockerfile
ENV DOCKERIZE_VERSION v0.9.3

RUN apt-get update \
  && apt-get install -y wget \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
     | tar xzf - -C /usr/local/bin \
  && apt-get autoremove -yqq --purge wget \
  && rm -rf /var/lib/apt/lists/*
```

---

## ⚙️ Passo 2 – Ajustando o entrypoint da API

No seu `docker-compose.yml`, altere o `entrypoint` da API para que ela espere a disponibilidade do banco antes de iniciar:

```yaml
entrypoint: >
  dockerize
    -wait tcp://mysql-db:3306
    -timeout 60s
    docker-entrypoint.sh npm run start
```

> 🧠 Explicação:
> - `-wait tcp://mysql-db:3306`: espera o banco estar disponível
> - `-timeout 50s`: define o tempo máximo de espera
> - Após isso, o comando `npm run start` será executado normalmente

---

## ✅ Resultado

Com essa configuração, ao subir os containers com `docker-compose up`, a API **só iniciará depois que o MySQL estiver disponível**, evitando falhas de conexão e trazendo mais estabilidade para o ambiente.

---

## 🚀 Rodando o projeto

```bash
docker-compose up --build
```
