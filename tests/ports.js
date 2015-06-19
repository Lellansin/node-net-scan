var scan = require('..');

console.time('ports scan');
scan.port({
	host: 'github.com',
	ports: [20, 21, 22, 80, 443, 3306, 27017],
	timeout: 2000
}, function(err, result) {    
	console.timeEnd('ports scan');
	console.log('open ports:', result);
});
