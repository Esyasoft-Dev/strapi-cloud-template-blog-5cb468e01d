'use strict';

const https = require('https');

function triggerGitHubBuild() {
  return new Promise((resolve) => {
    const body = JSON.stringify({ event_type: 'contentful-update-prod' });
    const req = https.request(
      {
        hostname: 'api.github.com',
        path: '/repos/Esyasoft-Dev/Esyasoft/dispatches',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Strapi',
          'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          if (res.statusCode === 204) {
            strapi.log.info('[GitHub] Build triggered successfully.');
          } else {
            strapi.log.warn(`[GitHub] Dispatch failed — status ${res.statusCode}, body: ${data}`);
          }
          resolve(res.statusCode);
        });
      }
    );
    req.on('error', (err) => {
      strapi.log.error('[GitHub] Request error:', err.message);
      resolve(500);
    });
    req.write(body);
    req.end();
  });
}

module.exports = {
  async trigger(ctx) {
    const secret = ctx.request.headers['x-webhook-secret'];
    if (!secret || secret !== process.env.WEBHOOK_SECRET) {
      ctx.status = 401;
      ctx.body = { error: 'Unauthorized' };
      return;
    }

    const statusCode = await triggerGitHubBuild();
    if (statusCode === 204) {
      ctx.status = 200;
      ctx.body = { triggered: true };
    } else {
      ctx.status = 502;
      ctx.body = { triggered: false, githubStatus: statusCode };
    }
  },
};
