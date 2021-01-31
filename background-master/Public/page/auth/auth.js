// 登录组件
Core = san.defineComponent({
    template: `
        <div>
            <div class="page-title mb-3">
              <div class="title_left"><h3>管理员列表</h3></div>
              <div class="title_right"><div s-if="rules.add" class="btn btn-primary pull-right" on-click="append">添加</div></div>
            </div>
            
            <table class="table table-striped table-bordered">
                <thead><tr><th>#</th><th>头像</th><th>账号</th><th>昵称</th><th>角色</th><th>创建时间</th><th>上次登录时间</th><th>登录状态</th><th>用户状态</th><th>操作</th></tr></thead>
                <tbody>
                    <tr s-for="item in list">
                        <th scope="row">{{item.id}}</th>
                        <td><img src="{{item.photo ? item.photo : '/kernel/user.png'}}" width="30" height="30"/></td>
                        <td>{{item.uname}}</td>
                        <td>{{item.nickname}}</td>
                        <td>{{roles[item.role_id] ? roles[item.role_id] : '-'}}</td>
                        <td>{{item.created_at}}</td>
                        <td>{{item.logined_at}}</td>
                        <td><span class="badge badge-pill badge-{{item.status == 1 ? 'success' : 'secondary'}}">{{item.status == 1 ? '在线' : '未登录'}}</span></td>
                        <td><span class="badge badge-pill badge-{{item.deleted == 1 ? 'danger' : 'success'}}">{{item.deleted == 1 ? '已禁用' : '正常'}}</span></td>
                        <td>
                            <div s-if="rules.set" data-id="{{$item.id}}" class="btn btn-info" on-click="modify($event)">编辑</div>
                            <div s-if="rules.del" data-id="{{$item.id}}" class="btn btn-danger" on-click="remove($event)">删除</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="">总计 {{total}} 条数据</div>
        </div>`,

    formTemplate: `
        <form class="form-horizontal form-label-left">
            <div class="field item form-group">
                <label class="col-form-label col-2 label-align">账号<span class="required">*</span></label>
                <div class="col-6">
                    <input type="text" name="uname" class="form-control" pattern="^[a-zA-Z0-9_\-]{6,}$" required/>
                </div>
            </div>
            <div class="field item form-group">
                <label class="col-form-label col-2 label-align">昵称<span class="required">*</span></label>
                <div class="col-6">
                    <input type="text" name="nickname" class="form-control" required/>
                </div>
            </div>
            <div class="field item form-group">
                <label class="col-form-label col-2 label-align">密码<span class="required">*</span></label>
                <div class="col-6">
                    <input type="password" name="password" class="form-control" pattern="^[a-zA-Z0-9_\-]{6,}$" required/>
                </div>
            </div>
            <div class="field item form-group">
                <label class="col-form-label col-2 label-align">角色<span class="required">*</span></label>
                <div class="col-6"><select name="role_id" class="form-control" required>[#roles#]</select></div>
            </div>
            <div class="field item form-group">
                <label class="col-form-label col-2 label-align">头像<span class="required">*</span></label>
                <div class="col-6"><input type="file" name="photo" class="form-control"/></div>
            </div>
        </form>`,

    append: function () {
        let self = this
        request(self, false, '/auth/role', {page: 0}, function (self, res) {
            let roles = ''
            $.each(res.data, function (k, v) {
                roles += '<option value="' + k.id + '">' + v.name + '</option>'
            })
            alert({withSaveBtn: true, center: true, color: 'bg-primary'}, {
                title: '新增管理员',
                body: self.formTemplate.replace('[#roles#]', roles)
            }, {
                save: function ($form) {
                    request(self, false, '/auth/authAdd', $form.serialize(), function (self, res) {
                        log(res)
                        $('#alert').modal('hide')
                    })
                }
            })
        })
    },

    modify: function (e) {

    },
    remove: function (e) {

    },

    created: function () {
        $('#main').html('')
    },

    attached: function () {
        request(this, false, '/auth/auth', {page: 1}, function (self, res) {
            self.data.set('roles', res.data.roles)
            self.data.set('total', res.data.total)
            self.data.set('list', res.data.list)
        })
    },

    // 初始
    initData: function () {
        return {
            total: 0,
            list: [],
            roles: []
        }
    }
})
