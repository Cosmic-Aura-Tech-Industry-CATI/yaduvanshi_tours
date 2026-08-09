const ids = [
  'photo-1582510003544-4d00b7f74220',
  'photo-1544735716-392fe2489ffa',
  'photo-1599661046289-e31897846e41',
  'photo-1605649487212-47bdab064df7',
  'photo-1534528741775-53994a69daeb',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1438761681033-6461ffad8d80',
  'photo-1500648767791-00dcc994a43e',
  'photo-1506905925346-21bda4d32df4',
  'photo-1464822759023-fed622ff2c3b'
];

async function check() {
  for (const id of ids) {
    const url = 'https://images.unsplash.com/' + id + '?w=400&h=400&fit=crop&auto=format&q=80';
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(res.status === 200 ? 'OK' : res.status, id);
    } catch(e) {
      console.log('ERR', id, e.message);
    }
  }
}
check();
