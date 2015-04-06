[![NPM](https://nodei.co/npm/foliage.png?compact=true)](https://npmjs.org/package/foliage)

---

[![Travis CI](https://travis-ci.org/vigetlabs/foliage.svg)](https://travis-ci.org/vigetlabs/foliage)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/foliage/badge.svg)](https://coveralls.io/r/vigetlabs/foliage)

---

# Foliage

Foliage is lightweight tree data structure modeled loosely after [Om's Cursor](https://github.com/omcljs/om/wiki/Cursors) and [OmniscientJS's `immstruct`](https://github.com/omniscientjs/immstruct).

In more practical terms, Foliage is a thin layer on top of [`sprout`](https://github.com/herrstucki/sprout).

## What problems does it attempt to solve?

1. Decouple React components from rest of app. Our Flux-like framework, [Microcosm](https://github.com/vigetlabs/microcosm), keeps all state in a single app instance. It can be troublesome to pass down this context to child components that need to modify state. Foliage makes it easier to "branch" off a subset of data while still having the ability to reference the root.
2. Data traversal. It is simpler to run queries for specific records on objects, with a query like data.users[params.id]. However JavaScript objects aren't good at enumeration. Foliage provides some helpers out of the box for this.
3. It is small. Foliage isn't trying to do too much or be too smart. Like [Microcosm](https://github.com/vigetlabs/microcosm), it will be embedded in other tools and should be as small as possible.

## Opinions

1. Keep a naming convention similar to ES6 maps

## Working with Foliage

Foliage accepts a seed:

```javascript
let plant = new Folage({ berries: true })
```

## Querying records

`get` pulls data out of a "plant."

```javascript
let plant = new Folage({ berries: true })

plant.get('berries').valueOf() // => true
```

Take out that `valueOf` must be called to retrieve the value out of a
plant. This is because `get` returns a `branch`. Now let's dig into
that.

## Branches

Calling `get` returns a `branch`. Technically, this is called a
`cursor`, but let's keep with the dendrology theme.

```javascript
let oak = new Folage({
  squirrels: {
    squeakem: { weight: 2, height: 12 }
    chatters: { weight: 5, height: 8 }
  }
})

let squirrels = oak.get('squirrels')
```

In this example, `squirrels` is a subset of `oak` focused on the
`squirrels` key. Under the hood, they point to the same underlying
data. This means if you `set` in `squirrel`, `oak` will be modified as
well:

```javascript
squirrels.set(['squeakem', 'weight'], 5)
oak.get(['squirrels', 'squeakem', 'weight']).valueOf() // => 5
```

A couple of things are going on here. First, `set` is used to modify
data. It maps directly to
[`sprout`'s `assoc` method](https://github.com/herrstucki/sprout#assocobj-path-value-path2-value2-). Second,
both `get` and `set` accept an array of keys. When given an array,
they will traverse the tree for the leaf value instead of just
returning the key from the most immediate level.

## Phoning home

All branches have a reference to their parent. No matter how branched,
the `trunk` can be found:

```javascript
let plant = new Foliage({ fiz: 'buzz' })
let fiz   = plant.get('fiz')

assert(fiz.trunk() === plant)
```
