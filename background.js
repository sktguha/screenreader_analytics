chrome.runtime.onMessage.addListener(
  function(req, sender, sendResponse) {
    console.log(req);
	if(req.s=="s")
	{
	var uname="name";
	var hist=JSON.parse(req.m);
	console.log(hist);
	//now break up into smaller chunks
	var i=0;
	var temp=[];
	var sum=0;
	var tn=localStorage[uname+"#####"+req.u]; //a unique token for this username and url combo
	if(typeof tn == "undefined") //not there, so create a new one
	  {
	  tn=0;
	  localStorage[uname+"#####"+req.u]=tn; 
	  }
	while(i<hist.length)
	{
	sum+=hist[i].length;
	temp.push(hist[i]);
	if(JSON.stringify(temp)>900)
	  {
	    tn=tn+1;
		localStorage[uname+"#####"+req.u]=tn; //store an updated token number
	    //put on storage . now the bluemix.js has to send all these to the database
		
		var key=uname+tn;
		//chrome.storage.local.set({key: JSON.stringify(temp)});
	    send({'key':key,'temp':JSON.stringify(temp)})
		console.log(key+":"+temp);
		temp=[]; //reset temp
	    sum=0;   // reset sum
	  }
	 i++;
	}
	}
	}
	);
	
	chrome.browserAction.onClicked.addListener(function (tab){
	alert("sorry. the heatmap functionality is not working yet :(")
            //var ch=window.prompt("Input choice\n1.get my heatmap for this page\n2.change username\n3.switch windows(requires browserspeak.exe)/platform independant versions","1");
	});
	
	function send(dat)
	{
	chrome.tabs.query({url:"http://screenreader.mybluemix.net/"}, function callback(tabs)
        {
	//tabs[0];
	});
	}
	
	
