/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Extended Reference Pattern >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Extended Reference Pattern

// Sample Use Case:
An order management application is a classic use case for this pattern.
When thinking about N-1 relationships, orders to customers,
we want to reduce the joining of information to increase performance.
By including a simple reference to the data that would most frequently be JOINed,
we save a step in processing.

If we continue with the example of an order management system,
on an invoice Acme Co. may be listed as the supplier for an anvil.
Having the contact information for Acme Co.
probably isn't super important from an invoice standpoint.
That information is better served to reside in a separate supplier collection,
for example. In the invoice collection,
we'd keep the needed information about the supplier as an extended reference to the supplier information.

// Conclusion
The Extended Reference pattern is a wonderful solution when your application is experiencing many repetitive JOIN operations.
By identifying fields on the lookup side and bringing those frequently accessed fields into the main document,
performance is improved. This is achieved through faster reads and a reduction in the overall number of JOINs.
Be aware, however, that data duplication is a side effect of this schema design pattern.
*/
