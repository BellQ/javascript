/**
 * Created by hehe on 2017/2/21.
 */
var arr = [1,2,3,1,1,1,1];
function toHeavy(array){
    //这是一个缓存对象，用来实现过滤到重复的数据
    var cache = {};
    //定义一个中间数组，用来实现当容器
    var cacheArr = [];
    for(var i = 0,len = array.length;i<len;i++){
        if(!cache[array[i]]){
            cacheArr.push(array[i]);
            cache[array[i]] = array[i];
        };
    };
    return cacheArr;
};
arr = toHeavy(arr);//arr ==  [1,2,3]

var arr = [1,2,3,1,1,1,1,1,1];
function toHeavy(array){
    var cache = [];
    for(var i = 0,len = array.length;i<len;i++){
        //用闭包，防止isHeavy向外部暴露，当然如果用es6的话，可以用let对isHeavy进行声明也能达到同样的目的
        //因为js中没有块级作用域
        (function(){
            var isHeavy = false;
            for(var j = 0,_len = cache.length;j<_len;j++){
                if(cache[j] == array[i]){
                    isHeavy = true;
                    break;
                };
            };
            if(!isHeavy){
                //如果不是重复的，那么就执行把当前值推送的cache里面
                cache.push(array[i]);
            };
        })();
    };
    return cache;
};

arr = toHeavy(arr);