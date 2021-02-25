/*
A* Algorithm:
A* Search algorithms, unlike other traversal techniques, it has “brains”. 
where:
g = the movement cost to move from the starting point to a 
    given square on the grid, following the path generated to get there.
h = the estimated movement cost to move from that given square
    on the grid to the final destination. This is often referred to as the heuristic.
f = is a parameter equal to the sum of two other parameters – ‘g’ and ‘h’.
*/


class _gridNode_{
	
	constructor(x,y,wall){
		this.x = x;
        this.y = y;
        this.wall = wall;
	    this.f = Number.MAX_VALUE;
        this.g =  Number.MAX_VALUE;
        this.h =Number.MAX_VALUE;
        this.visited = false;
        this.closed = false;
        this.parent = null;
	}

	isWall(){
		 return this.wall === 0;
	}
	
}


class Graph{
	
	constructor(gridIn,diagonal_,weight,dont){
		this.dont=dont;
		this.diagonal = diagonal_;         
		this.grid = [];
		this.weight=weight;
		for (var x = 0; x < gridIn.length; x++) {
			this.grid[x] = [];
			for (var y = 0, row = gridIn[x]; y < row.length; y++) {
				var node = new _gridNode_(x, y, row[y]);
				this.grid[x][y] = node;
			}
		}
	}
	

	getHeap() {
		return new BinaryHeap(function(nodeA) {
		return nodeA.f ;
		});
	}

	astarsearch(graph, start, end, x ) {
   
		var t0=performance.now();
		var t1;
		var openHeap = graph.getHeap();
		var hScore;
		switch(x){
			case "Manhattan":
				hScore = manhattan(start, end); 
				break;
	  
			case "Euclidiean":
				hScore=Euclidiean(start,end);
				break;
	  
			case "Octile":
				hScore=Octile(start,end);
				break;
	  
			case "Chebysev":
				hScore=Chebysev(start,end);
				break;
		} 
		end.h=0;
		start.g=0;
		start.f=hScore;
		start.h=hScore;
		start.visited=true;
		start.parent=null;
		openHeap.push(start);
   
		while (openHeap.size() > 0) {
       
			var currentNode = openHeap.pop();
			currentNode.closed = true;
			if (currentNode.x === end.x && currentNode.y === end.y) {
				var opt=pathTo(currentNode,this.weight);
				t1=performance.now();
				var time=t1-t0;
				var length = opt.len;
				length=length.toFixed(2);
				time=time.toFixed(4);
				animate(visited_in_order,opt.arr,end,start);
				document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
				return ;
			}
     
			var neighbors = neighborss(currentNode,this.grid,this.diagonal,this.dont);
       
			for (var i = 0, il = neighbors.length; i < il; ++i) {
				var neighbor = neighbors[i];
				var distance = neighbor.distance;
				var neighborGrid = neighbor.grid;
				if (neighborGrid.closed || neighborGrid.isWall()) {
					continue;
				}
				var gScore=currentNode.g + distance;
				if(!neighborGrid.visited || gScore < neighborGrid.g){
		
				neighborGrid.parent=currentNode;
				neighborGrid.g=gScore;	
				var hScore;
				switch(x){
				case "Manhattan":
					hScore = manhattan(neighborGrid,end); 
					break;	  
				case "Euclidiean":
					hScore=Euclidiean(neighborGrid,end);
					break;
				case "Octile":
					hScore=Octile(neighborGrid,end);
					break;
				case "Chebysev":
					hScore=Chebysev(neighborGrid,end);
					break;

				}	 

				neighborGrid.h= (hScore);
				var fScore=neighborGrid.h + neighborGrid.g;
				neighborGrid.f=fScore;
				if(!neighborGrid.visited){  
					visited_in_order.push(neighborGrid);		   
					neighborGrid.visited=true;
					openHeap.push(neighborGrid);	
				}
		  		else{
					openHeap.rescoreElement(neighborGrid);
				}
			}
		}
	}
	time=performance.now()-t0;
	time=time.toFixed(4);
	animate(visited_in_order,[],end,start);
	document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms";
	return [];
	}
  
