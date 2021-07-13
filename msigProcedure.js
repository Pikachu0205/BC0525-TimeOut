function msigMaxRoundVote(lockset){	//找出所有票中所投的block中擁有的最大round
	var maxRound = 0, maxRoundVote = {};
	
	for(var i in lockset)
		if(lockset[i].round > maxRound  &&  lockset[i].vote != null)
			maxRoundVote = lockset[i].vote;
	
	return maxRoundVote;
}

function msigNull(lockset, height, round){	//看是不是全為0
	var allnull = true, memberls = [];
	
	for(var i in lockset)
		if(lockset[i].height == height  &&  lockset[i].round == round-1)
			if(lockset[i].vote != null)
				allnull = false;
	
	return allnull;
}


module.exports = {
	msigMaxRoundVote,
	msigNull
}