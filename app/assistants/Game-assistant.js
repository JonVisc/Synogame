function GameAssistant(level, wordList, randWordArray, choice, score, levelScore, passedLevels, offset) {
	this.Level = level;
	this.WordList = wordList;
	this.RandWordArray = randWordArray;
	this.RandSpellingArray = null;
	this.ButtonNum = 1;
	this.Choice = choice;
	this.Score = score;
	this.LevelScore = levelScore;
	this.PassedLevels = passedLevels;
	this.CurWordOffset = offset;
}

GameAssistant.prototype.setup = function() {
	// Setup Application Menu
	this.controller.setupWidget(Mojo.Menu.appMenu, newsMenuAttr, newsMenuModel);
	
	this.updateHeader();
	this.setupProgressBar();
	this.choseWordAndSetupButtons();
	this.checkCookie();
}

//If there is a cookie and this is the first level, remove it.
GameAssistant.prototype.checkCookie = function(){
	if (this.Level == 1) {
		var CookieInfo = new Mojo.Model.Cookie("Synogame");
		CookieInfo.remove();
	}
}

//Update the header
GameAssistant.prototype.updateHeader = function() {
	if (this.Choice != null) {
		this.controller.get("choiceHeader").update(this.Choice);
	}
	else {
		this.controller.get("choiceHeader").update("Level " + this.Level);
	}
}

GameAssistant.prototype.choseWordAndSetupButtons = function() {
	// Get the 5 words for the current level
	var levelWords = this.getLevelWords();	
	var randWord = this.getAndSetRandWord(this.RandWordArray);
	while (this.ButtonNum < 5) {
		this.setupButtons(randWord, this.getAndSetRandSpelling(this.RandSpellingArray), levelWords);
	}
}
GameAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}

GameAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

GameAssistant.prototype.cleanup = function(event) {
	//Don't want to code the checks for which is the right and wrong button press, so a cover-all
	Mojo.Event.stopListening(this.controller.get("Spelling1"), Mojo.Event.tap, this.handleRightButtonPress.bind(this));
	Mojo.Event.stopListening(this.controller.get("Spelling2"), Mojo.Event.tap, this.handleRightButtonPress.bind(this));
	Mojo.Event.stopListening(this.controller.get("Spelling3"), Mojo.Event.tap, this.handleRightButtonPress.bind(this));
	Mojo.Event.stopListening(this.controller.get("Spelling4"), Mojo.Event.tap, this.handleRightButtonPress.bind(this));
	
	Mojo.Event.stopListening(this.controller.get("Spelling1"), Mojo.Event.tap, this.handleWrongButtonPress.bind(this));
	Mojo.Event.stopListening(this.controller.get("Spelling2"), Mojo.Event.tap, this.handleWrongButtonPress.bind(this));
	Mojo.Event.stopListening(this.controller.get("Spelling3"), Mojo.Event.tap, this.handleWrongButtonPress.bind(this));
	Mojo.Event.stopListening(this.controller.get("Spelling4"), Mojo.Event.tap, this.handleWrongButtonPress.bind(this));
	
	window.clearInterval(this.updater);
}

GameAssistant.prototype.handleRightButtonPress = function(event){
	if (this.RandWordArray.length < 5) {
		var choiceHeader = this.RandWordArray.length + " - Right!";
		this.controller.stageController.swapScene("Game", this.Level, this.WordList, this.RandWordArray, choiceHeader, this.Score, this.LevelScore, this.PassedLevels, this.CurWordOffset);
	}
	else {
		var startingPoint = 5 * (this.Level);
		if (this.WordList.AllWords.length - 1 < (startingPoint + 4)) {
			this.controller.stageController.swapScene("EndGame", this.Score + Math.round(this.LevelScore * 100));
		}
		else {
			this.controller.stageController.swapScene("LevelRecap", this.Level + 1, this.WordList, this.Score + Math.round(this.LevelScore * 100), this.PassedLevels);
		}
	}
}

GameAssistant.prototype.handleWrongButtonPress = function(event){
	var subScore = this.LevelScore - .05;
	if (this.LevelScore < .05) {
		subScore = 0;
	}
	this.controller.stageController.swapScene("Game", this.Level, this.WordList, null, "Wrong!", this.Score, subScore, this.PassedLevels, this.CurWordOffset);
}

