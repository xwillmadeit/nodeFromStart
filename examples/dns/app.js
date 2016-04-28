var dns = require('dns');
var url = 'www.baidu.com';

dns.lookup(url, function onLookup(err, addresses, family) {
  console.log('addresses:', addresses);
});

