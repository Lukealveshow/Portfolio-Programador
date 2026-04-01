import express from 'express';
import path from 'path';
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

// Pasta onde o Angular build coloca os arquivos do browser
const browserDistFolder = path.join(__dirname, 'dist/portfolio');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Serve arquivos estáticos (assets, js, css)
app.use(express.static(browserDistFolder, { maxAge: '1y', index: true }));

app.get('*', (req, res) => {
  res.sendFile(path.join(browserDistFolder, 'index.html'));
});

// Serve o Angular Universal (SSR) para todas as outras rotas
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

// Inicia o servidor
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Exporta handler para dev-server ou Firebase Cloud Functions
export const reqHandler = createNodeRequestHandler(app);