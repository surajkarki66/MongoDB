/*
<<<<<<<<<<<<<<<<<<<<<<< Relationship >>>>>>>>>>>>>>>>>>>>>>>>>>>
Actually MongoDb is also a relational database. Understanding how to represent
relationships, and deciding  between embedding and linking relationship information
is crucial.

The face of identifying  and modeling relationships correctly is a step that is
not optional in the methodology.

Relationship is the relation between different entities of a data model.
eg: one to one, one to many, many to many


<<<<<<<<<<<<<<<<<<<<<<< Relationship type and cardinality >>>>>>>>>>>>>>>>>>>>>>
type:
1) One-to-one (1-1)
2) One-to-many(1-N)
3) Many-to-many(N-N)

-> the above type are the usual cardinalities

-> one-to-zillions is usefull for Big Data world.

-> Even better , use "maximum" and "most likely"  values using tuple of the form.[min, likely, max]



<<<<<<<<<<<<<<<<<<<<<<<< One-To-Many Relationship >>>>>>>>>>>>>>>>>>>>>>>>>
-> There are lots of choices: embed or reference, choose the side between "one" and "many".
-> Duplication is occurred when embedding on the "many" side.
-> Prefer embedding over referencing for simplicity, or when there is small number of referenced documents as
all related information kept together.
-> Embed on the side of most queried collection.
-> Prefer referencing when the associated documents are not always needed with the most often queried documents.


<<<<<<<<<<<<<<<<<<<<<<<<<<< Many-To-Many Relationship >>>>>>>>>>>>>>>>>>>>>>
-> Ensure it is a Many-to-Many relationship that should not be simplified.
-> Prefer embedding in the most queried side.
-> Prefer embedding for information that is primarily static over time and may profit from duplication.
-> Prefer referencing over embedding to avoid managing duplication.

<<<<<<<<<<<<<<<<<<<<<<<<<<< One-To-One Relationship >>>>>>>>>>>>>>>>>>>>>>>>>
-> Prefer embedding over referencing for simplicity.
-> Use subdocuments to organize the field.
-> Use a reference for optimization purpose.

<<<<<<<<<<<<<<<<<<<<<<<<<<< One-To-Zillions Relationship >>>>>>>>>>>>>>>>>>>>
-> It is a particular case of  the one-to-many relationship.
-> The only available representation is to reference the document on the "one" side of  the relationship from the "zillions" side.
-> Pay extra attention to queries and code that handle "zillions" of documents.
*/
