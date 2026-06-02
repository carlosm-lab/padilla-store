import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const parts = line.split('=');
      return [parts[0].trim(), parts.slice(1).join('=').trim()];
    })
);

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

async function test() {
  const url = `${supabaseUrl}/rest/v1/products?select=id,name,category_id,catalog,categories!products_category_id_fkey(name)&limit=1`;
  console.log('Fetching:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    const json = await res.json();
    console.log('Status:', res.status);
    console.log('Result:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
