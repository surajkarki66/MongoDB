/*
<<<<<<<<<<<<<<< MongoDB Schema Design:>>>>>>>>>>>>>>>>>>

Mongodb schema design has no rules, no process, no algorithm.
The only consideration is 

1) How to store the data ?
2) Query Peformance
3) Reasonable amount of hardware

-> Design a schema that works for your application.

<<<<<<<<<<<<<<<<< Embedding vs Referencing >>>>>>>>>>>>>>>>>>>>>>
// Embedding
{
    _id: ObjectId('123'),
    name: "Michael Jackson",
    ssn: "123-456-789",
    addresses: [
        {
            street: "123 Sesame st",
            city: "Anytown",
            cc: "USA"
        }
        {
            street: "123 Avenue Q",
            city: "New York",
            cc: "USA"
        }
    ]
}

Pros:
i) Retrieve all data with a single query.
ii) Avoids expense JOINs or $lookup.
iii) Update all data with a single atomic operation

Cons:
i) Large docs === more overhead.
ii) 16 MB document size limit.

// Referencing
{
    name: 'left-handed smoke shifter',
    manufacturer: 'Acme Corp',
    catalog_number: 1234,
    parts: [
        ObjectId('AAAA'), // reference pointer
        ObjectId('BBBB')
    ]
}

{
    _id: ObjectId('AAAA'),
    partno: '123-aff-456',
    name: '#4 grommet',
    qty: 94,
    cost: 0.94,
    price: 3.99
}

{
    _id: ObjectId('BBBB'),
    partno: '425-EEF-123',
    name: '#8 Frombet',
    qty: 13,
    cost: 0.34,
    price: 8.99
}

Pros:
i) Smaller documents.
ii) Less likely to reach 16mb limit.
iii) No duplication of data.
iV) Infrequently accessed data not accessed on every query.

Cons:
i) Two queries or $lookup required to retrieve all data.

Types of Relationship:

1) One-to-one:
User:
{
    _id: ObjectId("AAA"),
    name: "Michael Karki",
    company: "Google",
    twitter: "michaelkarki66",
    twitch: "karki123",
    website: "michaelkarki.com"
}

2) One-to-few:
{
    _id: ObjectId('AAA),
    name: "Michael Karki",
    company: "Google",
    twitter: "michaelkarki66",
    twitch: "karki123",
    website: "michaelkarki.com"
    address: [
        {
            street: "123 Sesame st",
            city: "Anytown",
            cc: "USA"
        }
        {
            street: "123 Avenue Q",
            city: "New York",
            cc: "USA"
        }
    ]
}

-> In one-to-few it is better to use embedding.

3) One-to-many:
Products:
{
    name: 'left-handed smoke shifter',
    manufacturer: 'Acme Corp',
    catalog_number: 1234,
    parts: [
        ObjectId('AAAA'), // reference pointer
        ObjectId('BBBB'),
        ObjectId('CCCC)
    ]
}

Parts:
{
    _id: ObjectId('AAAA'),
    partno: "123-ABC-456",
    name: "#4 groment",
    qty: 94,
    cost: 0.54,
    price: 2.99
}

-> In one-to-many it is better to use referencing.


4) One-to-squillions:
Logs : it store the server logs
Hosts: 
{
    _id: ObjectId('AAA'),
    name: "toogle.com",
    ipaddr: "127.0.66.1"
}

Log Message:
{
    _id: ObjectId('123'),
    time: ISODate("2020"),
    message: "The CPU is on fire.",
    host: ObjectId('AAA') 
},
{
    _id: Object('456'),
    time: ISODate("2020"),
    message: "Drive is hosted",
    host: ObjectId('AAA')
}

5) Many-to-many:
One user can have many tasks and one tasks can have many user.

Person:
{
    _id: ObjectId('AAF1'),
    name: "Michael Karki",
    tasks: [
        ObjectId("ADF9"),
        ObjectId("AE02"),
        OnjectId("ZDF2")
    ]
}

Tasks:
{
    _id: ObjectId("ADF9"),
    desc: "Learn js",
    due_date: ISODate("2020"),
    owners: [
        ObjectId("AAF1")
    ]
},
{
    _id: ObjectId("AE02"),
    desc: "Learn python",
    due_date: ISODate("2020"),
    owners: [
        ObjectId("AAF1")
    ]
},


// For Schema design my rule is

Rule-1: Favor embedding unless there is a compelling reason not to.
Rule-2: Needing to access an object on its own is a compelling reason not to embed it.
Rule-3: Avoids JOINs and $lookups if they can be, but dont be afraid if they can provide a better schema design.
Rule-4: Array should not grow without bound.
Rule-5: How you model your data depends entirely on your particular applications data access patterns.
*/
