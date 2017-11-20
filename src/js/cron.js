#!/usr/bin/env node
var load = require('load-script')
var cron = require('node-cron');
var runScript = require('runscript');
var assert = require("assert");

 
console.log('sending messages... every minute');

cron.schedule('* * * * *', function(){
	runScript('./amqp/send.js', { stdio: 'pipe' })
	.catch(err => {
		console.error(err);
	});
 });