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

                    var _this=this;
                    (function(data,key){



                  setTimeout(function(){
                          
                      
                           var index=null;
                          
                           for(var i=0; i<_this.listFn.length; i++){
                            
                            
                                 if(_this.listFn[i].key==key){
                                    // console.log(key)
                                       index=i;
                                       break;
                                 }
                           }
                            if(index!==null){  
                                try{
                                    data=_this.listFn[index].fn(data);
                                   
                                   _this.listFn.splice(index,index+1);
                                     _this.filter.call(_this,_this.listFn,'catch');                                   
                                   if(_this.listFn.length>=1){                                    
                                        try{
                                              _this.start.call(_this,data,'then')
                                         }catch(e){
                                                _this.start.call(_this,data,'catch')
                                         }
                                     }  
                                }catch(e){
                                    _this.data=_this.listFn[index].fn(data);
                                    _this.listFn.splice(index,index+1);
                                       _this.filter.call(_this,_this.listFn,'catch'); 
                                      if(_this.listFn.length>=1){
                                         _this.start.call(_this,data,'catch')
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
                    console.log(e)
                         this.start.call(this,data,'catch')
                    }                      
                           
                },             
              then:function(fn){                  
                  this.listFn.push({
                    key:'then',
                    fn:fn
                  });                   
                   return this;
              },
              catch:function(fn){
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
     
             return data;
        }).catch(function(data){
              
             console.log(data);
        }).then(function(data){
                console.log('then');
                console.log(data);
     
            return data;
        })
       
     </script>
</body>
</html>
