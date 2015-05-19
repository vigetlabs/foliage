# API Cheatsheet

## Foliage

```
Data operations
+----------------+
get     - Retrieve a value with an optional fallback if not present
set     - Modify the value at a given location
remove  - Remove a location in a tree
refine  - Return a cursor to a specific location
clear   - Revert state to undefined
update  - Fold an object or array on top of a location

Traversal
+----------------+
getRoot - Return the base Foliage instance for a given plant

Equality
+----------------+
is      - Check if two pathways are equal

Extraction
+----------------+
keys    - Return an array of all top-level keys
toJSON  - Serialize the tree into JSON
values  - Return an array of all top-level values
valueOf - Get the underlying value represented by an instance

Pub/Sub (From Foliage)
+----------------+
listen  - Add a change listener (aliases: subscribe)
ignore  - Remove a change listener (aliases: unsubscribe)
emit    - Trigger listeners (aliases: publish)
volley  - Lazily trigger `emit`

Collection methods
+----------------+
first, last, sort, filter, find, forEach, map, reduce, every, some, join, size
```
