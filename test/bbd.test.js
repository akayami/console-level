const { Console } = require('console');
const { expect } = require('chai');

const level = require('../lib/main');
const StreamTest = require('streamtest');
const MemoryStream = require('memorystream');

describe('BBD Tests', () => {

	it('Needs to allow for standard setup', done => {
		let out = new MemoryStream(null, {readable: false});
		let err = new MemoryStream(null, {readable: false});
		console = new Console({ stdout: out, stderr: err });
		console = level(console);
		console.log('test');
		expect(out.toString()).to.equal(`test\n`);
		expect(err.toString()).to.equal('');
		done();
	});
	
	it('Needs to filter out levels', done => {
		let out = new MemoryStream(null, {readable: false});
		let err = new MemoryStream(null, {readable: false});
		console = new Console({ stdout: out, stderr: err });
		console = level(console, 'error');
		console.log('test');
		expect(out.toString()).to.equal('');
		expect(err.toString()).to.equal('');
		done();
	});
	
	let levels = {
		'debug': 'out',
		'info': 'out',
		'log': 'out',
		'warn': 'err',
		'error': 'err',
		//'trace': 'err',
	};

	Object.keys(levels).forEach((l) => {
//		process.stdout.write(l);
		it(`Testing level ${l}`, done => {
		 	let streams = {};

			streams['err'] = new MemoryStream(null, {readable: false});
			streams['out'] = new MemoryStream(null, {readable: false});

			console = new Console({ stdout: streams['out'], stderr: streams['err'] });
			console = level(console, l);
			console[l]('test');
			expect(streams[levels[l]].toString()).to.equal(`test\n`);
		 	done();
		});
	});
	
	Object.keys(levels).forEach((l) => {
//		process.stdout.write(l);
		it(`Testing level ${l}`, done => {
			let streams = {};
			
			streams['err'] = new MemoryStream(null, {readable: false});
			streams['out'] = new MemoryStream(null, {readable: false});
			
			console = new Console({ stdout: streams['out'], stderr: streams['err'] });
			console = level(console, 'off');
			console[l]('test');
			expect(streams[levels[l]].toString()).to.equal(``);
			done();
		});
	});
	
	let tracelvl = {
		// 'debug': 'out',
		// 'info': 'out',
		// 'log': 'out',
		// 'warn': 'err',
		// 'error': 'err',
		'trace': 'err',
	};

	Object.keys(tracelvl).forEach((l) => {
//		process.stdout.write(l);
		it(`Testing level ${l}`, done => {
			let streams = {};

			streams['err'] = new MemoryStream(null, {readable: false});
			streams['out'] = new MemoryStream(null, {readable: false});

			console = new Console({ stdout: streams['out'], stderr: streams['err'] });
			console = level(console, l);
			console[l]('test-trace');
			expect(streams[tracelvl[l]].toString()).to.contain(`test-trace\n`);
			done();
		});
	});
	
	Object.keys(tracelvl).forEach((l) => {
//		process.stdout.write(l);
		it(`Testing level ${l}`, done => {
			let streams = {};
			
			streams['err'] = new MemoryStream(null, {readable: false});
			streams['out'] = new MemoryStream(null, {readable: false});
			
			console = new Console({ stdout: streams['out'], stderr: streams['err'] });
			console = level(console, 'off');
			console[l]('test-trace');
			expect(streams[tracelvl[l]].toString()).to.contain(`test-trace\n`);
			done();
		});
	});

	
	it('Needs to support runtime level changing', done => {
		let out = new MemoryStream(null, {readable: false});
		let err = new MemoryStream(null, {readable: false});
		console = new Console({ stdout: out, stderr: err });
		console = level(console, 'log');
		console.log('test');
		expect(out.toString()).to.equal(`test\n`);
		expect(err.toString()).to.equal('');
		console.log('test2');
		expect(out.toString()).to.equal(`test\ntest2\n`);
		console.level('error');
		console.log('lala');
		expect(out.toString()).to.equal(`test\ntest2\n`);
		done();
	})
	
});