import { exec } from 'child_process';
import { stdout } from 'process';

exec('npm run dev', { cwd: './frontend' })
    .stdout.on('data', (data) => {
        stdout.write(data);
    })
    .on('error', (err) => {
        console.log(err);
    });

exec('nodemon ./dev-run.js --ignore "build/*"', {
    cwd: './backend',
}).stdout.on('data', (data) => {
    stdout.write(data);
});
