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
    queue_max = options.queue || 1000,
    timeout = options.timeout || 5 * 1000,
    debug = options.debug || options.cli || false,
    ports = getPorts(options),
    count = 0,
    bar;

  if (!checkHost(host)) {
    var err = new Error('Host is invalid');
    self.emit('error', err);
    return utils.invokeCallback(callback, err);
  }

  var total = end - start + 1;
  if (debug) {
    console.log('scan host: %s ports %d~%d', host, start, end, options.ports || '');

    bar = new ProgressBar('scanning [:bar] :percent :count/' + total + ' \t', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: total
    });
  }

  var result = [];
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
        if (debug) {
          console.error('error', err, port);
        }
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

Scan.prototype.ip = function(options, callback) {
  var self = this;
  var queue_max = options.queue || 255,
    timeout = options.timeout || 5 * 1000,
    ips = options.ips,
    count = 0;

  var result = [];
  async.eachLimit(ips, queue_max,
    function(ip, next) {
      var conn = net.connect({
        host: ip,
        port: 1
      }, function() {
        result.push(ip);
        this.destroy();
      });

      conn.on('error', function(err) {
        console.log('err.code', err.code);
        if (err.code == 'ECONNREFUSED') {
          result.push(ip);
        } else {
          console.log('err', err.code, ip);
        }
        this.destroy();
      });

      conn.on('close', function() {
        next();
      });

      conn.setTimeout(timeout, function() {
        this.destroy();
      });
    },
    function(err) {
      utils.invokeCallback(callback, err, result);
    });

  return self;
};

// todo
var checkHost = function() {
  return true;
};

var getPorts = function(options) {
  var ports = options.ports || [];
  for (var i = options.start; i <= options.end; i++) {
    ports.push(i);
  }
  return ports;
};
