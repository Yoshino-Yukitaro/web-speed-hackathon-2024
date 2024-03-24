import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import jsesc from 'jsesc';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { bookApiClient } from '@wsh-2024/app/src/features/book/apiClient/bookApiClient';
import ErrorBoundary from '@wsh-2024/app/src/foundation/components/ErrorBoundary';
import { ClientApp } from '@wsh-2024/app/src/index';

import { INDEX_HTML_PATH } from '../../constants/paths';
import { episodeApiClient } from '@wsh-2024/app/src/features/episode/apiClient/episodeApiClient';

const app = new Hono();

const createInjectBookListDataStr = async(): Promise<Record<string, unknown>> => {
  const json: Record<string, unknown> = {};
  
  const books = await bookApiClient.fetchList({ query: {} })
  json['books'] = books;

  return json;
}

const createUnjectBookDetailDataStr = async(bookId: string): Promise<Record<string, unknown>> => {
  const json: Record<string, unknown> = {};

  const book = await bookApiClient.fetch({ params: { bookId }});
  const episodes = await episodeApiClient.fetchList({ query: { bookId }});
  json['book'] = book;
  json['episodeList'] = episodes;

  return json;

}

async function createHTML({
  body,
  injectData,
  styleTags,
}: {
  body: string;
  injectData: Record<string, unknown> | undefined;
  styleTags: string;
}): Promise<string> {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  const content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags)
    .replaceAll(
      '<script id="inject-data" type="application/json"></script>',
      injectData ? `<script id="inject-data" type="application/json">
      ${jsesc(injectData, {
        isScriptContext: true,
        json: true,
        minimal: true,
      })}
    </script>` : '',
    );

  return content;
}

app.get('*', async (c) => {
  let injectData = undefined
  if (c.req.path.startsWith('/search')) {
    injectData = await createInjectBookListDataStr();
  }
  if (c.req.path.startsWith('/books')) {
    const bookId = c.req.path.split('/')[2]!;
    injectData = await createUnjectBookDetailDataStr(bookId);
  }
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <StaticRouter location={c.req.path}>
          <ClientApp />
        </StaticRouter>,
      )
      ,
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, injectData, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
