import { exec } from 'child_process';
import { stdout } from 'process';

exec('cd ./frontend && npm run dev').stdout.on('data', (data) => {
    stdout.write(data);
});
exec('cd ./backend && nodemon ./dev-run.js --ignore "build/*"').stdout.on(
    'data',
    (data) => {
        stdout.write(data);
    },
);
