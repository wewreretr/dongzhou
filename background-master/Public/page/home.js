Core = san.defineComponent({
    template: `
        <div id="body" data-route="{{route}}" class="main_container">
            <!-- 顶栏 -->
            <div id="header" class="top_nav">
                <div class="nav_menu">
                    <div class="nav toggle"><a id="menu_toggle"><i class="fa fa-bars"></i></a></div>
                    <nav class="nav navbar-nav">
                        <ul class=" navbar-right">
                            <li x-if="message.count && message.count > 0" role="presentation" class="nav-item dropdown open">
                                <span class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                                    <i class="fa fa-envelope-o"></i><span class="badge bg-green">{{message.count}}</span>
                                </span>
                                <ul class="dropdown-menu list-unstyled msg_list" role="menu" aria-labelledby="navbarDropdown1">
                                    <li s-for="msg in message.list" class="nav-item">
                                        <a class="dropdown-item" on-click="readMessage">
                                            <span class="image"><span class="fa fa-{{msg.icon}}" aria-hidden="true"></span></span>
                                            <span>
                                              <span>{{msg.from}}</span>
                                              <span class="time">{{msg.time}}</span>
                                            </span>
                                            <span class="message">{{msg.text}}</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <span class="text-center">
                                            <span class="dropdown-item" on-click="showAllMessage"><strong>查看所有</strong><i class="fa fa-angle-right"></i></span>
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- 左侧菜单栏 -->
            <div id="menu" class="col-md-3 left_col">
                <div class="left_col scroll-view">
                    <div class="navbar nav_title b-0">
                        <a href="javascript:void(0)" class="site_title"><i class="fa fa-paw"></i> <span>{{title}}</span></a>
                    </div>
                    <div class="clearfix"></div>
                    <div class="profile clearfix mb-1">
                        <div class="profile_pic mt-1"><img src="{{headImg ? headImg : '/kernel/user.png'}}" class="img-circle profile_img" aria-hidden="true"/></div>
                        <div class="profile_info"><span>Welcome,</span><h2 class="mt-0 ml-1">{{username}}</h2></div>
                    </div>
                    <div class="main_menu">
                        <div class="menu_section">
                            <ul class="nav side-menu">
                                <li s-for="group in menu">
                                    <a><i class="fa fa-bug"></i> {{group.name}} <span class="fa fa-chevron-down"></span></a>
                                    <ul class="nav child_menu">
                                        <li s-for="item in group.items"><a href="javascript:void(0);" data-route="{{item.node}}" on-click="jumpToPage($event)">{{item.name}}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="sidebar-footer hidden-small">
                        <a data-toggle="tooltip" data-placement="top" title="设置" on-click="setting">
                            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="全屏" on-click="fullScreen">
                            <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="锁屏" on-click="lockScreen">
                            <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="登出" on-click="logout">
                            <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 主内容区域 -->
            <div id="main" data-route="home" class="right_col bg-white" style="padding-top:50px" role="main">
            

                <div class="page-title hide">
                  <div class="title_left">
                    <h3>Inbox Design <small>Some examples to get you started</small></h3>
                  </div>
                  <div class="title_right">
                    <div class="col-md-5 col-sm-5   form-group pull-right top_search">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for...">
                        <span class="input-group-btn">
                          <button class="btn btn-secondary" type="button">Go!</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="clearfix hide"></div>

                <div class="row hide">
                  <div class="col-md-12">
                    <div class="x_panel">
                      <div class="x_title">
                        <h2>Inbox Design<small>User Mail</small></h2>
                        <ul class="nav navbar-right panel_toolbox">
                          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                          </li>
                          <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Settings 1</a>
                                <a class="dropdown-item" href="#">Settings 2</a>
                              </div>
                          </li>
                          <li><a class="close-link"><i class="fa fa-close"></i></a>
                          </li>
                        </ul>
                        <div class="clearfix"></div>
                      </div>
                      <div class="x_content">
                        <div class="row">
                          <div class="col-sm-3 mail_list_column">
                            <button id="compose" class="btn btn-sm btn-success btn-block" type="button">COMPOSE</button>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  <i class="fa fa-circle"></i> <i class="fa fa-edit"></i>
                                </div>
                                <div class="right">
                                  <h3>Dennis Mugo <small>3.00 PM</small></h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  <i class="fa fa-star"></i>
                                </div>
                                <div class="right">
                                  <h3>Jane Nobert <small>4.09 PM</small></h3>
                                  <p><span class="badge">To</span> Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  <i class="fa fa-circle-o"></i><i class="fa fa-paperclip"></i>
                                </div>
                                <div class="right">
                                  <h3>Musimbi Anne <small>4.09 PM</small></h3>
                                  <p><span class="badge">CC</span> Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  <i class="fa fa-paperclip"></i>
                                </div>
                                <div class="right">
                                  <h3>Jon Dibbs <small>4.09 PM</small></h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  .
                                </div>
                                <div class="right">
                                  <h3>Debbis & Raymond <small>4.09 PM</small></h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  .
                                </div>
                                <div class="right">
                                  <h3>Debbis & Raymond <small>4.09 PM</small></h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  <i class="fa fa-circle"></i> <i class="fa fa-edit"></i>
                                </div>
                                <div class="right">
                                  <h3>Dennis Mugo <small>3.00 PM</small></h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                            <a href="#">
                              <div class="mail_list">
                                <div class="left">
                                  <i class="fa fa-star"></i>
                                </div>
                                <div class="right">
                                  <h3>Jane Nobert <small>4.09 PM</small></h3>
                                  <p>Ut enim ad minim veniam, quis nostrud exercitation enim ad minim veniam, quis nostrud exercitation...</p>
                                </div>
                              </div>
                            </a>
                          </div>
                          <!-- /MAIL LIST -->
    
                          <!-- CONTENT MAIL -->
                          <div class="col-sm-9 mail_view">
                            <div class="inbox-body">
                              <div class="mail_heading row">
                                <div class="col-md-8">
                                  <div class="btn-group">
                                    <button class="btn btn-sm btn-primary" type="button"><i class="fa fa-reply"></i> Reply</button>
                                    <button class="btn btn-sm btn-default" type="button"  data-placement="top" data-toggle="tooltip" data-original-title="Forward"><i class="fa fa-share"></i></button>
                                    <button class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip" data-original-title="Print"><i class="fa fa-print"></i></button>
                                    <button class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip" data-original-title="Trash"><i class="fa fa-trash-o"></i></button>
                                  </div>
                                </div>
                                <div class="col-md-4 text-right">
                                  <p class="date"> 8:02 PM 12 FEB 2014</p>
                                </div>
                                <div class="col-md-12">
                                  <h4> Donec vitae leo at sem lobortis porttitor eu consequat risus. Mauris sed congue orci. Donec ultrices faucibus rutrum.</h4>
                                </div>
                              </div>
                              <div class="sender-info">
                                <div class="row">
                                  <div class="col-md-12">
                                    <strong>Jon Doe</strong>
                                    <span>(jon.doe@gmail.com)</span> to
                                    <strong>me</strong>
                                    <a class="sender-dropdown"><i class="fa fa-chevron-down"></i></a>
                                  </div>
                                </div>
                              </div>
                              <div class="view-mail">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                                <p>Riusmod tempor incididunt ut labor erem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                  mollit anim id est laborum.</p>
                                <p>Modesed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                              </div>
                              <div class="attachment">
                                <p>
                                  <span><i class="fa fa-paperclip"></i> 3 attachments — </span>
                                  <a href="#">Download all attachments</a> |
                                  <a href="#">View all images</a>
                                </p>
                              </div>
                              <div class="btn-group">
                                <button class="btn btn-sm btn-primary" type="button"><i class="fa fa-reply"></i> Reply</button>
                                <button class="btn btn-sm btn-default" type="button"  data-placement="top" data-toggle="tooltip" data-original-title="Forward"><i class="fa fa-share"></i></button>
                                <button class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip" data-original-title="Print"><i class="fa fa-print"></i></button>
                                <button class="btn btn-sm btn-default" type="button" data-placement="top" data-toggle="tooltip" data-original-title="Trash"><i class="fa fa-trash-o"></i></button>
                              </div>
                            </div>
    
                          </div>
                          <!-- /CONTENT MAIL -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
                
            </div>
            <footer id="footer">
                <div class="pull-right">©2020 All Rights Reserved. 夜猫体育文化APP官方网站版—足球迷超清看球赛聊球必备应用</div>
                <div class="clearfix"></div>
            </footer>
        </div>`,

    // 登出
    logout: function () {
        request(this, false, '/index/logout', {}, function (self, res) {
            if (res.code === 200) {
                alert({center: true, color: 'bg-success'}, {title: '提示', body: res.msg}, {
                    close: function () {
                        localStorage.removeItem('token')
                        location.reload()
                    }
                })
            } else {
                alert({center: true, color: 'bg-danger'}, {title: '提示', body: res.msg})
            }
        }, function (err) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: err})
        })
    },

    // 跳转到其他页
    jumpToPage: function (e, route, self, menu) {
        if (self === undefined) self = this
        if (route === undefined) route = $(e.target).data('route')
        route = route.toLowerCase()
        let tmp = route.split('.')
        if (tmp.length === 2) {
            if (menu === undefined) menu = self.data.get('menu')
            if (menu.hasOwnProperty(tmp[0]) && menu[tmp[0]].items.hasOwnProperty(tmp[1] + '.' + tmp[1])) {
                let rules = {}
                $.each(menu[tmp[0]].items[tmp[1] + '.' + tmp[1]].items, function (kk, vv) {
                    let text = kk.split('.')[2]
                    rules[text] = true
                })
                self.data.set('rules', rules)
            } else {
                alert({center: true, color: 'bg-danger'}, {title: '提示', body: '你无权打开此页面'})
                return
            }
        }
        let url = 'page/' + route.replaceAll('.', '/') + '.js'
        request(self, true, url, {}, function () {
            localStorage.setItem('current_route', route)
            let core = new Core({owner: self, source: '<x-core route="' + route + '" rules="{{rules}}"/>'})
            core.attach(document.getElementById('main'))
        })
    },

    // 阅读消息
    readMessage: function () {
    },
    // 查看全部消息
    showAllMessage: function () {
    },

    // 页面设置
    setting: function () {
    },

    // 全屏
    fullScreen: function () {
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.mozRequestFullScreen) {
            document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) {
            document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) {
            document.body.msRequestFullscreen();
        }
    },

    // 锁屏
    lockScreen: function () {

    },

    // 获取菜单
    getMenu: function (self, sync = true) {
        let menu = {}
        if (self === undefined) self = this
        request(self, false, '/home/menu', {}, function (self, res) {
            menu = res.data
            if (!sync) self.data.set('menu', menu)
        }, function (self, err) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: err})
        }, true)
        return menu
    },

    // 获取消息
    getMessage: function (self) {
        if (self === undefined) self = this
        request(self, false, '/home/message', {}, function (self, res) {
            self.data.set('message', res.data)
        }, function (self, err) {
            alert({center: true, color: 'bg-danger'}, {title: '提示', body: err})
        })
    },

    created: function () {
        $('#body').remove()
    },

    attached: function () {
        $('body').on('click', '#menu .side-menu a', function () {
            let $li = $(this).parent()
            if ($li.parent().hasClass('child_menu')) return
            if ($li.hasClass('active')) {
                $li.removeClass('active active-sm').find('ul').slideUp();
            } else {
                $li.addClass('active').find('ul').slideDown().parent().siblings().removeClass('active').find('ul').slideUp()
            }
        }).attr('class', 'nav-md')
        $('#menu_toggle').on('click', function () {
            let $body = $('body')
            let $menu = $('#sidebar-menu')
            if ($body.hasClass('nav-md')) {
                $menu.find('li.active ul').hide();
                $menu.find('li.active').addClass('active-sm').removeClass('active');
            } else {
                $menu.find('li.active-sm ul').show();
                $menu.find('li.active-sm').addClass('active').removeClass('active-sm');
            }
            $('#menu .side-menu li.active>a').click()
            $body.toggleClass('nav-md nav-sm');
        });
        $('#main').css('min-height', $('#menu').height() - $('#header').height() - $('#footer').height() + 8)

        // 浏览记忆
        let currentRoute = localStorage.getItem('current_route')
        if (currentRoute && currentRoute !== 'home' && currentRoute !== this.data.get('route')) {
            this.jumpToPage(null, currentRoute, this, this.getMenu(this))
        } else {
            localStorage.setItem('current_route', 'home')
        }

        document.title = this.data.get('title')
    },

    initData: function () {
        let menu = this.getMenu(this)
        let message = this.getMessage(this)
        return {
            title: '体育直播管理',
            rules: {},
            menu: menu,
            message: message,
            username: localStorage.getItem('username')
        }
    }
})