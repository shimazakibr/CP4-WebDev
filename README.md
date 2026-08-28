# CP4-WebDev

## Integrantes: 
Tiago Shimazaki Barros RM570359
Murilo Monteiro Silva RM568719

# 🌱 EcoTrend — E-commerce Sustentável

## 📌 Sobre a aplicação

A **EcoTrend** é uma aplicação de e-commerce voltada para a venda de produtos sustentáveis e ecológicos.

A plataforma foi desenvolvida para simular uma loja virtual moderna, permitindo que o usuário visualize produtos, pesquise itens, utilize filtros, adicione produtos ao carrinho e realize um checkout simulado.

A aplicação tem como tema principal o consumo consciente, oferecendo produtos relacionados à sustentabilidade.

## 🎯 Objetivo

O objetivo do projeto é desenvolver uma aplicação web funcional e interativa utilizando **HTML, CSS e JavaScript**.

Além da criação da interface, foram aplicados conceitos importantes de programação, como manipulação do DOM, eventos, armazenamento local, JSON e programação assíncrona.

## 🛍️ Catálogo de produtos

A página possui um catálogo de produtos organizados em diferentes categorias.

Entre elas estão:

* Roupas e acessórios;
* Beleza e cuidados pessoais;
* Produtos para casa;
* Tecnologia verde.

Cada produto apresenta seu nome, categoria, descrição e preço.

Os produtos são exibidos dinamicamente na página através do JavaScript.

## 🔎 Sistema de pesquisa e filtros

A aplicação possui um sistema de pesquisa para facilitar a localização dos produtos.

O usuário pode pesquisar pelo nome do produto e utilizar filtros para encontrar itens específicos.

Também é possível filtrar os produtos por categoria e definir um preço máximo.

As alterações são realizadas automaticamente, sem precisar atualizar a página.

## 🛒 Carrinho de compras

A EcoTrend possui um carrinho de compras dinâmico.

Quando o usuário seleciona a opção **Adicionar ao Carrinho**, o produto é incluído automaticamente no carrinho.

O usuário pode:

* Adicionar unidades;
* Diminuir quantidades;
* Remover produtos;
* Limpar o carrinho;
* Visualizar o valor total.

O total da compra é atualizado automaticamente conforme os produtos são alterados.

## 💾 LocalStorage

Para manter os dados do carrinho, a aplicação utiliza o **LocalStorage**.

Os produtos adicionados ficam armazenados no navegador.

Assim, mesmo que o usuário atualize ou feche a página, o carrinho pode continuar armazenado para uma próxima sessão.

## 🌐 JSON e Fetch

Os produtos são trabalhados utilizando dados estruturados em **JSON**.

A aplicação utiliza a **Fetch API** para realizar o carregamento dos dados.

Esse processo é feito de maneira assíncrona, simulando a comunicação entre uma aplicação frontend e um servidor.

## ⏳ Loading Spinner

Durante o carregamento dos produtos, a aplicação apresenta um **Loading Spinner**.

Esse recurso informa ao usuário que os dados estão sendo processados.

Para controlar esse processo são utilizados conceitos de `async/await`.

## 🔄 Promises

As **Promises** são utilizadas principalmente no processo de checkout.

Elas permitem simular etapas de validação e processamento de um pedido.

Caso os dados estejam corretos, o pedido é confirmado.

Caso ocorra algum problema, uma mensagem de erro é apresentada ao usuário.

## 💳 Checkout

A aplicação possui um checkout simulado.

O usuário informa seus dados e confirma o pedido.

Após a validação, o sistema simula o processamento da compra e apresenta uma mensagem de confirmação.

O objetivo não é realizar uma compra real, mas demonstrar o funcionamento de um fluxo de checkout.

## 🎨 Interface

A interface foi desenvolvida utilizando **HTML5 e CSS3**.

O design utiliza elementos relacionados à sustentabilidade, como folhas, natureza e cores inspiradas no meio ambiente.

A página também possui um layout responsivo para diferentes tamanhos de tela.

## 🛠️ Tecnologias utilizadas

* HTML5;
* CSS3;
* JavaScript;
* JSON;
* Fetch API;
* LocalStorage;
* Promises;
* Async/Await;
* Font Awesome;
* Google Fonts.

## 📁 Estrutura

```text
EcoTrend/
│
├── index.html
├── script.js
└── style.css
```

## 🚀 Resultado

A EcoTrend reúne uma interface de e-commerce com funcionalidades interativas desenvolvidas em JavaScript.

O projeto demonstra a aplicação prática de conceitos de frontend, armazenamento de dados, requisições assíncronas e manipulação dinâmica da página.

A proposta final é criar uma experiência simples e funcional de compra, utilizando a sustentabilidade como tema principal da aplicação.

**EcoTrend — tecnologia, inovação e consumo consciente. 🌱**
