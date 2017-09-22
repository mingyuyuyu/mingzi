window.onload = function(){
    
           //下方热卖商品横向滚动

        function hot(){

            let hotList = {
                hot:document.querySelector('.hot_list'),//获取滚动ul
                up:document.querySelector('.pageup'),//上一页按钮
                down:document.querySelector('.pagedn'),//下一页按钮
                init:function(){
                    this.li = this.hot.children;//获取ul下的所有li
                    this.hot.style.width = this.li.length * this.li[0].offsetWidth + 20 + 'px';//计算ul宽度
                    
                    //给两个按钮添加点击事件
                    this.up.onclick = ()=>{
                        this.move();
                    }
                    this.down.onclick = ()=>{
                        this.move();
                    }
                },
                move:function(){
                    width = this.hot.offsetWidth;
                    left = this.hot.offsetLeft;

                    if(left == 0){
                        animate(this.hot,{left:-(width/2)});
                    }
                    else{
                        animate(this.hot,{left:0});
                    }
                }
            }
            hotList.init();//执行初始化
        }

        hot();//调用hot




















    var goodslist = document.getElementsByClassName('goodslist')[0];
    var carlist1;
    
    var cookies = document.cookie;
        if(cookies.length>0){
            cookies = cookies.split('; ')
            cookies.forEach(function(item){
                var temp = item.split('=');
                if(temp[0]==='carlist'){
                    carlist1 = JSON.parse(temp[1]);
                }
            })
        }
    if(carlist1 !== undefined){
            var li  =carlist1.map(function(item){
                 return '<li class="goods1" data-guid="'+item.id+'"><div class="li_1"><img src="'+item.imgurl+'" class="img"/><p><span class="title">'+item.title+'</span></p><p>ID:<span class="id">'+item.id+'</span></p><p>Size:<span class="size">'+item.size+'</span></p></div><div class="li_2 clearfix"><button class="btn2">-</button><p class="qty">'+item.qty+'</p><button class="btn">+</button></div><div class="li_3"><p><del class="preprice">'+item.preprice+'</del>py6.</p><p><span class="price">'+item.price+'</span> py6.</p></div><div class="li_4"><p class="eachprice"></p><p class="_save" style="color:#228B22">you save<span class="save"></span> py6. </p></div><button class="btn1"></button></li>'
            }).join('')
        
        goodslist.innerHTML = li;
        var title = document.getElementsByClassName('title');
        var id = document.getElementsByClassName('id');
        var size = document.getElementsByClassName('size');
        var btn = document.getElementsByClassName('btn')[0];
        var btn1 = document.getElementsByClassName('btn1')[0];
        var preprice = document.getElementsByClassName('preprice');
        var save = document.getElementsByClassName('save');
        var btn2 = document.getElementsByClassName('btn2')[0];
        var subPrice = document.getElementsByClassName('subPrice')[0];
        var goods1 = document.getElementsByClassName('goods1')
        var savePrice = document.getElementsByClassName('savePrice')[0];
        var price = document.getElementsByClassName('price');
        var qty = document.getElementsByClassName('qty');
        var img = document.getElementsByClassName('img');
        
        // 进入页面计算价钱
        result();      
        eachsave();
        savetotal();
        // 点击事件委托给每个li
        for(i=0;i<goods1.length;i++){
             goods1[i].onclick = function(e){
                e = e||window.event;
                target = e.target || e.srcElement;
                // 添加商品的数量
                if(target.className.toLowerCase()==='btn'){
                    

                    var num = this.children[1].children[1].innerText;
                    var _num = Number(num)
                    this.children[1].children[1].innerText=_num+1;
                     eachsave();
                     savetotal();   
                     result();
                     create();
                
                }
                // 减少商品的数量
                if(target.className.toLowerCase()==='btn2'){
                    

                    var num = this.children[1].children[1].innerText;
                    var _num = Number(num)
                    if(_num==0){
                        return;
                    }
                    this.children[1].children[1].innerText=_num-1;
                    eachsave();
                    savetotal();
                     create();
                     result();
                   
                }
                // 购物车里删除单个商品
                if(target.className.toLowerCase()==='btn1'){
                    var parent = this.parentNode;
                    parent.removeChild(this);
                     savetotal();
                     result();
                     create();
                     
                }
            }   
              

        }
        // 封装一个计算单个价钱总数,全部价钱总数的函数
        function result(){
            var sum=0;
           
             var eachprice=document.getElementsByClassName('eachprice');
             console.log(eachprice)
            for(j=0;j<goods1.length;j++){
                console.log(sum)
            sum = sum+(price[j].innerText)*(qty[j].innerText)
            eachprice[j].innerHTML= (qty[j].innerText)*(price[j].innerText)+' py6.';
            }
            
            subPrice.innerHTML='<span class="total">Cart Total : <strong>'+sum+' py6.</strong></span>';

        }
    // 封装一个计算节省总价钱的函数
        function savetotal(){
            var savetotal=0;
           
            if(goods1.length==0){
                savePrice.innerHTML = 'Your Total Savings : 0 py6.'
            }
            else{
                for(k=0;k<goods1.length;k++){
                    var _save=Number(save[k].innerText);
                    savetotal += _save;
                    savePrice.innerHTML = 'Your Save Total : '+savetotal + ' py6.';

                }
            }
           
        }
     // 封装计算每个商品节省的价钱的函数
        function eachsave(){
           
            for(i=0;i<goods1.length;i++){
                var num1 = Number(price[i].innerText);
                var num2 = Number(preprice[i].innerText);
              
                var saveeach = (num2-num1)*(qty[i].innerText);
                save[i].innerHTML = ' '+saveeach;
            }
                 
        }
    // 封装一个实时生成cokkie的函数
     
        function create(){
            var carlist=[];
            for(j=0;j<goods1.length;j++){
                var goods  ={
                    imgurl:img[j].src,
                    title:title[j].innerText,
                    price:price[j].innerText,
                    preprice:preprice[j].innerText,
                    qty:qty[j].innerText,
                    size:size[j].innerText,
                    id:goods1[j].getAttribute('data-guid')
                }
            carlist.push(goods)
            }

            console.log(carlist)
            // 重新写入cokkie，覆盖原先cokkie；
                var date1 = new Date();
                date1.setDate(date1.getDate()+7);
                document.cookie = 'carlist=' + JSON.stringify(carlist)+';expires=' + date1.toString()+';path=/';
                console.log(document.cookie)
        }

    }

 
}