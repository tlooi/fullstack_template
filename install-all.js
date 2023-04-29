import { exec } from 'child_process';
import { stdout } from 'process';

// This file simultaneously installs all dependencies in every root directory
exec('npm install')
    .stdout.on('data', (data) => {
        stdout.write('[Root] ' + data);
    })
    .on('close', () => {
        console.log('[Root] Dependenices finished Installing');
    });

exec('cd frontend && npm install')
    .stdout.on('data', (data) => {
        stdout.write('[Frontend] ' + data);
    })
    .on('close', () => {
        console.log('[Frontend] Dependencies finished installing');
    });

exec('cd backend && npm install')
    .stdout.on('data', (data) => {
        stdout.write('[Backend] ' + data);
    })
    .on('close', () => {
        console.log('[Backend] Dependencies finished Installing');
    });
