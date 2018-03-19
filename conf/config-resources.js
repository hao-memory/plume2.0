// 配置初始化js、css加载
$.initOperation = $.extend($.initOperation, {
    /*
     * activity
     * */
    acIndexInit: function () {
        console.info('2016双十一活动主页');
        console.log("初始化plume-acIndex");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'css/activity/ac161111/acIndex.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'js/activity/ac161111/acIndex.js']);
    },

    acCouponInit: function () {
        console.info('2016双十一活动优惠券');
        console.log("初始化plume-acCoupon");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'css/activity/ac161111/acCoupon.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'js/activity/ac161111/acCoupon.js']);
    },

    acHotInit: function () {
        console.info('2016双十一活动爆品');
        console.log("初始化plume-acHot");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'lib/swiper/swiper-3.3.1.min.css', 'css/activity/ac161111/acHot.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'lib/iscroll/iscroll.js', 'lib/swiper/swiper-3.3.1.jquery.min.js', 'js/activity/ac161111/acHot.js']);
    },

    acDetailInit: function () {
        console.info('2016双十一活动品牌详情');
        console.log("初始化plume-acDetail");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'css/activity/ac161111/acDetail.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'js/activity/ac161111/acDetail.js']);
    },

    acDecorationInit: function () {
        console.info('2016双十一活动家装');
        console.log("初始化plume-acDecoration");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'lib/swiper/swiper-3.3.1.min.css', 'css/activity/ac161111/acDecoration.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'lib/iscroll/iscroll.js', 'lib/swiper/swiper-3.3.1.jquery.min.js', 'js/activity/ac161111/acDecoration.js']);
    },
    acDecoration2Init: function () {
        console.info('2016双十一活动家装二');
        console.log("初始化plume-acDecorations");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'lib/swiper/swiper-3.3.1.min.css', 'css/activity/ac161111/acDecoration2.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'lib/iscroll/iscroll.js', 'lib/swiper/swiper-3.3.1.jquery.min.js', 'js/activity/ac161111/acDecoration2.js']);
    },

    acHouseInit: function () {
        console.info('2016双十一活动房产');
        console.log("初始化plume-acHouse");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'css/activity/ac161111/acHouse.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'js/activity/ac161111/acHouse.js']);
    },

    acAdInit: function () {
        console.info('2016双十一活动广告');
        console.log("初始化plume-acAd");
        Plume.resource().loadCss(['css/activity/ac161111/acGlobal.css', 'css/activity/ac161111/acAd.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'js/activity/ac161111/acAd.js']);
    },

    acDecorationDesignInit: function () {
        console.info('家装品宣页面');
        console.log("初始化plume-acDecorationDesign");
        Plume.resource().loadCss(['public/plug/swiper/swiper-3.3.1.min.css', 'public/plug/swiper/animate.min.css', 'activity/css/acDecorationDesign/acDecorationDesign.css']);
        Plume.resource().loadAsynchronJs(['home/js/hybridJs.js', 'public/plug/swiper/swiper-3.3.1.jquery.min.js', 'public/plug/swiper/swiper.animate1.0.2.min.js', 'js/activity/acDecorationDesign/acDecorationDesign.js']);
    },

    acInterviewInit: function () {
        console.info('家装专访品宣页面');
        console.log("初始化plume-acInterview");
        Plume.resource().loadCss(['activity/css/acDecorationDesign/acInterview.css']);
        Plume.resource().loadAsynchronJs(['home/js/hybridJs.js', 'activity/js/acInterview/acInterview.js']);
    },

    acDesignHurricaneInit: function () {
        console.info('家装设计飓风专题');
        console.log("初始化plume-acDesignHurricane");
        Plume.resource().loadCss(['public/plug/swiper/swiper-3.3.1.min.css', 'activity/css/acDesignHurricane/acDesignHurricane.css']);
        Plume.resource().loadAsynchronJs(['home/js/hybridJs.js', 'public/plug/swiper/swiper-3.3.1.jquery.min.js', 'activity/js/acDesignHurricane/acDesignHurricane.js']);
    },

    acRecruitInit: function () {
        console.info('家装种子招募');
        console.log("初始化plume-acInterview");
        Plume.resource().loadCss(['activity/css/acDecorationDesign/acRecruit.css']);
        Plume.resource().loadAsynchronJs(['home/js/hybridJs.js', 'activity/js/acDecorationDesign/acRecruit.js']);
    },
    acLoveHomeInit: function () {
        console.info('爱家日页面');
        console.log("初始化plume-acLoveHome");
        Plume.resource().loadCss(['activity/css/acLoveHome/acLoveHome.css']);
        Plume.resource().loadAsynchronJs(['home/js/hybridJs.js', 'activity/js/acLoveHome/acLoveHome.js']);
    },

    //元旦会员体验季活动页面
    acNewYearInit: function () {
        console.info('元旦活动页面');
        console.log("初始化plume-acNewYear");
        Plume.resource().loadCss(['activity/css/acNewYear/acNewYear.css']);
        Plume.resource().loadAsynchronJs(['js/hybridJs.js', 'activity/js/acNewYear/acNewYear.js']);
    },

    //白泽令活动
    acBZLInit: function () {
        console.info('白泽令活动页面');
        console.log("初始化plume-acBZL");
        Plume.resource().loadCss(['activity/css/acBZL/acBZL.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js', '../public/plug/point.js', 'activity/js/acBZL/acBZL.js']);
    },

    // 情人节活动
    acValentineIndexInit: function () {
        console.info('情人节活动页面');
        console.log('初始化plume-acValentineIndex');
        Plume.resource().loadCss(['activity/css/acValentine/acValentineIndex.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js','../public/plug/point.js', 'activity/js/acValentine/acValentineIndex.js'])
    },
    acValentineResultInit: function () {
        console.info('情人节活动页面');
        console.log('初始化plume-acValentineaResult');
        Plume.resource().loadCss(['activity/css/acValentine/acValentineResult.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js', '../public/plug/point.js','activity/js/acValentine/acValentineResult.js'])
    },
    acCheckInfoInit: function () {
        console.info('情人节活动页面');
        console.log('初始化plume-acCheckInfo');
        Plume.resource().loadCss(['activity/css/acValentine/acCheckInfo.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js', 'activity/js/acValentine/acCheckInfo.js'])

    },
    acPrizeInit: function () {
        console.info('情人节活动抽奖页面');
        console.log('初始化plume-acPrize');
        Plume.resource().loadCss(['activity/css/acValentine/acPrize.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js', 'activity/js/acValentine/TweenMax.min.js', '../public/plug/point.js', 'activity/js/acValentine/acPrize.js'])
    },
    acDownloadAppInit: function () {
        console.info('情人节活动页面');
        console.log('初始化plume-acDownloadApp');
        Plume.resource().loadCss(['activity/css/acValentine/acDownloadApp.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js', 'activity/js/acValentine/acDownloadApp.js'])
    },
    acShowInit: function(){
        console.info('情人节奖品展示页面');
        console.log('初始化plume-acShow');
        Plume.resource().loadCss(['activity/css/acValentine/acShow.css']);
        Plume.resource().loadAsynchronJs(['../goods/js/hybridJs.js', 'activity/js/acValentine/acShow.js'])
    },
    acLoginInit: function(){
        console.info('初始化plume-acLoginInit');
        Plume.resource().loadCss(['activity/css/acValentine/acLogin.css']);
        Plume.resource().loadAsynchronJs(['../public/plug/jquery.md5.js','../public/plug/point.js', '../public/plug/jquery.cookie.js','activity/js/acValentine/acLogin.js']);
    },
    acRegisterInit: function(){
        console.info('初始化plume-acRegisterInit');
        Plume.resource().loadCss(['activity/css/acValentine/acLogin.css']);
        Plume.resource().loadAsynchronJs(['../public/plug/jquery.md5.js','../public/plug/point.js', 'activity/js/acValentine/acRegister.js']);
    },
    acRiseUpInit: function(){
        console.info('汶水1号-闻鸡起舞大牌上新页面');
        console.log('初始化plume-acRiseUp');
        Plume.resource().loadCss(['p-hongmei-activity-h5/css/acWenShui/acRiseUp.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-goods-h5/js/hybridJs.js', '../p-hongmei-public-h5/plug/point.js','p-hongmei-activity-h5/js/acWenShui/acRiseUp.js'])
    },
    acInviteInit: function(){
        console.info('邀请函');
        console.log('初始化plume-acInvite');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acInvite/acInvite.css']);
        Plume.resource().loadAsynchronJs([ '../p-hongmei-activity-h5/js/acInvite/swiper.min.js','../p-hongmei-activity-h5/js/acInvite/acInvite.js'])
    },
    //两天来了活动
    acTwoDaysGameInit: function(){
        console.info('两天来了活动');
        console.log('初始化plume-acTwoDaysGame');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acTwoDays/acTwoDaysGame.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/hybridJs.js','../p-hongmei-public-h5/plug/point.js', '../p-hongmei-activity-h5/js/acTwoDays/acTwoDaysGame.js'])
    },
    acTwoDaysIntroInit: function(){
        console.info('两天来了活动');
        console.log('初始化plume-acTwoDaysIntro');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acTwoDays/acTwoDaysIntro.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/hybridJs.js', '../p-hongmei-public-h5/plug/point.js', '../p-hongmei-activity-h5/js/acTwoDays/acTwoDaysIntro.js'])
    },
    acTwoDaysChooseInit: function() {
        console.info('两天来了活动');
        console.log('初始化plume-acTwoDaysChoose');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acTwoDays/acTwoDaysChoose.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/hybridJs.js', '../p-hongmei-public-h5/plug/point.js', '../p-hongmei-activity-h5/js/acTwoDays/acTwoDaysChoose.js'])
    },

    acMayDayInit: function() {
        console.info('五一限时购活动');
        console.log('初始化plume-acMayDay');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acMayDay/acMayDay.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/hybridJs.js', '../p-hongmei-public-h5/plug/point.js', '../p-hongmei-activity-h5/js/acMayDay/acMayDay.js'])
    },
    acRoomMadeInit: function() {
        console.info('玛格全屋定制');
        console.log('初始化plume-acRoomMade');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acRoomMade/acRoomMade.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/acRoomMade/acRoomMade.js'])
    },
    maySeckill2Init: function() {
        console.info('五月活动秒杀抽奖页面');
        console.log('初始化plume-maySeckill');
        Plume.resource().loadCss([
            '../p-hongmei-activity-h5/css/acWuYi/swiper.min.css',
            '../p-hongmei-activity-h5/css/acWuYi/maySeckill2.css'
        ]);
        Plume.resource().loadAsynchronJs([
            '../p-hongmei-activity-h5/js/acWuYi/swiper.min.js',
            '../p-hongmei-activity-h5/js/hybridJs.js',
            '../p-hongmei-public-h5/plug/point.js',
            '../p-hongmei-activity-h5/js/acWuYi/maySeckill2.js'
        ])
    },
    acMayDayIntroInit: function() {
        console.info('五一限时购活动');
        console.log('初始化plume-acMayDayIntro');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acWuYi/swiper.min.css','../p-hongmei-activity-h5/css/acWuYi/acMayDayIntro.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/acWuYi/swiper.min.js','../p-hongmei-activity-h5/js/hybridJs.js', '../p-hongmei-public-h5/plug/point.js', '../p-hongmei-activity-h5/js/acWuYi/acMayDayIntro.js'])
    },
    acPrizeInfoInit: function() {
        console.info('中奖信息');
        console.log('初始化plume-acPrizeInfo');
        Plume.resource().loadCss(['../p-hongmei-activity-h5/css/acPrizeInfo/acPrizeInfo.css']);
        Plume.resource().loadAsynchronJs(['../p-hongmei-activity-h5/js/acPrizeInfo/acPrizeInfo.js'])
    }

});

