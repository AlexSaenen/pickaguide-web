exports.config = {
	framwork: 'jasmine',
	directConnect: true,
	//seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['tests-client-server.js'],
//	multiCapabilities: [{
//		'browserName': 'firefox'
//	}, {
//		'browserName': 'chrome'
//	}] // doesn't work, problem with firefox brother
	capabilities: {
		'browserName': 'chrome'
	}
};
