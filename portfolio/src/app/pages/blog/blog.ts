import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogComponent {

  artigos = [
    {
      title: 'Como implementar autenticação JWT com FastAPI',
      slug: 'fastapi-jwt',
      resumo: 'Aprenda a proteger suas APIs com autenticação JWT usando FastAPI.'
    },
    {
      title: 'Como criar uma API escalável com FastAPI',
      slug: 'api-fastapi-escalavel',
      resumo: 'Estruture APIs modernas e performáticas.'
    },
    {
      title: 'Web Scraping com Python (Sites e PDFs)',
      slug: 'web-scraping-python',
      resumo: 'Extração de dados automatizada com Python.'
    },
    {
      title: 'Machine Learning para previsão de ações',
      slug: 'machine-learning-acoes',
      resumo: 'Como usar ML para prever mercado financeiro.'
    },
    {
      title: 'Análise de sentimentos',
      slug: 'analise-sentimentos-python',
      resumo: 'NLP aplicado em tempo real.'
    },
    {
      title: 'Detecção de fraudes com Machine Learning',
      slug: 'deteccao-fraude-ml',
      resumo: 'Sistemas inteligentes para segurança financeira.'
    },
    {
      title: 'Automação de processos com Python',
      slug: 'automatizacao-python',
      resumo: 'Elimine tarefas repetitivas.'
    },
    {
      title: 'Boas práticas no Angular',
      slug: 'angular-frontend-boas-praticas',
      resumo: 'Organize projetos Angular de forma profissional.'
    }
  ];

}