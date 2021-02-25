
var y=0;

function rec(row,col){
	let t=row;
	 for(row;row<t+4;row++){
		 if(row >=rowNumber-1){
             y++;
             return;
         }
         if(endpnt[0] === row && endpnt[1]=== col){continue;}
	     if(startpnt[0] === row && startpnt[1]=== col){continue;}
         let curr = document.getElementById(row + "," + col);
	     setTimeout(() => {
		   curr.setAttribute("class","grid clr");
         },20*y);
	      obstacles.push({x:row , y:col});
	     y++;
	  }
	
	  rec(row+2,col);
return ;
}


function Recursion_Division(){
      var s=document.getElementById("stair");
      s.disabled = true;
      var p = document.getElementById("sim_demo");
      p.disabled = true;
      var l = document.getElementById("clr_grid");
      l.disabled = true;
      l.setAttribute("class","chng");
      var k = document.getElementById("start");
      k.disabled = true;
      k.setAttribute("class","chng");
      var m=0;
	  let col=0,row=0;
      let endRow = rowNumber -1;
      let endCol = columnNumber -1;
    
      for(let i=col; i<=endCol;++i){
            let currentId = row + ',' + i;
            if(endpnt[0] == row && endpnt[1]== i) continue;
            if(startpnt[0] == row && startpnt[1]== i) continue;
            let currentElement = document.getElementById(currentId);
            setTimeout(() => {
                currentElement.setAttribute("class","grid clr");
            }, 20* m);
            m++;
            obstacles.push({x:row , y:i});
        }
        row++;

     for(let i=row; i<=endRow;++i){
            let currentId = i + ',' + endCol;
            if(endpnt[0] == i && endpnt[1]== endCol) continue;
            if(startpnt[0] == i && startpnt[1]== endCol) continue;
            let currentElement = document.getElementById(currentId);
            setTimeout(() => {
                currentElement.setAttribute("class","grid clr");
            }, 20* m);
            m++;
            obstacles.push({x:i , y:endCol});
        }
        endCol--;

     if(endRow>row){
            for(let i=endCol ; i>=col ;i--){
                let currentId = endRow + ',' + i;
                if(endpnt[0] == endRow && endpnt[1]== i) continue;
                if(startpnt[0] == endRow && startpnt[1]== i) continue;
                let currentElement = document.getElementById(currentId);
                setTimeout(() => {
                    currentElement.setAttribute("class","grid clr");
                }, 20* m);
                m++;
                obstacles.push({x:endRow , y:i});
            }
            endRow--;
    }

    if(endCol>col){
            for(let i=endRow ; i>=row ;i--){
                let currentId = i + ',' + col;
                if(endpnt[0] == i && endpnt[1]== col) continue;
                if(startpnt[0] == i && startpnt[1]== col) continue;
                let currentElement = document.getElementById(currentId);
                 setTimeout(() => {
                    currentElement.setAttribute("class","grid clr");
                }, 20* m);
                m++;
                obstacles.push({x:i , y:col});
            }
            col++;
    }
    

    for(var i=5;i<columnNumber-2;i+=4){
		rec(1,i);
	}
	for(var i=3;i<columnNumber-1;i+=4){
		rec(4,i);
	}
    setTimeout(() => {
        var l = document.getElementById("clr_grid");
        l.disabled = false;
        l.setAttribute("class","click_button");
        var k = document.getElementById("start");
        k.disabled = false;
        k.setAttribute("class","click_button");
    }, 20* (Math.max(m,y) +1));
	
}