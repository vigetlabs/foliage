BABEL   = $$(npm bin)/babel
KARMA   = $$(npm bin)/karma
WEBPACK = $$(npm bin)/webpack

.PHONY: clean test test-coverage build package.json javascript docs release

build:
	make clean
	make javascript
	make package.json
	make documentation

javascript: $(shell find src -name '*.js' ! -name '*.test.js')
	mkdir -p dist
	$(BABEL) -d dist $^
	$(WEBPACK) -p dist/src/Foliage.js dist/foliage.build.js --devtool sourcemap --output-library-target commonjs2

package.json:
	node -p 'p=require("./package");p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

documentation: README.md LICENSE.md docs
	mkdir -p dist
	cp -r $^ dist

release:
	make build
	npm publish dist

clean:
	rm -rf dist

test:
	NODE_ENV=test $(KARMA) start --single-run

test-watch:
	NODE_ENV=test $(KARMA) start

test-coverage:
	make test
	coveralls < coverage/report-lcov/lcov.info
