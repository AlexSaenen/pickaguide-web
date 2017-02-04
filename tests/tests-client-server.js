describe('Tests on client web with api', function() {
  it('complete complete form', function() {
  	browser.ignoreSynchronization = true;
		browser.get('http://localhost:8080');

		element(by.css('[href="/contactus"]')).click();

		element(by.name('name')).sendKeys("testProtractor");
		element(by.name('email')).sendKeys("test@test.com");
		element(by.name('phone')).sendKeys("+1 514 560 3976");
		element(by.name('message')).sendKeys("Bonjour, ceci est un test de protractor");
		
		element(by.name('Submit')).click();
	})
	it('compleat complete form', function() {
		browser.get('http://localhost:8080');
		element(by.css('[href="/login"]')).click();
		element(by.id('email')).sendKeys("vivien.pradelles@gmail.com");
		element(by.id('password')).sendKeys("azerty");
		
		element(by.name('Submit')).click();
		//console.log("lol: " + element(by.name('MessageTitle')).textContent);

		//expect(element(by.name('MessageTitle')).getText()).toEqual("Successful");
	})
});