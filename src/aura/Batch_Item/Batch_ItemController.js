({
	myAction : function(component, event, helper) {
		
	},
	
	rerunBatchByName : function(oCmp, oEvent, oHelper) {
		var rerunEvent = oCmp.getEvent("rerunBatchByName");        
	    rerunEvent.setParams({ "className": oCmp.get("v.batchItem.ApexClass.Name") });
        rerunEvent.fire();
	},
	
	stopBatchById : function(oCmp, oEvent, oHelper) {
		var stopEvent = oCmp.getEvent("stopBatchById");        
	    stopEvent.setParams({ "batchId": oCmp.get("v.batchItem.Id") });
        stopEvent.fire();
	},
	
})