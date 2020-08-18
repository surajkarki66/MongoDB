/*
<<<<<<<<<<<<<<<<<<<<<<<<<<< $redact stage >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$redact
-> $$PRUNE - Remove
-> $$KEEP - Retain
-> $$DESCEND - Retain this level.
*/

db.employees.aggregate([
  {
    $redact: { $cond: [{ $in: [userAccess, "$acl"] }, "$$DESCEND", "$$PRUNE"] },
  },
]);

// $out stage
// Stage for persisting the result of an aggregation.
// {$out: <output collection >}
// it must be the last stage in aggregation pipeline
// it usefull in data migration

/*
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< $merge Overview >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$merge
-> It merge the ouput from aggregation pipeline into a collection. 


*/
