var net = require('net');
var ProgressBar = require('progress');

exports.scan = function(options, callback) {
	var host = options.host,
		start = options.start,
		end = options.end,
		timeout = options.timeout,
		total = end - start,
		count = 0,
		result = [];

	var bar = new ProgressBar('scanning [:bar] :percent :count/' + total + ' :etas ', {
		complete: '=',
		incomplete: ' ',
		width: 30,
		total: total
	});
	for (var i = start; i <= end; i++) {
		var conn = net.connect({
			host: host,
			port: i
		}, function(i) {
			return function() {
				progressPrint('port ' + i + ' is open');
				result.push(i);
				this.destroy();
			};
		}(i));
		conn.on('error', function(err) {
			if (err.errno == 'ECONNREFUSED') {
				this.destroy();
			}
		});
		conn.on('close', function() {
			if (count++ == total) {
				callback(result);
			}
			bar.tick({
				count: count
			});
		});

		if (timeout) {
			conn.setTimeout(timeout);
			console.log('setTimeout')
		}
	}
};

var progressPrint = function(str) {
	var n = m = 10;
	while(n--) {
		print('\b\b\b\b\b\b\b');
	}
	print(str);
	while(m--) {
		print('              ');
	}
};

var print = function(str) {
	process.stdout.write(str);
};