
# Net scan

* scan port
* scan ip

## Installation

```shell
npm install net-scan -g
```

## Example

```shell
npm test
```

Command

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

## Todo
* scan array ports
* scan array ips
* add command.js op
