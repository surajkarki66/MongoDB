/* 
Daemon: a daemon is a program or process thats mean to be run but not interacted with directly.

mongod: mongod is the main daemon process for mongodb. It is the core server of the database.
It handles connections, requests, persisting your data.

<<<<<<<<Example of mongodb configuration file:>>>>>>>>>
mongod.conf

storage:
  dbPath: /var/mongodb/db
systemLog:
  path: /var/mongodb/logs/mongod.log
  destination: file
replication:
  replSetName: M103
net:
  bindIp : 127.0.0.1,192.168.103.100
tls:
  mode: requireTLS
  certificateKeyFile: /etc/tls/tls.pem
  CAFile: /etc/tls/TLSCA.pem
security:
  keyFile: /data/keyfile
processManagement:
  fork: true

<<<<<<<<< Steps to configure mongod file >>>>>>>>>>>>
1) Write the configuration file. There should be an empty configuration file in your IDE File Editor, 
 where you can specify options in YAML.

2) When your config file is complete, launch mongod with the --config command line option:
 ---> mongod --config mongod.conf

In case  of ubuntu(linux)
$ sudo /etc/mongod.conf

Then edit config file

$ sudo systemctl daemon-reload 

$ sudo systemctl restart mongod


<<<<<<<< Basic Commands >>>>>>>>>>

1) User management commands:
db.createUser()
db.dropUser()

2) Collection management commands:
db.<collection>.renameCollection()
db.<collection>.createIndex()
db.<collection>.drop()

3) Database management commands:
db.dropDatabase()
db.createCollection()

4) Database status command:
db.serverStatus()

<<<<<<<<<<<<<<<<<<<< Logging >>>>>>>>>>>>>>>>>>>>>>

The process logs displays activity on the mongodb instance. The process logs collect the activity into
one of the following components.
eg: ACCESS: messages related to access control, such as authentication
COMMAND: messages related to database commands

1) Get the logging components:
db.getLogComponents()
or
mongo admin --host 192.168.103.100:27000 -u m103-admin -p m103-pass --eval '
  db.getLogComponents()

2) Change the logging level:
db.setLogLevel(0, "index")   verbosity: -1, 0, 1


3) View the logs through the Mongo shell:
db.adminCommand({ "getLog": "global" })



<<<<<<<<<<<<<<<<<<<< Profiling The Database(database profiler) >>>>>>>>>>>>>>>>>>>>>>

The database profiler collects detailed information about Database Commands executed against a running mongod instance.
This includes CRUD operations as well as configuration and administration commands. 
The profiler writes all the data it collects to the system.profile collection, a capped collection in the admin database. 

1) Get profiling level:
db.getProfilingLevel()


2) Set profiling level:
db.setProfilingLevel(1)


3) Get profiling data from system.profile:
db.system.profile.find({}).pretty()


To open mongo with authentication
$ mongo admin -u username -p password



<<<<<<<<<<<<<<<<<<<< Basic Security >>>>>>>>>>>>>>>>>>>>>>


*/
