({
	helperMethod : function() {
		
	},
    loadBatchInfos : function(component, jobStatus) {
    	component.set("v.showSpinner", true);
	    var action = component.get("c.getBatchesReult");
	    var selectedPeriod = component.find("selectPeriod").get("v.value");
	    var pageNumber = component.get("v.pageNumber");
	    if(!selectedPeriod) selectedPeriod = 'All';
	    action.setParams({"timePeriod" : selectedPeriod,"jobStatus" : jobStatus,"pageNumber":pageNumber});
	    
	    action.setCallback(this, function(response) {
	        var state = response.getState();
	        if (component.isValid() && state === "SUCCESS") {
	            component.set("v.batchInfos", response.getReturnValue());	            
	        } else {
	            console.log("loadBatchInfos Failed with state: " + state,response.getError()[0].message);
	            if(state === "ERROR") {
	            	this.showMessage(response.getError()[0].message, "error");
	            }
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
	            if(state === "ERROR") {
	            	this.showMessage(response.getError()[0].message, "error");
	            }
	        }
		});
		$A.enqueueAction(action);
    },
    refreshPageNumber:function(component){
    	component.set("v.pageNumber", 0);
    },
    showMessage: function(message, severity) {
		component.set("v.messageText", message);
		component.set("v.messageSeverity", severity);
		window.setTimeout(
		    $A.getCallback(function() {
		        component.set("v.messageText", "");
		    }), 3000
		);
	},

})