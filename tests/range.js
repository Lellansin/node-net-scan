var scan = require('..');

console.time('ports scan');
scan.port({
<<<<<<< HEAD
	host: '115.236.140.12',
	start: 1,
	end: 65535,
	timeout: 2000,
	queue: 1000
=======
    host: 'github.com',
    start: 1,
    end: 1000,
    timeout: 2000,
    queue: 1000
>>>>>>> origin/master
}, function(err, result) {    
    console.timeEnd('ports scan');
    console.log('open ports:', result);
});
