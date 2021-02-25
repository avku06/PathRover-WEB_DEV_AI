


function newPath(nodeA,nodeB,wt){
    var pathA = pathTo(nodeA,wt);
    var pathB = pathTo(nodeB,wt);

    var a = pathA.arr;
    var b = pathB.arr;

    a.push(nodeA);
    b.unshift(nodeB);

    return ({"len":(pathA.len)+(pathB.len)+(1*wt) , "arr":a.concat(b.reverse())}); 
}

function pathTo(node,wt) {
  var curr = node;
  var path = [];
  var final=0;
  while (curr.parent !== null) {
      if((curr.parent.x + 1===curr.x && curr.parent.y + 1 ===curr.y) || (curr.parent.x + 1===curr.x && curr.parent.y - 1 ===curr.y) || (curr.parent.x - 1===curr.x && curr.parent.y + 1 ===curr.y) || (curr.parent.x - 1===curr.x && curr.parent.y - 1 ===curr.y) ){
          final = final + Math.sqrt(2) * wt;
        } 
      else{
          final=final+(1*wt);
        }
 
      path.unshift(curr);
      curr = curr.parent;
   }

  return ({"len":final ,"arr":path});
}