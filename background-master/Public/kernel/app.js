// 日志打印
const log = function () {
    console.log.apply(console, arguments);
}
// 消息提示
const alert = function (style, text, callback) {
    if (text.hasOwnProperty('body') && text.body.length < 200 && !style.hasOwnProperty('size')) style.size = 'sm'
    if (callback && callback.hasOwnProperty('save') && callback.save) style.size = 'lg'
    $('body').append(`
            <div id="alert" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog ${style.size ? ('modal-' + style.size) : ''} ${style.center ? 'modal-dialog-centered' : ''}" role="document">
                    <div class="modal-content">
                        <div class="modal-header pt-2 pb-2 ${style.color ? ('text-white ' + style.color) : ''}">
                            <h5 class="modal-title">${text.title ? text.title : ''}</h5>
                            <a href="javascript:void(0)" class="close ${style.color && style.color != 'bg-white' ? 'text-white' : ''}" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></a>
                        </div>
                        ${text.body ? ('<div class="modal-body">' + text.body + '</div>') : ''}
                        <div class="modal-footer pt-2 pb-1">
                            <div class="btn btn-secondary" data-dismiss="modal" style="padding:0 10px!important;line-height:32px!important;">${text.closeBtnText ? text.closeBtnText : '关闭'}</div>
                            ${style.withSaveBtn ? ('<div class="btn bg-success text-white submit ml-3" style="padding:0 10px!important;line-height:32px!important;">' + (text.saveBtnText ? text.saveBtnText : '提交') + '</div>') : ''}
                        </div>
                    </div>
                </div>
            </div>`).find('#alert').modal('show')
    // 高度自适应
    var handleUpdate = function () {
        if ($('#alert').length > 0) {
            return setInterval(function () {
                $('#alert').modal('handleUpdate')
            })
        }
        return false
    }()
    let $alert = $('#alert')
    $alert.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
        $(this).modal('dispose').remove()
        handleUpdate && clearInterval(handleUpdate)
        if (callback && callback.close && typeof callback.close == 'function') {
            callback.close()
        }
        // 转到登录
        if (callback && callback.needLogin) app.openLogin(app)
    })
    if (callback && callback.save && typeof callback.save == 'function') {
        $alert.off('shown.bs.modal').on('shown.bs.modal', function () {
            let $form = $('#alert form')
            let validator = $form.length > 0 ? new FormValidator({"events": ['blur', 'input', 'change']}, $form.get(1)) : false;
            $alert.find('.submit').off('click').on('click', function () {
                if (!validator || !!validator.checkAll($form.get(0)).valid) callback.save($form)
            })
        })
    }
}
// 接口请求
const request = function (self, isScript, url, data, doneCallback, failCallback, isSync = false, completeCallback) {
    let options = {url: url, data: data, type: 'POST', dataType: 'json', cache: false, async: !isSync}
    if (isScript) {
        delete options.data
        options.type = 'GET'
        options.dataType = 'script'
        failCallback = function () {
            localStorage.setItem('current_route', 'home')
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: '页面打开失败，请重试'})
        }
    } else {
        options.beforeSend = function (xhr) {
            let token = localStorage.getItem('token')
            xhr.setRequestHeader("Authorization", 'Bearer ' + token)
        }
    }
    $.ajax(options).done(function (res) {
        doneCallback && doneCallback(self, res)
    }).fail(function (err) {
        failCallback && failCallback(self, err)
    }).complete(function () {
        completeCallback && completeCallback(self)
    });
}

$(document).ready(function () {
    if (typeof NProgress != 'undefined') {
        NProgress.start();
    }
})
$(window).on('load resize', function () {
    if (typeof NProgress != 'undefined') {
        NProgress.done();
    }
    if ($('#main').length > 0) {
        $('#main').css('min-height', $('#menu').height() - $('#header').height() - $('#footer').height() - 27)
    }
})