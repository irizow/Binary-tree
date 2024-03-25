class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = this.buildTree(array, 0, array.length-1);
        this.count = 0;
    }

    buildTree(array , start = 0, end = array.length-1) {
        let mid = Math.ceil((start+end)/2);
        let node = new Node(array[mid]);

        if(start>end) {
            return null;
        }
        
        node.left = this.buildTree(array, start, mid-1);
        node.right = this.buildTree(array, mid+1, end);

        
        if(this.root === undefined) {
            this.root = node;
        }
        


        return node }

    size() {
        console.log("size: " + this.count)
        return this.count
    }

    insert(value, node = this.root) {
        if (!node) {
            this.root = new Node(value);
            return this.root;
        }
    
        if (value === node.data) {
            console.log("This value already exists");
            return node; 
        }
    
        if (value < node.data) {
            if (node.left) {
                node.left = this.insert(value, node.left);
            } else {
                node.left = new Node(value);
            }
        } else {
            
            if (node.right) {
                node.right = this.insert(value, node.right);
            } else {
                node.right = new Node(value);
            }
        }
        this.count++
        return node; 
    }

    delete(value, node = this.root) {
        
        if (!node) {
            return null;
        }

        if(value < node.data) {
            node.left = this.delete(value, node.left);
        }

        else if(value > node.data) {
            node.right = this.delete(value, node.right);
        }
        else {
            if(!node.left && !node.right) {
                return null;
            }
            else if(!node.left) {
                return node.right;
            }
            else if(!node.right) {
                return node.left;
            }
            else {
                let minValue = this.minValue(node.right);
                node.data = minValue;
                node.right = this.delete(minValue, node.right);
            }
        }
            return node;
        }

        minValue(node) {
            if (!node) {
                return null; 
            }
            let current = node;
            while (current.left !== null) {
                current = current.left;
            }
            return current.data; 
        }


    

    

      
    
    

    find(value, node = this.root) {
        if(value === node.data) {
            console.log("value " + value + " is in node " + node.data);
            return node;
        }

    if(value<node.data) {
        if(node.left) {
        this.find(value, node.left);}
        else {
            console.log("Value not found");
        }
    }

    else if(value>node.data) {
        if(node.right) {
            this.find(value, node.right);}
            else {
            console.log("Value not found");
            }
    }
        return node;
    }



    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
            console.log("emptytree")
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };

    //by Level
    levelOrder(callback) {
        let result = [];
        let queue = [];

        queue.push(this.root);
        
        while(queue.length){
            let currentNode = queue.shift();
            if(callback) {
                node.data = callback(node.data);}
            result.push(currentNode.data);

            if(currentNode.left) {
                queue.push(currentNode.left)
            }

            if(currentNode.right) {
                queue.push(currentNode.right)
            }
        }
        console.log(result)

    }

    //left,root,right
    inOrder(callback) {
        let result = [];
        const traverse = (node = this.root) => {
            if(node.left) {
                traverse(node.left);
            }
            if(callback) {
            node.data = callback(node.data);}
            result.push(node.data);

            if(node.right) {
                traverse(node.right)
            }
            

        }
        traverse(this.root);
        console.log(result);
        return result;
    }

    //root, left, right
    preOrder(callback) {
        let result = [];
        const traverse = (node = this.root) => {
            if(callback) {
                node.data = callback(node.data);}
            result.push(node.data);

            if(node.left) {
                traverse(node.left);
            }

            if(node.right) {
                traverse(node.right)
            }
            

        }
        traverse(this.root);
        console.log(result);
        return result;
    }

    //left,right,node
    postOrder(callback) {
        let result = [];
        const traverse = (node = this.root) => {
            if(node.left) {
                traverse(node.left);
            }

            if(node.right) {
                traverse(node.right)
            }
            if(callback) {
                node.data = callback(node.data);}
            result.push(node.data);
            

        }
        traverse(this.root);
        console.log(result);
        return result;
    }

    height(value) {
        let height = 0;
        let node = this.find(value);
        const traverse = (node) => {

            if(!node.left && !node.right) {
                console.log("Height :" + height)
                return height;
            }

            else if(node.left && !node.right) {
                height++
                traverse(node.left);
        
            }
            else if(!node.left && node.right) {
                height++
                traverse(node.right);
        
            }
        }
            
        console.log("Height of " + value + " is " + height)
        traverse(node);
    }


    depth(node) {
        if (!node) {
            return 0; // The depth of an empty tree or subtree is 0
        }
        // Calculate the depth of the subtree rooted at `node`
        return 1 + Math.max(this.depth(node.left), this.depth(node.right));
    }

    isBalanced(node = this.root) {
        if (node === null) {
            return true; // An empty tree is balanced
        }

        // Calculate the depth of the left and right subtrees
        let leftDepth = this.depth(node.left);
        let rightDepth = this.depth(node.right);

        // Check the balance condition for the current node
        if (Math.abs(leftDepth - rightDepth) > 1) {
            console.log(false);
            return false; // The current subtree is not balanced
        } 
        else if(Math.abs(leftDepth - rightDepth <= 1)) {
            console.log(true);
            return true;
        }
        else {
            // Recursively check if the left and right subtrees are balanced
            return this.isBalanced(node.left) && this.isBalanced(node.right);
        }
    }
    balanceTree() {
        const sortedArr = this.inOrder().sort((a, b) => a - b);
        console.log("sorted : " + sortedArr)
        this.root = this.buildTree(sortedArr);
    }
}


function double(value){
    return value * 2;
}

function halfIt(value) {
    return value / 2; 
}

function print(value) {
    return console.log(value);
}
    



let array = [0, 8, 9, 13, 16, 20, 24, 30];
const binaryTree = new BinarySearchTree();
binaryTree.buildTree(array, 0, array.length -1);
binaryTree.find(8);
binaryTree.insert(6);
binaryTree.levelOrder(double);
binaryTree.levelOrder(halfIt);
binaryTree.minValue();
binaryTree.height(30);
binaryTree.isBalanced();
binaryTree.balanceTree();
binaryTree.isBalanced();

binaryTree.prettyPrint()



