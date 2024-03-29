
function init(){
    picShow();
    bindEvent();
}
var img = $('img');
    imgLen = img.length,
    wrap = $('.wrapper'),
    curDisplay = 0,
    flag = true,
    timer = null,
    interval = 1500,
    nowIndex = 0;
    
function picShow(){
   
    var mlen = Math.floor(imgLen/2);
    
    var lNum, rNum;
    for(var i = 0;i<mlen;i++) {
        
        lNum = curDisplay -(i+1);
        img.eq(lNum).css({
            transform:'translateX('+(-150*(i+1)) +'px) translateZ('+ (200 - i*100)+'px) rotateY(30deg)'           
        })
        rNum = curDisplay +(i+1);
        if(rNum > imgLen-1){
            rNum -= imgLen;
        }
        img.eq(rNum).css({
            transform:'translateX('+(150*(i+1)) +'px) translateZ('+ (200 - i*100)+'px) rotateY(-30deg)'
        })
        img.removeClass('on');
    }
    img.eq(curDisplay).css({
        transform:'translateZ(300px)'
    }).addClass('on');
    wrap.on('transitionend',function(){
        flag = true;
    })
}
function bindEvent(){
    img.on('click',function(e){
        if(flag && !$(this).hasClass('on')){
            flag = false;
            nowIndex = $(this).index();
            console.log(nowIndex)
            move(nowIndex);
        }      
    }).hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            play();
        },interval)
    });
    timer = setInterval(function(){
        play();
    },interval)
}
function move(index){
    curDisplay = index;
    picShow();
}
function play(){
    if(nowIndex == imgLen - 1){
        nowIndex = 0;
    }else{
        nowIndex++;
    }
    move(nowIndex);
}
init();