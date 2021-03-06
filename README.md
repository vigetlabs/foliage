![Foliage](http://f.cl.ly/items/1d0S121d301T3a202u14/foliage.svg)

Foliage is lightweight tree that operates on a tree of JavaScript
primitives. It is inspired by many Cursors libraries/frameworks (see
[prior art](#prior-art)),
however it is not nearly as ambitious. It sacrifices robustness and
purity for the sake of embeddability.

[![Circle CI](https://circleci.com/gh/vigetlabs/foliage.svg?style=svg)](https://circleci.com/gh/vigetlabs/foliage)

## Heads up!

**As of September 9th, 2019, this project is no longer active**.

This was a super fun project to hack on during the early days of cursor-based state management in React (see [Omniscient](https://omniscientjs.github.io/)). However we are no longer maintaining this project.

Feel free to poke around, but this project is probably best not to depend on.

---

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

`refine` will clone an instance of Foliage and place a cursor to a
point within its tree:

```javascript
let plant = new Foliage({ berries: true })

plant.refine('berries').valueOf() // => true
```

```javascript
let oak = new Foliage({
  squirrels: {
    squeakem: { weight: 2, height: 12 }
    chatters: { weight: 5, height: 8 }
  }
})

let squirrels = oak.refine('squirrels')
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

***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
