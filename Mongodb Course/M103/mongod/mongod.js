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

Authentication: verifies the identity of a user.
Answer the question: Who are you ?

Authorization: Verifies the previleges of a user.
Answer the question: What do you have access to ?

Authentication Mechanisms:(client)

1) SCRAM: It is default authentication mechanism in mongodb. It is password mechanism.
2) X.509: Uses X.509 certificate for the authentication. It is more secure and complex mechanism.


Cluster Authentication Mechanisms:
It is a intra cluster authentication, the mechanism by which nodes in a cluster authenticate.

Authorization: Role Based Access Control
-> Each users has one or more role.
-> Each role has one or more previleges.
-> A previlege represents a group of Actions and the Resources  those actions to apply.

Roles supports a high level of responsibility isolation for operational tasks.
Example:

1) Database Administrator: 
   roles: i) Create User
         ii) Create Index

2) Developer:
   roles: i) Write Data
          ii) Read Data

3) Data Scientist:
   roles: i) Read Data

Create new user with the root role (also, named root):
use admin
db.createUser({
  user: "root",
  pwd: "root123",
  roles : [ "root" ]
})

MongoDB built roles are as follows:
1) Database User
previleges: read, readWrite

2) Database Administration
previleges: read, readWrite, dbAdmin, userAdmin, dbOwner

3) Cluster Administration
previleges: read, readWrite, dbAdmin, userAdmin, dbOwner, clusterAdmin, clusterManager, clusterMonitor, host manager.

4) Backup/Restore
previleges: all previleges of cluster administration, backup, restore

5) Super User
previleges: all previleges

In database level:

1) Database User
previleges: readAnyDatabase, readWriteAnyDatabase

2) Database Administration: dbAdminAnyDatabase, userAdminAnyDatabase

3) Super User:
previleges: all

Some security commands:
Create security officer: Best practice
db.createUser(
  { user: "security_officer",
    pwd: "h3ll0th3r3",
    roles: [ { db: "admin", role: "userAdmin" } ]
  }
)

Grant role to user:
db.grantRolesToUser( "dba",  [ { db: "playground", role: "dbOwner"  } ] )

Show role privileges:
db.runCommand( { rolesInfo: { role: "dbOwner", db: "playground" }, showPrivileges: true} )



<<<<<<<<<<<<<<<<<<<< Server Tools >>>>>>>>>>>>>>>>>>>>>>
mongod -> mongod daemon
mongos -> mongo shell (interactive shell)

 -> List mongodb binaries:
find /usr/bin/ -name "mongo*"

-> Create new dbpath and launch mongod:
mkdir -p ~/first_mongod
mongod --port 30000 --dbpath ~/first_mongod --logpath ~/first_mongod/mongodb.log --fork  # we make new server fork from parent server


-> Use mongostat to get stats on a running mongod process:
mongostat --port 30000



-> Use mongodump to get a BSON dump of a MongoDB collection:
mongodump --port 30000 --db applicationData --collection products
ls dump/applicationData/
cat dump/applicationData/products.metadata.json

-> Use mongorestore to restore a MongoDB collection from a BSON dump:
mongorestore --drop --port 30000 dump/

-> Use mongoexport to export a MongoDB collection to JSON or CSV (or stdout!):
mongoexport --help
mongoexport --port 30000 --db applicationData --collection products
mongoexport --port 30000 --db applicationData --collection products -o products.json

-> Tail the exported JSON file:
tail products.json

-> Use mongoimport to create a MongoDB collection from a JSON or CSV file:
mongoimport --port 30000 products.json
$ mongoimport --db <dbname> --collection <collectionName> --file filePath  --port 29000 -u "<username>" -p "<password>" --authenticationDatabase "<name>"


*/
