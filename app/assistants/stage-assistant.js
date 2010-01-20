function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	newsMenuAttr = {omitDefaultItems: true};
	newsMenuModel = {
		visible: true,
		items: [
			{label: "About...", command: 'do-aboutNews'}
		]
	};
	
	this.allWords = new Words();
	this.controller.pushScene("Menu", this.allWords);
};

StageAssistant.prototype.handleCommand = function(event) {
	var currentScene = this.controller.activeScene();
	if(event.type == Mojo.Event.command) {
		switch(event.command) {
			case 'do-aboutNews':
				currentScene.showAlertDialog({
					onChoose: function(value) {},
					title: "SpellWell",
					message: "I'm not perfect, if you see an error, please let me know! Email me at jon.romanowski@gmail.com",
					choices:[
						{label: "OK", value:""}
					]
				});
				break;
		}
	}
};