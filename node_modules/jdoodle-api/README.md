# JDoodle API

Unofficial API Wrapper for [JDoodle](https://www.jdoodle.com/) REPL Website.

Check valid `languageCode` and `versionIndex` at [JDoodle Docs](https://docs.jdoodle.com/compiler-api/compiler-api#what-languages-and-versions-supported)

## Installation

`npm i jdoodle-api`

## Usage

```js
const jdoodle = require("jdoodle-api");
// or
import jdoodle from "jdoodle-api";

// https://docs.jdoodle.com/compiler-api/compiler-api#what-languages-and-versions-supported
const language = {
	languageCode: "nodejs",
	versionIndex: 2
};

const script = "console.log('Hello World!')";

jdoodle(language, script).then((result) => {
	console.log(result.output); // Hello World!
});
```