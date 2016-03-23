var bidders = [
    { "id" : "55a4eb8dda71df0c00d53aad", "name" : "mobile", "path": "http://www.baidu.com", "qps": 20 },
    { "id" : "55a4eb8dda71df0c00d53aae", "name" : "PC2", "selected": 1 },
    { "id" : "565db2c19ed61c5fcc714f7e", "name" : "12",  "selected": 0 },
    { "id" : "565db37dbc06e696ce1787ac", "name" : "23" },
    { "id" : "565db37dbc06e696ce1787ad", "name" : "df" },
    { "id" : "565db42a59b3d0bbcebf18ca", "name" : "dfd" }
];
var timer = null;
$('#addBiddersModal').modal('show');
function ControlBidders() {

}
ControlBidders.prototype.indexOfArray = function (arr, key, value) {
    var index = -1;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == value) {
            index = i;
            break;
        }
    }
    return index;
};

ControlBidders.prototype.init = function () {
    this.display();
    this.insertBidders(bidders, true);
    this.hover();
    this.click(bidders);
    this.del(bidders);
};
/*
 弹出框的显示与隐藏
 */
ControlBidders.prototype.display = function () {
    var _self = this;
    $('#switchBiddersBtn').click(function () {
        // 判断弹出框是否已经显示出来了
        var flag = $('#addBiddersBody').is(':hidden');
        // 如果没有显示出来，则进行if操作
        if (flag) {
            // 给当前按钮增加selected样式
            $(this).addClass('selected');
            // 让弹出框显示出来
            $('#addBiddersBody').removeClass('fadeOutUp').addClass('animated fadeInUp');
            $('#addBiddersBody').show();
            // 让所有的li都移除active，所有的操作按钮都隐藏
            $('#biddersList li').removeClass('active');
            $('#addBiddersModal .bidderOperate').css('visibility', 'hidden');
            // 遍历所有的对号图标，如果对号图标是显示出来的，则给该li增加active样式
            $('#addBiddersModal .activeBidderOK').each(function (k, v) {
                if ($(v).css('visibility') == 'visible') {
                    $(v).parent().parent().addClass('active');
                }
            });
        } else {
            _self.hide();
        }

//            function isParent (obj, parentObj){
//                while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY'){
//                    if (obj == parentObj){
//                        return true;
//                    }
//                    obj = obj.parentNode;
//                }
//                return false;
//            }
//            $(document).click(function(e){
//                var elem = e.target;
//                if ($(elem).attr('id') == 'switchBiddersBtn' || isParent(elem, $('#addBiddersBody')[0])) {
//                    return;
//                } else {
//                    _self.hide();
//                }
//            });
    });

    // 点击弹出框上面的x按钮时，也能关闭弹出框
    $('#J_closeAddBidder').click(function () {
        _self.hide();
    });
};

/*
 隐藏菜单
 */
ControlBidders.prototype.hide = function () {
    // 隐藏的话：按钮恢复样式，然后隐藏弹出框
    $('#switchBiddersBtn').removeClass('selected');
    $('#addBiddersBody').removeClass('fadeInUp').addClass('fadeOutUp');
    this.recoverBidder();
    clearTimeout(timer);
    timer = setTimeout(function () {
        $('#addBiddersBody').hide();
    }, 500);
};
/*
 插入bidders
 */
