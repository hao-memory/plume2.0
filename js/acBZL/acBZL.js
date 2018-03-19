$(function () {
    $.setTdk( "传你一支新年升运令，猜猜是什么？");
    var tokenI ='';
    var temp = '';
    //15条令
    var dataBZL = [
        {name:"升职加薪令",words:"拯救地球，维护世界和平的重任就靠我了"},
        {name:"连板飘红令",words:"我是二九五零李大霄山腰突击队的，你是哪部分的？"},
        {name:"告别吃土令",words:"烦劳你们走路时不要走边沿，以免踩脏了我下半月的粮食"},
        {name:"财神到家令",words:"去年财神爷一定走错门了"},
        {name:"CUP升级令",words:"我们的每一个拥抱，心都会贴的很近"},
        {name:"一夜七次令",words:"感觉身体被掏空"},
        {name:"今夜脱单令",words:"有人要告白吗，没有我睡了"},
        {name:"奉子成婚令",words:"今后，可以告诉孩子，你光荣地参加了爸妈的婚礼"},
        {name:"免于相亲令",words:"叔叔阿姨，你们好；叔叔阿姨，再见！"},
        {name:"千杯不醉令",words:"古来圣贤皆寂寞，唯有饮者留其名"},
        {name:"傻吃不胖令",words:"吃饱了才有力气建设中国特色社会主义"},
        {name:"瘦成闪电令",words:"大风会把人家吹走的"},
        {name:"告别雾霾令",words:"我不要做祖国的花朵，我要做祖国的绿箩"},
        {name:"父母健康令",words:"孝子都得转！！！"},
        {name:"手气最佳令",words:"谢谢老板！"}
    ];
    var locaSearch = window.location.search;
    if( locaSearch.indexOf('temp')>(-1)){
        tokenI = parseInt( locaSearch.substr(6));
        $('.startPage').hide();
        $('.get_token').show();
        $('.get_token_bj4_img').attr('src','activity/images/acBZL/bzl'+tokenI+'.png');
        $('.got_token_bj1_word').html( dataBZL[tokenI].words);
        $('.got_token_bj1_Img').attr('src','activity/images/acBZL/'+tokenI+'.png');
        $('.bq_div_Img').attr('src','activity/images/acBZL/bq'+tokenI+'.png');
        $('.get_token2_bj4_img').attr('src','activity/images/acBZL/bzl'+tokenI+'.png');
    }

    var clickKey = true, time = null;
    //判断是否在微信打开
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        $('nav').hide();
        $(".initPage").addClass('initPage_not');

    }else{
        $('nav').show();
        $(".initPage").removeClass('initPage_not');
        //安卓或非app高度减40
        if ($.os.android || !$.isApp) {
            $("nav.header").addClass("nav-ios");
            $(".initPage").addClass("initPage-ios");
        }
    }
    //页面分享按钮点击事件
    if($.isApp){
        $('.share-icon').show();
        //分享
        $('[data-hybrid-share1]').on('touchstart', function () {
            console.log("-----------分享------------");
            var link = window.location.href;

            var shareData = {
                title: "白泽令",
                text:  "传你一支新年升运令，猜猜是什么？",
                image: location.protocol + '//' + location.host + '/activity/images/acBZL/share.jpg',
                link: link,
                record: false,
                objectId: '',
                objectType: ''
            };
            $.hybrid.share(shareData);
            return false;
        });
    }else{
        $('.shareBtn').on('touchstart',function(){
            try{
                $.point.f_bigData('110.510.49.58.68.78.03','activte','mmall.com','page.baizeling3','page.baizeling','buttom.share');
            } catch(e){
                console.log(e)
            }
            $('.got_token').hide();
            $('.get_token2').show();
            $('.mask').show();
        });
    }
    //设置title
    //

    //点击首页白泽介绍按钮弹出介绍
    $('.btnLogo').on('touchstart',function(){
        $('.bzInfo').show();
    });
    $('.bzLogo').on('touchstart',function(){
        $('.bzInfo').show();
    });
    //点击关闭按钮关闭介绍
    $('.close_btn').on('touchstart',function(){
        $('.bzInfo').hide();
    });
    //点击首页领取令牌按钮
    $('.btnImg_div').on('touchstart',function(){
        try{
            $.point.f_bigData('110.510.49.58.68.78.05','activte','mmall.com','page.baizeling5','page.baizeling','buttom.reice');
        } catch(e){
            console.log(e)
        }
        $('.startPage').hide();
        tokenI = parseInt( 15*Math.random() );
        $('.get_token_bj4_img').attr('src','activity/images/acBZL/bzl'+tokenI+'.png');
        $('.got_token_bj1_word').html( dataBZL[tokenI].words);
        $('.got_token_bj1_Img').attr('src','activity/images/acBZL/'+tokenI+'.png');
        $('.bq_div_Img').attr('src','activity/images/acBZL/bq'+tokenI+'.png');
        $('.get_token2_bj4_img').attr('src','activity/images/acBZL/bzl'+tokenI+'.png');
        $('.get_token').show();

        if( clickKey){
            time = setTimeout(function(){
                $('.get_token').hide();
                $('.got_token').show(1000);
            },5000);
        }else{
            clickKey = false;
        }
        //$.setTdk( "白泽令");
        try{

            if ( location.search.indexOf('temp') < 0 ) {
                window.history.pushState({},'',window.location.href + '?temp='+tokenI);
                //$.setTdk( "白泽令"+tokenI);
            }else{
                    var locaHref = window.location.href.split('?')[0];
                window.history.pushState({},'',locaHref + '?temp='+tokenI);
                //$.setTdk( "白泽令"+tokenI);
            }

        }catch(e){
            alert(e);
        }

    });
    $('.get_token_bj4').on('touchstart',function(){
        clearInterval(time);
        clickKey = false;
        $('.get_token').hide();
        $('.got_token').show(1000);
    });
    //点击重领到首页
    $('.againBtn').on('touchstart',function(){

        try{
            var locaHref1 = window.location.href.split('?')[0];
            window.history.pushState({},'',locaHref1);
            $.point.f_bigData('110.510.49.58.68.78.02','activte','mmall.com','page.baizeling1','page.baizeling','buttom.renext');
        } catch(e){
            console.log(e)
        }

        $('.got_token').hide();
        $('.startPage').show();
        clickKey = true;

    });
    //点击弹层，弹层消失
    $('.mask').on('touchstart',function(){
        $(this).hide();
    });
    $('.get_token2_bj4').on('touchstart',function(){
        clickKey = false;
        $('.get_token2').hide();
        $('.got_token').show();
    });
    //大数据埋点
    try {
        $.point.p_bigData("110.510.49.58.68.78.00", "activte", "mmall.com", "page.baizeling","page.baizeling","");
    } catch (e) {
        console.log(e)
    }
})