var startpnt = [9,12];
var endpnt = [9,19];
var obstacles=[];
var classToAdd = "";
var isAlreadyObstacled = false;
var i = 0;

function funy(x,y, event){
    if(i===2) {
        var object = _.filter(obstacles, function(obj){
            return obj.x === x && obj.y ===y;
        })
        if(startpnt[0]===x && startpnt[1]===y){
            document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class","grid end_");
            document.getElementById(endpnt[0]+","+endpnt[1]).setAttribute("end", "end");
            return;
        }
        if(_.isUndefined(object) || object.length == 0 || obstacles.length == 0 ) {
            document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class","grid");
            document.getElementById( x + ',' + y).setAttribute("class", "grid end_");
            $('div[end="end"]').each(function(i,el) {
            $(el).removeAttr("end");
            });
            document.getElementById(x+","+y).setAttribute("end", "end");
            endpnt= [x,y];
        }
        else{
            document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class","grid end_");
            document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("end","end");
        }
        return;
    } 
	else if(i===1) { 
        var object = _.filter(obstacles, function(obj){
            return obj.x === x && obj.y ===y;
            })
	    if(endpnt[0]===x && endpnt[1]===y){
			document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class","grid start_");
		    document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("start", "start");
			return;
		}
        if(_.isUndefined(object) || object.length == 0 || obstacles.length == 0) {
			document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class","grid");
			document.getElementById( x + ',' + y).setAttribute("class", "grid start_");
            $('div[start="start"]').each(function(i,el) {
            $(el).removeAttr("start");
            });
            document.getElementById(x+","+y).setAttribute("start", "start");
            startpnt= [x,y];
        }  
        else{
			document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class","grid start_");
			document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("start","start");
		}			
        return;
    } 
	else {
        if(isAlreadyObstacled) {
        obstacles = _.without(obstacles, _.findWhere(obstacles, {
        x: x,
        y: y
        }));
        } 
	else {
        if(startpnt[0]===x && startpnt[1] ===y ) {
            return;
        }

        if(endpnt[0]===x && endpnt[1] ===y ) {
            return;
		}
        if(obstacles.length > 0) {
            var object = _.filter(obstacles, function(obj){
             return obj.x === x && obj.y ===y;
            })
            if(_.isUndefined(object) || object.length == 0) {
				obstacles.push({x:x, y:y});
			}
        }
		else {
            obstacles.push({x:x, y:y});
        }
    }
    document.getElementById( x + "," + y).setAttribute("class", classToAdd);
    }
};

function defineClass(x,y) {
    var start = document.getElementById(x+","+y).getAttribute("start");
    if(start==="start"){
        i = 1;
        document.getElementById(x+","+y).setAttribute("class","grid");
        return;
    }
    var end = document.getElementById(x+","+y).getAttribute("end");
    if(end==="end"){
        document.getElementById(x+","+y).setAttribute("class","grid");
        i = 2;
        return;
    }
    if(obstacles.length >0) {
	    var object = _.filter(obstacles, function(obstacle) {
			return obstacle.x === x && obstacle.y === y;
        });
        if(_.isUndefined(object) || object.length == 0) {
            isAlreadyObstacled = false;
        }
		else {
            isAlreadyObstacled = true;
        }
    }
	else {
        isAlreadyObstacled = false;
    }
	if(isAlreadyObstacled) {
		classToAdd = "grid";
	} else  {
		classToAdd = "grid clr";
	}
}
document.addEventListener("dragover", function(event) {
	  event.preventDefault();
}, false); 

function clearClass(event) {
 if(event){
	 event.preventDefault();
 }
 i=0;
 document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("class","grid start_");
 document.getElementById(startpnt[0]+','+startpnt[1]).setAttribute("start","start");
 document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("class","grid end_");
 document.getElementById(endpnt[0]+','+endpnt[1]).setAttribute("end","end");
 classToAdd = "";
 isAlreadyObstacled = false;
}


function moveout(x,y) {
    if(i===1 || i===2) {
		if(i===2){
		if(startpnt[0]===x && startpnt[1]===y){
		    document.getElementById( x + ',' + y).setAttribute("class", "grid start_"); 
		    document.getElementById(x+","+y).setAttribute("start", "start");
		return;
		}}
		if(i===1){
		if(endpnt[0]===x && endpnt[1]===y){
		    document.getElementById( x + ',' + y).setAttribute("class", "grid end_"); 
		    document.getElementById(x+","+y).setAttribute("end", "end");
		    return;
		}
		}
       if(obstacles.length > 0) {
            var object = _.filter(obstacles, function(obj){
                return obj.x === x && obj.y ===y;
            })
            if(_.isUndefined(object) || object.length == 0) {
                document.getElementById( x + ',' + y).setAttribute("class", "grid");  
				if(endpnt[0]===x && endpnt[1]===y){				
					$('div[end="end"]').each(function(i,el) {
					$(el).removeAttr("end");
                });	
				}
				if(startpnt[0]===x && startpnt[1]===y){
					$('div[start="start"]').each(function(i,el) {
					$(el).removeAttr("start");
					});
				}
            }
		}
		else {
            document.getElementById( x + ',' + y).setAttribute("class", "grid");
			$('div[end="end"]').each(function(i,el) {
            $(el).removeAttr("end");
            });	
			$('div[start="start"]').each(function(i,el) {
            $(el).removeAttr("start");
            });
        } 
    }
}



function click_obs(x,y) {	
    if(startpnt[0]===x && startpnt[1] ===y ) {
        return;
    }

    if(endpnt[0]===x && endpnt[1] ===y ) {
        return;
    }
	var object = _.filter(obstacles, function(obj){
        return obj.x === x && obj.y ===y;
	})
    
    if( object.length == 0  ) {
		var s=document.getElementById(x+','+y).className;
		classToAdd="grid clr";
        obstacles.push({x:x, y:y});
    } else {
	
        obstacles = _.without(obstacles, _.findWhere(obstacles, {
            x: x,
            y: y
        }));
		classToAdd="grid";
    }
	document.getElementById( x + ',' + y).setAttribute("class",classToAdd);
	
};

