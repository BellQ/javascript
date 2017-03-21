         /**
 * Created by hehe on 2017/3/6.
 */
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

//基本使用
var dictionary = new Dictionary();
console.log(dictionary.size());
dictionary.set('FirstName', 'Li');
dictionary.set('LastName', 'Yan');
dictionary.set('Name', 'BellQ');
console.log(dictionary.has('Name'));
console.log(dictionary.get('Name'));
console.log(dictionary.values());
dictionary.remove('LastName');
console.log(dictionary.keys());
console.log(dictionary.getItems());