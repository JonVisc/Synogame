function EndGameAssistant(score) {
	this.Score = score;
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

EndGameAssistant.prototype.setup = function() {
	// Setup Application Menu
	this.controller.setupWidget(Mojo.Menu.appMenu, newsMenuAttr, newsMenuModel);
	
	//Remove the continue cookie
	var CookieInfo = new Mojo.Model.Cookie("Synogame");
	CookieInfo.remove();
	
	this.controller.showDialog({
		template: 'EndGame/Name-scene',
		assistant: new NameAssistant(this, this.callback.bind(this)),
		preventCancel: true
	});
	
	
	this.controller.get("scoreSpan").update(this.Score);
}

EndGameAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}

EndGameAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

EndGameAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}

EndGameAssistant.prototype.getCleanDateTime = function() {
	var date = new Date();
	return date.toDateString() + " " + date.toLocaleTimeString();
}

EndGameAssistant.prototype.callback = function(name) {
	
	var ScoresCookie = new Mojo.Model.Cookie("Save");
	var scoresOverall = ScoresCookie.get();
	ScoresCookie.remove();
	var scores;
	if (scoresOverall == null) {
		scores = new Array();
	} else{
		scores = scoresOverall.Scores;
	}
	var date = this.getCleanDateTime();
	scores.unshift([date, this.Score, name]);
	
	ScoresCookie.put({
		Scores: scores
	});
	
	this.scoreText = "<table id=\"scoresTable\"><thead><tr><th>Name</th><th>Score</th></tr></thead><tbody>";
	if (scores.length < 6) {
		for (i = 0; i < scores.length; i++)
		{
			var uname = scores[i][2] == undefined ? "Synogamer" : scores[i][2];
			this.scoreText += "<tr><td>" + uname + "</td><td>" + scores[i][1] + "</td></tr>";
		}
	} else {
		var newScores = new Array();
		for (i = 0; i < 6; i++)
		{
			var uname = scores[i][2] == undefined ? "Synogamer" : scores[i][2];
			this.scoreText += "<tr><td>" + uname + "</td><td>" + scores[i][1] + "</td></tr>";
			newScores.push(scores[i]);
		}
		//If there are more than ten, keeps the cookie from growing too large over
		//a long period of time
		ScoresCookie.remove();
		ScoresCookie.put({
			Scores: newScores
		});
	}
	this.scoreText += "</tbody></table>";
	
	this.controller.get("scoresList").update(this.scoreText);
	
	this.controller.get("header").update("Congratulations " + name + "!");
	
	
}

