module.exports = (instance, mainLevel = 'info') => {
	
	const stack = {
		'debug': 20,
		'info': 30,
		'log': 30,
		'warn': 40,
		'error': 50,
		'trace': 60
	};
	
	let level = mainLevel;
	
	return {
		debug: (...args) => {
			if(stack[level] <= stack['debug']) {
				return instance.debug.apply(null, args);
			}
		},
		log: (...args) => {
			if(stack[level] <= stack['log']) {
				return instance.log.apply(null, args);
			}
		},
		info: (...args) => {
			if(stack[level] <= stack['info']) {
				return instance.info.apply(null, args);
			}
		},
		warn: (...args) => {
			if(stack[level] <= stack['warn']) {
				return instance.warn.apply(null, args);
			}
		},
		error: (...args) => {
			if(stack[level] <= stack['error']) {
				return instance.error.apply(null, args);
			}
		},
		trace: (...args) => {
			if(stack[level] <= stack['trace']) {
				return instance.trace.apply(null, args);
			}
		},
		level: (l) => {
			level = l;
		}
	}
	
};