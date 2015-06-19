
# Net scan

* scan port
* scan ip

## Installation

```shell
npm install net-scan -g
```

## CLI

```shell
npm test
```

```shell
scan -h github.com -r 1~1000
```

Output:

```shell
scan host: github.com ports 1~1000
port 80 is open
scanning [                    ] 0% 1/1000 	port 22 is open
scanning [                    ] 0% 2/1000 	port 443 is open
scanning [====================] 100% 1000/1000 	
ports scan: 5245ms
open ports: [ 80, 22, 443 ]
```

## Example

### Range scan
```javascript
var scan = require('net-scan');

console.time('ports scan');
scan.port({
	host: 'github.com',
	start: 1,
	end: 1000,
	timeout: 2000,
	queue: 1000
}, function(err, result) {    
	console.timeEnd('ports scan');
	console.log('open ports:', result);
});
```

Output

```shell
ports scan: 2232ms
open ports: [ 22, 80, 443 ]
```

### Ports scan
```javascript
var scan = require('net-scan');

console.time('ports scan');
scan.port({
	host: 'github.com',
	ports: [20, 21, 22, 80, 443, 3306, 27017],
	timeout: 2000
}, function(err, result) {    
	console.timeEnd('ports scan');
	console.log('open ports:', result);
});

```

Output

```shell
ports scan: 2015ms
open ports: [ 443, 22, 80 ]
```

### Listener
```javascript
console.time('ports scan');
scan.port({
		host: 'github.com',
		start: 1,
		end: 1000,
		timeout: 2000,
		queue: 1000
	})
	.on('open', function(port) {
		console.log('found port open', port);
	})
	.on('end', function(port) {
		console.timeEnd('ports scan');
		console.log('scan port over');
	});

```

Output

```shell
found port open 22
found port open 80
found port open 443
ports scan: 2243ms
scan port over
```

## Todo
* scan array ips
* add command.js op
