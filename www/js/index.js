document.addEventListener("deviceready", onDeviceready);

var pic = new Array('car.png', 'house.png', 'money.png');
var name = new Array("车房钱");
var opac = 0;
var all_roll = 0;
var u_roll = 0;
var timeId = null;
// var rang = 0;

function onDeviceready() {
    console.log('启动。。。');
    $('#test1').click(function () {
        $("#shakeimg").animate({
            height: '-=100px',
            width: '-=100px'
        });
        $('#heci').css("display","none");
        opac = 0;
        console.log("已重置样式");
        console.log('触发按钮');
        startWatch();
    });
}

// ---计时器，用于执行样式调整--
function start() {
    $("#shakebottom").animate({
        height: '+=150px',
        marginTop: '0px'
    });
    console.log("下滑1");
    $("#shaketop").animate({
        height: '+=150px',
        marginBottom: '0px'
    });
    console.log('上滑1');

    var rang = Math.floor(Math.random() * 3); //随机生成0-2的数字，方便取出图片
    console.log(rang);
    $('#shakeimg').attr("src", "img/" + pic[rang]);
    console.log(pic[rang]);
    $('#heci').text("恭喜你，摇出了：" + name[rang] + "!!!");
    console.log(name[rang]);
    // console.log('调用定时器来显示图片');
    // timeId = setInterval(pic_change, 50);
    $("#shakeimg").fadeIn(500);
    console.log("显示照片");
    $("#heci").fadeIn(3000);
    console.log("显示文字");
}

//---调整样式--
// function pic_change() {
//     if (opac == 1) {
//         console.log('停止定时器');
//         clearInterval(timeId);
//     } else {
//         opac = opac + 0.04;
//         $('#shakeimg').css("opacity", opac);
//         $('#heci').css("opacity", opac);
//     }
// }

//---监视设备的加速度
function startWatch() {
    //每0.3s更新一次加速度信息
    var options = {
        frequency: 300
    };
    wachID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    console.log('调用插件');
    console.log(wachID);
}

//---停止监视设备的加速度
function stopWatch() {
    u_roll = 0;
    all_roll = 0;
    navigator.accelerometer.clearWatch(wachID);
}

//---获取加速度成功事件
function onSuccess(accelerometer) {
    var pow_v = Math.pow(accelerometer.x, 2) + Math.pow(accelerometer.y, 2) + Math.pow(accelerometer.z, 2);
    var v = Math.sqrt(pow_v);
    console.log(u_roll);
    if (v > 15) {
        all_roll++; //全部摇动次数
        u_roll++; //有效摇动次数
        navigator.vibrate(300); //震动反馈
        if (u_roll > 1) { //判定这个为摇动，开始显示图片
            //摇一摇的动画
            $("#shakebottom").animate({
                height: '-=150px',
                marginTop: '150px'
            });
            console.log("下滑");

            $("#shaketop").animate({
                height: '-=150px',
                marginBottom: '150px'
            });
            console.log('上滑');

            stopWatch();
            console.log("停止插件");
            //调用函数开始显示图片
            start();
            console.log('显示动画并开始显示图片');
            //图片变大
            $("#shakeimg").animate({
                height: '+=100px',
                width: '+=100px'
            });
            console.log('变大');
        }
    } else {
        all_roll++;
        console.log('摇晃角度不够。');
    }
}

//---获取加速度失败事件
function onError() {
    alert("错误！");
}