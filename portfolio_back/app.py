import os
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
from flasgger import Swagger
from dotenv import load_dotenv
import resend
load_dotenv()
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
EMAIL_TO = os.getenv("EMAIL_TO")
EMAIL_FROM = os.getenv("EMAIL_FROM")
if not RESEND_API_KEY or not EMAIL_TO or not EMAIL_FROM:
    raise ValueError("Variáveis RESEND_API_KEY, EMAIL_TO ou EMAIL_FROM não definidas")
resend.api_key = RESEND_API_KEY

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SWAGGER'] = {
        'title': "Minha API",
        'uiversion': 3,
        'specs_route': '/docs/'
    }

    Swagger(app)

    @app.route('/')
    def root():
        return jsonify({
            "status": "online",
            "message": "API programador-lucas funcionando"
        })

    @app.route('/api')
    def home():
        return jsonify({'message': 'API funcionando!'})

    @app.route('/enviar-email', methods=['POST'])
    def enviar_email():

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

        try:
            resend.Emails.send({
                "from": f"Lucas Support <{EMAIL_FROM}>",
                "to": EMAIL_TO,
                "subject": "Novo contato do site",
                "text": corpo,
                "reply_to": f"{nome} <{email}>"
            })

            return jsonify({
                "status": "success",
                "message": "Email enviado com sucesso"
            })

        except Exception as e:
            print(f"Erro ao enviar email: {e}")
            return jsonify({
                "erro": "Falha ao enviar email",
                "detalhes": str(e)
            }), 500

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)