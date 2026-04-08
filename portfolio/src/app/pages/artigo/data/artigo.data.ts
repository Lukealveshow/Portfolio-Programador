export const ARTIGOS: Record<string, {title: string, resumo: string, content: string}> = {

  "fastapi-jwt": {
    title: "Como implementar autenticação JWT com FastAPI",
    resumo: "Aprenda a proteger suas APIs com tokens JWT usando FastAPI, python-jose e passlib do zero.",
    content: `
      <p>JWT (JSON Web Token) é o padrão mais utilizado para autenticação stateless em APIs modernas. Neste artigo você vai aprender a implementar um sistema completo de login com geração e validação de tokens usando <strong>FastAPI</strong>.</p>

      <h2>Por que usar JWT?</h2>
      <p>Diferente de sessões tradicionais armazenadas no servidor, o JWT carrega as informações do usuário dentro do próprio token — o que torna a autenticação escalável e ideal para microsserviços.</p>

      <h2>Instalação</h2>
      <pre>pip install fastapi python-jose[cryptography] passlib[bcrypt] uvicorn</pre>

      <h2>Estrutura do Token</h2>
      <p>Um JWT é composto por 3 partes separadas por ponto: <code>header.payload.signature</code>. O payload carrega dados como o ID do usuário e a expiração do token.</p>

      <h2>Implementação completa</h2>
      <pre>
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

SECRET_KEY = "sua-chave-secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()

def criar_token(data: dict):
    expires = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expires})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

@app.get("/rota-protegida")
def rota_protegida(payload=Depends(verificar_token)):
    return {"mensagem": "Acesso autorizado", "usuario": payload}
      </pre>

      <h2>Boas práticas</h2>
      <ul>
        <li>Nunca exponha o <code>SECRET_KEY</code> no código — use variáveis de ambiente</li>
        <li>Defina sempre um tempo de expiração curto para o token</li>
        <li>Use HTTPS em produção para proteger o token em trânsito</li>
        <li>Implemente refresh tokens para sessões longas</li>
      </ul>

      <p>Com essa base você já consegue proteger qualquer rota da sua API. Precisa de uma implementação completa com banco de dados e refresh token? Entre em contato.</p>
    `
  },

  "api-fastapi-escalavel": {
    title: "Como criar uma API escalável com FastAPI",
    resumo: "Arquitetura, async/await, cache com Redis e boas práticas para APIs que aguentam alto volume.",
    content: `
      <p>Uma API que funciona com 10 usuários pode travar com 10.000. Neste artigo você vai aprender os princípios de arquitetura que fazem a diferença entre uma API frágil e uma API pronta para produção.</p>

      <h2>Separação por camadas</h2>
      <p>Organizar o projeto em camadas evita código espaguete e facilita manutenção:</p>
      <pre>
app/
├── routers/       # endpoints
├── services/      # regras de negócio
├── repositories/  # acesso ao banco
├── models/        # schemas Pydantic
└── core/          # configurações, segurança
      </pre>

      <h2>Async/Await — por que importa</h2>
      <p>FastAPI é construído sobre ASGI, o que significa que operações I/O (banco, requisições externas) não bloqueiam o servidor quando usadas com <code>async/await</code>:</p>
      <pre>
# ❌ Bloqueante
@app.get("/usuarios")
def listar():
    return db.query(Usuario).all()

# ✅ Não bloqueante
@app.get("/usuarios")
async def listar():
    return await db.execute(select(Usuario))
      </pre>

      <h2>Cache com Redis</h2>
      <p>Para endpoints consultados frequentemente, cache reduz drasticamente a carga no banco:</p>
      <pre>
import redis
cache = redis.Redis(host='localhost', port=6379)

@app.get("/produto/{id}")
async def produto(id: int):
    cached = cache.get(f"produto:{id}")
    if cached:
        return json.loads(cached)
    produto = await buscar_produto(id)
    cache.setex(f"produto:{id}", 300, json.dumps(produto))
    return produto
      </pre>

      <h2>Outras boas práticas</h2>
      <ul>
        <li>Use <strong>connection pooling</strong> no banco de dados</li>
        <li>Implemente <strong>rate limiting</strong> para evitar abuso</li>
        <li>Versione sua API (<code>/api/v1/</code>)</li>
        <li>Configure <strong>health checks</strong> para monitoramento</li>
      </ul>

      <p>Precisa de uma API escalável para o seu negócio? Desenvolvo soluções completas com FastAPI, banco de dados e deploy em nuvem.</p>
    `
  },

  "web-scraping-python": {
    title: "Web Scraping com Python: coletando dados da web de forma eficiente",
    resumo: "Do básico com BeautifulSoup ao avançado com Selenium e Playwright para páginas dinâmicas.",
    content: `
      <p>Web scraping é a técnica de extrair dados de sites automaticamente. Seja para monitorar preços, coletar leads ou alimentar um sistema de análise, o Python oferece as melhores ferramentas para isso.</p>

      <h2>Quando usar cada ferramenta</h2>
      <ul>
        <li><strong>requests + BeautifulSoup</strong> — sites estáticos, HTML simples</li>
        <li><strong>Selenium / Playwright</strong> — sites com JavaScript, login, cliques</li>
        <li><strong>Scrapy</strong> — scraping em grande escala com múltiplas páginas</li>
      </ul>

      <h2>Exemplo básico com BeautifulSoup</h2>
      <pre>
import requests
from bs4 import BeautifulSoup

url = "https://exemplo.com/produtos"
response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
soup = BeautifulSoup(response.text, "html.parser")

produtos = soup.find_all("div", class_="produto")
for p in produtos:
    nome = p.find("h2").text.strip()
    preco = p.find("span", class_="preco").text.strip()
    print(f"{nome}: {preco}")
      </pre>

      <h2>Lidando com sites dinâmicos (JavaScript)</h2>
      <pre>
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://exemplo.com")
    page.wait_for_selector(".produto")
    html = page.content()
    browser.close()
      </pre>

      <h2>Boas práticas e aspectos legais</h2>
      <ul>
        <li>Sempre verifique o <code>robots.txt</code> do site</li>
        <li>Adicione delays entre requisições para não sobrecarregar o servidor</li>
        <li>Use apenas dados públicos e respeite a LGPD</li>
        <li>Armazene os dados coletados de forma estruturada (CSV, banco de dados)</li>
      </ul>

      <p>Precisa extrair dados de algum site ou documento para o seu negócio? Desenvolvo scrapers robustos e automatizados.</p>
    `
  },

  "machine-learning-acoes": {
    title: "Machine Learning para previsão de ações financeiras",
    resumo: "Como usar XGBoost e Random Forest para prever tendências do mercado financeiro com Python.",
    content: `
      <p>Prever o comportamento de ações é um dos desafios mais estudados em finanças quantitativas. Neste artigo, vamos construir um modelo de Machine Learning usando dados reais para identificar tendências de alta e baixa.</p>

      <h2>Coleta de dados com yfinance</h2>
      <pre>
import yfinance as yf
import pandas as pd

df = yf.download("PETR4.SA", start="2022-01-01", end="2024-01-01")
df["Retorno"] = df["Close"].pct_change()
df["Alvo"] = (df["Retorno"].shift(-1) > 0).astype(int)
      </pre>

      <h2>Feature Engineering</h2>
      <p>As features mais importantes para modelos de ações:</p>
      <ul>
        <li>Médias móveis (SMA 7, 21, 50 dias)</li>
        <li>RSI (Relative Strength Index)</li>
        <li>Volume normalizado</li>
        <li>Volatilidade histórica</li>
      </ul>

      <h2>Treinando o modelo XGBoost</h2>
      <pre>
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X = df[["SMA7", "SMA21", "RSI", "Volume"]].dropna()
y = df["Alvo"].loc[X.index]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = XGBClassifier(n_estimators=100)
model.fit(X_train, y_train)

print(f"Acurácia: {accuracy_score(y_test, model.predict(X_test)):.2%}")
      </pre>

      <h2>Resultados e limitações</h2>
      <p>Modelos de ML conseguem identificar padrões históricos, mas o mercado é influenciado por fatores imprevisíveis. Use sempre como ferramenta de apoio à decisão, nunca como única fonte.</p>

      <p>Interessado em um sistema de análise financeira personalizado para o seu negócio? Entre em contato.</p>
    `
  },

  "analise-sentimentos-python": {
    title: "Análise de Sentimentos em Tempo Real com Python e NLP",
    resumo: "Classifique textos como positivo, negativo ou neutro usando BERT e transformers em Python.",
    content: `
      <p>Análise de sentimentos é uma das aplicações mais práticas de NLP (Processamento de Linguagem Natural). Empresas usam para monitorar reputação de marca, analisar reviews e filtrar feedbacks automaticamente.</p>

      <h2>Abordagens disponíveis</h2>
      <ul>
        <li><strong>VADER</strong> — rápido, ideal para textos curtos e redes sociais</li>
        <li><strong>TextBlob</strong> — simples, bom para prototipagem</li>
        <li><strong>BERT/Transformers</strong> — alta precisão, ideal para produção</li>
      </ul>

      <h2>Implementação com Transformers (HuggingFace)</h2>
      <pre>
from transformers import pipeline

analisador = pipeline("sentiment-analysis", 
                       model="neuralmind/bert-base-portuguese-cased")

textos = [
    "O atendimento foi excelente, recomendo!",
    "Produto chegou quebrado, péssima experiência.",
    "Entrega dentro do prazo, nada a reclamar."
]

for texto in textos:
    resultado = analisador(texto)[0]
    print(f"{texto[:40]}... → {resultado['label']} ({resultado['score']:.2%})")
      </pre>

      <h2>Aplicações práticas</h2>
      <ul>
        <li>Monitoramento de menções em redes sociais</li>
        <li>Classificação automática de reviews de produtos</li>
        <li>Análise de feedbacks de clientes em tempo real</li>
        <li>Alertas automáticos quando sentimento negativo aumenta</li>
      </ul>

      <p>Precisa monitorar o que estão falando sobre sua marca ou produto? Desenvolvo sistemas de análise de sentimentos integrados ao seu negócio.</p>
    `
  },

  "deteccao-fraude-ml": {
    title: "Detecção de Fraudes Financeiras com Machine Learning",
    resumo: "Como treinar modelos supervisionados para identificar transações fraudulentas com alta precisão.",
    content: `
      <p>Fraudes financeiras custam bilhões às empresas anualmente. Machine Learning permite identificar padrões suspeitos em milissegundos, muito antes que uma revisão manual seria possível.</p>

      <h2>O desafio do desbalanceamento</h2>
      <p>Em datasets de fraude, transações legítimas representam 99%+ dos dados. Treinar um modelo sem tratar isso resulta em um modelo que simplesmente ignora fraudes.</p>
      <pre>
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_balanced, y_balanced = smote.fit_resample(X_train, y_train)
      </pre>

      <h2>Features mais relevantes</h2>
      <ul>
        <li>Valor da transação vs. média histórica do usuário</li>
        <li>Localização geográfica incomum</li>
        <li>Horário atípico de transação</li>
        <li>Frequência de transações em curto período</li>
        <li>Dispositivo/IP nunca utilizado antes</li>
      </ul>

      <h2>Modelo com Random Forest</h2>
      <pre>
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

model = RandomForestClassifier(n_estimators=200, class_weight="balanced")
model.fit(X_balanced, y_balanced)

print(classification_report(y_test, model.predict(X_test)))
      </pre>

      <h2>Métricas que importam</h2>
      <p>Em detecção de fraude, <strong>Recall</strong> é mais importante que Accuracy — é melhor ter falsos positivos do que deixar fraudes passarem.</p>

      <p>Quer implementar um sistema antifraude no seu negócio? Entre em contato para uma avaliação.</p>
    `
  },

  "automatizacao-python": {
    title: "Automação de Processos com Python: economize horas por semana",
    resumo: "Automatize tarefas repetitivas com Python: envio de e-mails, relatórios, planilhas e muito mais.",
    content: `
      <p>Tarefas repetitivas consomem horas preciosas que poderiam ser investidas em trabalho estratégico. Com Python, é possível automatizar desde o envio de relatórios até o preenchimento de formulários complexos.</p>

      <h2>O que pode ser automatizado?</h2>
      <ul>
        <li>Geração e envio de relatórios por e-mail</li>
        <li>Leitura e escrita de planilhas Excel</li>
        <li>Preenchimento de formulários web</li>
        <li>Backup e organização de arquivos</li>
        <li>Integração entre sistemas via API</li>
        <li>Notificações automáticas no WhatsApp/Telegram</li>
      </ul>

      <h2>Automatizando relatórios em Excel</h2>
      <pre>
import openpyxl
from openpyxl.styles import Font, PatternFill
import smtplib
from email.mime.multipart import MIMEMultipart

# Gera planilha
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Relatório"
ws["A1"] = "Relatório Automático"
ws["A1"].font = Font(bold=True, size=14)
wb.save("relatorio.xlsx")

# Envia por e-mail automaticamente
print("Relatório gerado e enviado com sucesso!")
      </pre>

      <h2>Agendando tarefas</h2>
      <pre>
import schedule
import time

def gerar_relatorio():
    print("Gerando relatório diário...")
    # sua lógica aqui

schedule.every().day.at("08:00").do(gerar_relatorio)

while True:
    schedule.run_pending()
    time.sleep(60)
      </pre>

      <h2>ROI real da automação</h2>
      <p>Uma tarefa que leva 2 horas por dia, automatizada, libera <strong>40+ horas por mês</strong> — o equivalente a uma semana de trabalho.</p>

      <p>Tem algum processo repetitivo no seu negócio? Me conta que eu avalio como automatizar.</p>
    `
  },

  "angular-frontend-boas-praticas": {
    title: "Boas práticas no Angular: código limpo e projetos escaláveis",
    resumo: "Componentização, lazy loading, services e padrões que separam projetos amadores dos profissionais.",
    content: `
      <p>Angular é um framework poderoso, mas sem boas práticas o projeto vira rapidamente um pesadelo de manutenção. Aqui estão os princípios que uso em todos os projetos profissionais.</p>

      <h2>Estrutura de pastas recomendada</h2>
      <pre>
src/app/
├── core/           # singleton services, guards, interceptors
├── shared/         # componentes e pipes reutilizáveis
├── features/       # módulos por funcionalidade
│   ├── auth/
│   ├── dashboard/
│   └── produtos/
└── layout/         # navbar, footer, sidebar
      </pre>

      <h2>Componentização inteligente</h2>
      <p>Divida componentes pela regra do <strong>Single Responsibility</strong> — cada componente faz uma coisa só:</p>
      <ul>
        <li><strong>Smart components</strong> — acessam services, gerenciam estado</li>
        <li><strong>Dumb components</strong> — recebem dados via @Input, emitem via @Output</li>
      </ul>

      <h2>Lazy Loading — carregamento sob demanda</h2>
      <pre>
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  }
];
      </pre>
      <p>Lazy loading reduz o bundle inicial e melhora o tempo de carregamento em até 60%.</p>

      <h2>Services bem definidos</h2>
      <pre>
@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private api = inject(HttpClient);
  private url = environment.apiUrl;

  getProdutos(): Observable&lt;Produto[]&gt; {
    return this.api.get&lt;Produto[]&gt;(\`\${this.url}/produtos\`);
  }
}
      </pre>

      <h2>Outras práticas essenciais</h2>
      <ul>
        <li>Use <strong>OnPush</strong> change detection para performance</li>
        <li>Sempre faça <strong>unsubscribe</strong> de Observables (use takeUntilDestroyed)</li>
        <li>Tipagem forte — evite <code>any</code></li>
        <li>Escreva testes unitários para services críticos</li>
      </ul>

      <p>Precisa de um frontend Angular profissional e escalável? Entre em contato para discutir seu projeto.</p>
    `
  }

};