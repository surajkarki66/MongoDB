/*

Replication: It is the concept of maintaining multiple copies of data.
Availability and redundancy of data are typical properties of a durable database solution.
Types of data replication
1) Binary replication
2) Statement based replication

MongoDB uses Statement based replication.

<<<<<<<<<<<<<<<<<<< Setting Up a Replica Set >>>>>>>>>>>>>>>>>>>>>>>>




1) The configuration file for the first node (node1.conf):
    storage:
      dbPath: /var/mongodb/db/node1
    net:
      bindIp: 192.168.103.100,localhost
      port: 27011
    security:
      authorization: enabled
      keyFile: /var/mongodb/pki/m103-keyfile
    systemLog:
      destination: file
      path: /var/mongodb/db/node1/mongod.log
      logAppend: true
    processManagement:
      fork: true
    replication:
      replSetName: m103-example

2) Creating the keyfile and setting permissions on it:
sudo mkdir -p /var/mongodb/pki/
sudo chown vagrant:vagrant /var/mongodb/pki/
openssl rand -base64 741 > /var/mongodb/pki/m103-keyfile
chmod 400 /var/mongodb/pki/m103-keyfile

3) Creating the dbpath for node1:
mkdir -p /var/mongodb/db/node1

4) Starting a mongod with node1.conf:
mongod -f node1.conf

5) Copying node1.conf to node2.conf and node3.conf:
cp node1.conf node2.conf
cp node2.conf node3.conf

Editing node2.conf using vi:

6) node2.conf, after changing the dbpath, port, and logpath:
    storage:
      dbPath: /var/mongodb/db/node2
    net:
      bindIp: 192.168.103.100,localhost
      port: 27012
    security:
      keyFile: /var/mongodb/pki/m103-keyfile
    systemLog:
      destination: file
      path: /var/mongodb/db/node2/mongod.log
      logAppend: true
    processManagement:
      fork: true
    replication:
      replSetName: m103-example

7) node3.conf, after changing the dbpath, port, and logpath:
    storage:
      dbPath: /var/mongodb/db/node3
    net:
      bindIp: 192.168.103.100,localhost
      port: 27013
    security:
      keyFile: /var/mongodb/pki/m103-keyfile
    systemLog:
      destination: file
      path: /var/mongodb/db/node3/mongod.log
      logAppend: true
    processManagement:
      fork: true
    replication:
      replSetName: m103-example

8) Creating the data directories for node2 and node3:
mkdir /var/mongodb/db/{node2,node3}

9) Starting mongod processes with node2.conf and node3.conf:
mongod -f node2.conf
mongod -f node3.conf

10) Connecting to node1:
mongo --port 27011

11) Initiating the replica set:
rs.initiate()

use admin
db.createUser({
  user: "m103-admin",
  pwd: "m103-pass",
  roles: [
    {role: "root", db: "admin"}
  ]
})

12) Exiting out of the Mongo shell and connecting to the entire replica set:
exit
mongo --host "m103-example/192.168.103.100:27011" -u "m103-admin"
-p "m103-pass" --authenticationDatabase "admin"

13) Getting replica set status:
rs.status()

14) Adding other members to replica set:
rs.add("localhost:27012")
rs.add("localhost:27013")

15) Getting an overview of the replica set topology:
rs.isMaster()

16) Stepping down the current primary:
rs.stepDown()






<<<<<<<<<<<<<<<<< Reconfiguring running replica set >>>>>>>>>>>>>>>>>>>>>
node4.conf:
storage:
  dbPath: /var/mongodb/db/node4
net:
  bindIp: 192.168.103.100,localhost
  port: 27014
systemLog:
  destination: file
  path: /var/mongodb/db/node4/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example


arbiter.conf:
storage:
  dbPath: /var/mongodb/db/arbiter
net:
  bindIp: 192.168.103.100,localhost
  port: 28000
systemLog:
  destination: file
  path: /var/mongodb/db/arbiter/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-example

1) Starting up mongod processes for our fourth node and arbiter:
mongod -f node4.conf
mongod -f arbiter.conf

2) From the Mongo shell of the replica set, adding the new secondary and the new arbiter:
rs.add("m103:27014")
rs.addArb("m103:28000")

3) Checking replica set makeup after adding two new nodes:
rs.isMaster()

4) Removing the arbiter from our replica set:
rs.remove("m103:28000")

5) Assigning the current configuration to a shell variable we can edit, in order to reconfigure the replica set:
cfg = rs.conf()

6) Editing our new variable cfg to change topology - specifically, by modifying cfg.members:
cfg.members[3].votes = 0
cfg.members[3].hidden = true
cfg.members[3].priority = 0

7) rs.reconfig(cfg)






<<<<<<<<<<<<<<<<< Reading and Writing operation in replica set >>>>>>>>>>>>>>>>>>>>>

1) Connecting to the replica set:
mongo --host "m103-example/m103:27011" -u "m103-admin" -p
"m103-pass" --authenticationDatabase "admin"


2) Checking replica set topology:
rs.isMaster()


3) Inserting one document into a new collection:
use newDB
db.new_collection.insert( { "student": "Matt Javaly", "grade": "A+" } )


4) Connecting directly to a secondary node:
mongo --host "m103:27012" -u "m103-admin" -p "m103-pass"
--authenticationDatabase "admin"


5) Attempting to execute a read command on a secondary node (this should fail):
show dbs


6) Enabling read commands on a secondary node:
rs.slaveOk()


7) Reading from a secondary node:
use newDB
db.new_collection.find()


8) Attempting to write data directly to a secondary node (this should fail, because we cannot write data directly to a secondary):
db.new_collection.insert( { "student": "Norberto Leite", "grade": "B+" } )


9) Shutting down the server (on both secondary nodes)

use admin
db.shutdownServer()


10) Connecting directly to the last healthy node in our set:
mongo --host "m103:27011" -u "m103-admin" -p "m103-pass"
--authenticationDatabase "admin"

11) Verifying that the last node stepped down to become a secondary when a majority of nodes in the set were not available:
rs.isMaster()

In the replica set odd number of nodes is better for production.


<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Write Concern Level >>>>>>>>>>>>>>>>>>>>>>>>>>>

0 -> Dont wait for acknowledgement

1(default) -> wait for acknowledgement from the primary node only.

>=2 ->  wait for acknowledgement from the primary node and one or more secondary node.

"majority" -> Wait for acknowledgement from a majority of replica set members.


*/
