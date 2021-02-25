/*
Best-First Search:
Best-first search is a search algorithm which explores a graph by 
expanding the most promising node chosen according to a specified rule.

where:
g = the movement cost to move from the starting point to a 
    given square on the grid, following the path generated to get there.
h = the estimated movement cost to move from that given square
    on the grid to the final destination. This is often referred to as the heuristic.
f = is a parameter equal to the sum of two other parameters – ‘g’ and ‘h’.
*/

class node3{
    constructor(x,y,wall){
        this.x=x;
        this.y=y;
        this.wall=wall;
        this.parent=null;
        this.f=Number.MAX_VALUE;
        this.g=Number.MAX_VALUE;
        this.h=Number.MAX_VALUE;
        this.closed=false;
        this.visited=false;
    }
    isWall(){
		 return this.wall === 0;
	}
}

function manhattan(pos0, pos1) {
    var d1 = Math.abs(pos1.x - pos0.x);
    var d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
}
	
	
function Euclidiean(pos0,pos1){
    var d1 = (pos1.x-pos0.x)*(pos1.x-pos0.x);
	var d2=   (pos1.y-pos0.y)*(pos1.y-pos0.y);
	return Math.sqrt(d1+d2);
}	

function Octile(pos0,pos1){
    var d1= Math.abs(pos1.x - pos0.x);
	var d2=  Math.abs(pos1.y - pos0.y);
    var F = Math.SQRT2 - 1;
    return (d1 < d2) ? F * d1 + d2 : F * d2 + d1;         
}

function Chebysev(pos0,pos1){
    var d1= Math.abs(pos1.x-pos0.x);
	var d2= Math.abs(pos1.y-pos0.y);
	return Math.max(d1,d2);
}	

class BestfsGraph{
	constructor(gridIn,diagonal_,dont){
        this.dont=dont;
        this.diagonal = diagonal_; 
        this.weight=1;
        this.grid = [];
        for (var x = 0; x < gridIn.length; x++) {
            this.grid[x] = [];
            for (var y = 0, row = gridIn[x]; y < row.length; y++) {
                var node = new node3(x, y, row[y]);
                this.grid[x][y] = node;
            }
        }
    }
    
    getHeap() {
        return new BinaryHeap(function(nodeA) {
            return nodeA.f ;
        });
    }
 

    bestFS(graph,start,end,x){
        var t0=performance.now(),t1;
        var heap=graph.getHeap();
        start.g=0;
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
        start.h=hScore;
        start.parent=null;
        start.f=start.h+start.g;
        start.visited=true;
        heap.push(start);
        
        while(heap.size() > 0){
            
            var t0=performance.now(),t1;
            var current=heap.pop();
            if(current.x===end.x && current.y===end.y){
                var opt=pathTo(current,this.weight);
                t1=performance.now();
                var time=t1-t0;
                var length = opt.len;
                length=length.toFixed(2);
                time=time.toFixed(4);
                animate(visited_in_order,opt.arr,end,start);
                document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
                return;
            }
            current.closed=true;
            var neighbors = neighborss(current,this.grid,this.diagonal,this.dont);
            for (var i = 0, il = neighbors.length; i < il; ++i) {  
                var neighbor = neighbors[i];
                var distance = neighbor.distance;
                var neighborGrid = neighbor.grid;
                if (neighborGrid.closed || neighborGrid.isWall()) {
                    continue;
                }
                var gScore=current.g + distance;  
                neighborGrid.parent=current;
                neighborGrid.g=gScore;
                var hScore;
                
                switch(x){
                    case "Manhattan":
                        hScore = manhattan(neighborGrid, end);
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
                    heap.push(neighborGrid);
                }else{
                    heap.rescoreElement(neighborGrid);
                }
            }
        }
        
        time=performance.now()-t0;
        time=time.toFixed(4);
        animate(visited_in_order,[],end,start);
        document.getElementById('information').innerText="Length : " + "0" + "\n" + "Time : " + time + "ms";
        return [];
    }
    
    biBestFS(graph,start,end,x){
        var heap=graph.getHeap();
        var endlist=graph.getHeap();
        start.g=0;
        
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
        start.h=hScore;
        start.parent=null;
        start.f=start.h+start.g;
        start.visited=true;
        start.by=start;
        heap.push(start);
        end.g=0;
        
        switch(x){
            case "Manhattan":
                hScore = manhattan(end, start);
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
        end.parent=null;
        end.f=end.h+end.g;
        end.visited=true;
        end.by=end;
        endlist.push(end);
        var k=0;
        
        while(heap.size() > 0 || endlist.size() > 0){
			if(heap.size()>0){
            var t0=performance.now(),t1;
            var current=heap.pop();
            current.closed=true;
            var neighbors = neighborss(current,this.grid,this.diagonal,this.dont);
            for (var i = 0, il = neighbors.length; i < il; ++i) {
                var neighbor = neighbors[i];
                var distance = neighbor.distance;
                var neighborGrid = neighbor.grid;
                if (neighborGrid.closed || neighborGrid.isWall()) {
                    continue;
                }
                if(neighborGrid.visited){
                    if(neighborGrid.by===end){
                        var opt=  newPath(current,neighborGrid,this.weight);
                        t1=performance.now();
                        var time=t1-t0;
                        var length =opt.len;
                        length=length.toFixed(2);
                        time=time.toFixed(4);
                        animate(visited_in_order,opt.arr,end,start);
                        document.getElementById('information').innerText="Length : " + length + "\n" + "Time : " + time + "ms";
                        return;
                    }
                    continue;
                }
                var gScore=current.g + distance;  
                visited_in_order.push(neighborGrid);
                neighborGrid.parent=current;
                neighborGrid.g=gScore;
                var hScore;
                
                switch(x){
                    case "Manhattan":
                        hScore = manhattan(neighborGrid, end);
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
                    heap.push(neighborGrid);	
                }else{
                    heap.rescoreElement(neighborGrid);
                }
            }
			}
			if(endlist.size()>0){
            var current2=endlist.pop();
            current2.closed=true;
            
            var neighbors = neighborss(current2,this.grid,this.diagonal,this.dont);
            
            for (var i = 0, il = neighbors.length; i < il; ++i) {
                var neighbor = neighbors[i];
                var distance = neighbor.distance;
                var neighborGrid = neighbor.grid;
                
                if (neighborGrid.closed || neighborGrid.isWall()) {
                    continue;
                }
                if(neighborGrid.visited){
                    if(neighborGrid.by===start){
                        var opt=newPath(neighborGrid,current2,this.weight);
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
                var gScore=current2.g + distance;
                visited_in_order.push(neighborGrid);
                neighborGrid.parent=current2;
                neighborGrid.g=gScore;
                var hScore;
                
                switch(x){
                    case "Manhattan":
                        hScore = manhattan(neighborGrid, start); 
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
                }else{
                    endlist.rescoreElement(neighborGrid);
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
}