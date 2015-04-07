# API Cheatsheet

## Foliage

```
Data operations
+--------------+
get     - Return a cursor to a specific location
set     - Modify the value at a given location
remove  - Remove a location in a tree
trunk   - Return the top level reference point

Events
+--------------+
listen  - Add a change callback to a trunk or cursor
ignore  - Remove a change callback

Dereferencing
+--------------+
values  - Return an array of all immediate values
valueOf - Get the underlying value represented by an instance

Enumeration
+--------------+
map    - Execute map over the current location
reduce - Execute reduce over the current location
filter - Execute filter over the current location
find   - Execute find over the current location
some   - Execute some over the current location
every  - Execute every over the current location
```
