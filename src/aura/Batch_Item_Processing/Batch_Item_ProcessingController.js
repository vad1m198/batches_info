({
	myAction : function(component, event, helper) {
		
	},
	
	batchStop : function(component, event, helper) {
		var action = component.get("c.stopBatch");
	    action.setParams({"jobId" : component.get("v.batchItem.Id")});
	    action.setCallback(this, function(response) {
	    	if (component.isValid() && response.getState() === "SUCCESS") {
	    		var toastEvent = $A.get("e.force:showToast");
	    		if(toastEvent) {
	    			toastEvent.setParams({
						"title": "Saved",
						"message": "Batch was canceled"
					});
					toastEvent.fire();
	    		} else {
	    			helper.showMessage(component, "Batch was canceled successfully", "info");
	    		}

				var updateEvent = component.getEvent("removeJobId");
		        updateEvent.setParams({ "jobId": component.get("v.batchItem.Id") });
		        updateEvent.fire();
	    	} else if(response.getState() === "ERROR") {
	    		helper.showMessage(component, response.getError()[0].message, "error");	  
	    	}        
	    });
	    $A.enqueueAction(action);
		
	},
	
})