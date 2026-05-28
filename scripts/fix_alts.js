import fs from 'fs';
import path from 'path';

const filesToFix = [
  'src/components/HomePage.jsx',
  'src/components/ProductCard.jsx',
  'src/components/FavoritesModal.jsx',
  'src/components/ui/UserAvatar.jsx',
  'src/components/Logo.jsx',
  'src/components/admin/RecentProducts.jsx',
  'src/components/admin/TopFavorites.jsx'
];

filesToFix.forEach(relPath => {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Find all <img tags and check if they have alt=
  // This is a naive regex replacement, but effective for fixing missing alts by appending alt="" to the <img tag.
  content = content.replace(/<img\s+(?![^>]*alt=)/g, '<img alt="" ');
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Fixed alts in ${relPath}`);
});
