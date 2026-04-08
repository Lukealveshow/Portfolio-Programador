import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ARTIGOS } from './data/artigo.data';

@Component({
  selector: 'app-artigo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artigo.html',
  styleUrls: ['./artigo.css']
})
export class ArtigoComponent {
  artigo: any;

  constructor(private route: ActivatedRoute) {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.artigo = ARTIGOS[slug];
  }
}