function NameAssistant(sceneAssistant,callbackFunc) {
	this.callbackFunc = callbackFunc;
	this.sceneAssistant = sceneAssistant;
	this.controller = sceneAssistant.controller;
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

NameAssistant.prototype.setup = function(widget) {
	this.widget = widget;
	/* this function is for setup tasks that have to happen when the scene is first created */		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */	
	/* setup widgets here */	
	/* add event handlers to listen to events from widgets */
	
	var attributes = {
		textFieldName: 'name',
		hintText: 'Your name',
		modelProperty: 'value'
	};
	this.model = {
		value: "",
		disabled: false
	};
	this.controller.setupWidget('textField', attributes, this.model);
	
	//Set up our event listeners.  One for button presses and one for the textfield's propertyChange event.
	this.save = this.save.bind(this);
	this.propertyChanged = this.propertyChanged.bind(this);
	Mojo.Event.listen(this.controller.get('textField'), Mojo.Event.propertyChange, this.propertyChanged);
	Mojo.Event.listen(this.controller.get('save'),Mojo.Event.tap,this.save);
}
    
NameAssistant.prototype.propertyChanged = function(event){
	/* log the password field value when the value changes */
		Mojo.Log.info("value " + event.value);       
}

NameAssistant.prototype.save = function(event){
	/* put in event handlers here that should only be in effect when this scene is active. For
	 example, key handlers that are observing the document */
	
		
	this.callbackFunc(this.model.value);
	this.widget.mojo.close();
}

NameAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}

NameAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

NameAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
	  Mojo.Event.stopListening(this.controller.get('save'),Mojo.Event.tap,this.save);
}