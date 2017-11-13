(function (window, document) {
    let paging = function (option) {
        this.options = {
            pageSize: 10,
            pageNo: 1,
            totalSize: 0,
            prevText: '&laquo;',
            nextText: '&raquo;',
            container: '#pagination',
            callback: function (num) {
                console.log(num+'callback')
                return false
            }
        }

        for (let o in option) {
            this.options[o] = option[o]
        }
        console.log(this.options)
        this.render()
    };

    paging.prototype = {
        render: function () {
            let _this = this
            let pageAmount = Math.ceil(_this.options.totalSize / _this.options.pageSize)
            if(_this.options.pageNo>pageAmount){
                return
            }

            let containerEle = document.querySelector(_this.options.container)
            let ulEle = document.createElement('ul')
            ulEle.classList.add('pagination')


            let goEle = stringToDom('<li>去<input type="text" id="go-page-num">页<button>跳转</button></li>')


            let currentNo =parseInt(_this.options.pageNo)
            let startNo = currentNo - 2
            let endNo = currentNo + 2

            if (pageAmount <= 5) {
                startNo = 1
                endNo = pageAmount
            }


            if (pageAmount <= 5) {
                startNo = 1
                endNo = pageAmount
            } else {
                if (startNo < 1) {
                    startNo = 1
                    endNo = 5
                }
                if (endNo > pageAmount) {
                    startNo = pageAmount - 4
                    endNo = pageAmount
                }

                if(startNo===2){
                    startNo=1
                }
                if(endNo===(pageAmount-1)){
                    endNo=pageAmount
                }
            }
            //ulEle.appendChild(prevEle)
            addPrev()
            if(startNo===1){
                addPageNum(startNo, endNo, currentNo)
            }else{
                let firstEle=stringToDom('<li ><span class="page-span" data-pn="1">1</span></li>')
                ulEle.appendChild(firstEle)
                addDot()
                addPageNum(startNo, endNo, currentNo)
            }
            if(endNo<pageAmount){
                addDot()
                let lastEle=stringToDom('<li ><span class="page-span" data-pn="' + pageAmount + '">' + pageAmount + '</span></li>')
                ulEle.appendChild(lastEle)
            }


            //ulEle.appendChild(nextEle)
            addNext()
            ulEle.appendChild(goEle)
            containerEle.innerHTML=''
            containerEle.appendChild(ulEle)
            addTotalNum()
            function addPageNum(start, end, current) {
                console.log(start, end, current)
                for (let i = start; i <= end; i++) {
                    let pageEle;
                    if (i ===parseInt(current)) {
                        console.log(current)
                        pageEle = stringToDom('<li><span  class="page-span active-page" data-pn="' + i + '">' + i + '</span></li>')
                    } else {
                        pageEle = stringToDom('<li><span  class="page-span" data-pn="' + i + '">' + i + '</span></li>')
                    }
                    ulEle.appendChild(pageEle)
                }

            }

            function addPrev() {
                let prevEle = stringToDom('<li><span class="prev-span">' + _this.options.prevText + '</span></li>')
                ulEle.appendChild(prevEle)
            }

            function addNext() {
                let nextEle = stringToDom('<li><span class="next-span">' + _this.options.nextText + '</span></li>')
                ulEle.appendChild(nextEle)
            }
            function addDot() {
                let dotEle = stringToDom('<li><span>...</span></li>')
                ulEle.appendChild(dotEle)
            }
            function addTotalNum() {
                let totalEle = stringToDom('<li>共' + _this.options.totalSize + '条</li>')
                ulEle.appendChild(totalEle)
            }

            function pageEvent(e) {
                let target = e.target || e.srcElement
                let matchesSelector = target.matches || target.webkitMatchesSelector || target.mozMatchesSelector || target.msMatchesSelector;
                if(matchesSelector.call(target,'.page-span')){
                    let num=target.getAttribute('data-pn')
                    _this.options.callback(num)
                }
                //上一页
                if(matchesSelector.call(target,'.prev-span')){
                    console.log(_this.options.pageNo)
                    if(_this.options.pageNo<=1){
                        _this.options.callback(1)
                    }else{
                        _this.options.callback(_this.options.pageNo-1)
                    }
                }
                //下一页
                if(matchesSelector.call(target,'.next-span')){
                    console.log(_this.options.pageNo)
                    if(_this.options.pageNo>=pageAmount){
                        _this.options.callback(pageAmount)
                    }else{
                        _this.options.callback(_this.options.pageNo+1)
                    }
                }

                if(target.nodeName.toLowerCase()==='button'){
                    let inputPageNo=document.getElementById('go-page-num').value;
                    let numReg=/^\d+$/
                    if(numReg.test(inputPageNo)){
                        _this.options.callback(inputPageNo)
                    }else{
                        return false
                    }
                }

                e.preventDefault()
            }

            //事件绑定
            ulEle.addEventListener("click",pageEvent,false)

        }
    };
    let stringToDom = function (str) {
        let objEle = document.createElement('div')
        objEle.innerHTML = str
        return objEle.firstChild
        // return objEle.childNodes
    }

    //兼容模块
    if(typeof module !=='undefined' && typeof exports ==='object'){
        module.exports=paging;
    }else if(typeof define ==='function' && (define.amd || define.cmd)){
        define("pdPaging",function(){
            return paging;
        })
    }else{
        window.pdPaging=paging;
    }

}(window, document));
