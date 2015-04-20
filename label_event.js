var global_data='';
var wordlen;//单词数

var text;//表格对象
var tag;//表格对象		
var wordlist='';
var taglist='';
var taglen;
var skip='';//用户判断用户是否做的是他以前跳过的任务


//hudie
var sentence = '';
var word_fenci = '';
//var start=0;
//var end=0;
var fenciId=new Array();
var fenciId_number=0;//是fenciId的第几行
var fenci_result = '';

var ord = 0;
var number = new Array();//存放字的序号
 function sortNumber(a,b){
	return a - b;
}

function compareFunction(flag) {
    flag = flag ? flag : "asc";
    return function(a, b) {
        if( a > b) {
            return flag === "desc" ? -1 : 1;
        }else if(a < b) {
            return flag === "desc" ? 1 : -1;
        }else {
            return 0;
        }
    };
}

function getSelectText(){
    var txt = null;
    if (window.getSelection){  // mozilla FF
        txt = window.getSelection();
    }
    else if (document.getSelection){
        txt = document.getSelection();
    }
    else if (document.selection){  //IE
        txt = document.selection.createRange().text;
    }
    return txt;
}


$(function()
{	
	   var get_task_url="get_task.php";  
	   //alert("test0");
	　 gettask(get_task_url); //加载任务画弧
	   //alert("test2");
	   
/*	   if($.cookie('flag')==0)//正常任务
	   {
		   document.getElementById("restart").disabled=false;
		   document.getElementById("continue").disabled=true;
		   document.getElementById("skip").disabled=false;	
	   }
	   else if($.cookie('flag')==1)//做跳过的任务
	   {
		   document.getElementById("restart").disabled=true;
		   document.getElementById("continue").disabled=false;
		   document.getElementById("skip").disabled=true;
		   document.getElementById("last").disabled=true;
	   }
	   else{// flag=2
		   document.getElementById("restart").disabled=true;
		   document.getElementById("continue").disabled=false;
		   document.getElementById("next").disabled=true;
		   document.getElementById("skip").disabled=true;
		   document.getElementById("last").disabled=true;	
		   // document.getElementById("delete1").disabled=true;
		   //document.getElementById("delete2").disabled=true;			
	   }
*/

/*
	   //选择跳过则直接跳到下一个任务
	   $("#skip").click(function()
	   {

		   var if_gold=0;
		   var if_right=0;
		   var task=global_data.split('$$')[1];    	 		 	 
		   var begtime=global_data.split('$$')[4];
		   var gold=global_data.split('$$')[2];
		   var res_task='1';//表示该任务用户跳过
		   var skip=1;

		   var sentid=global_data.split('$$')[6]*1;
		   var usr_level=global_data.split('$$')[7];
		   var before_lastaid=global_data.split('$$')[9];//上上个任务的aid

		   var temp_domain=global_data.split('$$')[3];				
		   var url="write_annotation.php";
		   $.post( url,{result:res_task,task1:task,btime:begtime,domain:temp_domain,gold_num:if_gold,right_num:if_right,skip:skip,sentid:sentid,before_lastaid:before_lastaid},function(data) {
			   window.location.href="label_dep.php";  
			   window.location.reload();	
		   }); 

	   });

	   //分词错误不会做，以后不想在做则该任务用户以后不会再遇到
	  
	   $("#delete1").click(function(){
		   var if_gold=0;
		   var if_right=0;
		   var task=global_data.split('$$')[1];    	 		 	 
		   var begtime=global_data.split('$$')[4];
		   var gold=global_data.split('$$')[2];
		   if(gold!='?') if_gold=1;

		   var res_task='分词错误';
		   var temp_domain=global_data.split('$$')[3];	
		   var sentid=global_data.split('$$')[6]*1;//		
		   var usr_level=global_data.split('$$')[7];//
		   var before_lastaid=global_data.split('$$')[9];//上上个任务的aid					 
		   var url="write_annotation.php";
		   var skip=9;//该任务不再出现在用户的任务中

		   $.post(url,{result:res_task,task1:task,btime:begtime,domain:temp_domain,gold_num:if_gold,right_num:if_right,skip:skip,sentid:sentid,before_lastaid:before_lastaid},function(data) {
			   if($.cookie('flag')==2)  {$.cookie('flag','0'); window.location.href="label_dep.php";}
			   else window.location.href="label_dep.php";    
		   }); 
	   });
	   //无句法结构不会做，以后不想在做则该任务用户以后不会在遇到	
	   /*$("#delete2").click(function(){
	   var if_gold=0;
	   var if_right=0;
	   var task=global_data.split('$$')[1];    	 		 	 
	   var begtime=global_data.split('$$')[4];
	   var gold=global_data.split('$$')[2];
	   if(gold!='?') if_gold=1;//若该任务有答案，而用户选择了不会做那么这个题目该用户做错了，但是是会跟新到score表中的

	   var res_task='无句法结构';
	   var temp_domain=global_data.split('$$')[3];	
	   var sentid=global_data.split('$$')[6]*1;//		
	   var usr_level=global_data.split('$$')[7];//
	   var before_lastaid=global_data.split('$$')[9];//上上个任务的aid
	   var url="write_annotation.php";
	   var skip=9;//该任务不再出现在用户的任务中


	   $.post(url,{result:res_task,task1:task,btime:begtime,domain:temp_domain,gold_num:if_gold,right_num:if_right,skip:skip,sentid:sentid,before_lastaid:before_lastaid},function(data) {
	   if($.cookie('flag')==2)  {$.cookie('flag','0'); window.location.href="label_dep.php";}
	   else window.location.href="label_dep.php";

	   }); 
	   });   */  
	   

	   //上一个任务
	   $("#last").click(function(){    
		   $.cookie('flag','2');//flag=2表示用户做上一个任务  //flag表示等级？
		   window.location.href="label_dep.php";// 打开这个页面并且同时刷新
	   });
	   
	   //下一个任务//换一个任务
	   $("#next").click(function(){   
			 window.location.href="label_dep.php";// 打开这个页面并且同时刷新				
	   });	
	      

	   //点击撤销一步将撤销用户的一次操作
	   /*
	   $("#back").click(function(){   	 
		   alert("have clicked.");
		   window.location.href="label_dep.php";// 打开这个页面并且同时刷新
		   document.execCommand('undo');//撤销上一次操作
	   });	
	   */
	   
	   //任务：点击确定分词后将分词短语保存
	   $("#sure").click(function(){  
	    //ord = 0;//将ord重置为0，便于下次取得分好的词语
		   number.sort(sortNumber);
		   //alert("number: "+number);
		   fenciId[fenciId_number] = new Array();
		   for(var i=0;i<ord;i++){
				fenciId[fenciId_number][i] = number[i]+"_"; 
		   }
		   ord = 0;//将ord重置为0，便于下次取得分好的词语
		   //alert("fenciId: "+fenciId[fenciId_number]);
		       var word = "";
			   for(var j=0;j<fenciId[fenciId_number].length;j++){
				   word += fenciId[fenciId_number][j];
			   }
			   var leng = word.length;
			   word = word.substr(0,leng-1);
			   //alert("word: "+word);
			   //fenci_result += (word + "#");
			   //alert("fenci_result: "+fenci_result);
		   fenciId_number++;
		   
		   sentence_origin = global_data.split('$$')[0];//取得当前任务句子的所有内容
		   //alert(sentence_origin);
		   var sent2='';
		   for(var i=0;i<sentence_origin.length;i++){ //将sentence变为不含空格的连续的句子，留待判断分词是否合法，分词是不是句子的子串
			   if(sentence_origin[i]!=' '){
				   sent2 += sentence_origin[i];
			   }
		   }
		   for(var i=0;i<number.length;i++){
			   word_fenci += sentence_origin[number[i]];
		   }
		   alert(word_fenci);//一次分好的词语
		   
		   if(sent2.indexOf(word_fenci)<0){
			   alert("分词错误！词语不连续！");
			   number.splice(0,number.length); //lollipop
			   word_fenci = '';//将词语清空，刷新
			   window.location.href="label_dep.php";
		   }
		   
		   number.splice(0,number.length); //lollipop
		   word_fenci = '';//将词语清空，待这个句子下一次分词
		 
	   });	
	   
	   $("#logout").click(function(){  // 用户退出登陆
		   $.cookie('user', null);
		   $.cookie('privilege',null);
		   $.cookie("tasknum",null);
		   $.cookie("rightnum",null);
		   window.location.href="loginc.php";// 回到登陆页面
	   });
	   
	   //点击完成按钮这句话分词结束，判断用户分词是否正确
	   
	   $("#done").click(function(){  
			//global_data是从get_task页面获取的任务数据信息
			var task=global_data.split('$$')[1];//以$$解析字符串数组的第一个是task 格式为: (word_id)_候选_候选
			var temp_task=task.split("_");//词的下标
			var task_head=temp_task[0];
			var task_tag=temp_task;//从下标1开始时是词性选项

			var begtime=global_data.split('$$')[4]; 
			var dead_right=global_data.split('$$')[5];//用于判断该任务是否可进行申诉
			var gold=global_data.split('$$')[2]; //当前任务的正确答案
			var temp_domain=global_data.split('$$')[3];
			var sentid=global_data.split('$$')[6]*1;
			var usr_level=global_data.split('$$')[7];
			var last_result=global_data.split('$$')[8];//上次用户的答案
			var before_lastaid=global_data.split('$$')[9];//上上个任务的aid
			
			//alert("总共 "+fenciId_number+" 个词语");
			//alert("正确答案 "+gold);
			//alert("length of fenciId:  "+fenciId.length);
			var judgeflag = true;
			var judgeGold = gold.split("#");//lollipop 这里到时候用‘#’分割
			var judgeFenci = new Array();
			//alert(gold);
			//alert(gold.split('#')[0]+'  '+gold.split('#')[1]);
			//alert(judgeGold);
			for(var i=0;i<fenciId_number;i++){
			    //alert("用户分词结果  "+fenciId[i]);
				var word = "";
			    for(var j=0;j<fenciId[i].length;j++){
				    word += fenciId[i][j];
			    }
			    var leng = word.length;
			    word = word.substr(0,leng-1);
			    //alert("word: "+word);//这是用户分词结果的ID
				judgeFenci[i] = word;
			}
			
			//下面对judgeFenci进行排序
			judgeFenci.sort(compareFunction(true));
			//alert("judgeFenci length   "+judgeFenci.length);
			for(var i=0;i<judgeFenci.length;i++){
				fenci_result += (judgeFenci[i] + "#");
				//alert("judgeFenci  "+judgeFenci[i]);
			}
			
			for(var i=0;i<judgeFenci.length;i++){
				if(judgeFenci[i]!=judgeGold[i]){
					judgeflag = false;
					alert("分词答案不正确！");
					break;
				}
			}
		
			//禁用各个选项
			$(".td_option").attr("onclick","");//将所有的td的onclick事件设置为空
			$(".td_option").removeClass("td_option");//移除td的Css类
			$(".td_option1").attr("onclick","");//将所有的td的onclick事件设置为空
			$(".td_option1").removeClass("td_option1");//移除td的Css类
			
			//var res_task=task_head+'_'+tmp_tag;//用户的答案	
	        var if_gold=0;//表示这个任务是否有答案 1-表示有 0-表示没有
	        var if_right=0;//表示用户是否作对了这个题目，1-表示作对了，0-表示没有作对 -1-表示上一次作对了而这一次做错了
	        var skip=0;//用户没有跳过这个任务，skip=0
	        var url="write_annotation.php";
			
			if(gold!='?')//gold!=‘？’表示该任务有正确答案，则进行正误判断。这个只是在训练阶段给出正误提示，实战阶段虽然有地雷但是不会向用户显示提示，只是进行数据统计
			{//
				if_gold= 1;
				//if(res_task==gold) if_right=1; 
				if(judgeflag) if_right=1; 
				//if(judgeflag) alert("right!");
			
				if(usr_level==1 && $.cookie('flag')==2 )  // 做上一个任务
				{
					if(last_result==gold && judgeflag==true) //last_result上次用户的答案,res_task这次用户的答案
					if_right=0;//如果跟上次做的一样那么rightnum不加1
					if(last_result==gold && judgeflag==false) //last_result上次用户的答案,res_task这次用户的答案
					if_right=-1;//如果跟上次做的一样那么rightnum不加1
				}
				
				$.post( url,{result:fenci_result,task1:task,btime:begtime,domain:temp_domain,gold_num:if_gold,right_num:if_right,skip:skip,sentid:sentid,before_lastaid:before_lastaid}, function(data){
					if(usr_level==0){ //用户处于训练阶段的时候要给出提示，并且提示以后禁用各个选项使用户不能够修改答案
						if(judgeflag){
							//if(judgeflag) alert("right!");
							//document.getElementById("note").innerHTML="<span style='font-size:23px;'>"+'答案正确，点击进行下一个任务'+"</span>";
							alert("答案正确，点击进行下一个任务");
							window.location.href="label_dep.php";  
						}
						else {//lollipop  提示参考答案的分词结果
						var leng = gold.split('#').length;
						var sentence_origin = global_data.split('$$')[0];
						alert(gold.split('#'));
						//alert("gold leng    "+gold.split('#').length);
						
						var gold_words = new Array();
						for(var i=0;i<leng-1;i++){
							var wordid = gold.split('#')[i].split('_');
							gold_words[i] = new Array();
							//alert("ID leng    "+wordid.length);
							for(var k=0;k<wordid.length;k++){
								gold_words[i] += sentence_origin[wordid[k]];
							}	
						}
						//alert("leng    "+gold_words.length);
						//var lenggold = gold_words.length;
					    //gold_words[lenggold-1] = '';
						     //var gold_tag=gold.split('#')[1];
					         //document.getElementById("note").innerHTML="<span style='font-size:23px;'>"+'答案错误，正确词性为：<strong style=\"color:blue\">'+gold_tag+'</strong>，点击进行下一个任务'+"</span>";
							 //alert("答案错误，正确词性为："+gold_tag);
							 alert("答案错误，正确词性为："+gold_words);
							 window.location.href="label_dep.php";  
						}
					}
					else {
						if($.cookie('flag')==2) {
							$.cookie('flag','0'); 
							window.location.href="label_dep.php";
						} 
						else 
							window.location.href="label_dep.php";  
					}
					
				});  
			}
			else { //没有正确答案
				$.post( url,{result:fenci_result,task1:task,btime:begtime,domain:temp_domain,gold_num:if_gold,right_num:if_right,skip:skip,sentid:sentid,before_lastaid:before_lastaid},function(data){
					if($.cookie('flag')==2)  { $.cookie('flag','0'); window.location.href="label_dep.php";}
					else window.location.href="label_dep.php";
				}); 
			}

			window.location.href="label_dep.php";// 打开这个页面并且同时刷新
			
	   });
	   
	   //用户对原答案提出质疑希望申诉
	   $("#appeal").click(function()
	   {  
		   var appeal=1;							
		   var temp_domain=global_data.split('$$')[3];
		   var begtime=global_data.split('$$')[4];								
		   var url="annotation_appeal.php";
		   $.post(url,{appeal:appeal,btime:begtime,domain:temp_domain},function(data){});
		   document.getElementById("appeal").value='申诉成功';
		   document.getElementById("appeal").disabled=true;	      
	   });
       
	   $("#logout").click(function(){  // 用户退出登陆
		   $.cookie('user', null);
		   $.cookie('privilege',null);
		   $.cookie("tasknum",null);
		   $.cookie("rightnum",null);
		   window.location.href="loginc.php";// 回到登陆页面
	   });
     
	   //skip
	   $("#restart").click(function()
	   {    
		   $.cookie('flag','1');	

		   //document.getElementById("skip").disabled=true;	
		   window.location.href="label_dep.php";

	   });

	   $("#continue").click(function()
	   { 
		   $.cookie('flag','0');	
		   window.location.href="label_dep.php";

	   });			 
	 
});


