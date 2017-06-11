({
	helperMethod : function() {
		
	},
	loadData: function(oCmp) {
		var loadEvent = oCmp.getEvent("loadBatchesData");
        var params = {
			timePeriod : oCmp.find("selectPeriod").get("v.value") ? oCmp.find("selectPeriod").get("v.value") : 'LAST_N_YEARS:10',
			jobStatus : oCmp.get("v.batchType"),
			pageNumber : oCmp.get("v._pageNumber"),
			recordsNumber :oCmp.get("v._recordsOnPage"),
			event : 'loadBatchesInfos'
        };
	    loadEvent.setParams({ "params": JSON.stringify(params) });
        loadEvent.fire();
	}   
})