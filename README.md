
# Net scan

* scan port
* scan ip

install

```shell
npm install net-scan -g
```

test code

```shell
npm test
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


## todo
* scan array ports
* scan array ips
* add command.js op
