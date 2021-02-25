


class  BinaryHeap{
	constructor(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
	}

    sinkDown(n) {
		var element = this.content[n];
		while (n > 0) {
			var parentN = ((n + 1) >> 1) - 1;
			var parent = this.content[parentN];
			if (this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				n = parentN;
			}
			else {
				break;
			}
		}
	}
  
  
    bubbleUp(n) {
		var length = this.content.length;
		var element = this.content[n];
		var elemScore = this.scoreFunction(element);
		while (true) {
			var child2N = (n + 1) << 1;
			var child1N = child2N - 1;
			var swap = null;
			var child1Score;
			if (child1N < length) {
			var child1 = this.content[child1N];
			child1Score = this.scoreFunction(child1);
			if (child1Score < elemScore) {
				swap = child1N;
			}
		}
		if (child2N < length) {
			var child2 = this.content[child2N];
			var child2Score = this.scoreFunction(child2);
			if (child2Score < (swap === null ? elemScore : child1Score)) {
				swap = child2N;
			}
		}

		if (swap !== null) {
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}
		else {
			break;
		}
     }
    }

    push(element) {
		this.content.push(element);
		this.sinkDown(this.content.length - 1);
	}

    pop(){
		var result = this.content[0];
		var end = this.content.pop();
		if (this.content.length > 0) {
			this.content[0] = end;
			this.bubbleUp(0);
		}
		return result;
	}
  
   remove(node) {
		var i = this.content.indexOf(node);
		var end = this.content.pop();
		if (i !== this.content.length - 1) {
			this.content[i] = end;
			if (this.scoreFunction(end) < this.scoreFunction(node)) {
			this.sinkDown(i);
		}
		else {
			this.bubbleUp(i);
		}
		}
	}

	size() {
		return this.content.length;
	}

	rescoreElement(node) {
		this.sinkDown(this.content.indexOf(node));
	}
  
}
