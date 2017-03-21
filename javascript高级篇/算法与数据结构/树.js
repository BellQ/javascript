/**
 * Created by hehe on 2017/3/6.
 */
function BinarySearchTree(){
    function Node(key){
        this.key=key;
        this.left=null;
        this.right=null;
    }
    this.root=null;
    if ((typeof this.insert !== 'function') && (typeof this.insert !== 'string')) {
        function insertNode(node,newNode){
            if(node.key>newNode.key){
                if(node.left===null){
                    node.left = newNode;
                }else {
                    insertNode(node.left, newNode);
                }
            }else {
                if(node.right===null){
                    node.right=newNode;
                }else {
                    insertNode(node.right, newNode);
                }
            }
        }
        BinarySearchTree.prototype.insert=function(key){
            var newNode=new Node(key);
            if(this.root===null){
                this.root=newNode;
            }else {
                insertNode(this.root,newNode)
            }
        };
        BinarySearchTree.prototype.inOrderTraverse = function(callback) {
            //中序遍历的私有方法,从小到大遍历
            function inOrderTraverseNode(node, callback) {
                if (node !== null) {
                    inOrderTraverseNode(node.left, callback);
                    callback(node.key);
                    inOrderTraverseNode(node.right, callback);
                }
            }
            inOrderTraverseNode(this.root, callback);
        };
        BinarySearchTree.prototype.preOrderTraverse = function(callback){
            //先序遍历的私有方法
            function preOrderTraverseNode(node,callback){
                if (node !== null) {
                    callback(node.key);
                    preOrderTraverseNode(node.left,callback);
                    preOrderTraverseNode(node.right,callback);
                }
            }
            preOrderTraverseNode(this.root,callback);
        };
        BinarySearchTree.prototype.postOrderTraverse= function(callback){
            //后序遍历的私有方法
            function preOrderTraverseNode(node,callback){
                if (node !== null) {
                    preOrderTraverseNode(node.left,callback);
                    preOrderTraverseNode(node.right,callback);
                    callback(node.key);
                }
            }
            preOrderTraverseNode(this.root,callback);
        };
        BinarySearchTree.prototype.min = function(){
            function minNode(node){
                if (node) {
                    while(node && node.left !== null){
                        node = node.left;
                    }
                    return node.key;
                }
                return null;
            }
            //调用内部方法
            return minNode(this.root);
        };
        BinarySearchTree.prototype.max = function(){
            function maxNode(node){
                if (node) {
                    while(node && node.right !== null){
                        node = node.right;
                    }
                    return node.key;
                }
                return null;
            }
            //调用内部方法
            return maxNode(this.root);
        };
        BinarySearchTree.prototype.search = function(key){
            function searchNode(node,key){
                if (node === null) {
                    return false;
                }
                if (node.key < key) {
                    return searchNode(node.right,key);
                }else if(node.key > key){
                    return searchNode(node.left,key);
                }else{
                    return true;
                }
            }
            return searchNode(this.root,key);
        };
        BinarySearchTree.prototype.remove = function(key){
            function findMinNode(node){
                if (node) {
                    while(node && node.left !== null){
                        node = node.left;
                    }
                    return node;
                }
                return null;
            }
            function removeNode(node,key){
                if (node === null) {
                    return null;
                }
                if (key < node.key) {
                    node.left = removeNode(node.left,key);
                    return node;
                }else if(key > node.key){
                    node.right = removeNode(node.right,key);
                    return node;
                }else{//键等于node.key
                    //第一种情况，一个叶节点
                    if (node.left === null && node.right === null) {
                        node = null;
                        return node;
                    }
                    //第二种情况 一个只有一个子节点的节点
                    if (node.left === null) {
                        node = node.right;
                        return node;
                    }else if (node.right === null){
                        node = node.left;
                        return node;
                    }
                    //第三种情况 一个有两个子节点的节点
                    var aux = findMinNode(node.right);
                    node.key = aux.key;
                    node.right = removeNode(node.right,aux.key);
                    return node;
                }
            }
            this.root = removeNode(this.root,key);
        };
    }
}

//基本使用
function hehe(val){
    console.log(val);
}
var tree=new BinarySearchTree();
for(let i=0;i<20;i++){
    if(i==0){
        tree.insert(15);
    }else{
        tree.insert(Math.floor(Math.random()*40));
    }
}
tree.inOrderTraverse(hehe); //中序遍历
tree.preOrderTraverse(hehe);//先序遍历
tree.postOrderTraverse(hehe);//后序遍历
console.log(tree.min());
console.log(tree.max());
console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');
tree.remove(7);
tree.inOrderTraverse(hehe);
