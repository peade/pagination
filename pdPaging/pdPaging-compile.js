'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (window, document) {
    var paging = function paging(option) {
        this.options = {
            pageSize: 10,
            pageNo: 1,
            totalSize: 0,
            prevText: '&laquo;',
            nextText: '&raquo;',
            container: '#pagination',
            callback: function callback(num) {
                console.log(num + 'callback');
                return false;
            }
        };

        for (var o in option) {
            this.options[o] = option[o];
        }
        console.log(this.options);
        this.render();
    };

    paging.prototype = {
        render: function render() {
            var _this = this;
            var pageAmount = Math.ceil(_this.options.totalSize / _this.options.pageSize);
            if (_this.options.pageNo > pageAmount) {
                return;
            }

            var containerEle = document.querySelector(_this.options.container);
            var ulEle = document.createElement('ul');
            ulEle.classList.add('pagination');

            var goEle = stringToDom('<li>去<input type="text" id="go-page-num">页<button>跳转</button></li>');

            var currentNo = parseInt(_this.options.pageNo);
            var startNo = currentNo - 2;
            var endNo = currentNo + 2;

            if (pageAmount <= 5) {
                startNo = 1;
                endNo = pageAmount;
            }

            if (pageAmount <= 5) {
                startNo = 1;
                endNo = pageAmount;
            } else {
                if (startNo < 1) {
                    startNo = 1;
                    endNo = 5;
                }
                if (endNo > pageAmount) {
                    startNo = pageAmount - 4;
                    endNo = pageAmount;
                }

                if (startNo === 2) {
                    startNo = 1;
                }
                if (endNo === pageAmount - 1) {
                    endNo = pageAmount;
                }
            }
            //ulEle.appendChild(prevEle)
            addPrev();
            if (startNo === 1) {
                addPageNum(startNo, endNo, currentNo);
            } else {
                var firstEle = stringToDom('<li ><span class="page-span" data-pn="1">1</span></li>');
                ulEle.appendChild(firstEle);
                addDot();
                addPageNum(startNo, endNo, currentNo);
            }
            if (endNo < pageAmount) {
                addDot();
                var lastEle = stringToDom('<li ><span class="page-span" data-pn="' + pageAmount + '">' + pageAmount + '</span></li>');
                ulEle.appendChild(lastEle);
            }

            //ulEle.appendChild(nextEle)
            addNext();
            ulEle.appendChild(goEle);
            containerEle.innerHTML = '';
            containerEle.appendChild(ulEle);
            addTotalNum();
            function addPageNum(start, end, current) {
                console.log(start, end, current);
                for (var i = start; i <= end; i++) {
                    var pageEle = void 0;
                    if (i === parseInt(current)) {
                        console.log(current);
                        pageEle = stringToDom('<li><span  class="page-span active-page" data-pn="' + i + '">' + i + '</span></li>');
                    } else {
                        pageEle = stringToDom('<li><span  class="page-span" data-pn="' + i + '">' + i + '</span></li>');
                    }
                    ulEle.appendChild(pageEle);
                }
            }

            function addPrev() {
                var prevEle = stringToDom('<li><span class="prev-span">' + _this.options.prevText + '</span></li>');
                ulEle.appendChild(prevEle);
            }

            function addNext() {
                var nextEle = stringToDom('<li><span class="next-span">' + _this.options.nextText + '</span></li>');
                ulEle.appendChild(nextEle);
            }
            function addDot() {
                var dotEle = stringToDom('<li><span>...</span></li>');
                ulEle.appendChild(dotEle);
            }
            function addTotalNum() {
                var totalEle = stringToDom('<li>共' + _this.options.totalSize + '条</li>');
                ulEle.appendChild(totalEle);
            }

            function pageEvent(e) {
                var target = e.target || e.srcElement;
                var matchesSelector = target.matches || target.webkitMatchesSelector || target.mozMatchesSelector || target.msMatchesSelector;
                if (matchesSelector.call(target, '.page-span')) {
                    var num = target.getAttribute('data-pn');
                    _this.options.callback(num);
                }
                //上一页
                if (matchesSelector.call(target, '.prev-span')) {
                    console.log(_this.options.pageNo);
                    if (_this.options.pageNo <= 1) {
                        _this.options.callback(1);
                    } else {
                        _this.options.callback(_this.options.pageNo - 1);
                    }
                }
                //下一页
                if (matchesSelector.call(target, '.next-span')) {
                    console.log(_this.options.pageNo);
                    if (_this.options.pageNo >= pageAmount) {
                        _this.options.callback(pageAmount);
                    } else {
                        _this.options.callback(_this.options.pageNo + 1);
                    }
                }

                if (target.nodeName.toLowerCase() === 'button') {
                    var inputPageNo = document.getElementById('go-page-num').value;
                    var numReg = /^\d+$/;
                    if (numReg.test(inputPageNo)) {
                        _this.options.callback(inputPageNo);
                    } else {
                        return false;
                    }
                }

                e.preventDefault();
            }

            //事件绑定
            ulEle.addEventListener("click", pageEvent, false);
        }
    };
    var stringToDom = function stringToDom(str) {
        var objEle = document.createElement('div');
        objEle.innerHTML = str;
        return objEle.firstChild;
        // return objEle.childNodes
    };

    //兼容模块
    if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = paging;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define("pdPaging", function () {
            return paging;
        });
    } else {
        window.pdPaging = paging;
    }
})(window, document);

//# sourceMappingURL=pdPaging-compile.js.map