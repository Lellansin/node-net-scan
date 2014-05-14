var net = require('net');
var utils = require('./utils');
var ProgressBar = require('progress');

exports.port = function(options, callback) {
  var host = options.host,
    start = options.start,
    end = options.end,
    timeout = options.timeout,
    queue = options.queue,
    count = 0,
    debug = options.debug || false,
    result = [];

  // todo recieve a array to scan

  var total = end - start + 1;
  if (debug) {
    console.log('scan host: %s ports %d~%d', host, start, end);
  }

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
      bar.tick({
        count: ++count
      });
      if (count == total) {
        utils.invokeCallback(callback, result);
      }
    });

    if (timeout) {
      conn.setTimeout(timeout, function() {
        this.destroy();
      });
    }

    // todo queue
  }
};

// todo scan ip

var progressPrint = function(str) {
  var n = m = 10;
  while (n--) {
    print('\b\b\b\b\b\b\b');
  }
  print(str);
  while (m--) {
    print('              ');
  }
};

var print = function(str) {
  process.stdout.write(str);
};