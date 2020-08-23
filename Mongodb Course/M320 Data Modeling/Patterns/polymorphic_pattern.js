/*
<<<<<<<<<<<<<<<<<<<<<<<<<< Polymorphic Pattern >>>>>>>>>>>>>>>>>>>>>>>>>

When all documents in a collection are of similar, but not identical, structure,
we call this the Polymorphic Pattern. As mentioned, the Polymorphic Pattern is useful
when we want to access (query) information from a single collection. Grouping documents
together based on the queries we want to run (instead of separating the object across tables
or collections) helps improve performance.

Imagine that our application tracks professional sports athletes across all different sports.

We still want to be able to access all of the athletes in our application,
but the attributes of each athlete are very different.
This is where the Polymorphic Pattern shines. In the example below, 
we store data for athletes from two different sports in the same collection.
The data stored about each athlete does not need to be the same even though the
documents are in the same collection.

Professional athlete records have some similarities, but also some differences.
With the Polymorphic Pattern, we are easily able to accommodate these differences.
If we were not using the Polymorphic Pattern, we might have a collection for Bowling Athletes and 
a collection for Tennis Athletes. When we wanted to query on all athletes, we would need to do a 
time-consuming and potentially complex join. Instead, since we are using the Polymorphic Pattern, 
all of our data is stored in one Athletes collection and querying for all athletes can be accomplished
with a simple query.

From an application development standpoint, when using the Polymorphic Pattern we're
going to look at specific fields in the document or sub-document to be able to track differences.
We'd know, for example, that a tennis player athlete might be involved with different events,
while a different sports player may not be. This will, typically, require different code paths 
in the application code based on the information in a given document. Or, perhaps, different classes 
or subclasses are written to handle the differences between tennis, bowling, soccer, and rugby players.

// Sample Use Case

One example use case of the Polymorphic Pattern is Single View applications.
Imagine working for a company that, over the course of time, acquires other companies
with their technology and data patterns. For example, each company has many databases, 
each modeling "insurances with their customers" in a different way. Then you buy those 
companies and want to integrate all of those systems into one. Merging these different
systems into a unified SQL schema is costly and time-consuming.

MetLife was able to leverage MongoDB and the Polymorphic Pattern to build their single view 
application in a few months. Their Single View application aggregates data from multiple sources
into a central repository allowing customer service, insurance agents, billing, and other 
departments to get a 360° picture of a customer. This has allowed them to provide better customer 
service at a reduced cost to the company. Further, using MongoDB's flexible data model and the
Polymorphic Pattern, the development team was able to innovate quickly to bring their product online.

// Conclusion

The Polymorphic Pattern is used when documents have more similarities than they have differences.
Typical use cases for this type of schema design would be:

    1) Single View applications
    2) Content management
    3) Mobile applications
    4) A product catalog

Lab:
[{
  "_id": "<objectId>",
  "first_name": "<string>",
  "last_name": "<string>",
  "engineer_level": "<int>",
  "education": [{
    "level": "<string>",
    "subject": "<string>"
  }],
  "years_experience": "<int>",
  "previous_employer": "<string>",
  "technical": ["<string>"],
  "non-technical": {
    "languages": ["<string>"],
    "other": ["<string>"]
  },
  "candidate_notes": "<string>"
}, {
  "_id": "<objectId>",
  "first_name": "<string>",
  "last_name": "<string>",
  "program_affiliation": "<string>",
  "team_placement": "<string>",
  "start_date": "<date>",
  "end_date": "<date>",
  "education": "<string>",
  "extend_offer": "<string>",
  "technical_skills": ["<string>"],
  "non-technical_skills": {
    "languages": ["<string>"],
    "other": ["<string>"]
  },
  "notes": "<string>"
}, {
  "_id": "<objectId>",
  "name": {
    "first": "<string>",
    "last": "<string>"
  },
  "program_affiliation": "<string>",
  "team_placement": "<string>",
  "start_date": "<date>",
  "end_date": "<date>",
  "education": [{
      "level": "<string>",
      "subject": "<string>"
    },
    {
      "level": "<string>",
      "subject": "<string>"
    }
  ],
  "extend_offer": "<string>",
  "skills": {
    "technical": ["<string>"],
    "languages": ["<string>"],
    "other": ["<string>"]
  },
  "notes": "<string>"
}]

*/
