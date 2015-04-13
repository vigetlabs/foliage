[![NPM](https://nodei.co/npm/foliage.png?compact=true)](https://npmjs.org/package/foliage)

---

[![Travis CI](https://travis-ci.org/vigetlabs/foliage.svg)](https://travis-ci.org/vigetlabs/foliage)
[![Coverage Status](https://coveralls.io/repos/vigetlabs/foliage/badge.svg)](https://coveralls.io/r/vigetlabs/foliage)

---

# Foliage

Foliage is lightweight
[zipper](http://en.wikipedia.org/wiki/Zipper_%28data_structure%29)
that operates on a tree of JavaScript primitives. It is modeled
loosely on [Om's Cursor](https://github.com/omcljs/om/wiki/Cursors)
and
[OmniscientJS's `immstruct`](https://github.com/omniscientjs/immstruct),
however it is not nearly as ambitious.

Foliage makes it easier to work with data in component-oriented
frameworks such as React by allowing data to be passed around in terms
of references to locations in a global application state object. This
means that state can be maintained in a single location, however that
entire structure isn't necessary for an individual component.

## What problems does it attempt to solve?

1. Decouple React components from rest of app. Our Flux-like framework, [Microcosm](https://github.com/vigetlabs/microcosm), keeps all state in a single app instance. It can be troublesome to pass down this context to child components that need to modify state. Foliage makes it easier to "branch" off a subset of data while still having the ability to reference the root.
2. Data traversal. It is simpler to run queries for specific records on objects, with a query like data.users[params.id]. However JavaScript objects aren't good at enumeration. Foliage provides some helpers out of the box for this.
3. It is small. Foliage isn't trying to do too much or be too smart. Like [Microcosm](https://github.com/vigetlabs/microcosm), it will be embedded in other tools and should be as small as possible.

## Opinions

1. Keep a naming convention similar to ES6 maps
2. Keep it small. There are plenty of other Cursors-like
   libraries. See [Prior Art](#prior-art)

## Working with Foliage

Foliage accepts a seed:

```javascript
let plant = new Foliage({ berries: true })
```

## Querying records

`get` pulls data out of a "plant."

```javascript
let plant = new Foliage({ berries: true })

plant.get('berries').valueOf() // => true
```

Take out that `valueOf` must be called to retrieve the value out of a
plant. This is because `get` returns a `branch`. Now let's dig into
that.

## Branches

Calling `get` returns a `branch`. Technically, this is called a
`cursor`, but let's keep with the dendrology theme.

```javascript
let oak = new Foliage({
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