ControlBidders.prototype.insertBidders = function (bidders, initFlag) {
    var _html = '';
    var flag = false;
    var visible = '';
    var _index = this.indexOfArray(bidders, 'selected', 1);
    if (_index == -1) {
        if (initFlag) {
            bidders[0].selected = 1;
            visible = bidders[0].name;
        }
    } else {
        visible = bidders[_index].name;
    }
    for (var i = 0; i < bidders.length; i++) {
        if (bidders[i].name == visible) {
            flag = true;
            $('.bidderContent').html(visible);
            _html += '<li class="bidderItem active">' +
                '<p data-bidder="'+bidders[i].name+'" class="pull-left">' +
                '<span class="glyphicon glyphicon-ok activeBidderOK" style="visibility: visible;"></span>&nbsp;&nbsp;' +
                '<span>'+bidders[i].name+'</span>' +
                '</p>' +
                '<p class="pull-right bidderOperate" style="visibility: hidden;">' +
                '<a class="btn-sm modifyBidder" href="javascript:void(0);">修改</a>' +
                '<a href="javascript:void(0);" class="btn-sm delBidder">删除</a>' +
                '</p>' +
                '</li>';
        } else {
            _html += '<li class="bidderItem">' +
                '<p data-bidder="'+bidders[i].name+'" class="pull-left">' +
                '<span class="glyphicon glyphicon-ok activeBidderOK" style="visibility: hidden;"></span>&nbsp;&nbsp;' +
                '<span>'+bidders[i].name+'</span>' +
                '</p>' +
                '<p class="pull-right bidderOperate" style="visibility: hidden;">' +
                '<a class="btn-sm modifyBidder" href="javascript:void(0);">修改</a>' +
                '<a href="javascript:void(0);" class="btn-sm delBidder">删除</a>' +
                '</p>' +
                '</li>';
        }
    }
    $('#biddersList').html(_html);
    if (!flag) {
        $('#biddersList').find('.bidderItem').eq(0).addClass('active');
    }
};

/*
 鼠标移入移出事件
 */
ControlBidders.prototype.hover = function () {
    // 鼠标移入事件
    $('#biddersList').on('mouseover', '.bidderItem', function (e) {
        var elem = e.target;
        var _$elem = null;
        var targetName = e.target.nodeName.toLowerCase();
        switch (targetName) {
            case 'a':
            case 'input':
            case 'span':
                _$elem = $(elem).parent().parent();
                break;
            case 'p':
                _$elem = $(elem).parent();
                break;
            case 'li':
                _$elem = $(elem);
                break;
        }
        // 所有的li都移除active样式
        // 所有的操作按钮都隐藏
        $('#addBiddersModal .bidderItem').removeClass('active');
        $('#addBiddersModal .bidderOperate').css('visibility', 'hidden');
        // 给当前的li添加active
        _$elem.addClass('active');
        // 显示操作按钮
        _$elem.find('.bidderOperate').css('visibility', 'visible');
    });
    // 鼠标移除的时候，将所有的操作按钮隐藏
    $('#biddersList').on('mouseout', '.bidderItem', function () {
        $('#addBiddersModal .bidderOperate').css('visibility', 'hidden');
    });
};
/*
 鼠标点击事件
 */
ControlBidders.prototype.click = function (bidders) {
    var _self = this;
    $('#biddersList').on('click', '.bidderItem', function (e) {
        var elem = e.target;
        var _$elem = null;
        var targetName = e.target.nodeName.toLowerCase();
        console.log(targetName);
        switch (targetName) {
            case 'a':
            case 'input':
                break;
            case 'span':
                _$elem = $(elem).parent().parent();
                break;
            case 'p':
                _$elem = $(elem).parent();
                break;
            case 'li':
                _$elem = $(elem);
                break;
        }
        if (targetName != 'a' && targetName != 'input') {
            $('#addBiddersModal .activeBidderOK').css('visibility', 'hidden');
            _$elem.find('.activeBidderOK').css('visibility', 'visible');
            // 让上层的button切换
            var _bidder = _$elem.find('.activeBidderOK').next().html();
            $('.bidderContent').html(_bidder);
            for (var i = 0; i < bidders.length; i++) {
                bidders[i]['selected'] = 0;
            }
            var _index = _self.indexOfArray(bidders, 'name', _bidder);
            bidders[_index]['selected'] = 1;
        }
    });
};

/*
 删除功能
 */
