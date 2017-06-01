({
	helperMethod : function() {
		
	},
    loadBatchInfos : function(component, jobStatus) {
    	component.set("v.showSpinner", true);
	    var action = component.get("c.getBatchesReult");
	    var selectedPeriod = component.find("selectPeriod").get("v.value");
	    if(!selectedPeriod) selectedPeriod = 'All';
	    action.setParams({"timePeriod" : selectedPeriod,"jobStatus" : jobStatus});
	    
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (component.isValid() && state === "SUCCESS") {
	            component.set("v.batchInfos", response.getReturnValue());	            
	        } else {
	            console.log("loadBatchInfos Failed with state: " + state);
	            if(state === "ERROR") component.set("v.dataError", response.getError()[0].message);
	        }
	        component.set("v.showSpinner", false);
	    });
	    $A.enqueueAction(action);
    },
    loadTimePeriodsAndInfos : function(component, jobStatus) {    	
    	var action = component.get("c.getTimePeriods");
		action.setCallback(this, function(response) {
        var state = response.getState();
	        if (component.isValid() && state === "SUCCESS") {
	            component.set("v.timePeriods", response.getReturnValue());
	            this.loadBatchInfos(component, jobStatus);
	        } else {
	            console.log("loadTimePeriodsfunction Failed with state: " + state);
	            if(state === "ERROR") component.set("v.dataError", response.getError()[0].message);
	        }
		});
		$A.enqueueAction(action);
    }

})