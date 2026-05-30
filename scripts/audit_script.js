import fs from 'fs';
import path from 'path';

// Las reglas requeridas por el usuario
const auditRules = {
  seo: [
    { regex: /<title>/g, name: 'Title tag present', req: true },
    { regex: /<meta name="description"/g, name: 'Meta description', req: true },
    { regex: /<link rel="canonical"/g, name: 'Canonical link', req: false }, // Some are React Helmet
    { regex: /<img[^>]*alt=""/g, name: 'Empty alt tag', bad: true, severity: 'ALTO' },
    { regex: /<img(?!.*alt=)/g, name: 'Missing alt attribute', bad: true, severity: 'ALTO' }
  ],
  a11y: [
    { regex: /href="#"/g, name: 'Empty href (href="#")', bad: true, severity: 'MEDIO' },
    { regex: /outline: *none/gi, name: 'Outline none without focus-visible', bad: true, severity: 'MEDIO' },
    { regex: /<button[^>]*>\s*<\/button>/g, name: 'Empty button', bad: true, severity: 'ALTO' }
  ],
  security: [
    { regex: /dangerouslySetInnerHTML/g, name: 'dangerouslySetInnerHTML', bad: true, severity: 'CRÍTICO' },
    { regex: /eval\(/g, name: 'eval()', bad: true, severity: 'CRÍTICO' },
    { regex: /localStorage\.setItem\((?!.*try)/g, name: 'localStorage without try/catch', bad: true, severity: 'BAJO' }
  ],
  brand: [
    { regex: /ESSENTIALS/g, name: 'Brand Inconsistency: ESSENTIALS', bad: true, severity: 'CRÍTICO' },
    { regex: /Padilla's Store/g, name: 'Brand Inconsistency: Padilla's Store (should be Padilla's Store)', bad: true, severity: 'ALTO' },
    { regex: /#2563eb/g, name: 'Brand Color Inconsistency (Blue vs Red)', bad: true, severity: 'ALTO' }
  ]
};

const DIRS_TO_SCAN = ['src', 'public', '.'];
const IGNORED = ['node_modules', '.git', 'dist', 'cypress', 'assets', 'public/hero_aura_cases.png'];

let totalFiles = 0;
let totalLines = 0;
let findings = { CRÍTICO: 0, ALTO: 0, MEDIO: 0, BAJO: 0, INFO: 0 };
let fileReports = [];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    if (IGNORED.some(ign => file.includes(ign))) return;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      if (file.match(/\.(js|jsx|ts|tsx|html|css)$/)) {
        results.push(file);
      }
    }
  });
  return results;
}

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  totalFiles++;
  totalLines += lines.length;
  
  let fileFindings = [];

  lines.forEach((line, index) => {
    Object.keys(auditRules).forEach(category => {
      auditRules[category].forEach(rule => {
        if (rule.bad) {
          const matches = line.match(rule.regex);
          if (matches) {
            findings[rule.severity]++;
            fileFindings.push(`- **${category.toUpperCase()} [${rule.severity}]**: ${rule.name} encontrado en línea ${index + 1}\n  - *Código:* \`${line.trim()}\``);
          }
        }
      });
    });
  });

  if (fileFindings.length > 0) {
    fileReports.push(`### ${filePath}\n- **Líneas auditadas:** ${lines.length}\n${fileFindings.join('\n')}\n`);
  }
}

// Empezar escaneo
['src'].forEach(d => {
  const p = path.join(process.cwd(), d);
  if (fs.existsSync(p)) {
    walkDir(p).forEach(auditFile);
  }
});

// Write Markdown Report
const report = `
## Resumen Ejecutivo Automatizado
- Total archivos auditados: ${totalFiles}
- Total líneas revisadas: ${totalLines}
- Hallazgos críticos: ${findings['CRÍTICO']}
- Hallazgos altos: ${findings['ALTO']}
- Hallazgos medios: ${findings['MEDIO']}
- Hallazgos bajos: ${findings['BAJO']}

## Hallazgos Detallados
${fileReports.join('\n')}
`;

fs.writeFileSync('audit_results.md', report);
console.log('Auditoría estática completada. Resultados en audit_results.md');