ControlBidders.prototype.del = function (bidders) {
    var _self = this;
    // li的className是bidderItem
    $('#biddersList').on('click', '.delBidder', function (e) {
        if ($('#biddersList').find('.bidderItem').length <=1) {
            $('#biddersList').find('.delBidder').attr('title', '至少要有一个bidder');
        } else {
            var $parent = $(e.target).parent().parent();
            var _$parent = $parent.parent();
            var _$ok = $parent.find('.activeBidderOK');
            var _bidder = _$ok.next().html();
            if (_$ok.css('visibility') == 'visible') {
                _$parent[0].removeChild($parent[0]);
                _$ok = $('#biddersList').find('.activeBidderOK').eq(0);
                _$ok.css('visibility', 'visible');
                _$ok.parent().parent().addClass('active');
                // 让上层的button切换
                $('.bidderContent').html(_$ok.next().html());
                for (var j = 0; j < bidders.length; j++) {
                    bidders[j]['selected'] = 0;
                }
                bidders[_self.indexOfArray(bidders, 'name', _$ok.next().html())]['selected'] = 1;
            } else {
                _$parent[0].removeChild($parent[0]);
                _$ok = $('#biddersList').find('.activeBidderOK').eq(0);
                _$ok.parent().parent().addClass('active');
            }

            var _index = _self.indexOfArray(bidders, 'name', _bidder);
            bidders.splice(_index, 1);
        }
    });
};

/**
 *  修改功能 S
 */
ControlBidders.prototype.modifyOperator = function () {
    // 在modify中调用了recoverBidder
    this.modify();
    this.saveBiddle(bidders);
    this.cancelBidder();
};
/*
 点击修改按钮
 */
ControlBidders.prototype.modify = function () {
    var _self = this;
    // 点击修改按钮，触发事件
    $('#biddersList').on('click', '.modifyBidder', function (e) {
        // 点击修改按钮之前，恢复一下
        _self.recoverBidder();
        var $elem = $(e.target);
        var $parent = $elem.parent();
        var $prevParent = $elem.parent().prev();
        var $replaceElem = $prevParent.children().last();
        var bidder = $prevParent.attr('data-bidder');
        var input = '<input maxlength="10" class="form-control bidderInput" style="width:120px;height:26px;display:inline-block;" type="text" value="'+bidder+'"/>';
        var modify = '<a class="btn-sm saveBidder" href="javascript:void(0);">保存</a><a href="javascript:void(0);" class="btn-sm cancelBidder">取消</a>';
        var $input = $(input);
        // 将span替换成文本框
        $replaceElem.replaceWith($input);
        // 选中文本框的内容
        $input.select();
        // 将父节点下的按钮替换成保存和取消按钮
        $parent.html(modify);
    });
};
/*
 点击保存按钮
 */
ControlBidders.prototype.saveBiddle = function (bidders) {
    var _self = this;
    // 点击修改按钮，触发事件
    $('#biddersList').on('click', '.saveBidder', function (e) {
        // 保存按钮
        var $elem = $(e.target);
        // 保存按钮的父级p元素
        var $parent = $elem.parent();
        // 同级的p元素
        var $prevParent = $parent.prev();
        // 得到最后的input元素
        var $replaceElem = $prevParent.children().last();
        // 得到缓存的bidder内容
        var bidder = $prevParent.attr('data-bidder');
        var _index = _self.indexOfArray(bidders, 'name', bidder);
        var _bidder = $replaceElem.val().trim();
        // 如果用户没有作修改，则不需要设置data-bidder的值，如果修改了，则需要进行变更
        if (bidder != _bidder) {
            $prevParent.attr('data-bidder', _bidder);
            bidder = _bidder;
        }
        var span = '<span>'+bidder+'</span>';
        var $span = $(span);
        // 将文本框替换成span
        $replaceElem.replaceWith($span);

        var operator = '<a class="btn-sm modifyBidder" href="javascript:void(0);">修改</a>' +
            '<a href="javascript:void(0);" class="btn-sm delBidder">删除</a>';

        // 将父节点下的按钮替换成修改和删除按钮
        $parent.html(operator);
        bidders[_index]['name'] = bidder;
        if ($prevParent.find('.activeBidderOK').css('visibility') == 'visible') {
            $('.bidderContent').html(bidder);
        }
    });
};
/*
 点击取消按钮
 */
