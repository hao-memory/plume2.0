/**
 * Created by lenovo on 2016/12/20.
 */
/**
 * 公用ajax请求方法
 * @param option
 * strData post请求是否不将data转换为字符串,true(不转)/false(转)
 * loading 是否显示正在加载图标,0(显示)/1(不显示)
 * @returns {*}
 */
$(function() {

    var host = '',
        path = window.location.href;

    function ac_getHost(urlName) {
        //生产
        if (path.indexOf("mkl.mmall.com") != -1 || path.indexOf("wap.mmall.com") != -1) {
            if (urlName.indexOf("valentine-") != -1) {
                host = 'https://api-promotion.mmall.com/';
            } else if (urlName.indexOf("user-") != -1) {
                host = 'https://api-user.mmall.com/api/';
            } else if (urlName.indexOf("wenshui-") != -1) {
                host = 'https://api-promotion.mmall.com/';
            } else if (urlName.indexOf("cmsAc-") != -1) {
                host = 'https://cms.mmall.com/cms-web/activity/';
            }
        } else if (path.indexOf("mkl.mklmall.com") != -1) {
            if (urlName.indexOf("valentine-") != -1) {
                host = 'http://api-promotion.mklmall.com/';
            } else if (urlName.indexOf("user-") != -1) {
                host = 'http://api-user.mklmall.com/api/';
            } else if (urlName.indexOf("wenshui-") != -1) {
                host = 'http://api-promotion.mklmall.com/';
                //host = 'https://api-promotion.mmall.com/';
            } else if (urlName.indexOf("cmsAc-") != -1) {
                host = 'http://cms.mklmall.com/cms-web/activity/';
            }

        } else if (path.indexOf("mkl.uat1.rs.com") != -1) {

            if (urlName.indexOf("valentine-") != -1) {
                host = 'http://api-promotion.uat1.rs.com/';
            } else if (urlName.indexOf("user-") != -1) {
                host = 'http://api-user.uat1.rs.com/api/';
            } else if (urlName.indexOf("wenshui-") != -1) {
                host = 'http://api-promotion.uat1.rs.com/';
            } else if (urlName.indexOf("cmsAc-") != -1) {
                host = 'http://cms.uat1.rs.com/cms-web/activity/';
            }

        } else if (path.indexOf("mkl.dev.rs.com") != -1) {
            if (urlName.indexOf("valentine-") != -1) {
                host = 'http://192.168.124.13:53305/';
            } else if (urlName.indexOf("user-") != -1) {
                host = 'http://api-user.dev.rs.com/api/';
            } else if (urlName.indexOf("wenshui-") != -1) {
                // host = 'http://api-promotion.uat1.rs.com/';
                host = 'http://api-promotion.dev.rs.com/';
            } else if (urlName.indexOf("cmsAc-") != -1) {
                host = 'http://cms.dev.rs.com/cms-web/activity/';
            }

        } else {
            if (urlName.indexOf("valentine-") != -1) {
                host = 'http://192.168.124.13:53305/';
            } else if (urlName.indexOf("user-") != -1) {
                host = 'http://api-user.dev.rs.com/api/';
            } else if (urlName.indexOf("wenshui-") != -1) {
                // host = 'http://api-promotion.uat1.rs.com/';
                host = 'http://api-promotion.dev.rs.com/';
            } else if (urlName.indexOf("cmsAc-") != -1) {
                host = 'http://cms.dev.rs.com/cms-web/activity/';
            }
        }
        return host;
    }

    $.getHostUrl = function(url) {
        return ac_getHost(url);
    };

    /**
     * 活动页面跳转方法
     */
    $.ac_directPage = function(page) {
        try {
            $.point.p_bigData();
            $.lsSession('p_back_page', window.location.href);
        } catch (e) {

        }
        $.direct(page);
        // window.location.href = window.location.origin + '/' + page;
    };

    /**
     * 活动页面返回
     */
    $.ac_backPage = function() {
        console.log("-----------回退------------");
        if (window.location.href.indexOf('back=h5') > -1) {
            //埋点需求 添加
            window.sessionStorage.setItem('p_back_page', window.location.href);
            history.back();
        } else {
            $.hybrid.back();
        }
        return false;
    };

    /**
     * 公用ajax请求方法
     * @param option
     * strData post请求是否不将data转换为字符串,true(不转)/false(转)
     * loading 是否显示正在加载图标,0(显示)/1(不显示)
     * @returns {*}
     */
    $.ac_commonAjax = function(option, strData, loading) {
        var option = $.extend({}, $.defaultAjax, option),
            dataJson = option.data ? option.data : {},
            header = {};

        header = option.headers ? option.headers : {"x-auth-token": $.getUser().sessionid};


        if ( typeof strData === 'number') {
            loading = strData;
            strData = null;
        }

        loading = 1;

        if ( option.async == undefined ) {
            option.async = true;
        }

        // option.stringData：针对请求类型不同
        if ((option.type.toUpperCase() != "GET") && !strData) {
            dataJson = JSON.stringify(option.data);
        }

        // 如果有传入urlParams这个对象，我们会将值拼成字符串跟在url后面、如：http://test.api.com/test?test=1&test1=2
        var urlStringArr = [], urlString = '';
        if (option.urlParams) {
            $.jsonValid(option.urlParams) && $.each(option.urlParams, function (name, value) {
                urlStringArr.push(name + '=' + value);
            });
            urlString = urlStringArr.join('&');
        }

        ac_getHost(option.url);

        // 如果有传入operationId，我们会将值拼成字符串跟在url后面、如：http://test.api.com/test/operationId
        if (typeof(option.operationId) !== "undefined") {
            option.url = ac_getHost(option.url) + $.configApi[option.url] + '/' + option.operationId;
        } else {
            option.url = ac_getHost(option.url) + $.configApi[option.url] + (urlString ? ('?' + urlString) : '');
        }

        if ( !!!option.contentType ) {
            option.contentType = 'application/json';
        }

        return $.ajax({
            type: option.type ? option.type : 'GET',
            url: option.url,
            async: option.async,
            data: dataJson,
            dataType: option.dataType || 'json',
            traditional: option.traditional,
            contentType: option.contentType,
            headers: header,
            success: function (data) {
                if ( !loading ) $.unloading();
                typeof(option.success) === 'function' && option.success(data);
            },
            error: function (data) {
                if ( !loading ) $.unloading();
                typeof(option.error) === 'function' && option.error(data);
            },
            beforeSend: function (xhr) {
                if ( !loading ) $.loading();
                if ( $.isFunction( option.beforeSend ) ) {
                    option.beforeSend(xhr);
                }
            }
        }).fail(function (res) {
            if (typeof(option.fail) === 'function') {
                option.fail();
            } else {
                if (res && res.responseText) {
                    var resJson = JSON.parse(res.responseText);
                    // $.alert(resJson);
                }
            }
        })
    }
});
