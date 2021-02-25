
function simpleDemonstration() {
    var s=document.getElementById("stair");
    s.disabled = true;
    var p = document.getElementById("rec_div");
    p.disabled = true;
    var l = document.getElementById("clr_grid");
    l.disabled = true;
    l.setAttribute("class","chng");
    var k = document.getElementById("start");
    k.disabled = true;
    k.setAttribute("class","chng");
 
    let startRow = 0;
    let startCol = 0;
    let endRow = rowNumber -1;
    let endCol = columnNumber -1;
    var a=0,b=0,c=0,d=0;
    
    while(startRow<=endRow && startCol<=endCol){
        for(let i=startCol; i<=endCol;++i){
            let currentId = startRow + ',' + i;
            if(endpnt[0] == startRow && endpnt[1]== i) continue;
            if(startpnt[0] == startRow && startpnt[1]== i) continue;
            let currentElement = document.getElementById(currentId);
            setTimeout(() => {
                currentElement.setAttribute("class","grid clr");
            }, 20* a);
            a++;
            obstacles.push({x:startRow , y:i});
        }
        startRow += 2;

        for(let i=startRow ; i<=endRow ;i++){
            let currentId = i + ',' + endCol;
            if(endpnt[0] == i && endpnt[1]== endCol) continue;
            if(startpnt[0] == i && startpnt[1]== endCol) continue;
            let currentElement = document.getElementById(currentId);
            setTimeout(() => {
                currentElement.setAttribute("class","grid clr");
                
            }, 20* b);
            b++;
            obstacles.push({x:i , y:endCol});
        }
        endCol -= 2;

        if(endRow>startRow){
            for(let i=endCol ; i>=startCol ;i--){
                let currentId = endRow + ',' + i;
                if(endpnt[0] == endRow && endpnt[1]== i) continue;
                if(startpnt[0] == endRow && startpnt[1]== i) continue;
                let currentElement = document.getElementById(currentId);
                setTimeout(() => {
                    currentElement.setAttribute("class","grid clr");
                }, 20* c);
                c++;
                obstacles.push({x:endRow , y:i});
            }
            endRow -= 2;
        }

        if(endCol>startCol){
            for(let i=endRow ; i>=startRow ;i--){
                let currentId = i + ',' + startCol;
                if(endpnt[0] == i && endpnt[1]== startCol) continue;
                if(startpnt[0] == i && startpnt[1]== startCol) continue;
                let currentElement = document.getElementById(currentId);
                 setTimeout(() => {
                    currentElement.setAttribute("class","grid clr");
                }, 20* d);
                d++;
                obstacles.push({x:i , y:startCol});
            }
            startCol += 2;
        }
    }
    setTimeout(() => {
        var l = document.getElementById("clr_grid");
        l.disabled = false;
        l.setAttribute("class","click_button");
        var k = document.getElementById("start");
        k.disabled = false;
        k.setAttribute("class","click_button");
    }, 20* (Math.max(a,b,c,d)+1));

}

