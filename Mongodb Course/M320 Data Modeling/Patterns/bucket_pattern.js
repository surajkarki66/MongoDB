/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Bucket Pattern >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
1) Bucket Pattern

This pattern is particularly effective when working with Internet of Things (IoT),
Real-Time Analytics, or Time-Series data in general.

By bucketing data together we make it easier to organize specific groups of data,
increasing the ability to discover historical trends or provide future forecasting and
optimize our use of storage.

With data coming in as a stream over a period of time (time series data) we may be inclined 
to store each measurement in its own document. However, this inclination is a very relational
approach to handling the data. If we have a sensor taking the temperature and saving it to the
database every minute, our data stream might look something like:

{
   sensor_id: 12345,
   timestamp: ISODate("2019-01-31T10:00:00.000Z"),
   temperature: 40
}

{
   sensor_id: 12345,
   timestamp: ISODate("2019-01-31T10:01:00.000Z"),
   temperature: 40
}

{
   sensor_id: 12345,
   timestamp: ISODate("2019-01-31T10:02:00.000Z"),
   temperature: 41
}

This can pose some issues as our application scales in terms of data and index size.
For example, we could end up having to index sensor_id and timestamp for every single
measurement to enable rapid access at the cost of RAM. By leveraging the document data
model though, we can "bucket" this data, by time, into documents that hold the measurements
from a particular time span. We can also programmatically add additional information to
each of these "buckets".

By applying the Bucket Pattern to our data model,
we get some benefits in terms of index size savings,
potential query simplification, and the ability to use 
that pre-aggregated data in our documents. Taking the data stream 
from above and applying the Bucket Pattern to it, we would wind up with:

{
    sensor_id: 12345,
    start_date: ISODate("2019-01-31T10:00:00.000Z"),
    end_date: ISODate("2019-01-31T10:59:59.000Z"),
    measurements: [
       {
       timestamp: ISODate("2019-01-31T10:00:00.000Z"),
       temperature: 40
       },
       {
       timestamp: ISODate("2019-01-31T10:01:00.000Z"),
       temperature: 40
       },
       … 
       {
       timestamp: ISODate("2019-01-31T10:42:00.000Z"),
       temperature: 42
       }
    ],
   transaction_count: 42,
   sum_temperature: 2413
} 

By using the Bucket Pattern, we have "bucketed" our data to, in this case,
a one hour bucket. This particular data stream would still be growing as it
currently only has 42 measurements; there's still more measurements for that hour
to be added to the "bucket". When they are added to the measurements array, 
the transaction_count will be incremented and sum_temperature will also be updated.

With the pre-aggregated sum_temperature value,
it then becomes possible to easily pull up a particular 
bucket and determine the average temperature (sum_temperature / transaction_count) for that bucket.
When working with time-series data it is frequently more interesting and important to know what the
average temperature was from 2:00 to 3:00 pm in Corning, California on 13 July 2018 than knowing 
what the temperature was at 2:03 pm. By bucketing and doing pre-aggregation we're more able to 
easily provide that information.

// Sample Use Case

One example of making time-series data valuable in the real world comes
from an IoT implementation by Bosch. They are using MongoDB and time-series
data in an automotive field data app. The app captures data from a variety 
of sensors throughout the vehicle allowing for improved diagnostics of the 
vehicle itself and component performance.

Other examples include major banks that have incorporated this pattern in 
financial applications to group transactions together.

// Conclusion

When working with time-series data, using the Bucket Pattern in MongoDB is
a great option. It reduces the overall number of documents in a collection,
improves index performance, and by leveraging pre-aggregation, it can simplify data access.


*/
