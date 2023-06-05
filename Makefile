# Variables
NPM := npm

# Objetivos
install:
	$(NPM) install

run:
	$(NPM) run dev

build:
	$(NPM) run build

lint:
	$(NPM) run lint

preview:
	$(NPM) run preview

clean:
	rm -rf node_modules
	rm -rf dist

.PHONY: install run build lint preview clean
