
var timers = [];
var Timer = function(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = function() {
        if(remaining >= 0) {
            start = Date.now();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        }
    };
    this.stop = function() {
        window.clearTimeout(timerId);
    }
    this.getStart = function() {
        return start; 
    }
    this.resume();
};


function animate(visitedNodesInOrder, nodesInShortestPathOrder,end,src){ 
    
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
	    if (i === visitedNodesInOrder.length) {
			var timer = new Timer(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
            }, 15.3 * i)  
            timers.push(timer);
			return;
		}  
	    if(visitedNodesInOrder[i].x ===src.x &&  visitedNodesInOrder[i].y ===src.y){continue;}
	    if(visitedNodesInOrder[i].x ===end.x &&  visitedNodesInOrder[i].y ===end.y){continue;}
        if(visitedNodesInOrder[i].wall === 0){continue};
        var timer = new Timer(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(node.x + ',' + node.y).className ='grid node-visited';
        }, 12 * i);
        timers.push(timer);
	
		if(i!== (visitedNodesInOrder.length -1)){
			var timer = new Timer(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(node.x + ',' + node.y).className = 'grid _node-visited';
			}, 15 * i)
			timers.push(timer);
		};
	  
	    if(visitedNodesInOrder[i].closed === false || visitedNodesInOrder[i].visited === false){
			var timer = new Timer(() => {
			const node = visitedNodesInOrder[i];
			document.getElementById(node.x + ',' + node.y).className = 'grid node-visited';
			}, 15 * i);
		timers.push(timer);
		};
    }
 }

function animateShortestPath(nodesInShortestPathOrder) {
	nodesInShortestPathOrder.pop();
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      var timer = new Timer(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(node.x + ',' + node.y).className = 'grid node-shortest-path';
          if(node.x === nodesInShortestPathOrder[nodesInShortestPathOrder.length - 1].x  
          && node.y === nodesInShortestPathOrder[nodesInShortestPathOrder.length - 1].y){
          link = document.getElementById("clr_grid");
          };
       }, 16 * i);   
      timers.push(timer);
    }
    var timer = new Timer(() => {finishSearch()}, 16 * (i+1));   
    timers.push(timer);
}


function pauseSearch() {
    _.forEach(timers, function(timer) {
        timer.pause();          
    });
    $("#start").text("Resume Search");
    $("#pause_").text("Cancel Search");
    $("#start").off("click").on("click", () => {this.resumeSearch()});
    $("#pause_").off("click").on("click", () => {this.cancelSearch()});
}

function resumeSearch() {
    _.forEach(timers, function(timer) {
        timer.resume();          
    });
    $("#start").text("Restart Search");
    $("#pause_").text("Pause Search");
    $("#start").off("click").on("click", () => {start_search()});
    $("#pause_").off("click").on("click", () => {pauseSearch()});
}

function stopSearch() {
    _.forEach(timers, function(timer) {
        timer.stop();          
    });
    timers = [];
    restart();
}


function cancelSearch() {
    $("#start").text("Start Search");
    $("#start").off("click").on("click", () => {
        $("#start").text("Restart Search");
        enablePause();
        start_search();
    });
    $("#pause_").text("Pause Search");
    $("#pause_").off("click").on("click", () => {this.pauseSearch()});
    disablePause();
    stopSearch();
}

function finishSearch() {
    $("#start").text("Restart Search");
    $("#pause_").text("Clear Path");
    $("#pause_").off("click").on("click", () => {
        this.clearPath()
    });
    $("#start").off("click").on("click", () => {
        this.start_search();
    });
}

function resetPause() {
    $("#pause_").text("Pause Search");
    $("#pause_").off("click").on("click", () => {
        this.pauseSearch()
    });
    disablePause();
}

function clearPath() {
    $("#start").text("Start Search");
    $("#start").off("click").on("click", () => {
        $("#start").text("Restart Search");
        enablePause();
        start_search();
    });
    resetPause();
    stopSearch();
}
