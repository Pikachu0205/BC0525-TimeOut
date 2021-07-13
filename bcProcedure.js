function getTransaction(){
	axios.get('http://' + awsUrl + ':3000/geth').then(response => {
		
		//console.log(response.data);
		transaction123 = response.data;
		
	}) .catch(error => {	console.log(error);	});
}


function feedbackTransaction(){	//用於S8-5 & myMain
	//console.log(feedbackVote);
	//for(i=0; i < member; i++){
		
		axios({
			method: 'post',
			//url: 'http://' + awsUrlList[ID] + ':3000/consensus',
			url: 'http://' + awsUrl + ':3000/consensus',
			
			data: {
				height : height,
				round : round,
				transaction : transaction123.transaction,
				blockHash : commitBlock.blockHash.split(),
				vote : feedbackVote
			}
			
		}).then(function(res){
			console.log(res.config);
			feedbackVote.length = 0;
			myMain.newHeight(0);
			})
		.catch(function(err){console.log(err);});
	
	//}
	
	
}

module.exports = {
	getTransaction,
	feedbackTransaction
}