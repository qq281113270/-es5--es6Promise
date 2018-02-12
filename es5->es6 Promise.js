<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>es5原生模仿-es6Promise</title>
 
    </style>

<body>
     <script type="text/javascript">
             
        function _Promise(fn){
             fn.call(this,this.resolve.bind(this),this.rejec.bind(this));
        }
        _Promise.prototype={
               listFn:[],
                time:null,
                data:'',
                filter:function(arr,key){
                     //过滤队列中的同级的key函数
                       for( var i=0; i<arr.length; i++){
                            if(arr[i].key==key){
                                arr.splice(0,i+1);
                              if((arr.length>=1)&&(arr[0].key==key)){
                                  return   this.filter(arr,key);
                              }
                              break;  
                            }
                       }
                       return arr;
                    },       
                start:function(data,key){
                     //开始执行队列中的函数

                    var _this=this;
                    (function(data,key){



                  setTimeout(function(){
                          
                      
                           var index=null;
                          
                           for(var i=0; i<_this.listFn.length; i++){
                            
                                  //匹配key值 执行then或者catch函数
                                 if(_this.listFn[i].key==key){
                                    // console.log(key)
                                       index=i;
                                       break;
                                 }
                           }
                            if(index!==null){  
                                try{
                                     //执行 key值 执行then或者catch函数
                                    data=_this.listFn[index].fn(data); 
                                     //已经执行的函数退出队列      
                                    _this.listFn.splice(index,index+1);                                                            
                                   if(_this.listFn.length>=1){                                    
                                        try{
                                              _this.start.call(_this,data,'then')
                                         }catch(e){
                                                _this.start.call(_this,data,'catch')
                                         }
                                     }  
                                }catch(e){
                                      
                                    
                                   //发生错误的时候执行可以当执行then 报错异常的时候 已经执行完then，所以bug导致来至这里 ，then发生错误执行catch
                                   //调用catch 函数
                                     _this.start.call(_this,data,'catch')
                               //执行catch 函数
                                     _this.data=_this.listFn[index].fn(data);
                             //执行过的catch 函数 退出队列

                                     _this.listFn.splice(index,index+1);
                             //删除  
                            // _this.filter.call(_this,_this.listFn,'then');

                                     if(_this.listFn.length>=1){  
                                         //删除一个统计的then
                                        if (_this.listFn[0].key=='then') {
                                            _this.listFn.splice(index,index+1);
                                        }                                  
                                        try{
                                              _this.start.call(_this,data,'then')
                                         }catch(e){
                                                _this.start.call(_this,data,'catch')
                                         }
                                     } 
                                    
                                }                             
                                    

                               }
                           
                        }.bind(_this),0)
                 })(data,key)  
                },
                rejec:function(data){
                     this.start.call(this,data,'catch')
                 },
                resolve:function(data){                    
                try{ 
                     
                         this.start.call(this,data,'then')
                         
                }catch(e){
                     
                         this.start.call(this,data,'catch')
                    }                      
                           
                },             
              then:function(fn){   
              //添加队列then函数               
                  this.listFn.push({
                    key:'then',
                    fn:fn
                  });                   
                   return this;
              },
              catch:function(fn){
                //添加队列catch函数  
                   this.listFn.push({
                    key:'catch',
                    fn:fn
                  });
                   return this;
              },            
        }
  
        new _Promise(function(resolve,rejec){
                 resolve(100);            
        }).then(function(data){
                console.log('then');
                console.log(data);
             throw 123;  
             return data;
        }).catch(function(data){
                   console.log('catch');
             console.log(data);
              return data;
        }).then(function(data){
                console.log('then');
                console.log(data);
     
            return data;
        })
       
     </script>
</body>
</html>
