import * as esbuild from 'esbuild';
import { globSync } from 'glob';
import { readFileSync } from 'fs';
import { exec } from 'child_process';
import { stdout } from 'process';

const test = readFileSync('./package.json');
const pkgJson = JSON.parse(test.toString('utf-8'));

const dependencies = [
    ...Object.keys(pkgJson.dependencies),
    ...Object.keys(pkgJson.devDependencies),
];

const dep = new Set(dependencies);

const ctx = await esbuild.context({
    tsconfig: './tsconfig.json',
    entryPoints: [
        './index.ts',
        ...globSync('./src/**/*.ts'),
        ...globSync('../shared/**/*.ts'),
    ],
    format: 'esm',
    platform: 'node',
    outdir: 'build',
    splitting: true,
    bundle: true,
    sourcemap: true,
    outExtension: {
        '.js': '.mjs',
    },
    plugins: [
        {
            name: 'add-mjs',
            setup(build) {
                build.onResolve({ filter: /.*/ }, (args) => {
                    if (args.importer && args.path.startsWith('@shared')) {
                        return {
                            path:
                                '../shared/' +
                                args.path.replace('@shared/', '') +
                                '.mjs',
                            external: true,
                        };
                    } else if (args.importer && !dep.has(args.path))
                        return { path: args.path + '.mjs', external: true };
                    else if (args.importer)
                        return { path: args.path, external: true };
                });
            },
        },
    ],
});

await ctx.watch();
exec('nodemon ./build/backend/index.mjs').stdout.on('data', (data) => {
    stdout.write(data);
});
