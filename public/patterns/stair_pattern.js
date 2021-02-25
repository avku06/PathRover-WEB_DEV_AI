

function stairDemonstration() {
    var s=document.getElementById("rec_div");
    s.disabled = true;
    var p = document.getElementById("sim_demo");
    p.disabled = true;
    var l = document.getElementById("clr_grid");
    l.disabled = true;
    l.setAttribute("class","chng");
    var k = document.getElementById("start");
    k.disabled = true;
    k.setAttribute("class","chng");

    let currentIdX = rowNumber - 1;
    let currentIdY = 0;
    var j=0;
    while (currentIdX > 0 && currentIdY < columnNumber) {
		let currentId = currentIdX + ',' + currentIdY;
		let currentHTMLNode = document.getElementById(currentId);
		if(endpnt[0] == currentIdX && endpnt[1]== currentIdY) continue;
		if(startpnt[0] == currentIdX && startpnt[1]== currentIdY) continue;
		setTimeout(() => {
			currentHTMLNode.setAttribute("class","grid clr");
		}, 20* j);
	    obstacles.push({x:currentIdX , y:currentIdY});
		j++;
		currentIdX--;
		currentIdY++;
    }
	while (currentIdX < rowNumber - 2 && currentIdY < columnNumber) {
		let currentId = currentIdX + ',' + currentIdY;
		let currentHTMLNode = document.getElementById(currentId);
		if(endpnt[0] == currentIdX && endpnt[1]== currentIdY) continue;
		if(startpnt[0] == currentIdX && startpnt[1]== currentIdY) continue;
		setTimeout(() => {
			currentHTMLNode.setAttribute("class","grid clr");
		}, 20* j);
		obstacles.push({x:currentIdX , y:currentIdY});
		j++;
		currentIdX++;
		currentIdY++;
	}
    setTimeout(()=> {
      var k = document.getElementById("start");
      k.disabled = false;
      k.setAttribute("class","click_button");
      var kk = document.getElementById("clr_grid");
      kk.disabled = false;
      kk.setAttribute("class","click_button");
    }, 20* (j+1))
}
