var scan = require('..');

console.time('ips scan');
scan.ip({
	ips: [
		'lellansin.com',
		'www.baidu.com',
		'lellansinasdf1234zxcv234.com',
		'111.111.111.111',
	],
	timeout: 30000
}, function(err, result) {    
	console.timeEnd('ips scan');
	console.log('open ips:', result);
});