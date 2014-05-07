var _ = require('..');

_.scan({
	host: 'www.google.com.hk',
	start: 1,
	end: 200,
	timeout: 300
}, function(result) {    
	console.log('open ports:' + result);
});