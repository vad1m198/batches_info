public without sharing class Batches_Info_Controller {
	
	private static final Map<String, String> mapTimePeriodLiteral = new Map<String, String>();
	private static final Map<String, String> mapJobStatus = new Map<String, String>();
	
	static {
		mapTimePeriodLiteral.put('All', 'LAST_N_YEARS:10');
		mapTimePeriodLiteral.put('Today', 'TODAY');
		mapTimePeriodLiteral.put('Last Week', 'LAST_WEEK');
		mapTimePeriodLiteral.put('Last Month', 'LAST_MONTH');
		
		mapJobStatus.put('Failed', 'Failed');
		mapJobStatus.put('Processing', 'Processing');
	}
  
    @AuraEnabled
    public static List<AsyncApexJob> getBatchesReult(String timePeriod, String jobStatus, Integer pageNumber, Integer recordsNumber) {    	
    	//without this cast salesforce internal error appear.
    	pageNumber = Integer.valueOf(pageNumber);
    	recordsNumber = Integer.valueOf(recordsNumber);
    	
    	String timePeriodLiteral = mapTimePeriodLiteral.get(timePeriod);
    	String jobStatusStr = mapJobStatus.get(jobStatus);
    	Integer offset = recordsNumber * pageNumber;    	
    	if(jobStatusStr == null) throw new AuraHandledException('Invalid jobStatus parameter: ' + jobStatus);
    	
    	if(timePeriodLiteral == null) throw new AuraHandledException('Invalid time period parameter: ' + timePeriod);
    	
    	String queryStr = 'SELECT Id, JobType,ApexClass.Name, JobItemsProcessed,TotalJobItems, ExtendedStatus, Status, CreatedDate ' 
        		  		  + 'FROM AsyncApexJob '
        		  		  + 'WHERE JobType = \'BatchApex\' '
        		  		  + 'AND Status = :jobStatusStr ';
				queryStr += 'AND CreatedDate >= ' + timePeriodLiteral;
				queryStr += ' ORDER BY CreatedDate DESC'
						 + ' LIMIT :recordsNumber OFFSET:offset';
        
	   return Database.query(queryStr);
    }
    
    @AuraEnabled
    public static List<String> getTimePeriods() {
    	return new List<String>(mapTimePeriodLiteral.keySet());
    }
        
    @AuraEnabled
    public static void runBatchByName(String className) {
	    Type myType=Type.forName(className);
	    
		if (null!=myType) {
		    Database.executeBatch((Database.Batchable<sObject>) myType.newInstance(), 200);			    
		} else {
			throw new AuraHandledException('Invalid class name: ' + className);
		}
    }
    
    @AuraEnabled
    public static void stopBatch(String jobId) {	
      System.AbortJob(jobId);
    }
    
    

    
}