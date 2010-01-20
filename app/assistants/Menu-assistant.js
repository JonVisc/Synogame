function MenuAssistant(wordList) {
	this.WordList = wordList;
}

MenuAssistant.prototype.setup = function() {
	// Setup Application Menu
	this.controller.setupWidget(Mojo.Menu.appMenu, newsMenuAttr, newsMenuModel);
		
	this.buttonAttributes = {};
	this.buttonModel = {"label" : "Begin", "buttonClass" : "secondary", "disabled" : false};
	this.continueModel = {"label" : "Continue", "buttonClass" : "affirmative", "disabled" : false};
	this.aboutButtonModel = {"label" : "How to play","buttonClass" : "", "disabled" : false};

	// set up the buttons
	this.controller.setupWidget("startButton", this.buttonAttributes, this.buttonModel);
	this.controller.setupWidget("continueButton", this.buttonAttributes, this.continueModel);
	this.controller.setupWidget("aboutButton", this.buttonAttributes, this.aboutButtonModel);
	// bind the button to its handler
	Mojo.Event.listen(this.controller.get("startButton"), Mojo.Event.tap, this.handleButtonPress.bind(this));
	Mojo.Event.listen(this.controller.get("continueButton"), Mojo.Event.tap, this.handleContinueButtonPress.bind(this));
	Mojo.Event.listen(this.controller.get("aboutButton"), Mojo.Event.tap, this.handleAboutButtonPress.bind(this));
	
	AdMob.ad.initialize({
	    pub_id: 'a14b551bd65e0b4', // your publisher id
	    test_mode: false,
	});
}

MenuAssistant.prototype.activate = function(event) {
}

MenuAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

MenuAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}

MenuAssistant.prototype.handleContinueButtonPress = function(event) {
	var CookieInfo = new Mojo.Model.Cookie("Synogame");
	var levelInfo = CookieInfo.get();
	
	this.controller.stageController.pushScene("Game", levelInfo != null ? levelInfo.Level : 25, this.WordList, null, null, levelInfo != null ? levelInfo.Score : 0, 1, levelInfo != null ? levelInfo.PassedLevels : null);
}
MenuAssistant.prototype.handleButtonPress = function(event){
	this.controller.stageController.pushScene("Game", 1, this.WordList, null, null, 0, 1, null);
}

MenuAssistant.prototype.handlePrefButtonPress = function(event){
	this.controller.stageController.pushScene("Preference");
}

MenuAssistant.prototype.handleAboutButtonPress = function(event){
	this.controller.stageController.pushScene("About");
}