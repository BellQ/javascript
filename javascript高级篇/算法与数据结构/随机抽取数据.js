/**
 * Created by hehe on 2017/2/21.
 */
var arr = ['赤','橙','黄','绿','青','蓝','紫','小艳','小华','老王','呵呵','哈哈'];

function getArr(num,array){
    //num表示要去多少个，它不能大于要取的那个数组的最大长度，如果超过了那么就等于它的长度
    var aLength = array.length;
    if(num>=aLength){
        num = aLength;
    };
    var cacheArr = [];
    //我们用一个数组保存原来的数组
    //记住千万能直接赋值，因为数组是一个引用，这样不能保持原来的数组
    //这里也可以用originArr = array.slice()
    var originArr = (function(){
        var arr = [];
        for(var i = 0,len = array.length;i<len;i++){
            arr.push(array[i]);
        };
        return arr;
    })();
    for(var i = 0;i<num;i++){
        //array.length不能写成上面的aLength，因为aLength是固定的值，而array.length随着array的改变是自动更新的
        //Math.random() * array.length得到的是一个介于长度和零之间的一个值，包括0但不包含长度值
        //我们算出的是一个浮点值，所以我们必须把它转化成整数
        //因为不能超过最大长度值，所以应该向下取整
        var _index = Math.floor(Math.random() * array.length);
        cacheArr.push(array[_index]);
        //记住一定，取出来之后，一定删除原来位置上的数组值
        //要不然数组更新不了
        array.splice(_index,1);
    };
    //取回原来的数组
    array = originArr;
    console.log(array);
    return cacheArr;
};
var brr = getArr(5,arr);
console.log(brr);