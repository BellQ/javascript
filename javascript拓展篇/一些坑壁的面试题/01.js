/**
 * Created by hehe on 2017/3/2.
 */
function fn1(){
    for(var i=0;i<4;i++){
        var tc=setTimeout(function(i){
            console.log(i);
            console.log(tc);
            clearTimeout(tc);
            console.log(tc);
        },0,i);
    }
}
fn1();

//function fn2(){
//    for(var i=0;i<4;i++){
//        var tc=setTimeout(function(){
//            console.log(i);
//            clearTimeout(tc)
//        },10);
//    }
//}
//fn2();

//function fn3(){
//    for(var i=0;i<4;i++){
//        var tc=setInterval(function(i,tc){
//            console.log(i);
//            clearInterval(tc)
//        },10,i,tc);
//    }
//}
//fn3();