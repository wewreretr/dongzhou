// 登录组件
Core = san.defineComponent({
    template: `
        <div id="login" class="login_wrapper">
            <div class="animate form login_form">
                <section class="login_content">
                    <form>
                        <h1>登录</h1>
                        <div><input type="text" value="{= username =}" class="form-control" placeholder="Username" required/></div>
                        <div><input type="text" onfocusin="this.type='password'" value="{= password =}" class="form-control" autocomplete="off" placeholder="Password" required/></div>
                        <div class="btn-group btn-block mb-4 {{debug ? '' : 'hide'}}">
                            <img src="{{image}}" on-click="getVCode" style="width:300px;height:52px;padding:0;border:1px solid #ccc;cursor:pointer"/>
                            <input type="text" value="{= vcode =}" class="form-control" placeholder="Code" style="height:52px;margin-left:3px" required/>
                        </div>
                        <div><span class="btn btn-block btn-secondary" on-click="submit">提交</span></div>
                        <div class="clearfix"></div>
                        <div class="separator">
                            <p class="change_link mb-2">New to site?<a href="javascript:void(0)"> Create Account </a></p>
                            <div>
                                <h1><i class="fa fa-paw"></i> 夜猫体育</h1>
                                <p>©2020 All Rights Reserved. 夜猫体育文化APP官方网站版—足球迷超清看球赛聊球必备应用</p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>`,

    // 获取验证码
    getVCode: function (e, self) {
        if (self === undefined) self = this
        request(self, false, '/index/vcode', {}, function (self, res) {
            self.data.set('image', res.data.image)
            self.data.set('token', res.data.token)
        })
    },

    // 登录提交
    submit: function () {
        // 禁止重复提交
        if (this.data.get('status') === 1) return;

        //用户名校验
        let username = $.trim(this.data.get('username'))
        if (!username) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: '用户名不能为空'})
            return
        }
        localStorage.setItem('username', username)

        // 密码校验
        let password = $.trim(this.data.get('password'))
        if (!password) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: '密码不能为空'})
            return
        }

        // 验证码校验
        let debug = this.data.get('debug')
        let vcode = $.trim(this.data.get('vcode'))
        if (debug && !vcode) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: '验证码不能为空'})
            return
        }
        let token = this.data.get('token')

        this.data.set('status', 1)
        request(this, false, '/index/login', {
            username: username,
            password: password,
            vcode: vcode,
            token: token
        }, function (self, res) {
            self.data.set('status', 0)
            if (res.code === 200) {
                alert({center: true, color: 'bg-success'}, {title: '提示', body: res.msg}, {
                    close: function () {
                        localStorage.setItem('token', res.data.token)
                        location.reload()
                    }
                })
            } else {
                alert({center: true, color: 'bg-danger'}, {title: '提示', body: res.msg}, {
                    close: function () {
                        self.getVCode(self)
                    }
                })
            }
        }, function (self, err) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: err}, {
                close: function () {
                    self.getVCode(self)
                }
            })
        })
    },

    // 初始
    initData: function () {
        //清空缓存的认证token
        localStorage.removeItem('token')
        // 加载验证码
        this.getVCode()
        return {
            vcode: '',
            image: '',
            token: '',
            status: 0,
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
        }
    }
})
