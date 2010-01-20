function LevelRecapAssistant(level, wordList, score, passedLevels) {
	this.Level = level;
	this.WordList = wordList;
	this.Score = score;
	this.PassedLevels = passedLevels;
}

LevelRecapAssistant.prototype.setup = function() {
	// Setup Application Menu
	this.controller.setupWidget(Mojo.Menu.appMenu, newsMenuAttr, newsMenuModel);
	
	var CookieInfo = new Mojo.Model.Cookie("Synogame");
	CookieInfo.remove();
	CookieInfo.put({
		Level: this.Level,
		Score: this.Score,
		PassedLevels: this.PassedLevels
	});
	
	this.controller.get("levelCompleted").update(this.Level - 1);
	this.controller.get("scoreSpan").update(this.Score);
	// set up the button
	this.buttonModel = {"label" : "Continue to Level " + this.Level, "buttonClass" : "", "disabled" : false};
	this.buttonAttributes = {};
	this.controller.setupWidget("continueButton", this.buttonAttributes, this.buttonModel);
	Mojo.Event.listen(this.controller.get("continueButton"), Mojo.Event.tap, this.handleContinueButtonPress.bind(this));
	
	this.TipList = new Tips();
	this.controller.get("tipText").update(this.getRandTip());	
	
	AdMob.ad.request({
        onSuccess: (function (ad) { // successful ad call, parameter 'ad' is the html markup for the ad
                this.controller.get("admob_ad").insert(ad); // place mark up in the the previously declared div
        }).bind(this),
        onFailure: (function () { // no ad was returned or call was unsuccessful
                // do nothing? 
        }).bind(this),
    });
}

LevelRecapAssistant.prototype.getRandTip = function() {
	var maxLevel = this.TipList.AllTips.length;
	var randNum = Math.floor(Math.random()*maxLevel);
	return this.TipList.AllTips[randNum];
}

LevelRecapAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}

LevelRecapAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

LevelRecapAssistant.prototype.cleanup = function(event) {
	Mojo.Event.listen(this.controller.get("continueButton"), Mojo.Event.tap, this.handleContinueButtonPress.bind(this));
}

LevelRecapAssistant.prototype.handleContinueButtonPress = function(event){
	this.controller.stageController.swapScene("Game", this.Level, this.WordList, null, null, this.Score, 1, this.PassedLevels, null);
}
