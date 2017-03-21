/**
 * Created by hehe on 2017/3/6.
 */
//lose-los散列函数
function loseloseHashCode(key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash % 37;
}

function HashTable() {
    this.table = [];
}
HashTable.prototype = {
    constructor: HashTable,
    put: function(key, value) {
        var position = loseloseHashCode(key);
        console.log(position + '- ' + key);
        this.table[position] = value;
    },
    get: function(key) {
        return this.table[loseloseHashCode(key)];
    },
    remove: function(key) {
        this.table[loseloseHashCode(key)] = undefined;
    }
};
//基本使用
var hash = new HashTable();
hash.put('BellQ', 'qnyeng06153320@qq.com');
hash.put('Li', 'Lisan@163.com');
hash.put('Toms', 'toms@qq.com');
console.log(hash.get('BellQ'));
console.log(hash.get('Bellq'));
hash.remove('Toms');
console.log(hash.get('Toms'));

//优化 方案一 分离链接
function HashTable() {
    this.table = [];
    //lose-los散列函数
    function loseloseHashCode(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        //console.log(key + " - " + (hash % 37));
        return hash % 37;
    }

    function ValuePair(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    }
    if ((typeof this.put !== 'function') && (typeof this.put !== 'string')) {
        HashTable.prototype.put = function(key, value) {
            var position = loseloseHashCode(key);
            if (this.table[position] === undefined) {
                this.table[position] = new LinkedList();
            }
            this.table[position].append(new ValuePair(key, value));
        };
        HashTable.prototype.get = function(key) {
            var position = loseloseHashCode(key);
            if (this.table[position] !== undefined) {
                var current = this.table[position].getHead();
                while (current.next) {
                    if (current.element.key === key) {
                        return current.element.value;
                    }
                    current = current.next;
                }
                //第一个元素或者最后一个元素
                if (current.element.key === key) {
                    return current.element.value;
                }
            } else {
                return undefined;
            }
        };
        HashTable.prototype.remove = function(key) {
            var position = loseloseHashCode(key);
            if (this.table[position] !== undefined) {
                var current = this.table[position].getHead();
                while (current.next) {
                    if (current.element.key === key) {
                        this.table[position].remove(current.element);
                        if (this.table[position].isEmpty()) {
                            this.table[position] = undefined;
                        }
                        return true;
                    }
                    current = current.next;
                }
                //检查是否是第一个或者最后一个
                if (current.element.key === key) {
                    this.table[position].remove(current.element);
                    if (this.table[position].isEmpty()) {
                        this.table[position] = undefined;
                    }
                    return true;
                }
            }
            return false;
        };
    }
}
//基本使用
var hash = new HashTable();
hash.put('BellQ', 'qnyeng06153320@qq.com');
hash.put('Li', 'Lisan@163.com');
hash.put('Toms', 'toms@qq.com');
console.log(hash.get('BellQ'));
console.log(hash.get('Bellq'));
hash.remove('Toms');
console.log(hash.get('Toms'));

//优化 方案二 线性查探
function HashTable() {
    this.table = []; //lose-los散列函数
    function loseloseHashCode(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        //console.log(key + " - " + (hash % 37));
        return hash % 37;
    }

    function ValuePair(key, value) {
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    }
    if ((typeof this.put !== 'function') && (typeof this.put !== 'string')) {
        HashTable.prototype.put = function(key, value) {
            var position = loseloseHashCode(key);
            if (this.table[position] === undefined) {
                this.table[position] = new ValuePair(key, value);
            } else {
                var index = position + 1;
                while (this.table[index] !== undefined) {
                    index++;
                }
                this.table[index] = new ValuePair(key, value);
            }
        };
        HashTable.prototype.get = function(key) {
            var position = loseloseHashCode(key);
            if (this.table[position] !== undefined) {
                if (this.table[position].key === key) {
                    return this.table[position].value;
                } else {
                    var index = position + 1;
                    //index不超过数组的长度
                    while (((this.table[index] === undefined) || (this.table[index].key !== key)) && (index < this.table.length)) {
                        index++;
                    }
                    if (this.table[index] && (this.table[index].key === key)) {
                        return this.table[index].value;
                    } else {
                        return undefined;
                    }
                }
            } else {
                return undefined;
            }
        };
        HashTable.prototype.remove = function(key) {
            var position = loseloseHashCode(key);
            if (this.table[position] !== undefined) {
                if (this.table[position].key === key) {
                    this.table[position] = undefined;
                    return true;
                } else {
                    var index = position + 1;
                    while ((this.table[index] === undefined) || (this.table[index].key !== key)) {
                        index++;
                    }
                    if (this.table[index].key === key) {
                        this.table[index] = undefined;
                        return true;
                    }
                }
            } else {
                return false;
            }
        };
    }
}
var hash = new HashTable();
hash.put('BellQ', 'qnyeng06153320@qq.com');
hash.put('Li', 'Lisan@163.com');
hash.put('Toms', 'toms@qq.com');
console.log(hash.get('BellQ'));
console.log(hash.get('Bellq'));
hash.remove('Toms');
console.log(hash.get('Toms'));