    //BIDIRECTIONAL A*
	biastar(graph,start,end,x){

		var t0=performance.now(),t1;
		var openHeap = graph.getHeap();
		var endlist=graph.getHeap();
		var hScore;

		switch(x){
			case "Manhattan":
				hScore = manhattan(start, end); 
				break;
			case "Euclidiean":
				hScore=Euclidiean(start,end);
				break;
			case "Octile":
				hScore=Octile(start,end);
				break; 
			case "Chebysev":
				hScore=Chebysev(start,end);
				break;
		} 
      
		start.g=0;
		start.f=hScore;
		start.h=hScore;
		start.visited=true;
		start.parent=null;
		start.by=start;
		openHeap.push(start);
    
		end.by=end;
		end.parent=null;
		end.g=0;
   
		switch(x){
			case "Manhattan":
				hScore = manhattan(end,start); 
				break;
			case "Euclidiean":
				hScore=Euclidiean(end,start);
				break;
			case "Octile":
				hScore=Octile(end,start);
				break;
			case "Chebysev":
				hScore=Chebysev(end,start);
				break;
		} 
		end.h=hScore;
		end.f=hScore;
		end.visited=true;
		endlist.push(end);
		var k=0;
		while (openHeap.size() > 0 || endlist.size() > 0) {
			if(openHeap.size()>0){
				var currentNode = openHeap.pop();
				currentNode.closed = true;
				var neighbors = neighborss(currentNode,this.grid,this.diagonal,this.dont);
				for (var i = 0, il = neighbors.length; i < il; ++i) {
					var neighbor = neighbors[i];
					var distance = neighbor.distance;
					var neighborGrid = neighbor.grid;
					if (neighborGrid.closed || neighborGrid.isWall()) {
						continue;
					}
					if(neighborGrid.visited){
					if(neighborGrid.by===end){
						var opt=newPath(currentNode,neighborGrid,this.weight);
						t1=performance.now();
						var time=t1-t0;
						var length = opt.len;
						length=length.toFixed(2);
						time=time.toFixed(4);
						animate(visited_in_order,opt.arr,end,start);
						document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
						return;	
					}
						continue;
					}	 
			  
					visited_in_order.push(neighborGrid);
		 
					var gScore=currentNode.g + distance;

					if(!neighborGrid.visited || gScore < neighborGrid.g){
						neighborGrid.parent=currentNode;
						neighborGrid.g=gScore;

						var hScore;
						switch(x){
							case "Manhattan":
								hScore = manhattan(neighborGrid,end); 
								break;
		  
							case "Euclidiean":
							   hScore=Euclidiean(neighborGrid,end);
							   break;
							case "Octile":
								hScore=Octile(neighborGrid,end);
								break;
							case "Chebysev":
								hScore=Chebysev(neighborGrid,end);
								break;

						} 
	 
						neighborGrid.h= (hScore);
						var fScore=neighborGrid.h + neighborGrid.g;
						neighborGrid.f=fScore;
						neighborGrid.by=start;
						if(!neighborGrid.visited){            
							neighborGrid.visited=true;
							openHeap.push(neighborGrid);	
						}
						else{
							openHeap.rescoreElement(neighborGrid);
						}
				
					}
 
				}
			}
        if(endlist.size()>0){
			var currentNode2 = endlist.pop();
			currentNode2.closed = true;
			neighbors = neighborss(currentNode2,this.grid,this.diagonal,this.dont);
	 
			for (var i = 0, il = neighbors.length; i < il; ++i) {
				var neighbor = neighbors[i];
				var distance = neighbor.distance;
				var neighborGrid = neighbor.grid;
				
				if (neighborGrid.closed || neighborGrid.isWall()) {
					continue;
				}
				
				if(neighborGrid.visited){
					if(neighborGrid.by===start){
						var opt=newPath(neighborGrid,currentNode2,this.weight);
						t1=performance.now();
						var time=t1-t0;
						var length = opt.len;
						length=length.toFixed(2);
						time=time.toFixed(4);
						animate(visited_in_order,opt.arr,end,start);
						document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
						return;
						 
					}
					continue;
				} 

				var gScore=currentNode2.g + distance;
				visited_in_order.push(neighborGrid);
				
				if(!neighborGrid.visited || gScore < neighborGrid.g){
			
					neighborGrid.parent=currentNode2;
					neighborGrid.g=gScore;
					var hScore;
					switch(x){
					  case "Manhattan":
						hScore = manhattan(neighborGrid,start); 
						break;
					  
					  case "Euclidiean":
						hScore=Euclidiean(neighborGrid,start);
						break;
					  
					  case "Octile":
						hScore=Octile(neighborGrid,start);
						break;
					  
					  case "Chebysev":
						hScore=Chebysev(neighborGrid,start);
						break;
					} 
		  
				neighborGrid.by=end;
				neighborGrid.h= (hScore);
				var fScore=neighborGrid.h + neighborGrid.g;
				neighborGrid.f=fScore;
				if(!neighborGrid.visited){            
					neighborGrid.visited=true;
					endlist.push(neighborGrid);	
				}
				else{
					endlist.rescoreElement(neighborGrid);
				}
				
			}
		}
	}
					
	}
	time=performance.now()-t0;
	time=time.toFixed(4);
	animate(visited_in_order,[],end,start);
	document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms";
	return ;
    
	}

}