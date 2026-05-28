import fs from 'fs';

let c = fs.readFileSync('landing/code.html', 'utf8');
c = c.replace(/href="#"/g, 'href="javascript:void(0)"');
fs.writeFileSync('landing/code.html', c);
console.log('Fixed href="#" in landing/code.html');
