/**
 * Created by hehe on 2017/3/6.
 */
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

//栈的检测

var stack=new Stack();
console.log(stack.isEmpty());
stack.push('yanyan');
stack.push('li');
console.log(stack.peek());
stack.push('love');
stack.pop();
console.log(stack.size());
console.log(stack.print());
stack.pop();
console.log(stack.size());
console.log(stack.peek());
stack.clear();

//栈的应用  对正整数的二进制转换

function toBinary(num){
    var stack=new Stack();
    var temp;
    var numStr='';
    while (num>0){
        temp=num%2;
        stack.push(temp);
        num=Math.floor(num/2);
    }
    while (!stack.isEmpty()){
        numStr+=stack.pop().toString();
    }
    return numStr;
}
console.log(toBinary(2));
console.log(toBinary(10));

//拓展 对正整数的十六进制转换

function toHexadecimal(num){
    var stack=new Stack();
    var temp;
    var numStr='';
    while (num>0){
        temp=num%16;
        temp=temp==10?
            'A':temp==11?
            'B':temp==12?
            'C':temp==13?
            'D':temp==14?
            'E':temp==15?
            'F':temp;
        stack.push(temp);
        num=Math.floor(num/16);
    }
    while (!stack.isEmpty()){
        numStr+=stack.pop().toString();
    }
    return numStr;
}
console.log(toHexadecimal(15));
console.log(toHexadecimal(255));

//二次拓展  对正整数的进制转换
function toHex(num,hex){
    var stack=new Stack();
    var temp;
    var numStr='';
    while (num>0){
        temp=num%hex;
        temp=temp==10?
            'A':temp==11?
            'B':temp==12?
            'C':temp==13?
            'D':temp==14?
            'E':temp==15?
            'F':temp;
        stack.push(temp);
        num=Math.floor(num/hex);
    }
    while (!stack.isEmpty()){
        numStr+=stack.pop().toString();
    }
    return numStr;
}
console.log(toHex(255, 2));
console.log(toHex(255, 16));
