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

  modalAberto: boolean = false;

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  enviarEmail() {

    const dados = {
      nome: this.nome,
      email: this.email,
      mensagem: this.mensagem
    };

    this.http.post(`${environment.apiUrl}/enviar-email`, dados)
    .subscribe(() => {
      alert("Email enviado com sucesso!");
      this.fecharModal();
    });

    gtag('event', 'conversion', {
      'send_to': 'AW-18320040291/yOKhCKizhdUcEOPC1p9E'
    });

  }

  abrirLink(url: string) {
    window.open(url, '_blank');
  }

  abrirWhatsApp(){
    window.open(environment.whatsapp, '_blank');
  }
}