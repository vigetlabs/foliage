# Changelog

## 0.25

## Breaking changes

- Foliage will use Diode's `emit` instead of `volley` to propagate change. This is to prevent unexpected race conditions in projects Foliage supports. For those who wish to continue to use this functionality, consider debouncing the callback instead.

```
Compressed Size: 3344
Gzipped Size: 1284
```

## 0.24.1

- Determined root cause of class syntax compatibility issue and made corrective change

## 0.24.0

- Use class syntax for better compatibility

## 0.23.0

- Accidental skip release :(

## 0.22.0

- Renamed `assoc` and `dissoc` to `set` and `remove`. For those requiring these internal methods, this will be removed in the next release.
- Significantly improved the efficiency of `get`.
- Deprivatized the `state` object

## 0.21.0

- `commit` will always default to the same empty object assignment
  when given `null`. `undefined` will default to current state

```
Uglified : 3.081kb
Gzipped  : 1.205kb
```

## 0.20.0

- Upgrade Diode

## 0.19.1

- Only emit change with a failed equality check

## 0.19.0

- Foliage is now an event emitter (using Diode). It will trigger a
  single event when a change occurs, passing state as the first
  argument.

```
Uglified : 2.886kb
Gzipped  : 1.104kb
```

## 0.18.0

- Added `update` function to update more than one key at a time

## 0.17.0

- Add `clear` method to implement a more complete Map api

```
Uglified : 2.23kb
Gzipped  : 0.878kb
```

## 0.16.0

- Instead of compiling to a single file, the build process will now
  export all modules as individual files.
- A minified version of the build is available at `./dist/foliage.min.js`.

```
Uglified : 2.19kb
Gzipped  : 0.867kb*
```

\* Without the sourcemap include, this is actually a bit smaller.

## 0.15.0

- Internal improvements to reduce build size
- Add `indexOf` and `includes` methods, similar to Array methods

```
Uglified : 2.21kb
Gzipped  : 0.837kb
```

## 0.14.3

- Fix fallback issue in `get` where undefined values didn't return the
  fallback value

## 0.14.2

- Fix ordering in set to eliminate strange bug

```
Uglified : 2.46kb
Gzipped  : 0.969kb
```

## 0.14.1

- Fix empty key bug

```
Uglified : 2.46kb
Gzipped  : 0.969kb
```


## 0.14.0

- Added `size` method

```
Uglified : 2.45kb
Gzipped  : 0.967kb
```

## 0.13.0

- Added `first` and `last` methods

```
Uglified : 2.4kb
Gzipped  : 0.955kb
```

## 0.12.0

- Internally, changed the way pathways are produced to reduce logic
  branching.
- `graft` has been renamed to `refine`. Graft was a bit too poetic,
  and `refine` matches other cursors libraries such as
  [`react-cursor`](https://github.com/dustingetz/react-cursor)

```
Uglified : 2.31kb
Gzipped  : 0.932kb
```

## 0.11.1

- Fixed improper removal in dissoc

## 0.11.0

- Add `some`, `every`, and `join`
- Tweaked some internals to get more efficient transpilation
- Added some internal documentation

```
Uglified : 2.29kb
Gzipped  : 0.923kb
```

## 0.10.0

- Added `getRoot` method to access root branch

```
Uglified : 2.3kb
Gzipped  : 0.927kb
```

## 0.9.0

- `get` has been renamed `graft`. `fetch` is now `get`. This change is
  designed to make the API feel more like an ES6 map.

```
Uglified : 2.26kb
Gzipped  : 0.919kb
```

## 0.8.0

- Removed `toArray` alias for `values`

```
Uglified : 2.13kb
Gzipped  : 0.879kb
```

## 0.7.0

- Added `is` method for some sugar around equality checks

```
Uglified : 2.18kb
Gzipped  : 0.89kb
```

## 0.6.0

- Makes better use of internal methods to reduce file size
- Dissoc no longer automatically prunes empty objects

```
Uglified : 2.13kb
Gzipped  : 0.88kb
```

## 0.5.0

- Added `fetch`, which will return a pathway and allow a fallback if
  it doesn't exist

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

- Committing new values now causes a change event that will bubble up
  the tree
- Calling `set` with one argument will assume the query for the cursor
  as the key

## 0.2.0

- Add toJSON methods
- Removed internal Cursor class. Foliage all the way down... This
  means that `React.PropTypes.instanceOf(Foliage` now works
  consistently.

## 0.1.0

- Broke out dedicated `Cursor` and `functions` modules.
- All instances, and their branches, reference the same data

## 0.0.1

- Fixed bug in release build process
