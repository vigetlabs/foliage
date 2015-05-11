BABEL   = $$(npm bin)/babel
KARMA   = $$(npm bin)/karma
WEBPACK = $$(npm bin)/webpack

.PHONY: audit clean test test-coverage build package.json javascript release javascript-min

build:
	@make clean
	@make javascript
	@make package.json
	@make documentation
	@make audit

javascript-min: dist/src/Foliage.js
	@$(WEBPACK) -p $^ dist/foliage.build.js \
	--devtool sourcemap --output-library-target commonjs2

javascript: $(shell find src -name '*.js' ! -name '*.test.js')
	@mkdir -p dist
	@$(BABEL) -d dist $^
	@make javascript-min

package.json:
	@node -p 'p=require("./package");p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

documentation: README.md LICENSE.md docs
	@mkdir -p dist
	cp -r $^ dist

release:
	make build
	npm publish dist

clean:
	rm -rf dist

test:
	NODE_ENV=test $(KARMA) start --single-run

audit: dist/foliage.build.js
	@echo "Compressed Size:"
	@cat $^ | wc -c
	@echo "Gzipped Size:"
	@gzip -c $^ | wc -c

test-watch:
	NODE_ENV=test $(KARMA) start

test-coverage:
	make test
	coveralls < coverage/report-lcov/lcov.info
