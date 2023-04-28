import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { spawn } from 'child_process';

(async () => {
  const ctx = await esbuild.context({
    entryPoints: ['./src/index.tsx'],
    platform: 'browser',
    outdir: './build',
    bundle: true,
    logLevel: 'error',
    loader: {
      '.html': 'text',
      '.css': 'css',
    },
    plugins: [
      {
        name: 'Add CSS',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            return {
              path: '',
            };
          });
        },
      },
    ],
  });

  await ctx.watch();

  await ctx.serve({
    host: 'localhost',
    port: 3000,
    servedir: './build',
  });

  // copy html file over
  fs.copyFile('index.html', './build/index.html', (err) => {
    if (err) {
      console.log(err);
    }
  });
})();
