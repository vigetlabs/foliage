# API Cheatsheet

## Foliage

```
Data operations
+--------------+
fetch   - Retrieve a value with an optional fallback if not present
get     - Return a cursor to a specific location
has     - Does a pathway exist?
remove  - Remove a location in a tree
set     - Modify the value at a given location

Equality
+--------------+
is      - Check if two pathways are equal

Extraction
+--------------+
keys    - Return an array of all top-level keys
toArray - same as `values()`
toJSON  - Serialize the tree into JSON
valueOf - Get the underlying value represented by an instance
values  - Return an array of all top-level values

Enumeration
+--------------+
filter - Execute filter over the current location
find   - Execute find over the current location
map    - Execute map over the current location
reduce - Execute reduce over the current location
```
