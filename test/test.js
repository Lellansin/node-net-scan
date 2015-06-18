var scan = require('..');

console.time('ports scan');
scan.port({
  host: 'www.baidu.com',
  start: 1,
  end: 100,
  timeout: 2000,
  queue: 100
}, function(err, result) {    
  console.timeEnd('ports scan');
  console.log('open ports:' + result);
});
