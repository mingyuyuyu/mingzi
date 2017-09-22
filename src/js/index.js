document.addEventListener('DOMContentLoaded',function(){

    function zzc(){

        let list = {
            container:document.querySelector('.u1'),
           
            init:function(){
                
                this.li = this.container.children;

                for(let i=0;i<this.li.length;i++){//给所有li绑定移入移出事件
                    
                    this.li[i].onmouseenter = function(){
                        
                        this.lastElementChild.style.display = 'block';

                        list.li = this;//将当前li存入list的属性
                        list.unfold = this.lastElementChild;
                        list.move();//执行动画
                        
                    }

                    this.li[i].onmouseleave = function(){

                        this.lastElementChild.style.display = 'none';

                    }
                }
            },

            move:function(){
                liTop = this.li.offsetTop;
                this.unfold.style.top = liTop + 'px';
                let y = window.scrollY;
                
                if(y>=86){//滚动条滚动一定距离后，吸顶效果移至窗口顶部
                    
                    //判断三级导航的高度是否够高
                    if(this.unfold.offsetHeight <= 350){
                        animate(this.unfold,{top:liTop-40})
                    }
                    else{
                        animate(this.unfold,{top:-30});
                    }
                }
                else{//贴齐横向nav导航条底部

                    if(this.unfold.offsetHeight <= 350){
                        animate(this.unfold,{top:liTop-40})
                    }
                    else{
                        animate(this.unfold,{top:0});
                    }
                }
                
                
            }
        }

        list.init();//执行初始化





        //一、二级导航吸顶
        let all = document.querySelector('.all');

        window.onscroll = function(){
            if(scrollY>=86){
                all.className = 'all_fix';
            }
            else{
                all.className = 'all';
            }
        }
    }




    function zym(){
        function Carousel(opt){
            // 属性
            this.ele = opt.ele || '.carousel';
            this.imgs = opt.imgs;
            this.index = 0;
            this.duration = opt.duration || 2000;
            
        }
        Carousel.prototype ={
            constructor:Carousel,
            init:function(){
                // 生成html结构
                this.ele = document.querySelector(this.ele)
                var ul = document.createElement('ul');
                ul.innerHTML = this.imgs.map(function(item){
                    return `<li class="list"><img src="${item}" /></li>`;
                }).join('');
                this.ele.appendChild(ul);
                // 生成页码
                var page = document.createElement('div');
                page.className = 'page';
                for(var i=1;i<=this.imgs.length;i++){
                    var point = document.createElement('span')
                    point.innerText = i;
                    page.appendChild(point);
                }
                page.children[0].className='active';
                ul.appendChild(page);
                // 图片的初始化
                var list = document.querySelectorAll('.list')
                ul.style.width=list[0].offsetWidth+'px';
                for(i=0;i<this.imgs.length;i++){
                    if(i==0){
                        list[i].style.opacity=1;
                    }else{
                        list[i].style.opacity=0;
                    }
                }
                // 绑定事件
                ul.onmouseenter =()=>{
                    this.stop();
                }
                ul.onmouseleave = ()=>{
                    this.start();
                }
                page.onmouseover = e =>{
                    if(e.target.tagName.toLowerCase()==='span'){
                        this.index =e.target.innerText-1;
                        console.log(this.index)
                        this.show();
                    }
                }
                this.ele1=page;
                return this;
            },
            _createTimer:function(){
                this.timer=setInterval(()=>{
                    this.index++;
                    this.show()
                },this.duration)
                return this;
            },
             //方法：图片轮播
            move:function(){
                this._createTimer();
                return this;
            },
            // 方法：图片展示
            show:function(){
                var list = document.querySelectorAll('.list');
                var backgr  = document.querySelector('.backgr');
                // this.ele = document.querySelector(this.ele);
                if(this.index>=this.imgs.length){
                    this.index=0
                }
                
                for(i=0;i<this.imgs.length;i++){
                    if(i==this.index){
                        animate(list[this.index],{opacity:1})
                    }else{
                        animate(list[i],{opacity:0})
                    }
                    this.ele1.children[i].className='';
                    this.ele1.children[this.index].className='active';
                }
                if(this.index==1){backgr.style.backgroundColor='#050505'}
                if(this.index==2){backgr.style.backgroundColor='#003D73'}
                if(this.index==3){backgr.style.backgroundColor='#EFEFFB'}
                if(this.index==0){backgr.style.backgroundColor=''}

                return this;
            },
            stop:function(){
                clearInterval(this.timer);
                return this;
             },
            start:function(){
                this._createTimer();
                return this;
            }


        }
        // 生成实例
        new Carousel({
            imgs:['images/x1.jpg','images/x2.jpg','images/x3.jpg','images/x4.jpg']
        }).init().move();


        // section动画
        var list1 = document.querySelectorAll('.section ul li');
        
        for(i=0;i<list1.length;i++){
            list1[i].onmouseover = function(e){
                this.children[1].style.backgroundColor='black';
                this.children[1].style.color='orange';
                this.children[1].children[1].style.display='block';
                animate(this.children[1],{height:50});
            }
            list1[i].onmouseout = function(e){
                this.children[1].style.backgroundColor='';
                this.children[1].style.color='';
                this.children[1].children[1].style.display='none';
                animate(this.children[1],{height:18});
            }
        }
        

        // 面向滚动商品对象
        function Goodslist(opt){
            // 商品列表的属性
            this.ele = opt.ele || '#_zhang1';
            // 商品
            this.goods = opt.goods;
            // 每行商品的个数
            this.rowgoods = opt.rowgoods || 4;
            // 可滚动的页数
            this.page = Math.ceil(opt.goods.length/this.rowgoods);
            this.index = 0;
        }
        Goodslist.prototype = {
            constructor:Goodslist,
            // 初始化
            init:function(){
                this.ele = document.querySelector(this.ele);
                var ul = document.createElement('ul');
                // 获取盒子不包括padding的宽度
                this.conWidth = parseFloat(getComputedStyle(this.ele).width)
                // 根据页数设置ul的宽度
                ul.style.width = this.conWidth*this.page +'px';
                // 生成html结构
                ul.innerHTML = this.goods.map(item=>{
                    return `<li>
                                <a href><img src="${item.imgurl}"/></a>
                                <p class="title">${item.title}</p>
                                <p>Our price:<span class="price">${item.price}</span></p>
                                <span class="save">save:${item.save}</span>
                            </li>`
                }).join('')
                this.ele.appendChild(ul);
                // 调整每一行最后一个商品的右间距
                for(var i=this.rowgoods;i<this.page*this.rowgoods;i++){
                    if(i%this.rowgoods==0){
                        ul.children[i-1].style.marginRight = '80px';
                    }
                }
                // 添加左右按钮
                var btn_l = document.createElement('span');
                btn_l.className='btn_l';
                this.ele.appendChild(btn_l);
                var btn_r = document.createElement('span');
                btn_r.className='btn_r';
                this.ele.appendChild(btn_r);
                // 按钮的点击事件
                this.ele.onclick = e =>{
                    if(e.target.className==='btn_r'){
                        this.forward();
                    }
                    else if(e.target.className==='btn_l'){
                        this.back();
                    }
                }
                // this共享ul
                this.ele1 = ul; 
            },
            // 向前翻页
            forward:function(){

                this.index++;
                if(this.index>=this.page){
                    this.index=0
                }
                animate(this.ele1,{left:-this.ele.clientWidth*this.index})
            },
            // 向后翻页
            back:function(){
                this.index--;
                if(this.index<0){
                    this.index=this.page-1
                }
                animate(this.ele1,{left:-this.ele.clientWidth*this.index})
            },

        }


        // 生成实例
        new Goodslist({goods:
                [{
                    imgurl:'images/z1.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z2.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z3.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z4.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z5.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z6.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z2.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z3.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z3.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },
                {
                    imgurl:'images/z6.png',
                    title:'up&Down open Cowhide leather Case With Crocod',
                    price:'$ 198',
                    save:'$ 30'
     
                },]
        }).init();
    }

    zzc();
    zym();
























})