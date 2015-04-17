[![NPM](https://nodei.co/npm/foliage.png?compact=true)](https://npmjs.org/package/foliage)

---

[![Travis CI](https://travis-ci.org/vigetlabs/foliage.svg)](https://travis-ci.org/vigetlabs/foliage)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/foliage/badge.svg)](https://coveralls.io/r/vigetlabs/foliage)

---

# Foliage

Foliage is lightweight tree that operates on a tree of JavaScript
primitives. It is inspired by many Cursors libraries/frameworks (see
[prior art](#prior-art)),
however it is not nearly as ambitious. Specifically, it sacrifices
robustness and purity for the benefit of build size.

## Goals

1. Easier testing. Decouple React components from rest of app. Foliage
   makes it easier to "branch" off a subset of data while still having
   the ability to reference the root.
2. Easy data traversal. It is simple to traverse object keys, however
   JavaScript objects aren't good at enumeration. Foliage provides
   some helpers out of the box for this.
3. Keep it less than 1kb gzipped. Foliage isn't trying to do too much
   or be too smart.

## Opinions

1. Keep a naming convention similar to ES6 maps
2. Don't do too much, but provide a platform for extension

## Working with Foliage

Foliage can retrieve and set data similarly to an ES6 map

```javascript
let plant = new Foliage({ berries: true })

// retrieve state
plant.get('berries') // true

// set state
plant.set('berries', false)

// remove state
plant.remove('berries')
```

### Working with subsets of data

`graft` will clone an instance of Foliage and place a cursor to a
point within its tree:

```javascript
let plant = new Foliage({ berries: true })

plant.graft('berries').valueOf() // => true
```

```javascript
let oak = new Foliage({
  squirrels: {
    squeakem: { weight: 2, height: 12 }
    chatters: { weight: 5, height: 8 }
  }
})

let squirrels = oak.graft('squirrels')
```

In this example, `squirrels` is a subset of `oak` focused on the
`squirrels` key. Under the hood, they point to the same underlying
data. This means if you `set` in `squirrel`, `oak` will be modified as
well:

```javascript
squirrels.set(['squeakem', 'weight'], 5)
oak.get(['squirrels', 'squeakem', 'weight']) // => 5
```

A couple of things are going on here. First, `set` is used to modify
data. Second, both `get` and `set` accept an array of keys. When given
an array, they will traverse the tree for the leaf value instead of
just returning the key from the most immediate level.

## Prior art

There is nothing novel about Foliage, it shamelessly mimics:

- [Sprout](https://github.com/herrstucki/sprout)
- [OmnicientJS](http://omniscientjs.github.io/)
- [OmnicientJS Immstruct](https://github.com/omniscientjs/immstruct)
- [Om](https://github.com/omcljs/om)
- [Functional Zippers](http://yquem.inria.fr/~huet/PUBLIC/zip.pdf)
- [React Cursor](https://github.com/dustingetz/react-cursor)
- [Baobab](https://github.com/Yomguithereal/baobab)
