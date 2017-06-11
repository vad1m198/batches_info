@isTest
private class Batches_Info_Controller_Test {
    @isTest
    private static void generalTest(){
    	String params = '{'+'"event"'+':'+'"loadBatchesInfos"'+'}';
    	Batches_Info_Controller.remoteHandler(params);
    	
    	String params1 = '{'+'"event"'+':'+'"rerunBatchByName"'+'}';
    	Batches_Info_Controller.remoteHandler(params1);
    	
    	String params2 = '{'+'"event"'+':'+'"stopBatchByid",'+'"batchId"'+':'+'"7070Y00000Z9pTpQAJ"'+'}';
    	Batches_Info_Controller.remoteHandler(params2);
    }
}