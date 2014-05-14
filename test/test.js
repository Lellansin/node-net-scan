var scan = require('..');

console.time('ports scan');
scan.port({
  host: 'www.lellansin.com',
  start: 1,
  end: 100,
  timeout: 2000,
  debug: true
}, function(result) {    
  console.timeEnd('ports scan');
  console.log('open ports:' + result);
});