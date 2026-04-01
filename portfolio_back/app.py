from flask import Flask, jsonify, request
from flask_cors import CORS
from flasgger import Swagger
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os
import re

load_dotenv()
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_TO = os.getenv("EMAIL_TO")
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))

required_envs = ["EMAIL_USER", "EMAIL_PASSWORD", "EMAIL_TO", "SMTP_SERVER"]

for var in required_envs:
    if not os.getenv(var):
        raise ValueError(f"Variável de ambiente não definida: {var}")
    
app = Flask(__name__)
CORS(app)

app.config['SWAGGER'] = {
    'title': "Minha API",
    'uiversion': 3,
    'specs_route': '/docs/'
}

Swagger(app)
@app.route('/api')
def home():
    """
    Endpoint de teste
    ---
    responses:
      200:
        description: API funcionando
    """
    return jsonify({'message': 'API funcionando!'})


@app.route('/enviar-email', methods=['POST'])
def enviar_email():
    """
    Enviar mensagem do formulário do site
    ---
    tags:
      - Contato
    parameters:
      - in: body
        name: body
        schema:
          type: object
          properties:
            nome:
              type: string
            email:
              type: string
            mensagem:
              type: string
    responses:
      200:
        description: Email enviado
    """

    data = request.get_json()

    if not data:
        return jsonify({"erro": "Body inválido"}), 400

    nome = data.get("nome")
    email = data.get("email")
    mensagem = data.get("mensagem")

    if not all([nome, email, mensagem]):
        return jsonify({"erro": "Campos obrigatórios não preenchidos"}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"erro": "Email inválido"}), 400

    corpo = f"""
Novo contato pelo site

Nome: {nome}
Email: {email}

Mensagem:
{mensagem}
"""

    msg = MIMEText(corpo, "plain", "utf-8")
    msg['Subject'] = 'Novo orçamento do site'
    msg['From'] = EMAIL_USER
    msg['To'] = EMAIL_TO
    msg['Reply-To'] = email

    try:
        servidor = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, timeout=10)
        servidor.login(EMAIL_USER, EMAIL_PASSWORD)
        servidor.send_message(msg)
        servidor.quit()

        return jsonify({"status": "Email enviado com sucesso"})

    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return jsonify({"erro": "Erro ao enviar email"}), 500

if __name__ == '__main__':
    app.run(debug=True)