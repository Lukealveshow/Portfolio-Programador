import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artigo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artigo.html',
  styleUrls: ['./artigo.css']
})
export class ArtigoComponent {

  artigo: any;

  artigos: any = {
    "fastapi-jwt": {
      title: "Como implementar autenticação JWT com FastAPI",
      content: `
      <p>JWT (JSON Web Token) é uma forma segura de autenticar usuários...</p>

      <h2>Instalação</h2>
      <pre>pip install fastapi python-jose passlib</pre>

      <h2>Exemplo</h2>
      <pre>
from fastapi import FastAPI
app = FastAPI()
      </pre>

      <p>Com isso você já consegue proteger suas rotas.</p>
      `
    },

    "api-fastapi-escalavel": {
      title: "Como criar uma API escalável com FastAPI",
      content: `
      <p>APIs escaláveis precisam de boa arquitetura...</p>

      <ul>
        <li>Separação por camadas</li>
        <li>Uso de async/await</li>
        <li>Cache com Redis</li>
      </ul>
      `
    },

    "web-scraping-python": {
      title: "Web Scraping com Python",
      content: `
      <p>Web scraping permite coletar dados automaticamente...</p>

      <pre>
import requests
from bs4 import BeautifulSoup
      </pre>
      `
    },

    "machine-learning-acoes": {
      title: "Machine Learning para previsão de ações",
      content: `
      <p>Modelos como XGBoost e Random Forest são ideais...</p>
      `
    },

    "analise-sentimentos-python": {
      title: "Análise de sentimentos",
      content: `
      <p>Utilizando NLP você pode classificar textos...</p>
      `
    },

    "deteccao-fraude-ml": {
      title: "Detecção de fraudes com Machine Learning",
      content: `
      <p>Modelos supervisionados são usados para detectar fraudes...</p>
      `
    },

    "automatizacao-python": {
      title: "Automação de processos com Python",
      content: `
      <p>Automatizar tarefas economiza tempo e reduz erros...</p>
      `
    },

    "angular-frontend-boas-praticas": {
      title: "Boas práticas no Angular",
      content: `
      <p>Organização é essencial em projetos Angular...</p>

      <ul>
        <li>Componentização</li>
        <li>Services bem definidos</li>
        <li>Lazy loading</li>
      </ul>
      `
    }
  };

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.artigo = this.artigos[slug];
  }
}