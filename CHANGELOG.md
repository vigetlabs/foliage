# Changelog

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
