({
	doInit: function(oCmp, oEvent, oHelper) {		
		oHelper.loadData(oCmp);
	},
	
	handlePeriodChange: function(oCmp, oEvent, oHelper) {
		oCmp.set("v._pageNumber", 0);
		oHelper.loadData(oCmp);
	},
	
	previous: function(oCmp, oEvent, oHelper) {
		oCmp.set("v._pageNumber", oCmp.get("v._pageNumber") - 1);
		oHelper.loadData(oCmp);
	},
	
	next: function(oCmp, oEvent, oHelper) {
		oCmp.set("v._pageNumber", oCmp.get("v._pageNumber") + 1);
		oHelper.loadData(oCmp);
	}
})