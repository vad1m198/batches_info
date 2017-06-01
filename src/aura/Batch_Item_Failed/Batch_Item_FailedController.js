({
	myAction : function(component, event, helper) {
		
	},
	rerunBatch : function(component, event, helper) {	
		var action = component.get("c.runBatchByName");
	    action.setParams({"className" : component.get("v.batchItem.ApexClass.Name")});
	    
	    action.setCallback(this, function(response) {
	    	if (component.isValid() && response.getState() === "SUCCESS") {
	    		var toastEvent = $A.get("e.force:showToast");
	    		if(toastEvent) {
	    			toastEvent.setParams({
						"title": "Saved",
						"message": "Batch was started successfully"
					});
					toastEvent.fire();
	    		} else {
	    			helper.showMessage(component, "Batch was started successfully", "info");	    			
	    		}
	    	}  else if(response.getState() === "ERROR") {
	    		helper.showMessage(component, response.getError()[0].message, "error");	    		
	    	}
	    });
	    $A.enqueueAction(action);
	},
})