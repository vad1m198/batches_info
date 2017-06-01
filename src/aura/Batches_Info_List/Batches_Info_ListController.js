({
	myAction : function(component, event, helper) {
		
	},
	doInit: function(component, event, helper) {
		helper.loadTimePeriodsAndInfos(component, component.get("v.activeJobStatus"));
	},
	handleTimePeriod: function(component, event, helper) {
		helper.loadBatchInfos(component, component.get("v.activeJobStatus"));
	},
	
	onSelectTab: function(component, event, helper) {
		var selectedJobStatus = event.getSource().get("v.id");
		component.set("v.activeJobStatus", selectedJobStatus);
		helper.loadBatchInfos(component, selectedJobStatus);
	},
	
	removeJobById: function(component, event, helper) {
		var jobIdToRemove = event.getParam("jobId")
		var jobs = component.get("v.batchInfos");		
		component.set("v.batchInfos", jobs.filter(obj => obj.Id != jobIdToRemove));
	},
	
	showMessage: function(component, event, helper) {
		component.set("v.messageText", event.getParam("message"));
		component.set("v.messageSeverity", event.getParam("severity"));
		window.setTimeout(
		    $A.getCallback(function() {
		        component.set("v.messageText", "");
		    }), 3000
		);
	},
})