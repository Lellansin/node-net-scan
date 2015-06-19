var net = require('net');
var util = require('util');
var utils = require('./utils');
var EventEmitter = require('events').EventEmitter;
var async = require('async');
var ProgressBar = require('progress');

function Scan() {}

util.inherits(Scan, EventEmitter);
module.exports = new Scan();

Scan.prototype.port = function(options, callback) {
  var self = this;
  var host = options.host,
    start = options.start,
    end = options.end,
    timeout = options.timeout || 5 * 1000,
    queue_max = options.queue || 1000,
    count = 0,
    debug = options.debug || options.cli || false,
    bar;

  // todo recieve a array to scan

  if (!checkHost(host)) {
    var err = new Error('Host is invalid');
    self.emit('error', err);
    return utils.invokeCallback(callback, err);
  }

  var total = end - start + 1;
  if (debug) {
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
        if (debug) {
          console.log('port ' + port + ' is open');
        }

        self.emit('open', port);
        result.push(port);
        this.destroy();
      });

      conn.on('error', function(err) {
        self.emit('error', err, port);
        this.destroy();
      });

      conn.on('close', function() {
        if (debug) {
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
      self.emit('end');
      utils.invokeCallback(callback, err, result);
    });

  return self;
};

// todo scan ip

// todo
var checkHost = function() {
  return true;
};
