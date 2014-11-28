.PHONY: build test clean
# See LICENSE for licensing information.

PROJECT = angular-navicc-resource

ifdef TRAVIS_TAG
RELEASE_VER=$(TRAVIS_TAG)
else
# RELEASE_VER:=`git describe --tags HEAD`
RELEASE_VER:=`git describe --tags --long HEAD`
endif

deps:
	npm install
	bower install

all:
	gulp

test:
	gulp test
	cat test/coverage/text.txt

build:
	gulp build

clean:
	gulp clean
