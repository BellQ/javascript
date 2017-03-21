/**
 * Created by hehe on 2017/3/6.
 */
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

//基本使用
var queue=new Queue();
console.log(queue.isEmpty());
queue.enQueue('li');
queue.enQueue('yan');
queue.enQueue('love');
console.log(queue.size());
console.log(queue.print());
queue.deQueue();
console.log(queue.front());
console.log(queue.print());
queue.clear();
console.log(queue.size());

//队列的应用 优先队列的定义
function PriorityQueue(){
    Queue.call(this);
};
PriorityQueue.prototype = new Queue();
PriorityQueue.prototype.constructer = PriorityQueue;
PriorityQueue.prototype.enqueue = function(element,priority){
    function QueueElement(tempelement,temppriority){
        this.element = tempelement;
        this.priority = temppriority;
    }
    var queueElement = new QueueElement(element,priority);
    if(this.isEmpty()){
        this.item.push(queueElement);
    }else{
        var added = false;
        for(var i = 0; i < this.item.length;i++){
            if(this.item[i].priority > queueElement.priority){
                this.item.splice(i,0,queueElement);
                added = true;
                break;
            }
        }
        if(!added){
            this.item.push(queueElement);
        }
    }
};
//这个方法可以用Queue的默认实现
PriorityQueue.prototype.print = function(){
    var result ='';
    for(var i = 0; i < this.item.length;i++){
        result += JSON.stringify(this.item[i]);
    }
    return result;
};

//优先队列的基本使用
var priorityQueue = new PriorityQueue();
priorityQueue.enqueue("Coding",4);
priorityQueue.enqueue("Q", 2);
priorityQueue.enqueue("Love", 3);
priorityQueue.enqueue("Bell", 1);
console.log(priorityQueue.size());
console.log(priorityQueue.print());
priorityQueue.deQueue();
console.log(priorityQueue.front());

