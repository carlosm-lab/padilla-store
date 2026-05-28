import fs from 'fs';

const files = [
  'src/context/CartContext.jsx',
  'src/context/FavoritesContext.jsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/localStorage\.setItem/g, 'safeLocalStorage.setItem');
  content = content.replace(/localStorage\.getItem/g, 'safeLocalStorage.getItem');
  content = content.replace(/localStorage\.removeItem/g, 'safeLocalStorage.removeItem');
  
  if (!content.includes('safeLocalStorage')) return;

  if (content.includes('import { createContext')) {
    content = content.replace('import { createContext', "import { safeLocalStorage } from '@/utils/storage';\nimport { createContext");
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Refactored localStorage in ${file}`);
});
