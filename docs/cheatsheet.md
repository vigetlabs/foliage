# API Cheatsheet

## Foliage

```
Data operations
+--------------+
has     - Does a pathway exist?
get     - Return a cursor to a specific location
set     - Modify the value at a given location
remove  - Remove a location in a tree
fetch   - Retrieve a value with an optional fallback if not present

Extraction
+--------------+
keys    - Return an array of all top-level keys
toArray - same as `values()`
toJSON  - Serialize the tree into JSON
valueOf - Get the underlying value represented by an instance
values  - Return an array of all top-level values

Enumeration
+--------------+
map    - Execute map over the current location
reduce - Execute reduce over the current location
filter - Execute filter over the current location
find   - Execute find over the current location
```
