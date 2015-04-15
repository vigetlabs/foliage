# Changelog

## 0.6.0


- Makes better use of internal methods to reduce file size
- Dissoc no longer automatically prunes empty objects

```
Uglified : 2.13kb
Gzipped  : 0.88kb
```

## 0.5.0

- Added `fetch`, which will return a pathway and allow a fallback if it doesn't exist

## 0.4.2

- Properly handle undefined pathways in `has` and `keys()`

## 0.4.1

- Fix issue with build where npmignore was inherited from gitignore

## 0.4.0

- `Foliage::get` now returns a clone of the current foliage instance
- Removed event subscription for the time being
- Removed `some` and `every`
- Internalize specific methods `sprout` was using to conserve size

## 0.3.1

- Fixed bug where deeply nested branches would not emit event

## 0.3.0

- Committing new values now causes a change event that will bubble up the tree
- Calling `set` with one argument will assume the query for the cursor as the key

## 0.2.0

- Add toJSON methods
- Removed internal Cursor class. Foliage all the way down... This means that `React.PropTypes.instanceOf(Foliage` now works consistently.

## 0.1.0

- Broke out dedicated `Cursor` and `functions` modules.
- All instances, and their branches, reference the same data

## 0.0.1

- Fixed bug in release build process