ControlBidders.prototype.cancelBidder = function () {
    // 点击修改按钮，触发事件
    $('#biddersList').on('click', '.cancelBidder', function (e) {
        // 取消按钮
        var $elem = $(e.target);
        // 取消按钮的父级p元素
        var $parent = $elem.parent();
        // 同级的p元素
        var $prevParent = $parent.prev();
        // 得到最后的input元素
        var $replaceElem = $prevParent.children().last();
        // 得到缓存的bidder内容
        var bidder = $prevParent.attr('data-bidder');
        var span = '<span>'+bidder+'</span>';
        var $span = $(span);
        // 将文本框替换成span
        $replaceElem.replaceWith($span);

        var operator = '<a class="btn-sm modifyBidder" href="javascript:void(0);">修改</a>' +
            '<a href="javascript:void(0);" class="btn-sm delBidder">删除</a>';

        // 将父节点下的按钮替换成修改和删除按钮
        $parent.html(operator);
    });
};
/*
 在点击修改和删除按钮之间，恢复一下
 将ul下面所有的input替换成span，然后将按钮替换成修改和删除按钮
 */
ControlBidders.prototype.recoverBidder = function () {
    $('#biddersList').find('input').each(function (k, v) {
        // 这是查询到input元素
        var $elem = $(v);
        // 得到input的父级元素p
        var $parent = $elem.parent();
        // 得到同级的p元素
        var $nextParent = $parent.next();
        // 得到bidder的值
        var bidder = $parent.attr('data-bidder');
        var span = '<span>'+bidder+'</span>';
        var $span = $(span);
        // 将文本框替换成span
        $elem.replaceWith($span);
        var operator = '<a class="btn-sm modifyBidder" href="javascript:void(0);">修改</a>' +
            '<a href="javascript:void(0);" class="btn-sm delBidder">删除</a>';

        // 将父节点下的按钮替换成修改和删除按钮
        $nextParent.html(operator);
    });
};
/**
 *  修改功能 E
 */
var tools = new ControlBidders();
tools.init();
tools.modifyOperator();

function ControlBidders2() {

}

ControlBidders2.prototype.searchOrCreateBidder = function (bidders) {
    var _self = this;
    // 获取当前选中的内容
    $('.searchOrCreateBidder').keyup(function () {
        var reg = eval('/^' + this.value + '/');
        var _arr = _self.filterArray(bidders, 'name', reg);
        tools.insertBidders(_arr, false);
        if (_arr.length == 0) {
            var _html = '<li class="createBiddersA"><span class="glyphicon glyphicon-hand-right" style=""></span>&nbsp;&nbsp;创建bidder&nbsp;:&nbsp;<span>'+this.value+'</span></li>';
            $('#biddersList').append($(_html));
        }
    });
};

ControlBidders2.prototype.createBidder = function (bidders) {
    $('#biddersList').on('click', '.createBiddersA', function () {
        var obj = {
            "name" : $('.searchOrCreateBidder').val(),
            "path": "",
            "qps": "",
            "selected": 1
        };

        for (var j = 0; j < bidders.length; j++) {
            bidders[j]['selected'] = 0;
        }

        bidders.unshift(obj);
        tools.insertBidders(bidders, true);
        $('.searchOrCreateBidder').val('')
    });
};

ControlBidders2.prototype.filterArray = function (arr, key, reg) {
    var _arr = [];

    for (var i = 0; i < arr.length; i++) {
        if (reg.test(arr[i][key])) {
            _arr.push(arr[i]);
        }
    }
    return _arr;
};

var tools2 = new ControlBidders2();
tools2.searchOrCreateBidder(bidders);
tools2.createBidder(bidders);