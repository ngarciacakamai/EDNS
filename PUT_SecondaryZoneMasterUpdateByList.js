const fs = require('fs');
const readline = require('readline');
const EdgeGrid = require('akamai-edgegrid');

const eg = new EdgeGrid({
  path: '/Users/ngarciac/.edgerc',
  section: 'default'
});

const accountSwitchKey = "1-1WQ7AP:1-2RBL";

const rl = readline.createInterface({
  input: fs.createReadStream('onezonetest.txt'),
  crlfDelay: Infinity
}); 

rl.on('line', (line) => {
  if (!line.trim()) return; // Skip empty lines

  const [zonename, type, mastersRaw] = line.split(',');

  if (!zonename || !type || !mastersRaw) {
    console.error(`Invalid line format: ${line}`);
    return;
  }

  // Split masters by | and trim whitespace
  const masters = mastersRaw.split('|').map(ip => ip.trim());

  eg.auth({
    path: `/config-dns/v2/zones/${zonename.trim()}?accountSwitchKey=${accountSwitchKey}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      signAndServe: false,
      type: type.trim(),
      masters: masters,
      zone: zonename.trim()
    })
  });

  eg.send((error, response, body) => {
    console.log(`Result for zone ${zonename.trim()}:`);
    console.log('Status:', response && response.statusCode);
    console.log('Body:', body);
    if (error) {
      console.error('Error:', error);
    }
  });
});
