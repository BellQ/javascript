/**
 * Created by hehe on 2017/3/7.
 */
//栈的创建
function Stack(){
    this.item=[];
}
Stack.prototype= {
    constructor: Stack,
    push: function (element) {
        this.item.push(element);
    },
    pop:function (){
        return this.item.pop();
    },
    peek:function(){
        return this.item[this.item.length-1];
    },
    isEmpty:function(){
        return this.item.length===0;
    },
    clear:function(){
        this.item=[];
    },
    size:function(){
        return this.item.length
    },
    print:function(){
        return this.item.toString();
    }
};

//队列的创建
function Queue(){
    this.item=[];
}
Queue.prototype={
    constructor:Queue,
    enQueue:function(elements){
        this.item.push(elements);
    },
    deQueue:function(){
        return this.item.shift();
    },
    front:function(){
        return this.item[0]
    },
    isEmpty:function(){
        return this.item.length===0;
    },
    clear:function(){
        this.item=[];
    },
    size:function(){
        return this.item.length
    },
    print:function(){
        return this.item.toString();
    }
};

//字典的创建
function Dictionary(){
    this.item={}
}
Dictionary.prototype={
    constructor:Dictionary,
    clear:function(){
        this.item={}
    },
    size: function() {
        return Object.keys(this.item).length;
    },
    has:function(key){
        return key in this.item;
    },
    set:function(key,val){
        return this.item[key]=val;
    },
    remove: function(key) {
        if (this.has(key)) {
            delete this.item[key];
            return true;
        }
        return false;
    },
    get: function(key) {
        return this.has(key) ? this.item[key] : undefined;
    },
    values: function() {
        var values = [];
        for (var key in this.item) {
            if (this.has(key)) {
                values.push(key);
            }
        }
        return values;
    },
    keys: function() {
        return Object.keys(this.item);
    },
    getItems: function() {
        return this.item;
    }
};

function Graph() {
    this.items=[];//存放点的数组
    this.addList=new Dictionary();//映射边的字典
    if ((typeof this.addVertex !== 'function') && (typeof this.addVertex !== 'string')) {
        //私有方法，标记节点颜色 未被访问过是white 被发现是grey 已被探索black。
        function initializeColor(vertices) {
            var color = [];
            for (var i = 0; i < vertices.length; i++) {
                color[vertices[i]] = 'white';
            }
            return color;
        }
        //添加节点
        Graph.prototype.addVertex = function(v) {
            this.items.push(v);
            this.addList.set(v, []); //给节点v设置一个空数组作为值。
        };
        //添加边
        Graph.prototype.addEdge = function(v, w) {
            this.addList.get(v).push(w); //先获取v节点对应的数组，然后把w推入数组中，这样就表示一条v到w的边
            this.addList.get(w).push(v);
        };
        //广度优先，v为节点，cb为回调函数
        Graph.prototype.bfs = function(v, cb) {
            var color = initializeColor(this.items);
            var queue = new Queue(); //存储待访问和待探索的节点
            queue.enQueue(v);
            while (!queue.isEmpty()) {
                var u = queue.deQueue();
                //获取u的相邻节点列表
                var neighbors = this.addList.get(u);
                color[u] = 'grey';
                for (var i = 0; i < neighbors.length; i++) {
                    var w = neighbors[i];
                    //如果从没有标记过，则标记为grey，加入队列
                    if (color[w] === 'white') {
                        color[w] = 'grey';
                        queue.enQueue(w);
                    }
                }
                //所有相邻节点都被标记了，所以改为黑色
                color[u] = 'black';
                //如果对于标记过得节点有操作，通过callback操作
                if (cb) {
                    cb(u);
                }
            }
        };
        //用BFS实现最短路径
        Graph.prototype.BFS = function(v, callback) {
            var color = initializeColor(this.items);
            var queue = new Queue(); //存储待访问和待探索的节点
            var d = [];
            var pred = [];
            queue.enQueue(v);
            for (var i = 0; i < this.items.length; i++) {
                d[this.items[i]] = 0;
                pred[this.items[i]] = null;
            }
            while (!queue.isEmpty()) {
                var u = queue.deQueue();
                //获取u的相邻节点列表
                var neighbors = this.addList.get(u);
                color[u] = 'grey';
                for (var i = 0; i < neighbors.length; i++) {
                    var w = neighbors[i];
                    //如果从没有标记过，则标记为grey，加入队列
                    if (color[w] === 'white') {
                        color[w] = 'grey';
                        d[w] = d[u] + 1;
                        pred[w] = u;
                        queue.enQueue(w);
                    }
                }
                //所有相邻节点都被标记了，所以改为黑色
                color[u] = 'black';
                //如果对于标记过得节点有操作，通过callback操作
                if (callback) {
                    callback(u);
                }
            }
            return {
                distances: d,
                predecessors: pred
            }
        };
        //深度优先基本实现
        Graph.prototype.dfs = function(callback) {
            var self = this;
            function dfsVisit(u, color, callback) {
                color[u] = 'grey';
                if (callback) {
                    callback(u);
                }
                var neighbors = self.addList.get(u);
                for (var i = 0; i < neighbors.length; i++) {
                    var w = neighbors[i];
                    if (color[w] === 'white') {
                        dfsVisit(w, color, callback);
                    }
                }
                color[u] = 'black';
            }
            var color = initializeColor(this.items);
            for (var i = 0; i < this.items.length; i++) {
                if (color[this.items[i]] === 'white') {
                    dfsVisit(this.items[i], color, callback);
                }
            }
        };
        //DFS可以实现输出被访问顶点的顺序
        Graph.prototype.DFS = function(){
            var time = 0;
            var self = this;
            function DFSVisit(u,color,d,f,p){
                //console.log('discovered ' + u);
                color[u] = 'grey';
                d[u] = ++time;
                var neighbors = self.addList.get(u);
                for(var i = 0; i < neighbors.length; i++){
                    var w = neighbors[i];
                    if (color[w] === 'white') {
                        p[w] = u;
                        DFSVisit(w,color,d,f,p);
                    }
                }
                color[u] = 'black';
                f[u] = ++time;
                //console.log('explored ' + u);
            }
            var color = initializeColor(this.items);
            var d = [];
            var f = [];
            var p = [];
            var time = 0;
            for(var i = 0; i < this.items.length; i++){
                f[this.items[i]] = 0;
                d[this.items[i]] = 0;
                p[this.items[i]] = null;
            }
            for(var i = 0; i< this.items.length; i++){
                if (color[this.items[i]] === 'white') {
                    DFSVisit(this.items[i], color, d, f, p);
                }
            }
            return {
                discovery:d,
                finished:f,
                predecessors:p
            }
        };
        Graph.prototype.toString = function() {
            var s = '';
            for (var i = 0; i < this.items.length; i++) {
                s += this.items[i] + ' -> ';
                var neighbors = this.addList.get(this.items[i]);
                for (var j = 0; j < neighbors.length; j++) {
                    s += neighbors[j] + ' ';
                }
                s += ',';
            }
            return s;
        };
    }
}

//基本使用
var graph = new Graph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
//添加点
for (var i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
//添加点之间的关系
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());

function hehe(value) {
    console.log('Visited vertex: ' + value);
}
graph.bfs(myVertices[2],hehe); //广度优先搜索

console.log(graph.BFS(myVertices[0])); //广度优先最短路径算法

graph.dfs(hehe);//深度优先搜索

console.log(graph.DFS());//深度优先搜索查找访问;

