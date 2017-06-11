({
	helperMethod : function() {
		
	},
	_request : function(oCmp, data, fFunc, fError){		
		var oAction = oCmp.get("c.remoteHandler"),
	    oResult = {};
	    oAction.setParams({'sIncomeParams' : JSON.stringify(data)});
	    oCmp.set("v._showSpinner", true);
	    oAction.setCallback(oCmp, function(oResponse) {
	    	oCmp.set("v._showSpinner", false);
	    	var sState = oResponse.getState();
	    	if (sState === "SUCCESS") {
	    		try {
	                oResult = JSON.parse(oResponse.getReturnValue());
	            } catch (e){
	            	oResult = {status : 'error', message : 'JSON Parsing error'};
	            }
	            if (oResult.status && oResult.status === 'error') {
                	console.log('Remoting Error : ' + oResult.message);
                	if (typeof(fError) == 'function') {
                		fError(oResult);
                	}
                	return;
                }
	            if (typeof(fFunc) == 'function') {
            		fFunc(oResult);
            	}
	    	} else if (sState === "ERROR") {
	    		 var aErrors = oResponse.getError();
	    		if (aErrors) {
	    			if (aErrors[0] && aErrors[0].message) {
	    				console.log('Error >>> ', aErrors[0].message);
	    				this.showMessage(oCmp, aErrors[0].message, 'error');
	                }
	    		}
	    		if (typeof(fError) == 'function') {
                	fError(aErrors);
                }
	    	}
	    });
	    $A.enqueueAction(oAction);
	},
	showMessage: function(oCmp, sMessage, sSeverity) {
		oCmp.set("v._messageText", sMessage);
		oCmp.set("v._messageSeverity", sSeverity);
		if(sSeverity != 'error') {
			window.setTimeout(
			    $A.getCallback(function() {
			        oCmp.set("v._messageText", "");
			    }), 3000
			);
		}		

	},
})