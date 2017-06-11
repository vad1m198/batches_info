({
	myAction : function(component, event, helper) {
		
	},
	loadBatches : function(oComp, oEvent, oHelper) {
		var oParams = JSON.parse(oEvent.getParam("params"));
		var fHandleSuccess = oResult => {
			var aRecords = JSON.parse(oResult.aRecords);
			
			if(oParams.jobStatus == 'Failed') {
				oComp.set("v.failedBatchInfos", aRecords);
			} else if(oParams.jobStatus == 'Processing') {
				oComp.set("v.processingBatchInfos", aRecords);
			}
		};		
		oHelper._request(oComp, oParams, fHandleSuccess,oError=>console.log('oError >>> ', oError) );		
	},
	
	rerunBatch: function(oComp, oEvent, oHelper) {
		var oParams = {
			className : oEvent.getParam("className"),
			event : 'rerunBatchByName'
		}
		var fHandleSuccess = oResult => {
			oHelper.showMessage(oComp, 'Batch run successfuly!', 'info');
		};
		oHelper._request(oComp, oParams, fHandleSuccess,oError=>console.log('oError >>> ', oError) );
	},
	stopBatch: function(oComp, oEvent, oHelper) {
		var oParams = {
			batchId : oEvent.getParam("batchId"),
			event : 'stopBatchByid'
		}
		var fHandleSuccess = oResult => {
			oHelper.showMessage(oComp, 'Batch stoped successfuly!', 'info');
			var sBatchId = oResult.batchId;
			var batches = oComp.get("v.processingBatchInfos");
			oComp.set("v.processingBatchInfos", batches.filter(b => b.Id != sBatchId));
		};
		oHelper._request(oComp, oParams, fHandleSuccess,oError=>console.log('oError >>> ', oError) );
	},
	
})