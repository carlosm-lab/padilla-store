import fs from 'fs';
import path from 'path';

const DIRS_TO_SCAN = ['src', 'landing', 'public'];
const IGNORED = ['node_modules', '.git', 'dist', 'cypress', 'assets'];

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

let changedFilesCount = 0;

['src', 'landing', 'public'].forEach(d => {
  const p = path.join(process.cwd(), d);
  if (!fs.existsSync(p)) return;
  const files = walkDir(p);
  
  files.forEach(file => {
    const originalContent = fs.readFileSync(file, 'utf-8');
    let newContent = originalContent;
    
    if (file.includes('landing')) {
      newContent = newContent.replace(/ESSENTIALS ACCESSORIES/g, 'I Nova SV');
      newContent = newContent.replace(/ESSENTIALS/g, 'I Nova SV');
    }
    
    // Replace "I Nova Sv" globally
    newContent = newContent.replace(/I Nova Sv/g, 'I Nova SV');
    
    // Specifically for package.json or if there is any lowercase without space "inova-sv" that shouldn't be touched.
    
    if (originalContent !== newContent) {
      fs.writeFileSync(file, newContent, 'utf-8');
      console.log(`Updated: ${file}`);
      changedFilesCount++;
    }
  });
});

console.log(`Global brand replacement complete. Modified ${changedFilesCount} files.`);
