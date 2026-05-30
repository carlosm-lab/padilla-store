import fs from 'fs';
import path from 'path';

const DIRS_TO_SCAN = ['src', 'public'];
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

['src', 'public'].forEach(d => {
  const p = path.join(process.cwd(), d);
  if (!fs.existsSync(p)) return;
  const files = walkDir(p);
  
  files.forEach(file => {
    const originalContent = fs.readFileSync(file, 'utf-8');
    let newContent = originalContent;
    

    
    // Replace "Padilla's Store" globally
    newContent = newContent.replace(/Padilla's Store/g, 'Padilla's Store');
    
    // Specifically for package.json or if there is any lowercase without space "inova-sv" that shouldn't be touched.
    
    if (originalContent !== newContent) {
      fs.writeFileSync(file, newContent, 'utf-8');
      console.log(`Updated: ${file}`);
      changedFilesCount++;
    }
  });
});

console.log(`Global brand replacement complete. Modified ${changedFilesCount} files.`);
