function LinkedList(){
    function Node(ele){
        this.element = ele;
        this.next = null;
    }
    this.head = null;
    this.length = 0;
    //通过对一个方法append判断就可以知道是否设置了prototype
    if((typeof this.append !== 'function')&&(typeof this.append !== 'string')){
        //添加元素
        LinkedList.prototype.append = function(ele){
            var node = new Node(ele);
            var current;
            if(this.head === null){
                this.head = node;
            }else{
                current = this.head;
                while(current.next !== null){
                    current = current.next;
                }
                current.next = node;
            }
            this.length++;
        };
        //插入元素，成功true，失败false
        LinkedList.prototype.insert = function(position,ele){
            if(position > -1 && position <= this.length){
                var current = this.head;
                var previous;
                var index = 0;
                var node = new Node(ele);
                if(position == 0){
                    node.next = current;
                    this.head = node;
                }else{
                    while(index++ < position){
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }
                this.length++;
                return true;
            }else{
                return false;
            }
        };
        //根据位置删除指定元素，成功 返回元素， 失败 返回null
        LinkedList.prototype.removeAt = function(position){
            if(position > -1 && position <= this.length){
                var current = this.head;
                var previous = null;
                var index = 0;
                if(position == 0){
                    this.head = current.next;
                }else{
                    while(index++ < position){
                        previous = current;
                        current = current.next;
                    }
                    previous.next = current.next;
                }
                this.length--;
                return current.element;
            }else{
                return null;
            }
        };
        //根据元素删除指定元素，成功 返回元素， 失败 返回null
        LinkedList.prototype.remove = function(ele){
            var index = this.indexOf(ele);
            return this.removeAt(index);
        };
        //返回给定元素的索引，如果没有则返回-1
        LinkedList.prototype.indexOf = function(ele){
            var current = this.head;
            var index = 0;
            while(current){
                if(current.element === ele){
                    return index;
                }
                index++;
                current = current.next;
            }
            return -1;
        };
        LinkedList.prototype.isEmpty = function(){
            return this.length === 0;
        };
        LinkedList.prototype.size = function(){
            return this.length;
        };
        LinkedList.prototype.toString = function(){
            var string = '';
            var current = this.head;
            while(current){
                string += current.element;
                current = current.next;
            }
            return string;
        };
        LinkedList.prototype.getHead = function(){
            return this.head;
        };
    }
}

//基本使用
var linkedList=new LinkedList();
console.log(linkedList.isEmpty());
linkedList.append('Bell');
linkedList.append('Love');
linkedList.insert(2,'You');
linkedList.insert(1,'Q');
console.log(linkedList.toString());
console.log(linkedList.indexOf('Q'));
console.log(linkedList.size());
console.log(linkedList.removeAt(2));
console.log(linkedList.toString());

//双向链表
function inheritPrototype(subType, superType) {
    function object(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    var prototype = object(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
inheritPrototype(DoublyLinkedList, LinkedList);
function DoublyLinkedList() {
    function Node(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
    this.tail = null;
    LinkedList.call(this);
    //与LinkedList不同的方法自己实现。
    this.insert = function(position, element) {
        if (position > -1 && position <= this.length) {
            var node = new Node(element);
            var current = this.head;
            var previous;
            var index = 0;
            if (position === 0) {
                if (!this.head) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = current;
                    current.prev = node;
                    this.head = node;
                }
            } else if (position == this.length) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
                current.prev = node;
                node.prev = previous;
            }
            this.length++;
            return true;
        } else {
            return false;
        }
    };
    this.append = function(element) {
        var node = new Node(element);
        var current;
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
            node.prev = current;
            this.tail = node;
        }
        this.length++;
    };
    this.removeAt = function(position) {
        if (position > -1 && position < this.length) {
            var current = this.head;
            var previous;
            var index = 0;
            if (position === 0) {
                this.head = current.next;
                if (this.length === 1) {
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if (position === (this.length - 1)) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.length--;
            return current.element;
        } else {
            return false;
        }
    };
}

//双向链表的基本使用
var doublyList =new DoublyLinkedList();
console.log(doublyList.isEmpty());
doublyList.append('Bell');
doublyList.append('Love');
doublyList.insert(2,'You');
doublyList.insert(1,'Q');
console.log(doublyList.toString());
console.log(doublyList.indexOf('Q'));
console.log(doublyList.size());
console.log(doublyList.removeAt(2));
console.log(doublyList.toString());