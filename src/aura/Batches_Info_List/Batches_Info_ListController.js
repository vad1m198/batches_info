({
	myAction : function(component, event, helper) {
		
	},
	doInit: function(component, event, helper) {
		helper.loadTimePeriodsAndInfos(component, component.get("v.activeJobStatus"));
	},
	handleTimePeriod: function(component, event, helper) {
		helper.refreshPageNumber(component);
		helper.loadBatchInfos(component, component.get("v.activeJobStatus"));
	},
	
	onSelectTab: function(component, event, helper) {
		helper.refreshPageNumber(component);
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
		helper.showMessage(component, event.getParam("message"), event.getParam("severity"));
	},
	
	previous: function(component, event, helper) {
		var n = component.get("v.pageNumber");
		n = n - 1
		component.set("v.pageNumber", n);
		helper.loadBatchInfos(component, component.get("v.activeJobStatus"));
		
		
	},
	next: function(component, event, helper) {
		var n = component.get("v.pageNumber");
		n = n + 1;
		component.set("v.pageNumber", n);
		helper.loadBatchInfos(component, component.get("v.activeJobStatus"));
	}
})