//点击词语之后的属性
function other_click(head,if_houxuan)//传入的参数是句子词语的下标表示，这个是用户选择的head答案
{
	//global_data是从get_task页面获取的任务数据信息
	var task=global_data.split('$$')[1];//以$$解析字符串数组的第一个是task 格式为: (word_id)_候选_候选
	var temp_task=task.split("_");//词的下标
	var task_head=temp_task[0];
	var task_tag=temp_task;//从下标1开始时是词性选项

	var begtime=global_data.split('$$')[4]; 
	var dead_right=global_data.split('$$')[5];//用于判断该任务是否可进行申诉
	var gold=global_data.split('$$')[2]; 
	var temp_domain=global_data.split('$$')[3];
	var sentid=global_data.split('$$')[6]*1;
	var usr_level=global_data.split('$$')[7];
	var last_result=global_data.split('$$')[8];//上次用户的答案
	var before_lastaid=global_data.split('$$')[9];//上上个任务的aid
	
	//@hudie
	var sentence_origin = global_data.split('$$')[0];//取得当前任务句子的所有内容
	var flag = true;
	if(sentence_origin[head]!=" ")
	{
		for(var i=0;i<ord;i++){
			if(head==number[i])//判断是否重复
				flag = false;//若重复则不计入ID
		}
		if(flag){
			number[ord] = head;
			ord++;
		}
	}
	
	//按钮的状态切换  
	if(usr_level== 1 ) {
		document.getElementById("next").disabled=true;
		document.getElementById("last").disabled=false;
		document.getElementById("sure").disabled=false;
		document.getElementById("done").disabled=false;
	}else {
		document.getElementById("next").disabled=false;
		document.getElementById("last").disabled=true;
		document.getElementById("sure").disabled=false;
		document.getElementById("done").disabled=false;
	}

	var houxuan = new Array("AD","AS", "BA","CC","CD", "CS",  "DEC", "DEG", "DER","DEV","DT","ETC", 
			"FW","IJ","JJ","LB","LC","M", "MSP", "NN", "NR","NT", "OD","ON","P","PN", "PU","SB",  "SP",
			"VA","VC","VE", "VV" );
	var tmp_tag='';
	if(if_houxuan=='0')	{
		var tmp_tag=task_tag[head];
		//alert(tmp_tag);
	}
	else if(if_houxuan=='1'){
		tmp_tag=houxuan[head-1];
		//alert(tmp_tag);
	}    
	
	$("#0_"+head).css("border","2px solid teal");// 句子的样式   2px 点击之后方框的粗度
	$("#0_"+head).css("border-radius","7px 7px 7px 7px");//圆角弧度
	
}
