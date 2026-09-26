import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent {

  constructor(private http: HttpClient) {}

  nome = "";
  email = "";
  mensagem = "";
  env = environment;
  
  abrirWhatsAppOrcamento(){
    window.open(environment.whatsappOrcamento, '_blank');
  }

  abrirLink(url: string) {
    window.open(url, '_blank');
  }

  abrirWhatsApp(){
    window.open(environment.whatsapp, '_blank');
  }
}