GameAssistant.prototype.getLevelWords = function() {
	var randLevel = null;
	if (this.CurWordOffset == null) {
		randLevel = this.getAndSetRandLevel(this.PassedLevels);
	} else {
		randLevel = this.CurWordOffset;
	}
	var startingPoint = 5 * randLevel;
	//Return a 2D array that contains the words for the current level.
	return [this.WordList.AllWords[startingPoint], this.WordList.AllWords[startingPoint + 1], this.WordList.AllWords[startingPoint + 2], this.WordList.AllWords[startingPoint + 3], this.WordList.AllWords[startingPoint + 4]];
}

GameAssistant.prototype.getAndSetRandWord = function(oldRandArray) {
	var randNum = Math.floor(Math.random()*5);
	if (oldRandArray == null) {
		this.RandWordArray = [randNum];
	} else {
		//Check if the number has been used before...
		var used = true;
		while (used) {
			used = false;
			for (j = 0; j < oldRandArray.length; j++) {
				if (randNum == oldRandArray[j]) {
					used = true;
					randNum = Math.floor(Math.random()*5);
				}
			}
		}
		oldRandArray.push(randNum);
	}
	return randNum;
}

GameAssistant.prototype.getAndSetRandSpelling = function(oldRandArray) {
	var randNum = Math.floor(Math.random()*4);
	if (oldRandArray == null) {
		this.RandSpellingArray = [randNum];
	} else {
		//Check if the number has been used before...
		var used = true;
		while (used) {
			used = false;
			for (j = 0; j < oldRandArray.length; j++) {
				if (randNum == oldRandArray[j]) {
					used = true;
					randNum = Math.floor(Math.random()*4);
				}
			}
		}
		oldRandArray.push(randNum);
	}
	return randNum;
}

GameAssistant.prototype.getAndSetRandLevel = function(oldRandArray) {
	var maxLevel = this.WordList.AllWords.length / 5;
	var randNum = Math.floor(Math.random()*maxLevel);
	if (oldRandArray == null) {
		this.PassedLevels = [randNum];
	} else {
		//Check if the number has been used before...
		var used = true;
		while (used) {
			used = false;
			for (j = 0; j < oldRandArray.length; j++) {
				if (randNum == oldRandArray[j]) {
					used = true;
					randNum = Math.floor(Math.random()*maxLevel);
				}
			}
		}
		oldRandArray.push(randNum);
		this.PassedLevels = oldRandArray;
	}
	this.CurWordOffset = randNum;
	return randNum;
}

GameAssistant.prototype.setupButtons = function(randWord, randSpelling, levelWords) {
	// set up the button
	this.buttonModel = {"label" : levelWords[randWord][randSpelling], "buttonClass" : "", "disabled" : false};
	this.buttonAttributes = {};
	this.controller.setupWidget("Spelling" + this.ButtonNum, this.buttonAttributes, this.buttonModel);
	
	//Means it is the correct word, setup the right button handler
	if (randSpelling == 0) {
		// bind the button to its handler
		Mojo.Event.listen(this.controller.get("Spelling" + this.ButtonNum), Mojo.Event.tap, this.handleRightButtonPress.bind(this));
	}
	else {
		Mojo.Event.listen(this.controller.get("Spelling" + this.ButtonNum), Mojo.Event.tap, this.handleWrongButtonPress.bind(this));
	}
	this.ButtonNum++;
}

GameAssistant.prototype.setupProgressBar = function() {
	this.attr = {
		title: '',
		image: ''
	};
	this.model = {
		value: this.LevelScore,
		disabled : false
	};
	this.controller.setupWidget('progressBar', this.attr, this.model);
	//setup a window timeout with an interval
	this.updater = window.setInterval(this.updateProgress.bind(this), 750);
}	

GameAssistant.prototype.updateProgress = function(){
	this.controller.get("levelScore").update(Math.round(this.LevelScore * 100));
	if (this.LevelScore <= 0) {
		window.clearInterval(this.updater);
	}
	else {
		this.model.value = this.LevelScore;
		this.controller.modelChanged(this.model);
		this.LevelScore -= .01;
	}
}

