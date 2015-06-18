var net = require('net');
var async = require('async');
var ProgressBar = require('progress');

exports.port = function(options, callback) {
  var host = options.host,
    start = options.start,
    end = options.end,
    timeout = options.timeout || 5 * 1000,
    queue_max = options.queue || 1000,
    count = 0,
    cli = options.cli || false,
    bar;

  // todo recieve a array to scan

  var total = end - start + 1;
  if (cli) {
    console.log('scan host: %s ports %d~%d', host, start, end);

    bar = new ProgressBar('scanning [:bar] :percent :count/' + total + ' \t', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: total
    });
  }

  var result = [];
  var ports = [];
  for (var i = start; i <= end; i++) {
    ports.push(i);
  }

  async.eachLimit(ports, queue_max,
    function(port, next) {
      var conn = net.connect({
        host: host,
        port: port
      }, function() {
        if (cli) {
          console.log('port ' + port + ' is open');
        }
        result.push(port);
        this.destroy();
      });

      conn.on('error', function(err) {
        if (err.errno == 'ECONNREFUSED') {
          this.destroy();
        }
      });

      conn.on('close', function() {
        if (cli) {
          bar.tick({
            count: ++count
          });
        }
        next();
      });

      conn.setTimeout(timeout, function() {
        this.destroy();
      });
    },
    function(err) {
      callback(err, result);
    });
};

// todo scan ip