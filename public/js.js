// 页面多组件实例化
// popBoxId 插件引用ID
// btnWarnText添加图片按钮提示id
// noCopImgMsg预览框没有图片点击上传按钮提示回调
// fileExp上传文件自定义验证
// delImgItem删除上传图片列表项回调
// -delId上传获取的ID用于删除
// -delListDom删除缩略列表
// --delId成功回调传入缩略列表对应id
// strongDom预览图片增强回调
// getDataImg获取图片数据回调
// -dataImg图片文件,dataImgBs图片base64,
// --speedFn上传进度回调
// ---s百分比值,
// --addListDom添加上传的列表dom-imgSrc-imgName-delId-参数图片base64-图片名称-删除请求获取ID
// addBtnTxt 按钮名称
function setCopy({/*popBoxId,*/popClass,/*other='',*/addBtnText =function(){return '添加截图'},btnWarnText = "点击添加截图",noCopImgMsg,fileExp,delImgItem,strongDom,/*ready = function(){},*/getDataImg}={}){

		// 设置对象this
		var _this = this;
		//图片渲染对象
		var _readerE,_fileBlob;
		var dataImgBlean = false;//默认没有截图文件
		var upFileBlean = false;//默认没有上传文件
		// this.ready = ready;
		// 创建获取图片数据方法，
		this.getDataImg = getDataImg;
		//删除缩略图列表回调
		this.delImgItem = delImgItem;
		//预览框没有图片，点击上传按钮弹出提示信息
		this.noCopImgMsg = noCopImgMsg;
		// 上传文件自定义验证
		this.fileExp = fileExp;
		// 自定义按钮名称函数
		this.addBtnText = addBtnText;
		// 获取容器对象传入的自定义值
		var arrNode = getClassName(popClass);
		// this.copyNum = arrNode.length;//获取调用插件按钮数量
		coopyArrData = [];
		arrNode.map(function(v,i){
			var dataKey = v.dataset;
			coopyArrData.push(dataKey)
		})
		this._coopyArrData = coopyArrData
		// console.log(coopyArrData)
		/*var dataKey = document.getElementById(popBoxId).dataset;
		for(var i in dataKey){
			this[i] = dataKey[i]
		}*/
		// 初始化dom
		this.initDom=function(){
			// 变量声明
			// var popBox = document.getElementById(popBoxId);
			var arr = getClassName(popClass);
			var addBtnBox = document.createElement('div');
			var addListBox =document.createElement('div');
			var addBtn = document.createElement('button');
			var btnWarn = document.createElement('span');
			var btnWarnTxt = document.createTextNode(btnWarnText);
			var addBtnTxt = document.createTextNode('添加截图');
			var popView=document.createElement("div");
			var mask = document.createElement("div");
			var popBtnBox = document.createElement('div');
			var titleBox = document.createElement('div');
			var titleSpan = document.createElement('span')
			var titleSpanTxt = document.createTextNode('Ctrl + V 粘贴预览图片');
			var upFileBox = document.createElement('input')
			var popViewImgBox = document.createElement('div');
			var addFileBtn = document.createElement('button');
			var addFileBtnTxt = document.createTextNode('上传文件')
			var speedDiv = document.createElement('div');
			var speedSpan = document.createElement('span');
			var speedTxtSpan = document.createElement('span');
			var speedTxtSpanTxt = document.createTextNode('0%');
			var btn1 = document.createElement('button');
			var btn2 = document.createElement('button');
			var btn1Txt = document.createTextNode('上传');
			var btn2Txt = document.createTextNode('取消');
			// 给元素节点添加属性
			popView.style.cssText += ";background:#f1f1f1;border:1px solid #ccc;border-radius:5px;width:550px;height:590px;position:fixed;top:calc((100vH - 590px)/2);left:calc((100vW - 550px)/2);z-index:999999;display:none;";
			mask.style.cssText +=";width:100%;height:100%;background:rgba(0,0,0,0.6);display:block;position:fixed;top:0px;left:0px;z-index:99999;display:none;"
			popViewImgBox.style.cssText +=";width:529px;height:469px;margin:10px;border:1px solid #ccc;border-radius:4px;margin-top:0px;"
			titleBox.style.cssText +=";width:531px;height:60px;margin:0 10px;line-height:60px;font-weight:bold;"
			popBtnBox.style.cssText +=";width:100%;height:40px;overflow:hidden;"
			btn1.style.cssText +=";width:120px;height:36px;float:right;margin-right:10px;"
			btn2.style.cssText +=";width:120px;height:36px;float:right;margin-right:10px;"
			speedDiv.style.cssText +=";width:200px;height:26px;float:left;margin-left:10px;margin-top:5px;display:block;border:1px solid #ccc;"
			speedSpan.style.cssText +=";height:26px;float:left;display:block;background:blue;width:0px;"
			speedTxtSpan.style.cssText +=";height:26px;float:right;display:block;border-left:1px solid #ccc;width:49px;text-align:center;"
			upFileBox.style.cssText +=";display:none;"
			addFileBtn.style.cssText +=";float:right;"
			mask.setAttribute('id','div_mask')
			mask.setAttribute('class','div_mask')
			popView.setAttribute('id','div_popView')
			popView.setAttribute('class','div_popView')
			popViewImgBox.setAttribute('id','div_popViewImgBox')
			popViewImgBox.setAttribute('class','div_popViewImgBox')
			titleBox.setAttribute('id','div_titleBox')
			titleBox.setAttribute('class','div_titleBox')
			titleSpan.setAttribute('id','span_titleSpan')
			titleSpan.setAttribute('class','span_titleSpan')
			speedSpan.setAttribute('id','span_speedSpan')
			speedSpan.setAttribute('class','span_speedSpan')
			speedTxtSpan.setAttribute('id','span_speedTxtSpan')
			speedTxtSpan.setAttribute('class','span_speedTxtSpan')
			btn1.setAttribute('id','uploadImg_btn1')
			btn1.setAttribute('class','uploadImg_btn1')
			btn2.setAttribute('id','uploadImg_btn2')
			btn2.setAttribute('class','uploadImg_btn2')
			// addListBox.setAttribute('id','div_addListBox')
			addListBox.setAttribute('class','div_addListBox')
			speedDiv.setAttribute('id','div_speedDiv')
			speedDiv.setAttribute('class','div_speedDiv')
			upFileBox.setAttribute('type','file')
			// addBtn.setAttribute('id','button_addBtn'+other)
			addBtn.setAttribute('class','button_addBtn')
			// btnWarn.setAttribute('id','span_btnWarn'+other)
			addFileBtn.setAttribute('id','button_addFileBtn')
			btnWarn.setAttribute('class','span_btnWarn')

			// 插入节点
			btn1.appendChild(btn1Txt)
			btn2.appendChild(btn2Txt)
			speedTxtSpan.appendChild(speedTxtSpanTxt)
			speedDiv.appendChild(speedSpan)
			speedDiv.appendChild(speedTxtSpan)
			popBtnBox.appendChild(btn2)
			popBtnBox.appendChild(btn1)
			popBtnBox.appendChild(speedDiv)
			addBtn.appendChild(addBtnTxt)
			btnWarn.appendChild(btnWarnTxt)
			addBtnBox.appendChild(addBtn)
			addBtnBox.appendChild(btnWarn)
			// popBox.appendChild(addBtnBox)
			// popBox.appendChild(addListBox)
			titleSpan.appendChild(titleSpanTxt)
			titleBox.appendChild(titleSpan)
			titleBox.appendChild(upFileBox)
			popView.appendChild(titleBox)
			addFileBtn.appendChild(addFileBtnTxt)
			titleBox.appendChild(addFileBtn)
			document.body.appendChild(popView).appendChild(popViewImgBox);
			document.getElementById('div_popView').appendChild(popBtnBox)
			document.body.appendChild(mask);
			arr.map(function(v,i){
				var _addBtnBox = addBtnBox.cloneNode(true)
				var _addListBox = addListBox.cloneNode(true)
				_addListBox.setAttribute('id','div_addListBox'+i)
				v.appendChild(_addBtnBox)
				v.appendChild(_addListBox)
			})
			// console.log(this.isInPage([popView,mask]))
			// dom加载完成后绑定事件-和修改dom
			if(this.isInPage([popView,mask])){
				getClassName('button_addBtn').map(function(v,i){
					// console.log(_this._coopyArrData[i].id)
					v.innerHTML=_this.addBtnText(_this._coopyArrData[i])
				})
				// 显示弹出层
				getClassName('button_addBtn').map(function(v,i){
					var _i =i;
					v.addEventListener('click',function(){
						//每次点击弹出框初始化data自定义数据对应赋值
						var dataKey = _this._coopyArrData[_i];
						for(var  i in dataKey){
							_this[i] = dataKey[i]
						}
						// 绑定事件设置当前点击的是那个组件
						_this.clickNum = _i
						// console.log(_this.id)
						// 触发事件执行方法-传入方法需要参数
						speedDiv.style.display='block';
	    				btn1.style.display='block';
	    				addFileBtn.style.display='block'
	    				document.getElementById('span_titleSpan').innerHTML='Ctrl + V 粘贴预览图片'
						_this.showMask()
					},false)
				})
				// 取消按钮隐藏弹出层
				btn2.addEventListener('click',function(){
					// 触发事件执行方法-传入方法需要参数
					//清除预览弹窗上的图片
					_this.clearViewImg()
					_this.hideMask()
				},false)
				 // 绑定上传按钮点击事件
		    	btn1.addEventListener('click',function(){
		    		// 创建获取图片数据方法，传入图片数据回掉函数执行自定义操作-图片文件
		    		if(!dataImgBlean&&!upFileBlean){
		    			_this.noCopImgMsg()
		    			return;
		    		};
		    		if(!upFileBlean){
        				_this.getDataImg({dataImgBs:_readerE.target.result,dataImg:_fileBlob,speedFn:speedFn,addListDom:addListDom,upLoaded:upLoaded});
		    		}else{
		    			_this.getDataImg({dataImgBs:_readerE.target.result,dataImg:_fileBlob,speedFn:speedFn,addListDom:addListDom,upLoaded:upLoaded});
		    		}
				},false)
				addFileBtn.addEventListener('click',function(){upFileBox.click();},false)
				upFileBox.addEventListener('change',function(e){
					if(!_this.fileExp(this.files[0]))return;
					upFileBlean =true;
					// 获取图片文件
			    	var file = this.files[0];
			    	_fileBlob = file;
			    	// console.log(file)
			       	// 对图片处理转换成base64
			        var reader  = new FileReader();
			        reader.readAsDataURL(file);
			        reader.onload = function (e) {
			        	_readerE = e;
						var img = new Image();
						img.src = this.result;
						img.style.cssText +=";width:100%;height:100%;"
						popViewImgBox.innerHTML = ''
						popViewImgBox.appendChild(img)
			        }
				},false)
			}
		}
		// 判断dom节点是否全部加载完成参数数组
		this.isInPage=function(nodes) {
		  //声明变量默认true
		  var rt = true;
		  // 循环节点，如果有没加载好的dom就改变值为false
		  for(var i in nodes){
		  	if(!document.body.contains(nodes[i])){
		  		rt=false;
		  	}
		  }
		  return rt;
		  // return (node === document.body) ? false : document.body.contains(node);
		}
		// 显示遮罩
		this.showMask=function(){
			var ids = ['div_mask','div_popView']
			for(var i in ids){
				document.getElementById(ids[i]).style.display='block'
			}
		}
		// 隐藏遮罩
		this.hideMask=function(){
			var ids = ['div_mask','div_popView']
			for(var i in ids){
				document.getElementById(ids[i]).style.display='none'
			}
		}
		// ctrl+v触发截图事件获取截图文件直接开始转换渲染
	    this.imgReader = function( item ){
	        var blob = item.getAsFile(),
            reader = new FileReader();
            _fileBlob = blob
            dataImgBlean = true;
        	// 处理图片转成base64
            reader.readAsDataURL( blob );
	        reader.onload = function( e ){
	        	// 指定e对象
	        	_readerE =e;
	        	// 自定义增强dom
        		if(strongDom){
        			_this.strongDom = strongDom;
        			_this.strongDom(_e.target.result);
        		}else{
        			// 图片渲染完成创建img对象-把渲染转好的base64图片插入img对象src中
		            var img = new Image();
		            img.style.cssText +=';width:100%;max-height:100%;'
		            img.src = e.target.result;
        			// 直接把图片插入指定元素中-清空元素节点在插入图片
		            document.getElementById('div_popViewImgBox').innerHTML='';
		            document.getElementById('div_popViewImgBox').appendChild( img );
        		}
	        };
	    };

	    this.initCopy=function(){
	    	// 页面文档监听paset事件获取截图，ctrl+v触发
		    document.addEventListener( 'paste', function( e ){
		    var clipboardData = e.clipboardData,
		        i = 0,
		        items, item, types;

		    if( clipboardData ){
		        items = clipboardData.items;

		        if( !items ){
		            return;
		        }

		        item = items[0];
		        types = clipboardData.types || [];

		        for( ; i < types.length; i++ ){
		            if( types[i] === 'Files' ){
		                item = items[i];
		                break;
		            }
		        }

		        if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
		            _this.imgReader( item );
		        }
		    }
		    });
	    }
	    // 清空弹出层预览图片
	    this.clearViewImg=function(){
	    	dataImgBlean=false;
	    	upFileBlean=false;
	    	// 初始化进度条
	    	speedFn({s:0});
	    	document.getElementById('div_popViewImgBox').innerHTML='';
	    }
	    this.initDom();
	    // 绑定剪切板
	    this.initCopy();
		// this.ready();
		//文件上传完成后回调赋值按钮名称
		function upLoaded({msg}){
			// 循环所有按钮通过事件绑定点击的目标索引匹配修改对应按钮
			getClassName('button_addBtn').map(function(v,i){
				if(i==_this.clickNum){
					v.innerHTML=msg
				}
			})
		}
		// -在回掉getDataImgBs中改变百分比值产生动画效果-传入s百分比值
        function speedFn({id1='span_speedSpan' ,id2='span_speedTxtSpan',s,fn}={}){
    		document.getElementById(id1).style.width=150/100*s+'px';
			document.getElementById(id2).innerHTML=s+'%';
			if(fn)return fn();
    	}
    	//添加上传图片列表
    	function addListDom({id='div_addListBox',imgSrc,imgName,delId}={}){
    		// console.log(_this.clickNum,id+_this.clickNum)
    		// 创建节点
    		var item = document.createElement('div');
    		var img = document.createElement('img');
    		var name = document.createElement('span');
    		var view = document.createElement('span');
    		var del = document.createElement('span');
    		var nameTxT = document.createTextNode(imgName);
    		var viewTxt = document.createTextNode('预览');
    		var delTxt = document.createTextNode('删除');
    		// 设置节点属性样式
    		img.setAttribute('src',imgSrc);
    		del.setAttribute('data-delId',delId)
    		item.setAttribute('id','del'+delId)
    		item.style.cssText +=";width:100%;height:40px;overflow:hidden;margin-top:10px;"
    		img.style.cssText +=";width:40px;height:40px;float:left;margin-right:10px;"
    		name.style.cssText +=";width:auto;height:40px;float:left;margin-right:50px;line-height:40px;"
    		view.style.cssText +=";width:60px;height:40px;float:left;margin-right:10px;text-align:cetner;line-height:40px;"
    		del.style.cssText +=";width:60px;height:40px;float:left;margin-right:10px;text-align:cetner;line-height:40px;"
    		// console.log(img)
    		// 插入节点
    		item.appendChild(img)
    		name.appendChild(nameTxT)
    		view.appendChild(viewTxt)
    		del.appendChild(delTxt)
    		item.appendChild(name)
    		item.appendChild(view)
    		item.appendChild(del)
    		document.getElementById(id+_this.clickNum).appendChild(item)
    		//删除按钮绑定回调，传入删除id
    		del.addEventListener('click',function(e){
    			// console.log(this.getAttribute('data-delId'))
    			return _this.delImgItem({delId:this.getAttribute('data-delId'),delListDom:delListDom})
    		},false)
    		// 上传列表预览按钮
    		view.addEventListener('click',function(e){
    			// 绑定预览按钮隐藏弹出层上传按钮
    			document.getElementById('button_addFileBtn').style.display='none';
    			document.getElementById('uploadImg_btn1').style.display='none';
    			document.getElementById('div_speedDiv').style.display='none';
    			document.getElementById('span_titleSpan').innerHTML='上传预览'
    			_this.showMask()
    			// 创建预览图片节点，插入预览弹框
    			var img = new Image();
    			img.src=imgSrc;
    			img.style.cssText +=";width:100%;height:auto;"
    			document.getElementById('div_popViewImgBox').appendChild(img)
    		},false)
    	}
    	//删除指定id元素
    	function delListDom({delId}={}){
    		// console.log(delId)
    		var delDom = document.getElementById('del'+delId)
    		delDom.parentNode.removeChild(delDom);
    	}
    	function getClassName(oClassName ){
		　　//获取父节点下所有子元素
		　　var aEle = document.getElementsByTagName('*');
		　　var arr = [];
		　　for (var i = 0; i < aEle.length; i++) {
		　　　　if( aEle[i].className == oClassName ){
		　　　　　　arr.push( aEle[i] );
		　　　　}
		　　};
		　　return arr;
		}
	    return;
	}