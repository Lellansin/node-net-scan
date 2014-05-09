
# Net scan

* scan port
* scan ip

install

    npm install net-scan

test code

	npm test

Output:

    scan host: www.lellansin.com ports 1~100
    port 22 is open
    port 21 is open
    port 80 is open
    scanning [=============================] 100% 100/100 0.0s
    ports scan: 14030ms
    open ports:22,21,80


## todo
* test time out
* scan array ports
* add queue to connect
* add command.js op