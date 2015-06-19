var scan = require('..');

console.time('ports scan');
scan.port({
	host: 'github.com',
	start: 1,
	end: 1000,
	timeout: 2000,
	queue: 1000
}, function(err, result) {    
	console.timeEnd('ports scan');
	console.log('open ports:', result);
});
