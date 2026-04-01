from flask import Flask, jsonify, request
from flask_cors import CORS
from flasgger import Swagger
import smtplib
from email.mime.text import MIMEText

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

    data = request.json

    nome = data.get("nome")
    email = data.get("email")
    mensagem = data.get("mensagem")

    corpo = f"""
    Novo contato pelo site

    Nome: {nome}
    Email: {email}

    Mensagem:
    {mensagem}
    """

    msg = MIMEText(corpo)
    msg['Subject'] = 'Novo orçamento do site'
    msg['From'] = 'lucasalvesmartins10@gmail.com'
    msg['To'] = 'lucasalvesmartins10@gmail.com'
    msg['Reply-To'] = email

    try:
        servidor = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        servidor.login('lucasalvesmartins10@gmail.com', 'gdebdhmpgblfvbap')
        servidor.send_message(msg)
        servidor.quit()

        return jsonify({"status": "Email enviado com sucesso"})

    except Exception as e:
        return jsonify({"erro": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)