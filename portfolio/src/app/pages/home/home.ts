import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent {

  constructor(private http: HttpClient) {}

  nome = "";
  email = "";
  mensagem = "";

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

    this.http.post("http://localhost:5000/enviar-email", dados)
    .subscribe(() => {
      alert("Email enviado com sucesso!");
      this.fecharModal();
    });

  }

}