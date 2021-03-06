let api = [];
const apiDocListSize = 1
api.push({
    name: 'default',
    order: '1',
    list: []
})
api[0].list.push({
    alias: 'ApiController',
    order: '1',
    link: '公共访问接口',
    desc: '公共访问接口',
    list: []
})
api[0].list[0].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/api/upload',
    desc: '文件上传',
});
api[0].list.push({
    alias: 'TopicController',
    order: '2',
    link: '话题相关',
    desc: '话题相关',
    list: []
})
api[0].list[1].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/publish',
    desc: '发布话题',
});
api[0].list[1].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/like/{topicId}',
    desc: '给话题点赞',
});
api[0].list[1].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/unlike/{topicId}',
    desc: '取消对话题的点赞',
});
api[0].list[1].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/comment/{topicId}',
    desc: '评论话题',
});
api[0].list[1].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/comment/comment/{commentId}',
    desc: '评论的评论',
});
api[0].list[1].list.push({
    order: '6',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/page',
    desc: '分页获取话题',
});
api[0].list[1].list.push({
    order: '7',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/comment/page/{topicId}',
    desc: '分页获取评论',
});
api[0].list[1].list.push({
    order: '8',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/comment/inner/{commentId}',
    desc: '获取评论的评论',
});
api[0].list[1].list.push({
    order: '9',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/comment/like/{commentId}',
    desc: '点赞评论',
});
api[0].list[1].list.push({
    order: '10',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/comment/unlike/{commentId}',
    desc: '取消点赞评论',
});
api[0].list[1].list.push({
    order: '11',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/topic/mine',
    desc: '获取我发布过的话题',
});
api[0].list.push({
    alias: 'UserController',
    order: '3',
    link: '用户相关',
    desc: '用户相关',
    list: []
})
api[0].list[2].list.push({
    order: '1',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/user/info',
    desc: '获取用户基本信息',
});
api[0].list[2].list.push({
    order: '2',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/user/login',
    desc: '用户登陆',
});
api[0].list[2].list.push({
    order: '3',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/user/register',
    desc: '用户注册',
});
api[0].list[2].list.push({
    order: '4',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/user/change/info',
    desc: '修改个人信息',
});
api[0].list[2].list.push({
    order: '5',
    deprecated: 'false',
    url: 'http://110.40.157.12:8002/user/change/password',
    desc: '修改密码',
});
document.onkeydown = keyDownSearch;
function keyDownSearch(e) {
    const theEvent = e;
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        const search = document.getElementById('search');
        const searchValue = search.value;
        let searchGroup = [];
        for (let i = 0; i < api.length; i++) {

            let apiGroup = api[i];

            let searchArr = [];
            for (let i = 0; i < apiGroup.list.length; i++) {
                let apiData = apiGroup.list[i];
                const desc = apiData.desc;
                if (desc.indexOf(searchValue) > -1) {
                    searchArr.push({
                        order: apiData.order,
                        desc: apiData.desc,
                        link: apiData.link,
                        list: apiData.list
                    });
                } else {
                    let methodList = apiData.list || [];
                    let methodListTemp = [];
                    for (let j = 0; j < methodList.length; j++) {
                        const methodData = methodList[j];
                        const methodDesc = methodData.desc;
                        if (methodDesc.indexOf(searchValue) > -1) {
                            methodListTemp.push(methodData);
                            break;
                        }
                    }
                    if (methodListTemp.length > 0) {
                        const data = {
                            order: apiData.order,
                            desc: apiData.desc,
                            link: apiData.link,
                            list: methodListTemp
                        };
                        searchArr.push(data);
                    }
                }
            }
            if (apiGroup.name.indexOf(searchValue) > -1) {
                searchGroup.push({
                    name: apiGroup.name,
                    order: apiGroup.order,
                    list: searchArr
                });
                continue;
            }
            if (searchArr.length === 0) {
                continue;
            }
            searchGroup.push({
                name: apiGroup.name,
                order: apiGroup.order,
                list: searchArr
            });
        }
        let html;
        if (searchValue == '') {
            const liClass = "";
            const display = "display: none";
            html = buildAccordion(api,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        } else {
            const liClass = "open";
            const display = "display: block";
            html = buildAccordion(searchGroup,liClass,display);
            document.getElementById('accordion').innerHTML = html;
        }
        const Accordion = function (el, multiple) {
            this.el = el || {};
            this.multiple = multiple || false;
            const links = this.el.find('.dd');
            links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
        };
        Accordion.prototype.dropdown = function (e) {
            const $el = e.data.el;
            $this = $(this), $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp("20").parent().removeClass('open');
            }
        };
        new Accordion($('#accordion'), false);
    }
}

function buildAccordion(apiGroups, liClass, display) {
    let html = "";
    let doc;
    if (apiGroups.length > 0) {
         if (apiDocListSize == 1) {
            let apiData = apiGroups[0].list;
            for (let j = 0; j < apiData.length; j++) {
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#_' + apiData[j].link + '">' + apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                html += '<ul class="sectlevel2" style="'+display+'">';
                doc = apiData[j].list;
                for (let m = 0; m < doc.length; m++) {
                    let spanString;
                    if (doc[m].deprecated == 'true') {
                        spanString='<span class="line-through">';
                    } else {
                        spanString='<span>';
                    }
                    html += '<li><a href="#_' + apiData[j].order + '_' + doc[m].order + '_' + doc[m].href + '">' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                }
                html += '</ul>';
                html += '</li>';
            }
        } else {
            for (let i = 0; i < apiGroups.length; i++) {
                let apiGroup = apiGroups[i];
                html += '<li class="'+liClass+'">';
                html += '<a class="dd" href="#_' + apiGroup.name + '">' + apiGroup.order + '.&nbsp;' + apiGroup.name + '</a>';
                html += '<ul class="sectlevel1">';

                let apiData = apiGroup.list;
                for (let j = 0; j < apiData.length; j++) {
                    html += '<li class="'+liClass+'">';
                    html += '<a class="dd" href="#_'+apiGroup.order+'_'+ apiData[j].order + '_'+ apiData[j].link + '">' +apiGroup.order+'.'+ apiData[j].order + '.&nbsp;' + apiData[j].desc + '</a>';
                    html += '<ul class="sectlevel2" style="'+display+'">';
                    doc = apiData[j].list;
                    for (let m = 0; m < doc.length; m++) {
                       let spanString;
                       if (doc[m].deprecated == 'true') {
                           spanString='<span class="line-through">';
                       } else {
                           spanString='<span>';
                       }
                       html += '<li><a href="#_'+apiGroup.order+'_' + apiData[j].order + '_' + doc[m].order + '_' + doc[m].desc + '">'+apiGroup.order+'.' + apiData[j].order + '.' + doc[m].order + '.&nbsp;' + spanString + doc[m].desc + '<span></a> </li>';
                   }
                    html += '</ul>';
                    html += '</li>';
                }

                html += '</ul>';
                html += '</li>';
            }
        }
    }
    return html;
}