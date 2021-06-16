function timeOutStart(){
	
	t1 = setTimeout(function(){
		
		if(!blockBody && (ID != leader))	//我沒收到block也不是leader
			myDeliver.TimeOutVoteDeliver(height, round, ID);
			
	},TO1);

	
	t2 = setTimeout(function(){	//aggregate等收票
		if(ID == aggregate){
			
			//處理收集到的票
			
			
			//把處理好的結果傳給其他節點
			myDeliver.fromAggregateDeliver(height, round);
			
		}
	},TO2);
	
	
	t3 = setTimeout(function(){	//等收票
		var timeout = 1, synround = -1;
		
		//測書囉鋪
		//(commitBlock) ? myMain.newHeight(synround) : myMain.newRound(timeout, synround);
		
		//測timeout的
		myDeliver.ReadyDeliver(ID, 0);
		var endHandle_TO4 = new Date().getTime();
		Handle4_Buffer.push(endHandle_TO4 - handle_TO4);
		
		//學弟的
		//(commitBlock) ? myProcedure.feedbackTransaction(synround) : newRound(timeout, synround);
	},TO3);
	
}


function timeOutStop(){
	clearTimeout(t1);
	clearTimeout(t2);
	clearTimeout(t3);
}


function resetTimeOut(timeout, synround){
	if(synround > 0){
		TO1 = TOs1 * Math.pow(TimeRate, synround);
		TO2 = TOs2 * Math.pow(TimeRate, synround);
		TO3 = TOs3 * Math.pow(TimeRate, synround);
		round = synround;
	}
	
	if(timeout == 1){
		TO1 = TO1 * TimeRate;
		TO2 = TO2 * TimeRate;
		TO3 = TO3 * TimeRate;
	}
}


module.exports = {
	timeOutStart,
	timeOutStop,
	resetTimeOut
}