const fs = require('fs');
const path = require('path');

const glob = (dir) => {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(glob(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
};

const files = [...glob('./app'), ...glob('./components'), ...glob('./data')];
const unsplashPattern = /(https:\/\/images\.unsplash\.com\/[^\s\"'\`\>]+|photo-[a-zA-Z0-9\-]+)/g;

const found = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = unsplashPattern.exec(content)) !== null) {
    found.add(match[0]);
  }
});

async function check() {
  console.log('Found:', found.size);
  for (const item of found) {
    let url = item;
    if (item.startsWith('photo-')) {
      url = 'https://images.unsplash.com/' + item + '?w=400&h=400&fit=crop&auto=format&q=80';
    }
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) {
        console.log('404_BROKEN:', res.status, item);
      }
    } catch(e) {
      console.log('ERR:', item, e.message);
    }
  }
}
check();
