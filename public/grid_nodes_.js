

function neighborss(gridNode,grid_,diagonalMovement,corners){
	var ret = [];
    var x = gridNode.x;
	var y = gridNode.y;
	var grid = grid_;
  
    var s0 = false, d0 = false,
        s1 = false, d1 = false,
        s2 = false, d2 = false,
        s3 = false, d3 = false;


   // North 
  if (grid[x] && grid[x][y + 1] && grid[x][y+1].wall) {
    ret.push({"grid": grid[x][y + 1], "distance": 1});
	s1 = true;
  }// East
  if (grid[x + 1] && grid[x + 1][y] && grid[x + 1][y].wall) {
    ret.push({"grid": grid[x+1][y], "distance": 1});
	 s2 = true;
  }
  
   // West
  if (grid[x - 1] && grid[x - 1][y] && grid[x-1][y].wall) {
    ret.push({"grid": grid[x-1][y], "distance": 1});      
	s0 = true;
  }
    // South
  if (grid[x] && grid[x][y - 1] && grid[x][y-1].wall) {
    ret.push({"grid": grid[x][y-1], "distance": 1});
	s3=true;
  } 
  
  
    if (!diagonalMovement) {
        return ret;
    }

    if (diagonalMovement && !corners) {
        d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
    } 
	
	else{
		d0 = true;
        d1 = true;
        d2 = true;
        d3 = true;
		if(!s0){
			d0=false;
			d1=false;
		
		}
		if(!s1){
			d1=false;
			d2=false;
		}
		if(!s2){
			d3=false;
			d2=false;
		}
		if(!s3){
			d0=false;
			d3=false;
		}
	}

    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1] && d0) {
      ret.push({"grid": grid[x-1][y-1], "distance": Math.sqrt(2)});    
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1] && d3) {
      ret.push({"grid": grid[x+1][y-1], "distance": Math.sqrt(2)});
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1] && d1) {
      ret.push({"grid": grid[x-1][y+1], "distance": Math.sqrt(2)});
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1] && d2) {
      ret.push({"grid": grid[x+1][y+1], "distance": Math.sqrt(2)});
    }

    return ret;
}
		 
