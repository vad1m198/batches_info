({
	helperMethod : function() {
		
	},
	showMessage : function(component, message, severity) {
		var showMessage = component.getEvent("showMessage");
	    showMessage.setParams({ "message": message, "severity" : severity });
	    showMessage.fire();
		
	},
})