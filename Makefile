.PHONY: clean test test-coverage build package.json javascript docs release

build:
	make clean
	make javascript
	make package.json
	make docs

javascript: $(shell find src -name '*.js' ! -name '*.test.js')
	mkdir -p dist
	$$(npm bin)/babel -d dist $^
	$$(npm bin)/webpack -p dist/src/Foliage.js dist/foliage.build.js --devtool sourcemap --output-library-target commonjs2

package.json:
	node -p 'p=require("./package");p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

docs:
	cp README.md dist/README.md
	cp LICENSE.md dist/LICENSE.md
	cp -r docs dist/docs

release:
	make build
	npm publish dist

clean:
	rm -rf dist

test:
	export NODE_ENV=test
	$$(npm bin)/karma start

test-once:
	export CONTINUOUS_INTEGRATION=true
	make test

test-coverage:
	make test-once
	coveralls < coverage/report-lcov/lcov.info
