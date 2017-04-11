/**
 * Created by hehe on 2017/3/6.
 */
function Set(){
    this.item={}
}
Set.prototype={
    constructor: Set,
    clear:function(){
        this.item={}
    },
    size:function(){
      return Object.keys(this.item).length;
    },
    values:function(){
        return Object.keys(this.item)
    },
    has:function(val){
        return val in this.item;
    },
    add:function(val){
        if(!this.has(val)){
            this.item[val]=val;
            return true
        }else{
            return false;
        }
    },
    remove:function(val){
        if(this.has(val)){
            delete this.item[val];
            return true;
        }else {
            return false;
        }
    },
    union:function(unionSet){
        var set=new Set();
        for(var i= 0;i<this.values().length;i++){
            set.add(this.values()[i])
        }
        for(var i=0;i<unionSet.values().length;i++){
            set.add(unionSet.values()[i])
        }
        return set;
    },
    intersection: function(otherSet) {
        var set = new Set();
        for (var i = 0; i < this.values().length; i++) {
            if (otherSet.has(this.values()[i])) {
                set.add(this.values()[i]);
            }
        }
        return set;
    },
    difference: function(otherSet) {
        var set = new Set();
        for (var i = 0; i < this.values().length; i++) {
            if (!otherSet.has(this.values()[i])) {
                set.add(this.values()[i]);
            }
        }
        return set;
    },
    subset: function(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            var values = this.values();
            for (var i = 0; i < values.length; i++) {
                if (!otherSet.has(values[i])) {
                    return false;
                }
            }
        }
        return true;
    },
};

//基本使用
//var set = new Set();
//set.add('li');
//console.log(set.values());
//console.log(set.has('love'));
//console.log(set.size());
//set.add('BellQ');
//console.log(set.values());
//console.log(set.has('li'));
//console.log(set.size());
//set.remove('li');
//console.log(set.values());

//集合的运算
var setA=new Set();
setA.add('li');setA.add('yan');setA.add('ca');setA.add('bellQ');setA.add('code');setA.add(2);setA.add(5);setA.add(1);
var setB=new Set();
setB.add('li');setB.add(2);setB.add(4);setB.add(1);setB.add('BellQ');setB.add('ha');setB.add('yun');setB.add('data');

//console.log(setA.union(setB));
//console.log(setA.intersection(setB));
console.log(setA.difference(setB));
//console.log(setA.subset(setB));