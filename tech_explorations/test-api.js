const https = require('https');

const options = {
  hostname: 'api.findmynextcar.co',
  path: '/analytics-feed',
  method: 'GET',
  headers: {
    'Authorization': 'Basic c3dpenpsOjl2LzJaOCtmSUNqOU0xM0xEUXRUT0xnaWZua2FPY2lyUEpFTnN3M1JxalFueWpBUG9UZ0NPekdWNGpmUVY0QSs='
  }
};

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('\nResponse Structure:');
      console.log(JSON.stringify(jsonData, null, 2));
    } catch (e) {
      console.error('Error parsing JSON:', e.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();
