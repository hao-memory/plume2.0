;(function ($) {

    $.extend({
        /**
         * 返回
         */
        hybridBack: function () {

            setTimeout(function () {
                if ( $.isApp ) {
                    if ( location.href.indexOf('back=h5') >= 0 ) {
                        history.back();
                    } else {
                        $.hybrid.back();
                    }
                } else {
                    $.backPage();
                }
            }, 1000);
        },

        /**
         * 公用hybrid方法
         * @param uuid
         * @param action
         * @param parameter
         * @returns {*}
         * @private
         */
        _appCall: function (uuid, action, parameter) {

            if (!!!uuid) {
                $.alert('uuid缺失');
                return;
            }
            //alert('----------'+uuid)

            if (!$.isApp) {
                return;
            }

            if ($.os.android) {
                window.hybrid._app_call(uuid, action, JSON.stringify(parameter));
            } else if ($.os.ios) {
                _app_call(uuid, action, JSON.stringify(parameter));
            }
            return uuid;
        }
    });

    $.hybrid = {
        /**
         * 获取用户信息
         * @param fun
         * @returns {boolean}
         */
        getUserInfo: function (fun) {
            //if (!$.session.userInfo || $.session.userInfo == 'undefined') {
            if (!$.ls('userInfo') || $.ls('userInfo') == 'undefined') {
                $._appCall('passUserInfo', 'userInfo', {});
                return true;
            }
            return false;
        },

        /**
         * 定位
         * @returns {boolean}
         */
        getLocation: function () {
            if (!$.session.location) {
                $._appCall('getLocation', 'location', {});
                return true;
            }
            return false;
        },

        /**
         * 获取用户信息
         * @param callback
         * @param fn
         */
        userInfoDone: function (callback, fn) {
            if (!fn || !$.isFunction(fn)) {
                fn = function (data) {
                    if ( $.isApp ) {
                        $.hybrid.login();
                    } else {
                        $.directPage('login');
                    }
                }
            }
            if ( $.isApp ) {
                if (this.getUserInfo()) {
                    $.when($.hybrid.pro('userDtd')).then(function (data) {
                        callback();
                    }, fn);
                } else {
                    callback();
                }
            } else {
                if ( $.ls('userInfo') && $.ls('userInfo') != 'undefined' ) {
                    $.session.userInfo = JSON.stringify( $.ls('userInfo') );
                    callback();
                } else {
                    fn();
                }
            }
        },

        //根据app不通版本执行不同动作

        getAppVer: function( ver, supFn, subFn) {
            var df = $.Deferred();
            if ( $.session.nativeParms && $.session.nativeParms != 'undefined' ) {
                appVersion = JSON.parse( $.session.nativeParms ).version;
                finalFn(appVersion);

            } else {
                $._appCall('getApp', 'FromNativeParms', {});
                $.when( $.hybrid.pro('appDtd') ).then(function (data) {
                    appVersion = data.version;
                }).then(function () {
                    finalFn(appVersion);
                })
            }

            function finalFn (appVersion) {
                appVersion = +appVersion.replace(/\./g, '');
                ver = +ver;
                if ( appVersion >= ver ) {
                    supFn();
                } else if ( subFn && $.isFunction(subFn) ) {
                    subFn();
                }
                df.resolve();
            }
            return df.promise()
        },


        /**
         * 返回上级
         * @param param
         */
        back: function (param) {
            //window.sessionStorage.setItem('back_page',document.location.href);
            $._appCall('back', 'router_to_native', {alise: '', parameter: '',h5Rurl:'document.referrer'});
        },

        /**
         * 分享
         * @param param
         */
        share: function (param) {
            param = $.extend({title: '', text: '', image: '', link: ''}, param);

            $._appCall('sharePage', 'share', param);
        },

        /**
         * 跳转至native页面
         * @param uuid
         * @param param
         */
        toNative: function (uuid, param) {
            param = $.extend({tag: ''}, param);

            $._appCall(uuid, 'call_native', param);
        },

        /**
         * 显示地图
         * @param obj
         */
        toMap: function (obj) {
            this.toNative('showMap', {
                tag: '1',
                latitude: obj.latitude,
                longitude: obj.longitude,
                shopName: obj.shopName
            })
        },

        /**
         * 获取距离和位置
         * @param obj
         */
        getLocationAndDistance: function (obj) {
            if (!obj.lat || !obj.lon) {
                console.log('缺少经/纬度');
                return;
            }

            $._appCall('getLocationAndDistance', 'locationAndDistance	', {
                latitude: obj.lat,
                longitude: obj.lon
            });
        },

        /**
         * 登录
         */
        login: function () {
            console.log('login');
            this.toNative('login', {tag: '2'});
        },

        /**
         * userDtd、locationDtd、distanceDtd、fileDtd、uuidDtd
         * @param sort
         * @returns {*}
         * @private
         */
        _dtd: function (sort) {
            if (!!!this[sort]) {
                this[sort] = $.Deferred();
            }
            return this[sort];
        },

        _deleteDtd: function (sort) {
            this[sort] = null;
        },

        /**
         * 获取promise对象
         * @param sort
         * @returns {*}
         */
        pro: function (sort) {
            return this._dtd(sort).promise();
        },

        /**
         * 初始化用户信息
         */
        initCallback: function () {
            var _this = this;

            window._app_callback = function(uuid, res) {
                //alert(uuid)
                if ( $(".lockbg").length ) {
                    $(".lockbg").remove();
                }
                var strRes = res;
                if ( res === '' ) {
                    res = '{}';
                }
                res = JSON.parse(res);

                if ( uuid === 'passUserInfo' ) {
                    var userDtd = _this._dtd('userDtd');
                    if ( !res.openid && !res.sessionid ) {
                        console.log('获取用户信息失败');
                        userDtd.reject('');
                    } else {
                        $.session.userInfo = strRes;
                        window.localStorage.setItem('userInfo',strRes);
                        userDtd.resolve(res);
                    }

                } else if ( uuid === 'getLocation' ) {
                    var locationDtd = _this._dtd('locationDtd');

                    if ( !res.location && !res.province && !res.city ) {
                        console.log('定位失败')
                        locationDtd.reject('定位失败');
                    } else {
                        $.session.location = strRes;
                        locationDtd.resolve(res);
                    }

                } else if ( uuid === 'getLocationAndDistance' ) {
                    var distanceDtd = _this._dtd('distanceDtd');

                    if ( !res.location && !res.distance ) {
                        console.log('获取地理位置及距离失败');
                        distanceDtd.reject('获取地理位置及距离失败');
                    } else {
                        distanceDtd.resolve({
                            location: res.location,
                            distance: res.distance
                        });
                    }
                } else if ( uuid === 'selectImg' ) {
                    var fileDtd = _this._dtd('fileDtd');
                    if ( !strRes ) {
                        $.alert('上传图片失败')
                    } else {
                        $.uploadImg(res);
                    }
                } else if ( uuid === 'login' ) {
                    $.session.userInfo = strRes;
                    window.localStorage.setItem('userInfo',strRes);
                } else if ( uuid === 'getUuid' ) {
                    var distanceDtd = _this._dtd('uuidDtd');

                    if ( strRes == '' ) {
                        console.log('获取uuid失败');
                        _this.uuidDtd.reject('');
                    } else {
                        $.session.uuid = strRes;
                        _this.uuidDtd.resolve(res);
                    }
                } else if ( uuid == 'getRurl' ) {
                    //alert(1221113332)
                    var furlDtd = _this._dtd('furlDtd');

                    if ( strRes == '' ) {
                        console.log('获取url失败');
                        _this.furlDtd.reject('');
                    } else {
                        //$.session.rurl = strRes;
                        _this.furlDtd.resolve(res);
                    }
                }else if ( uuid == 'getApp' ) {
                    //alert(1221112)
                    var appDtd = _this._dtd('appDtd');

                    if ( strRes == '' ) {
                        console.log('获取app_v失败');
                        _this.appDtd.reject('');
                    } else {
                        $.session.nativeParms = strRes;
                        _this.appDtd.resolve(res);
                    }
                }
            }
        },

        login: function() {
            console.log('login')
            this.toNative('login', { tag: '2' });
        },

        /**
         * url属性
         * @param page
         * @param channel
         * @param domain
         * @param type
         * @param title
         */
        f_bigData:function(page,channel,domain,type,title,item,actionId,action,actionPos,actionTol){
            if ( !$.isApp ) return;
            $._appCall('passUserInfo', 'userInfo', {});
            $._appCall('getUuid', 'iosIphoneUDID', {});
            $._appCall('getRurl', 'R_URL_Native', {});

            var sendMes = function(data1 , data2){
                var u_mid = '',
                    userId = '',
                    rurl = '',
                    pId = '',
                    d_os = "";
                if ( typeof data1 == 'object' ) {
                    u_mid = data1.hxiphoneUUID;
                }
                if ( typeof data2 == 'object' ) {
                    userId = data2.openid;
                }
                var sendData = {
                    'page': page,
                    'p_channel': channel,
                    'p_domain':domain,
                    'p_type': type,
                    'p_title':title,
                    'service': 'h5.click',
                    'p_url':window.location.href,
                    'p_id': pId ,
                    'version':'h5',
                    'u_id': userId,
                    'u_mid': u_mid,
                    'r_url': rurl,
                    'p_item':item,
                    'p_action_id':actionId,
                    'p_action':action,
                    'p_action_pos':actionPos,
                    'p_action_total':actionTol

                };

                if($.parseUrlParam().id){
                    sendData.p_id = $.parseUrlParam().id || '';
                }

                var datas = data.clickEvent;
                //alert(JSON.stringify(sendData))
                $.when( $.hybrid.pro('furlDtd')).always(function(data) {

                    if( !document.referrer ){
                        sendData.r_url = JSON.stringify(data.R_URL_Native);
                        try{datas(sendData);}catch(e){}
                    }else{
                        sendData.r_url = document.referrer;

                        try{datas(sendData);}catch(e){}

                    }
                })
            }

            $.hybrid.userInfoDone(function(){
                $.when($.hybrid.pro('uuidDtd'),$.hybrid.pro('userDtd')).always(function(data1, data2){

                    sendMes(data1 , data2)

                })
            },function(){
                $.when($.hybrid.pro('uuidDtd')).always(function(data1){

                    sendMes(data1)
                })

            })
        },
        p_bigData: function(page,channel,domain,type,title, pId) {
            if ( !$.isApp ) return;

            $._appCall('passUserInfo', 'userInfo', {});
            $._appCall('getUuid', 'iosIphoneUDID', {});
            $._appCall('getRurl', 'R_URL_Native', {});
            $._appCall('getApp', 'FromNativeParms', {});

            var sendSt = function(data1,data2){

                var u_mid = '',
                    userId = '',
                    rurl = '',
                    d_os = "",
                    stm = '',
                    app_v = '',
                    guid = '',
                    startTime = new Date() ,// 刚进页面
                    endTime = '';

                if ( typeof data1 == 'object' ) {
                    guid = u_mid = data1.hxiphoneUUID;
                }
                if ( typeof data2 == 'object' ) {
                    guid = userId = data2.openid;
                }

                sendTime = {
                    'page': page,
                    'p_channel': channel,
                    'p_domain':domain,
                    'p_type': type,
                    'p_title':title,
                    'service': 'h5.staytime',
                    'p_url':window.location.href,
                    'p_id': pId || '',
                    'version':'h5',
                     'u_id': userId,
                     'u_mid': u_mid,
                     'r_url': rurl,
                    'p_stay_time':stm,
                    'app_version':app_v,
                    'u_guid':guid
                };



                //alert($(".brand-content"))


                if($.parseUrlParam().id){
                    sendTime.p_id = $.parseUrlParam().id;
                };
                var datas = data.pageViewTime;
                $(".brand-content").on('click',function(){
                    endTime = new Date()
                    sendTime.p_stay_time = endTime - startTime;
                    //alert(JSON.stringify(sendTime))
                    $.when( $.hybrid.pro('appDtd')).always(function(data) {
                        sendTime.app_v = data.version
                        sendTime.app_b =  data.appFrom;
                        sendTime.u_mid = data.iphoneUUID;

                        if( ! window.sessionStorage.getItem('p_back_page')  ){
                            sendTime.r_url = data.nativeRUrl;
                            try{datas(sendTime);}catch(e){}
                        }else{
                            sendTime.r_url = window.sessionStorage.getItem('p_back_page');
                            try{datas(sendTime);}catch(e){}

                        }
                    })
                    //var shopId = $(this).attr("data-id")
                    //$.directPage("shopDetail?id="+ shopId + "&back=h5")

                });
                window.onunload = function() {
                    endTime = new Date()
                    sendTime.p_stay_time = endTime - startTime;
                    //alert(JSON.stringify(sendTime))
                    $.when( $.hybrid.pro('appDtd')).always(function(data) {
                        sendTime.app_version = data.version
                        sendTime.app_b =  data.appFrom;
                        sendTime.u_mid = data.iphoneUUID;
                        //alert(JSON.stringify(sendTime))
                        if( ! window.sessionStorage.getItem('p_back_page')  ){
                            sendTime.r_url = data.nativeRUrl;
                            try{datas(sendTime);}catch(e){}
                        }else{

                            sendTime.r_url = window.sessionStorage.getItem('p_back_page');
                            try{datas(sendTime);}catch(e){}

                        }
                    })

                };


            }






            var sendMes = function(data1 , data2){
                var u_mid = '',
                    userId = '',
                    rurl = '',
                    app_v = '',
                    app_b = '',
                    guid = '',
                    d_os = "";
                if ( typeof data1 == 'object' ) {
                    guid = u_mid = data1.hxiphoneUUID;
                }
                if ( typeof data2 == 'object' ) {
                    guid = userId = data2.openid;
                }
                var sendData = {
                    'page': page,
                    'p_channel': channel,
                    'p_domain':domain,
                    'p_type': type,
                    'p_title':title,
                    'service': 'h5.pvuv',
                    'p_url':window.location.href,
                    'p_id': pId || '',
                    'version':'h5',
                    'u_id': userId,
                    'u_mid': u_mid,
                    'r_url': rurl,
                    'app_v':app_v,
                    'app_b':app_b,
                    'u_guid':guid

                };

                if($.parseUrlParam().id){
                    sendData.p_id = $.parseUrlParam().id;
                };
                //alert(1222)

                var datas = data.pageAndUserView;
                $.when( $.hybrid.pro('appDtd')).always(function(data) {
                            //alert(JSON.stringify(data))
                        sendData.app_v = data.version;
                        sendData.app_b = data.appFrom;
                        sendData.u_mid = data.iphoneUUID;


                    if(  ! window.sessionStorage.getItem('p_back_page') ){
                        sendData.r_url = data.nativeRUrl;
                        //alert(sendData.r_url)
                        try{datas(sendData);}catch(e){}
                    }else{
                        sendData.r_url = window.sessionStorage.getItem('p_back_page');
                        try{datas(sendData);}catch(e){}

                    }
                })
            }

            $.hybrid.userInfoDone(function(){
                $.when($.hybrid.pro('uuidDtd'),$.hybrid.pro('userDtd')).always(function(data1, data2){

                    sendMes(data1 , data2)
                    sendSt(data1,data2);

                })
            },function(){
                $.when($.hybrid.pro('uuidDtd')).always(function(data1){

                    sendMes(data1)
                    sendSt(data1);
                })

            })
        }
    }

    if ($.isApp ) {
        $.hybrid.initCallback();
    }

    $.fn.extend({
        /**
         * 关注
         * @param option
         * @returns {attention}
         */
        attention: function (option) {

            for (var i in option) {
                if ( !option[i] && option[i] !== 0 ) {
                    delete option[i];
                }
            }

            option = $.extend({
                appId: $.os.appId,
                objectId: '',
                sourceType: '',
                channel: '',
                title: '关注标题',
                sort: 'text',
                picture: 'http://mkl.mmall.com/images/logo.jpg',
                attr: 'attention',
                className: '',
                removeClass: '',
                addFn: $.noop,
                cancelFn: $.noop
            }, option);

            var _this = this,
                addCallback = function (userInfo) {
                    option.addFn(userInfo);

                    if (option.sort === 'icon') {
                        _this.addClass(option.className);
                    } else if (option.sort === 'text') {
                        _this.text('已关注');
                    } else if (option.sort === 'icon-text') {
                        _this.addClass(option.className);
                        _this.text('已关注');
                    }

                    if (!!option.removeClass) {
                        _this.removeClass(option.removeClass);
                    }
                    _this.attr(option.attr, 1);
                },
                cancelCallback = function (userInfo) {
                    option.cancelFn(userInfo);

                    if (option.sort === 'icon') {
                        _this.removeClass(option.className);
                    } else if (option.sort === 'text') {
                        _this.text('关注');
                    } else if (option.sort === 'icon-text') {
                        _this.removeClass(option.className);
                        _this.text('关注');
                    }

                    if (!!option.removeClass) {
                        _this.addClass(option.removeClass);
                    }
                    _this.attr(option.attr, 0);
                },
                userInfo = {};

            $.hybrid.userInfoDone(function () {
                userInfo = JSON.parse($.session.userInfo);
                $.commonAjax({
                    url: 'user-IsItemUserAttention',
                    type: 'post',
                    contentType: 'application/x-www-form-urlencoded',
                    data: {
                        appId: option.appId,
                        objectId: option.objectId,
                        sourceType: option.sourceType
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Auth-Token', userInfo.sessionid);
                    },
                    success: function (data) {
                        if (data.code == 200 && data.dataMap) {
                            addCallback(userInfo);
                        } else {
                            cancelCallback(userInfo);
                        }
                    }
                }, true, 1);
            }, function () {
                cancelCallback();
            });

            _this.on('touchstart', function () {
                if ( _this.data('collect-rate') == 1 ) {
                    $.alert('哎哟喂，操作失败');
                }
                $.hybrid.userInfoDone(function () {
                    _this.data('collect-rate', 1);
                    if (!userInfo.sessionid) {
                        userInfo = JSON.parse($.session.userInfo);
                    }

                    var url = '',
                        data = {
                            appId: option.appId,
                            objectId: option.objectId,
                            sourceType: option.sourceType
                        },
                        tip = '哎哟喂，操作失败',
                        fn;

                    if (_this.attr(option.attr) === '0') {
                        url = 'user-addUserAttention';
                        data = $.extend(data, {
                            channel: option.channel,
                            title: option.title,
                            picture: option.picture,
                            desc1: '{}'
                        });
                        fn = addCallback;

                        //已收藏
                    } else {
                        url = 'user-cancelUserAttention';
                        fn = cancelCallback;
                    }

                    $.commonAjax({
                        url: url,
                        type: 'post',
                        contentType: 'application/x-www-form-urlencoded',
                        data: data,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-Auth-Token', userInfo.sessionid);
                        },
                        success: function (res) {
                            _this.data('collect-rate', 0);
                            if (res.code == '-401') {
                                if ( $.isApp ) {
                                    $.hybrid.toNative('loginOut', {
                                        tag: '24'
                                    })
                                } else {
                                    $.directPage('login');
                                }
                            } else if (res.code === 200) {
                                if ( (_this.attr(option.attr) === '0' && res.dataMap != false ) ||  _this.attr(option.attr) === '1' ) {
                                    fn(userInfo);
                                }
                            } else {
                                $.alert(tip);
                            }
                        }
                    }, true, 1);
                });
            });

            return this;
        },

        /**
         * 收藏
         * @param option
         * @returns {collect}
         */
        collect: function (option) {

            for (var i in option) {
                if ( !option[i]  && option[i] !== 0 ) {
                    delete option[i];
                }
            }

            option = $.extend({
                appId: $.os.appId,
                objectId: '',
                sourceType: '',
                channel: '',
                title: '分享标题',
                picture: 'http://mkl.mmall.com/images/logo.jpg',
                sort: 'icon',
                attr: 'collect',
                className: 'collect',
                removeClass: '',
                addFn: $.noop,
                cancelFn: $.noop
            }, option);

            var _this = this,
                addCallback = function (userInfo) {

                    if ( _this.attr('collect') != undefined ) {
                        popup.closeAll();
                        popup.open({
                            icon: 'seccess',
                            content: '收藏成功'
                        });
                    }

                    option.addFn(userInfo);

                    if (option.sort === 'icon') {
                        _this.addClass(option.className);
                    } else if (option.sort === 'text') {
                        _this.text('已收藏');
                    } else if (option.sort === 'icon-text') {
                        _this.addClass(option.className);
                        _this.text('已收藏');
                    }

                    if (!!option.removeClass) {
                        _this.removeClass(option.removeClass);
                    }
                    _this.attr(option.attr, 1);
                },
                cancelCallback = function (userInfo) {

                    if ( _this.attr('collect') != undefined ) {
                        popup.closeAll();
                        popup.open({
                            icon: 'seccess',
                            content: '取消收藏'
                        });
                    }

                    option.cancelFn(userInfo);

                    if (option.sort === 'icon') {
                        _this.removeClass(option.className);
                    } else if (option.sort === 'text') {
                        _this.text('收藏');
                    } else if (option.sort === 'icon-text') {
                        _this.removeClass(option.className);
                        _this.text('收藏');
                    }

                    if (!!option.removeClass) {
                        _this.addClass(option.removeClass);
                    }
                    _this.attr(option.attr, 0);
                },
                userInfo = {};

            $.hybrid.userInfoDone(function () {
                userInfo = JSON.parse($.session.userInfo);
                $.commonAjax({
                    url: 'user-IsItemCollectioned',
                    type: 'post',
                    contentType: 'application/x-www-form-urlencoded',
                    data: {
                        appId: option.appId,
                        objectId: option.objectId,
                        sourceType: option.sourceType
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Auth-Token', userInfo.sessionid);
                    },
                    success: function (data) {
                        if (data.code == 200 && data.dataMap) {
                            addCallback(userInfo);
                        } else {
                            cancelCallback(userInfo);
                        }
                    }
                }, true, 1);

            }, function () {
                cancelCallback();
            });

            _this.on('touchstart', function () {
                if ( _this.data('collect-rate') == 1 ) {
                    popup.closeAll();
                    popup.open({
                        content: '哎哟喂，操作失败'
                    })
                }
                $.hybrid.userInfoDone(function () {
                    _this.data('collect-rate', 1);
                    if (!userInfo.sessionid) {
                        userInfo = JSON.parse($.session.userInfo);
                    }

                    var url = '',
                        data = {
                            appId: option.appId,
                            objectId: option.objectId,
                            sourceType: option.sourceType
                        },
                        tip = '哎哟喂，操作失败',
                        fn;

                    //未收藏
                    if (_this.attr(option.attr) === '0') {
                        url = 'user-addUserCollection';
                        data = $.extend(data, {
                            channel: option.channel,
                            title: option.title,
                            picture: option.picture,
                            desc1: '{}'
                        });
                        fn = addCallback;

                        //已收藏
                    } else {
                        url = 'user-cancelUserCollection';
                        fn = cancelCallback;
                    }

                    $.commonAjax({
                        url: url,
                        type: 'post',
                        contentType: 'application/x-www-form-urlencoded',
                        data: data,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-Auth-Token', userInfo.sessionid);
                        },
                        success: function (res) {
                            _this.data('collect-rate', 0);
                            if (res.code == '-401') {
                                if ( $.isApp ) {
                                    $.hybrid.toNative('loginOut', {
                                        tag: '24'
                                    })
                                } else {
                                    $.directPage('login');
                                }
                            } else if (res.code === 200) {
                                if ( (_this.attr(option.attr) === '0' && res.dataMap != false ) ||  _this.attr(option.attr) === '1' ) {
                                    fn(userInfo);
                                } else {
                                    popup.closeAll();
                                    popup.open({
                                        content: tip
                                    })
                                }
                            } else {
                                popup.closeAll();
                                popup.open({
                                    content: tip
                                })
                            }
                        }
                    }, true, 1)
                });
            });

            return this;
        },

        /**
         * 点赞
         * @param option
         * @param bool - boolean 是否需要初始化状态
         * @returns {like}
         */
        like: function (option, bool) {

            for (var i in option) {
                if ( !option[i] && option[i] !== 0 ) {
                    delete option[i];
                }
            }

            option = $.extend({
                id: '',
                objectType: '',
                sort: 'icon-text',
                attr: 'like',
                className: 'like',
                removeClass: '',
                addFn: $.noop,
                cancelFn: $.noop
            }, option);

            bool = bool || true;

            var _this = $(this),
                addCallback = function (userInfo, count) {
                    option.addFn(userInfo);
                    count = Math.max( count, 0 );
                    count = count > 999 ? '999+' : count;
                    if (option.sort === 'icon') {
                        _this.addClass(option.className);
                    } else if (option.sort === 'text') {
                        _this.text(count);
                    } else if (option.sort === 'icon-text') {
                        _this.addClass(option.className);
                        _this.text(count);
                    }

                    if (!!option.removeClass) {
                        _this.removeClass(option.removeClass);
                    }
                    _this.attr(option.attr, 1);
                },
                cancelCallback = function (userInfo, count) {
                    option.cancelFn(userInfo);
                    count = Math.max( count, 0 );
                    count = count > 999 ? '999+' : count;
                    if (option.sort === 'icon') {
                        _this.removeClass(option.className);
                    } else if (option.sort === 'text') {
                        _this.text(count);
                    } else if (option.sort === 'icon-text') {
                        _this.removeClass(option.className);
                        _this.text(count);
                    }

                    if (!!option.removeClass) {
                        _this.addClass(option.removeClass);
                    }
                    _this.attr(option.attr, 0);
                },

                userInfo = {};

            function queryCount(userId) {
                $.commonAjax({
                    url: 'longyan-likedCount',
                    type: 'post',
                    data: {
                        type: option.objectType,
                        id: option.id,
                        userId: userId
                    },
                    success: function (data) {
                        var count = 0;
                        if ( data.code == 200 && data.dataMap ) {
                            if ( !!data.dataMap.likedCount ) {
                                count = data.dataMap.likedCount;
                            }
                            if ( !!data.dataMap.isUserLiked ) {
                                addCallback(userInfo, count);
                            } else {
                                cancelCallback(userInfo, count);
                            }
                        }
                    }
                }, 1);
            }

            function action(userId, token) {
                var data = {
                        objectType: option.objectType,
                        id: option.id,
                        userId: userId
                    };

                //未点赞
                if (_this.attr(option.attr) === '0' || _this.attr(option.attr) === 'false') {
                    addCallback(userInfo, +_this.text() + 1);
                    data.type = 'Add';

                //已点赞
                } else {
                    cancelCallback(userInfo, +_this.text() - 1);
                    data.type = 'Cancel';
                }

                $.commonAjax({
                    url: 'longyan-praise',
                    type: 'post',
                    data: data,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-Auth-Token', token);
                    },
                    success: function (data) {
                        _this.data('like-rate', 0);
                    }
                }, 1)
            }

            if ( bool ) {
                $.hybrid.userInfoDone(function () {
                    userInfo = JSON.parse($.session.userInfo);
                    queryCount(userInfo.sessionid);

                }, function () {
                    if ( $.isApp ) {
                        if ( !$.session.uuid ) {
                            $._appCall('getUuid', 'iosIphoneUDID', {});
                            $.when($.hybrid.pro('uuidDtd')).then(function(data) {
                                queryCount(data.hxiphoneUUID);
                            })
                        } else {
                            queryCount( JSON.parse($.session.uuid).hxiphoneUUID );
                        }
                    } else {
                        queryCount($.userNum());
                    }
                });
            }

            _this.on('touchstart', function (e) {
                popup.closeAll();
                if ( !navigator.onLine ) {
                    popup.closeAll();
                    popup.open({
                        content: '网络不给力，请检查网络连接'
                    });
                    return;
                }
                if ( _this.data('like-rate') == 1 ) {
                    popup.closeAll();
                    popup.open({
                        content: '点赞失败'
                    });
                    return;
                }

                _this.data('like-rate', 1);

                $.hybrid.userInfoDone(function () {
                    if (!userInfo.sessionid) {
                        userInfo = JSON.parse($.session.userInfo);
                    }
                    action(userInfo.sessionid, userInfo.sessionid);
                }, function () {
                    if ( $.isApp ) {
                        if ( !$.session.uuid ) {
                            $._appCall('getUuid', 'iosIphoneUDID', {});
                            $.when($.hybrid.pro('uuidDtd')).then(function(data) {
                                action(data.hxiphoneUUID, '');
                            })
                        } else {
                            action(JSON.parse($.session.uuid).hxiphoneUUID, '');
                        }
                    } else {
                        action($.userNum(), '');
                    }
                });
            });

            return this;
        }
    });

    // 返回
    $('[ac_data-hybrid-back]').on('touchstart', function () {
        console.log("-----------回退------------");
        if ( $.isApp ) {
            if (window.location.href.indexOf('back=h5') > -1 ) {
                //埋点需求 添加
                window.sessionStorage.setItem('p_back_page',window.location.href );
                history.back();
            } else {
                $.hybrid.back();
            }
        } else {
            $.backPage();
        }

        return false;
    });

    // 分享
    $('[ac_data-hybrid-share]').on('touchstart', function () {
        console.log("-----------分享------------");
        var data = $(this).data('share'),
            idx = 0,
            link = window.location.href;
        for (var i in data) {
            idx++;
        }
        if (!idx) {
            return;
        }

        if ( link.indexOf('?') >= 0 ) {
            link += '&share=true';
        } else {
            link += '?share=true';
        }

        var shareData = {
            title: !!data.title ? data.title : '分享标题',
            text: '立即查看详情，悦享红星美凯龙高端品质服务-为中国设计而生',
            image: !!data.image ? data.image : 'http://mkl.mmall.com/p-hongmei-goods-h5/images/logo.jpg',
            link: link,

            record: !!data.record ? data.record : false,
            objectId: !!data.objectId ? data.objectId : '',
            objectType: !!data.objectType ? data.objectType : ''

        };

        $.hybrid.share(shareData);
        return false;
    });

    // 显示地图
    $('[ac_data-hybrid-map]').on('click', function () {
        console.log("-----------跳转至地图------------");
        var $this = $(this),
            lat = +$this.attr('data-lat'),
            lon = +$this.attr('data-lon'),
            shop = $this.attr('data-shop'),
            address = $this.attr('title');

        if (!lat || !lon || !shop) return;

        if ( $.isApp ) {
            $.hybrid.toMap({
                latitude: lat,
                longitude: lon,
                shopName: shop
            });
        } else {
            mallMes = {}
            mallMes.address = address;
            mallMes.shop = shop;
            $.lsSession('hx_mall_message', mallMes);
            $.directPage('map?lat=' + lat + '&lon=' + lon);
        }

        return false;
    });

    // 上传图片
    $('[type="file"]').on('click', function (e) {
        console.log('----------------上传图片-------------');
        e.preventDefault();

        $.hybrid.toNative('selectImg', {
            tag: '18'
        });
    });

})(jQuery);

/*setTimeout(function(){
    console.log('----------------------------------userInfo resolve--------------------------------')
    window._app_callback('passUserInfo', '');
}, 5000);*/
/*setTimeout(function(){
    console.log('----------------------------------userInfo resolve--------------------------------')
    window._app_callback('passUserInfo', JSON.stringify({
        openid: 'a18f480e-129b-4cc6-9ed9-4d6292d9ef32',
        sessionid: 'a262f48e-2832-4dc5-9a82-d7f300667737',
        token:'12345'


    }))
}, 5000);*/
