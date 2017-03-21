/**
 * Created by hehe on 2017/2/16.
 */
function ArrayList() {
    this.array = [];
}
ArrayList.prototype = {
    constructor: ArrayList,
    insert: function(item) {
        this.array.push(item);
    },
    toString: function() {
        return this.array.join();
    },
    swap: function(index1, index2) {
        var aux = this.array[index2];
        this.array[index2] = this.array[index1];
        this.array[index1] = aux;
    },
    //冒泡排序
    bubbleSort: function() {
        var length = this.array.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - 1 - i; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1);
                }
            }
        }
    },
    //选择排序
    selectionSort: function() {
        var length = this.array.length;
        var indexMin;
        for (var i = 0; i < length - 1; i++) {
            indexMin = i;
            for (var j = i; j < length; j++) {
                if (this.array[indexMin] > this.array[j]) {
                    indexMin = j;
                }
            }
            if (indexMin !== i) {
                this.swap(indexMin, i);
            }
        }
    },
    //插入排序
    insertionSort: function() {
        var length = this.array.length;
        var j;
        var temp;
        for (var i = 1; i < length; i++) {
            temp = this.array[i];
            j = i;
            while (j > 0 && this.array[j - 1] > temp) {
                this.array[j] = this.array[j - 1];
                j--;
            }
            this.array[j] = temp;
        }
    },
    //归并排序
    mergeSort: function() {
        function mergeSortRec(array) {
            var length = array.length;
            if (length === 1) {
                return array;
            }
            var mid = Math.floor(length / 2);
            var left = array.slice(0, mid);
            var right = array.slice(mid, length);
            return merge(mergeSortRec(left), mergeSortRec(right));
        }

        function merge(left, right) {
            var result = [];
            var il = 0;
            var ir = 0;
            while (il < left.length && ir < right.length) {
                if (left[il] < right[ir]) {
                    result.push(left[il++]);
                } else {
                    result.push(right[ir++]);
                }
            }
            while (il < left.length) {
                result.push(left[il++]);
            }
            while (ir < right.length) {
                result.push(right[ir++]);
            }
            return result;
        }
        this.array = mergeSortRec(this.array);
    },
    //快速排序
    quickSort:function(){
        function sort(array){
            if (array.length <= 1) {
                return array;
            }
            var pivotIndex = Math.floor(array.length/2);
            var pivot = array.splice(pivotIndex,1)[0];
            var left = [];
            var right = [];
            for(var i = 0; i < array.length; i++){
                if (array[i] < pivot) {
                    left.push(array[i]);
                }else{
                    right.push(array[i]);
                }
            }
            return sort(left).concat([pivot],sort(right));
        }

        this.array = sort(this.array);
    }
};

//验证
function createNonSortedArray(size) {
    var array = new ArrayList();
    for (var i = size; i > 0; i--) {
        //(function(i) {
        array.insert(Math.floor(Math.random()*1000));
        //})(i);
    }
    return array;
}
//冒泡排序
var array = createNonSortedArray(50);
console.log(array.toString());
array.bubbleSort();
console.log(array.toString());
//选择排序
console.log(array.toString());
array.selectionSort();
console.log(array.toString());
//插入排序
console.log(array.toString());
array.insertionSort();
console.log(array.toString());
//归并排序
console.log(array.toString());
array.mergeSort();
console.log(array.toString());
//快速排序
console.log(array.toString());
array.quickSort();
console.log(array.toString());