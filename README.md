[![Build Status](https://travis-ci.org/akayami/console-level.svg?branch=master)](https://travis-ci.org/akayami/console-level)[![Coverage Status](https://coveralls.io/repos/github/akayami/console-level/badge.svg?branch=master)](https://coveralls.io/github/akayami/console-level?branch=master)[![Dependencies Status](https://david-dm.org/akayami/console-level.svg)](https://david-dm.org/akayami/console-level.svg)
# console-level
A filter allowing setting of log level for console object

## Usage
```javascript
const { Console } = require('console');
console = new Console({ stdout: process.stdout, stderr: process.stderr });
// Make console output only warns and bellow
console = level(console, 'warn');
console.warn('Some Warning'); 			// stderr will contain this
console.log('Suppressed level'); 		// Will not appear
console.level('log');					// Switches log level to log
console.log('Not suppressed anymore'); 	// Will appear in stdout
console.level('warn');					// Switches log level back to warn
```

### Levels
```javascript
const stack = {
	'debug': 20, // stdout
	'info': 30, // stdout
	'log': 30, // stdout
	'warn': 40, // stderr
	'error': 50, // stderr
	'trace': 60 // stderr
};
```

### Another usage example

```javascript
const { Console } = require('console');
console = new Console({ stdout: process.stdout, stderr: process.stderr });
// Make console output only warns and bellow
console = level(console, (process.env.dev ? 'debug' : 'warn'));

```
