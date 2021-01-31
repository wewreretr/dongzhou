// 登录组件
Core = san.defineComponent({
    template: `
        <div>
            <div class="page-title mb-3"><h3>管理员角色列表</h3></div>
            
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>

        </div>`,

    created: function () {
        $('#main').html('')
    },

    // 初始
    initData: function () {
        return {
            search: {},
            list: []
        }
    }
})
