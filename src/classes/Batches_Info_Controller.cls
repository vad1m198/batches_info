public without sharing class Batches_Info_Controller {
	
	private static final Map<String, String> mapTimePeriodLiteral = new Map<String, String>();
	private static final Map<String, String> mapJobStatus = new Map<String, String>();
	
	private static Map<String, String> aParams = new Map<String, String>();
	
	static {
		mapTimePeriodLiteral.put('All', 'LAST_N_YEARS:10');
		mapTimePeriodLiteral.put('Today', 'TODAY');
		mapTimePeriodLiteral.put('Last Week', 'LAST_WEEK');
		mapTimePeriodLiteral.put('Last Month', 'LAST_MONTH');				
	}
	
	@AuraEnabled
	public static String remoteHandler(String sIncomeParams) {		
		system.debug('sParams >>> ' + sIncomeParams);
        Batches_Info_Controller.aParams = (Map<String, String>) JSON.deserialize(sIncomeParams, Map<String, String>.class);
        Map<String, String> aResult = new Map<String, String>();
        String sAction = Batches_Info_Controller.getRequest('event', '');
        try {
            if (sAction == 'loadBatchesInfos') {
                aResult = Batches_Info_Controller.getBatchesResult();
            } else if (sAction == 'rerunBatchByName') {
                aResult = Batches_Info_Controller.runBatchByName();
            } else if (sAction == 'stopBatchByid') {
                aResult = Batches_Info_Controller.stopBatchById();
            }
            
            
            
        } catch (QueryException e) {
            aResult.put('status', 'error');
            aResult.put('error', e.getMessage());
            system.debug('DB exception >>> ' + aResult);
        } catch (DMLException e) {
            aResult.put('status', 'error');
            aResult.put('error', 'Database Error: ' + e.getDmlMessage(0));
            List<String> aErrFields = e.getDmlFieldNames(0);
            aResult.put('fields', String.join(aErrFields, ','));
            system.debug('DB exception >>> ' + e.getDmlFields(0));
        } catch (System.Exception e) {
            aResult.put('status', 'error');
            aResult.put('error', e.getMessage() + ' (' + e.getTypeName() + ' # ' + e.getStackTraceString() + ')');
            system.debug('exception >>> ' + aResult);
        }

        return JSON.serialize(aResult);
	}
	
	private static String getRequest(String sName) {
        return Batches_Info_Controller.getRequest(sName, null);
    }
    private static String getRequest(String sName, String sDefault) {
        return Batches_Info_Controller.aParams.containsKey(sName) ? Batches_Info_Controller.aParams.get(sName) : sDefault;
    }
  	
    public static Map<String,String> getBatchesResult() {
    	Integer pageNumber = Integer.valueOf(Batches_Info_Controller.getRequest('pageNumber', '0'));
    	Integer recordsNumber = Integer.valueOf(Batches_Info_Controller.getRequest('recordsNumber', '10'));
    	
    	String timePeriodLiteral = Batches_Info_Controller.getRequest('timePeriod', 'LAST_N_YEARS:10');
    	String jobStatusStr = Batches_Info_Controller.getRequest('jobStatus', 'Failed');    	
    	Integer offset = recordsNumber * pageNumber;
    	
    	String queryStr = 'SELECT Id, JobType,ApexClass.Name, JobItemsProcessed,TotalJobItems, ExtendedStatus, Status, CreatedDate ' 
        		  		  + 'FROM AsyncApexJob '
        		  		  + 'WHERE JobType = \'BatchApex\' '
        		  		  + 'AND Status = :jobStatusStr ';
				queryStr += 'AND CreatedDate >= ' + timePeriodLiteral;
				queryStr += ' ORDER BY CreatedDate DESC'
						 + ' LIMIT :recordsNumber OFFSET:offset';
        
	   List<AsyncApexJob> aRecords = Database.query(queryStr);
	   
	   Map<String,String> oResult = new Map<String,String>();
	   
	   oResult.put('aRecords', JSON.serialize(aRecords));
	   oResult.put('status', 'success');
	   return oResult;
    }
    
    public static Map<String,String> runBatchByName() {
	    Type myType=Type.forName(Batches_Info_Controller.getRequest('className', ''));
		if (null!=myType) {
		    Database.executeBatch((Database.Batchable<sObject>) myType.newInstance(), 200);			    
		} else {
			throw new AuraHandledException('Invalid class name: ' + Batches_Info_Controller.getRequest('className', ''));
		}
		
		Map<String,String> oResult = new Map<String,String>();			   	
	   	oResult.put('status', 'success');
	   	return oResult;
    }
    
    public static Map<String,String> stopBatchById() {	
	    System.AbortJob(Batches_Info_Controller.getRequest('batchId', ''));
	    Map<String,String> oResult = new Map<String,String>();			   	
	   	oResult.put('status', 'success');
	   	oResult.put('batchId', Batches_Info_Controller.getRequest('batchId'));
	   	return oResult;
    }
    
    /*public static List<String> getTimePeriods() {
    	return new List<String>(mapTimePeriodLiteral.keySet());
    }*/
    
    

    
}