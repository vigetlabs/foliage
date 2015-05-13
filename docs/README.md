# Foliage

1. [Overview](#overview)
2. [Why](#why)

## Overview

Foliage is lightweight tree that operates on a tree of JavaScript
primitives. It is inspired by many Cursors libraries/frameworks,
however it is not nearly as ambitious. It sacrifices robustness and
purity for the sake of embeddability.

## Why

Immutable data libraries are typically very large, this is also shared
by many cursors libraries. These libraries are extremely useful and
well worth their weight on a medium to large project. However this is
a challenge when writing libraries; it is a significant hindrance to
embeddability.

Foliage strives to be a reasonable trade-off. To get the basic idea of
cursors with non-destructive data updates. Additionally, it tries to
behave as much like an ES6 Map as possible to easy in adoption.
