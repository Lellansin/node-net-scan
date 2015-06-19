var scan = require('..');

console.time('ports scan');
scan.port({
		host: 'github.com',
		start: 1,
		end: 1000,
		timeout: 2000,
		queue: 1000
	})
	.on('open', function(port) {
		console.log('found port open', port);
	})
	.on('end', function(port) {
		console.timeEnd('ports scan');
		console.log('scan port over');
	});
