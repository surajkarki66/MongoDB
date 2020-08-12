/*
<<<<<<<<<<<<<<<<<<<<<<< Sharding >>>>>>>>>>>>>>>>>>>>>>>>>>
Vertical Scaling: Increasing the capacity of individual machines, So they have more RAM, or disk space  or
maybe more powerfull CPU. But is very costy and expensive.

In mongodDB scaling is done horizontally.

Horizontal Scaling: Instead of making individual machine better, we just add more machine and distribute the dataset
among those machines.

Sharding is the way of distributing data in mongoDB.


<<<<<<<<<<<<<<<<<<<<<<<<< Setting Up a Sharded Cluster >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


3 Node replica set
1) Configuration file for first config server csrs_1.conf:

sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26001
systemLog:
  destination: file
  path: /var/mongodb/db/csrs1.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs1


2) csrs_2.conf:

sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26002
systemLog:
  destination: file
  path: /var/mongodb/db/csrs2.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs2


3) csrs_3.conf:

sharding:
  clusterRole: configsvr
replication:
  replSetName: m103-csrs
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26003
systemLog:
  destination: file
  path: /var/mongodb/db/csrs3.log
  logAppend: true
processManagement:
  fork: true
storage:
  dbPath: /var/mongodb/db/csrs3


4) Starting the three config servers:

mongod -f csrs_1.conf
mongod -f csrs_2.conf
mongod -f csrs_3.conf


5) Connect to one of the config servers:
mongo --port 26001

6) Initiating the CSRS:
rs.initiate()

7) Creating super user on CSRS:
use admin
db.createUser({
  user: "m103-admin",
  pwd: "m103-pass",
  roles: [
    {role: "root", db: "admin"}
  ]
})


8) Authenticating as the super user:
Authenticating as the super user:


9) Add the second and third node to the CSRS:
rs.add("192.168.103.100:26002")
rs.add("192.168.103.100:26003")

10) Mongos config (mongos.conf):  // connecting mongos with config server shard
sharding:
  configDB: m103-csrs/192.168.103.100:26001,192.168.103.100:26002,192.168.103.100:26003
security:
  keyFile: /var/mongodb/pki/m103-keyfile
net:
  bindIp: localhost,192.168.103.100
  port: 26000
systemLog:
  destination: file
  path: /var/mongodb/db/mongos.log
  logAppend: true
processManagement:
  fork: true

11) Connect to mongos:
$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin


12) Check sharding status:
 sh.status()

14) Updated configuration for node1.conf:

sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node1
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
net:
  bindIp: 192.168.103.100,localhost
  port: 27011
security:
  keyFile: /var/mongodb/pki/m103-keyfile
systemLog:
  destination: file
  path: /var/mongodb/db/node1/mongod.log
  logAppend: true
processManagement:
  fork: true
replication:
  replSetName: m103-repl


15) Updated configuration for node2.conf:

sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node2
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
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
  replSetName: m103-repl


16) Updated configuration for node3.conf:

sharding:
  clusterRole: shardsvr
storage:
  dbPath: /var/mongodb/db/node3
  wiredTiger:
    engineConfig:
      cacheSizeGB: .1
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
  replSetName: m103-repl


17) Connecting directly to secondary node (note that if an election has taken place in your replica set,
the specified node may have become primary):

mongo --port 27012 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"

18) Shutting down node:
use admin
db.shutdownServer()

19) Restarting node with new configuration:
mongod -f node2.conf

20) Connecting directly to secondary node (note that if an election has taken place in your replica set,
the specified node may have become primary):

mongo --port 27013 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"

21) Shutting down node:
use admin
db.shutdownServer()


22) Restarting node with new configuration:
mongod -f node3.conf

23) connecting directly to primary node:

mongo --port 27011 -u "m103-admin" -p "m103-pass" --authenticationDatabase "admin"

24) Stepping down current primary:
rs.stepDown()

25) Shutting down node:
use admin
db.shutdownServer()


26) Restarting node with new configuration:
mongod -f node1.conf


27) Connect to mongos:
$ mongo --port 26000 --username m103-admin --password m103-pass --authenticationDatabase admin

27) Adding new shard to cluster from mongos:
sh.addShard("m103-repl/192.168.103.100:27012")

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Shard Keys >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Shard Keys is an indexed field or fields that mongodb uses to partition data in a sharded collection 
and distribute it across the shards in your cluster.


Note: 
 1) Shard Key field must be indexed
  -> Indexes must exist first before you can select the indexed fields for your shard key.

 2) Shard keys are immutable
  -> you cannot change the shard key field post-sharding
  -> you cannot change the value of shard key fields post sharding.

 3) Shard key are permanent
  -> You cannot unshard a sharded collection.


How to Shard ?

1) Use sh.enableSharding("<database>") to enable sharding for the specified database.

2) Use db.collection.createIndex() to create index for your shard key fields.

3) Use sh.shardCollection("<database>.<collection>", {shard key}) to shard the collection.

Picking a good shard key:

1) High cardinality: Many possible shard key value

2) Low Frequency: low repetition of a given unique shard key value.

3) Non-Monotonically changing: Avoid shard keys that changes monotonically.


<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Hashed Shard keys >>>>>>>>>>>>>>>>>>>>>>>>>>>>
This is done by first hashing the shard keys by hash function then chunks is made according to
those hashes

<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Chunks >>>>>>>>>>>>>>>>>>>>>>>>>>>
1) Show collections in config database:
use config
show collections

2) Find one document from the chunks collection:
db.chunks.findOne()

3) Change the chunk size:
use config
db.settings.save({_id: "chunksize", value: 2})

4) Check the status of the sharded cluster:
sh.status()

<<<<<<<<<<<<<<<<<<<<<<<<<<< Balancing >>>>>>>>>>>>>>>>>>>>>>>>
1) Start the balancer:
sh.startBalancer(timeout, interval)


2) Stop the balancer:
sh.stopBalancer(timeout, interval)

3) Enable/disable the balancer:
sh.setBalancerState(boolean)


<<<<<<<<<<<<<<<<<<<<<<<<<< Queries in Sharded Cluster >>>>>>>>>>>>>>>>>>>>>
Targeted Queries:
1) Show collections in the m103 database:
use m103
show collections

2) Targeted query with explain() output:
db.products.find({"sku" : 1000000749 }).explain()

3) Scatter gather query with explain() output:
db.products.find( {
  "name" : "Gods And Heroes: Rome Rising - Windows [Digital Download]" }
).explain()

*/
