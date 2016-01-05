$(document).ready(function() {
	/**
	 * myindex页面的js
	 */
	var $input = $('#doc-qr-text', "#zy-myindex"),
		$qr = $('#doc-qrcode', "#zy-myindex");
	function makeCode(text) {
		$qr.empty().qrcode(text);
	}
	$input.val(location.href);
	makeCode(location.href);
	$('#zy-myindex').delegate('#doc-gen-qr', 'click', function(){
		makeCode($input.val());
	});
	$input.on('focusout', function() {
		makeCode($input.val());
	});

	/**
	 * myheader页面的js
	 */
	$('#zy-loginOut').click(function() {
		$.ajax({
			type: 'post',
			url: '/loginOut',
			dataType: 'json',
			success: function(data) {
				location.href = "/login";
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});

	/**
	 * seting和privateSeting页面的js
	 */
	//模拟radio
	$('.zy-div-radio').click(function() {
		$(this).parent().children().removeClass('am-badge-success');
		$(this).addClass('am-badge-success');
	});
	//模拟checkbox
	$('.zy-div-checkbox').click(function() {
		if ($(this).hasClass("am-badge-success")) {
			$(this).removeClass("am-badge-success")
		} else {
			$(this).addClass("am-badge-success")
		}
	});

	/********************
	 **seting页面的js
	 *********************/
	//seting页面保存事件
	$('#zy-setting').delegate('button', 'click', function(event) {
		var setingArr = [];
		$(".zy-change-content", $('#zy-setting')).each(function() {
			var temp = {};
			temp.modelNam = $(this).prev().children(".titleName").text();
			temp.sunModels = [];
			for (var i = 0; i < $(this).children("a").length; i++) {
				var tempObj = {};
				if ($($(this).children("a")[i]).hasClass("am-badge-success")) {
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 1;
				} else {
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 0;
				}
				temp.sunModels.push(tempObj);
			}
			setingArr.push(temp);
		});
		$.ajax({
			type: 'post',
			url: '/seting',
			data: {
				uNameSet: JSON.stringify(setingArr)
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode != 200) {
					warnOpnFn(data.retDesc);
				} else {
					alertOpnFn('保存成功！');
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});

	/**
	 * privateSeting页面的js
	 */
	//privateSeting页面保存事件
	$("#zy-privateSeting").delegate('button', 'click', function(event) {
		var setingArr = [];
		$(".zy-change-content").each(function() {
			var temp = {};
			temp.modelNam = $(this).prev().children(".titleName").text();
			temp.sunModels = [];
			for (var i = 0; i < $(this).children("a").length; i++) {
				var tempObj = {};
				if ($($(this).children("a")[i]).hasClass("am-badge-success")) {
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 1;
				} else {
					tempObj.sunNam = $($(this).children("a")[i]).text();
					tempObj.sunYesNo = 0;
				}
				temp.sunModels.push(tempObj);
			}
			setingArr.push(temp);
		});

		$.ajax({
			type: 'post',
			url: '/privateSeting',
			data: {
				uNameSet: JSON.stringify(setingArr)
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode != 200) {
					warnOpnFn(data.retDesc);
				} else {
					alertOpnFn('保存成功！');
				}
			},
			error: function(data) {
				alertOpnFn('err');
			}
		});
	});

	/**
	 * 修改密码页面的js
	 */
	//修改密码
	$('#zy-rePwd').delegate('button', 'click', function(event) {
		var oldpassword = $.trim($('.oldpassword', $('#zy-rePwd'))),
			newpassword = $.trim($('.newpassword', $('#zy-rePwd'))),
			newpassword2 = $.trim($('.newpassword2', $('#zy-rePwd')));
		if (oldpassword != '' && newpassword != '' && newpassword2 != '') {
			$.ajax({
				type: 'post',
				url: '/changePassword',
				data: {
					oldpassword: oldpassword,
					newpassword: newpassword,
					newpassword2: newpassword2
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode != 200) {
						warnOpnFn(data.retDesc);
					} else {
						alertOpnFn('修改成功！');
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请把信息填写完整！');
		}
	});

	/**
	 * introduction页面的js
	 */
	$('#my-specialinstr').delegate('#inputFile', 'change', function(event) {
		$('.imgtip', '#my-specialinstr').html($('#inputFile', '#my-specialinstr').val());
	});
	$('#my-specialinstr').delegate('#upload', 'click', function(event) {
		$('#specialInstruc', '#my-specialinstr').ajaxForm({
			url: $('#specialInstruc', '#my-specialinstr').attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					alertOpnFn(rs.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc', '#my-specialinstr').clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc', '#my-specialinstr').clearForm();
			}
		});
	});

	/**
	 * navigation页面的js
	 */
	//左侧列表的动态删除
	var $navgation=$("#zy-navgation");
	var $removenavmodel = $('#my-removenavmodel', $navgation);
	$removenavmodel.delegate('button', 'click', function(event) {
		var navName = $.trim($(".addmodelNameD", $removenavmodel).val());
		if (navName != '') {
			$.ajax({
				type: 'post',
				url: '/navigationListDel',
				data: {
					navName: navName
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('不能为空哦~');
		}
	});

	//左侧列表的动态插入
	var $addnavmodel = $('#my-addnavmodel', $navgation);
	$addnavmodel.delegate('button', 'click', function(event) {
		var navName = $.trim($(".addmodelNameA", $addnavmodel).val());
		if (navName != '') {
			$.ajax({
				type: 'post',
				url: '/navigationListAdd',
				data: {
					navName: navName
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//新链接元素的添加
	var navModulePar="";
	var $navpopup = $('#my-navpopup', $navgation);
	$navgation.delegate('.J_zy-datamodal', 'click', function(event) {
		$navpopup.modal();
		navModulePar=$(this).closest('.zy-module-container').find(".zy-navigation-nav button").text();
	});
	$navpopup.delegate('button', 'click', function(event) {
		var moduleName = $.trim($(".moduleName", $navpopup).val()),
			moduleInfo = $.trim($(".moduleInfo", $navpopup).val()),
			moduleLink = $.trim($(".moduleLink", $navpopup).val())
			moduleParent = $.trim(navModulePar);

		if (moduleName!='' && moduleInfo!="" && moduleLink!="") {
			$.ajax({
				type: 'post',
				url: '/navigationListAddsun',
				data: {
					moduleParent: moduleParent,
					moduleName: moduleName,
					moduleInfo: moduleInfo,
					moduleLink: moduleLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//小链接元素的删除
	var navModulePar="";
	var $navpopup = $('#my-navpopup', $navgation);
	$navgation.delegate('.J_zy-datamodal', 'click', function(event) {
		$navpopup.modal("open");
		navModulePar=$(this).closest('.zy-module-container').find(".zy-navigation-nav button").text();
	});
	$navgation.delegate('.J_zy-module-close', 'click', function(event) {
		var moduleName = $.trim($(this).next(".zy-module-con").find("a").text()),
			moduleParent = $.trim($(this).closest('.zy-module-container').find(".zy-navigation-nav button").text());
		if (moduleName!='' && moduleParent!="") {
			$.ajax({
				type: 'post',
				url: '/navigationListDelsun',
				data: {
					moduleParent: moduleParent,
					moduleName: moduleName
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function() {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	/**
	 * experience页面的js
	 */
	//分页事件
	var $manageExperience=$("#zy-manageExperience");
	$manageExperience.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/expPageSearch',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	experienceTag: __data.experienceTag
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls=[];
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+=[
			    			'<tr>',
			    			'<td>'+(((pagenum-1)*10)+(i+1))+'</td>',
			    			'<td>'+data.allArticles[i].experienceTitle+'</td>',
			    			'<td>'+data.allArticles[i].experienceCompany+'</td>',
			    			'<td>'+data.allArticles[i].cTime+'</td>',
			    			'<td><a href="javascript:;">删除</a>&nbsp&nbsp&nbsp&nbsp<a href="javascript:;">操作</a></td>',
			    			'</tr>'
			    		].join('');
			    	}    
			        $manageExperience.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	//experience发布
	var $createExperience = $('#zy-createExperience');
	$createExperience.delegate('.experienceFB', 'click', function() {
		var experienceTitle = $.trim($(".experienceTitle", $createExperience).val()),
			experienceCompany = $.trim($(".experienceCompany", $createExperience).val()),
			experienceCont = $.trim($("#experienceCont", $createExperience).html()),
			experienceLink = $.trim($(".experienceLink", $createExperience).val());
		if (experienceTitle != '' && experienceCompany != '' && experienceCont != '' && experienceLink != '') {
			$.ajax({
				type: 'post',
				url: '/createExperience',
				data: {
					tags: 1,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceLink: experienceLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//experience存草稿
	var $createExperience = $('#zy-createExperience');
	$createExperience.delegate('.experienceCG', 'click', function() {
		var experienceTitle = $.trim($(".experienceTitle", $createExperience).val()),
			experienceCompany = $.trim($(".experienceCompany", $createExperience).val()),
			experienceCont = $.trim($("#experienceCont", $createExperience).html()),
			experienceLink = $.trim($(".experienceLink", $createExperience).val());
		if (experienceTitle != '' && experienceCompany != '' && experienceCont != '' && experienceLink != '') {
			$.ajax({
				type: 'post',
				url: '/createExperience',
				data: {
					tags: 2,
					experienceTitle: experienceTitle,
					experienceCompany: experienceCompany,
					experienceCont: experienceCont,
					experienceLink: experienceLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	/**
	 * Article页面的js
	 */
	//分页事件
	var $manageArticle=$("#zy-manageArticle");
	$manageArticle.delegate('#pageShow li', 'click', function() {
		var pagenum =pageStep($(this));
		if(pagenum!=0){
			$.ajax({    
			    type:'post',        
			    url:'/artPageSearch',   
			    data:{
			    	curstep: pagenum,
			    	uName: __data.uName,
			    	articleTag: __data.articleTag
			    },
			    dataType:'json',    
			    success: function(data){
			    	var htmls=[];
			    	for(var i=0, len=data.allArticles.length;i<len;i++){
			    		htmls+=[
			    			'<tr>',
			    			'<td>'+(((pagenum-1)*10)+(i+1))+'</td>',
			    			'<td>'+data.allArticles[i].articleTitle+'</td>',
			    			'<td>'+data.allArticles[i].articleType+'</td>',
			    			'<td>'+data.allArticles[i].cTime+'</td>',
			    			'<td><a href="javascript:;">删除</a>&nbsp&nbsp&nbsp&nbsp<a href="javascript:;">操作</a></td>',
			    			'</tr>'
			    		].join('');
			    	}    
			        $manageArticle.find("tbody").html(htmls);
			    },
			    error : function() {   
			        alert('err');    	
			   }        
			});  
		}
	});

	//article发布
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleFB', 'click', function() {
		var articleTitle = $.trim($(".articleTitle", $createArticle).val()),
			articleKeyword = $.trim($(".articleKeyword", $createArticle).val()),
			articleType = $.trim($(".articleType", $createArticle).val()),
			articleCont = $.trim($("#articleCont", $createArticle).html()),
			articleLink = $.trim($(".articleLink", $createArticle).val());
		if (articleTitle != '' && articleKeyword != '' && articleType != '' && articleCont != '' && articleLink != '') {
			$.ajax({
				type: 'post',
				url: '/createarticle',
				data: {
					tags: 1,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleCont: articleCont,
					articleLink: articleLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});

	//article存草稿
	var $createArticle = $('#zy-createArticle');
	$createArticle.delegate('.articleCG', 'click', function() {
		var articleTitle = $.trim($(".articleTitle", $createArticle).val()),
			articleKeyword = $.trim($(".articleKeyword", $createArticle).val()),
			articleType = $.trim($(".articleType", $createArticle).val()),
			articleCont = $.trim($(".articleCont", $createArticle).html()),
			articleLink = $.trim($(".articleLink", $createArticle).val());
		if (articleTitle != '' && articleKeyword != '' && articleType != '' && articleCont != '' && articleLink != '') {
			$.ajax({
				type: 'post',
				url: '/createarticle',
				data: {
					tags: 2,
					articleTitle: articleTitle,
					articleKeyword: articleKeyword,
					articleType: articleType,
					articleCont: articleCont,
					articleLink: articleLink
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						alertOpnFn('操作成功！');
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(data) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});


	/***
		简历页面的js代码
	**/
	//个人基本信息
	var $myBaseinfo = $('#my-baseinfo');
	$myBaseinfo.delegate('#inputFile', 'change', function() {
		$('.imgtip', $myBaseinfo).html($('#inputFile', $myBaseinfo).val());
	})

	$myBaseinfo.delegate('#upload', 'click', function() {
		$('#specialInstruc', $myBaseinfo).ajaxForm({
			url: $('#specialInstruc', $myBaseinfo).attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					warnOpnFn(res.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc', $myBaseinfo).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc', $myBaseinfo).clearForm();
			}
		});
	})

	//联系方式
	$myContactinfo = $('#my-contactinfo');
	$myContactinfo.delegate('.my-contactinfo-btn', 'click', function() {
		var mphone = $.trim($(".mphone", $myContactinfo).val()),
			phone = $.trim($(".phone", $myContactinfo).val()),
			address = $.trim($(".address", $myContactinfo).val()),
			identity = $.trim($(".identity", $myContactinfo).val()),
			email = $.trim($(".email", $myContactinfo).val()),
			qqnum = $.trim($(".qqnum", $myContactinfo).val());
		$.ajax({
			type: 'post',
			url: '/resume/contactinfo',
			data: {
				mphone: mphone,
				phone: phone,
				address: address,
				identity: identity,
				email: email,
				qqnum: qqnum
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});

	//教育经历-添加
	var $myEducation = $('#my-education');
	$myEducation.delegate('.my-education1-btn', 'click', function() {
		var school = $.trim($(".school1", $myEducation).val()),
			educationtype = $.trim($(".educationtype1", $myEducation).val()),
			sdatetime = $.trim($(".sdatetime1", $myEducation).val()),
			edatetime = $.trim($(".edatetime1", $myEducation).val()),
			major = $.trim($(".major1", $myEducation).val()),
			majorinstr = $.trim($(".majorinstr1", $myEducation).val());
		$.ajax({
			type: 'post',
			url: '/resume/education/add',
			data: {
				school: school,
				educationtype: educationtype,
				sdatetime: sdatetime,
				edatetime: edatetime,
				major: major,
				majorinstr: majorinstr
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});
	//教育经历-更新
	$myEducation.delegate('.my-education2-btn', 'click', function() {
		var educationtypeA = $.trim($(".educationtype21", $myEducation).val()),
			school = $.trim($(".school2", $myEducation).val()),
			sdatetime = $.trim($(".sdatetime2", $myEducation).val()),
			edatetime = $.trim($(".edatetime2", $myEducation).val()),
			major = $.trim($(".major2", $myEducation).val()),
			majorinstr = $.trim($(".majorinstr2", $myEducation).val());
		$.ajax({
			type: 'post',
			url: '/resume/education/change',
			data: {
				educationtypeA: educationtypeA,
				school: school,
				sdatetime: sdatetime,
				edatetime: edatetime,
				major: major,
				majorinstr: majorinstr
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});
	//教育经历-删除
	$myEducation.delegate('.my-education3-btn', 'click', function() {
		var educationtype = $.trim($(".educationtype", $myEducation).val());
		$.ajax({
			type: 'post',
			url: '/resume/education/dele',
			data: {
				educationtype: educationtype
			},
			dataType: 'json',
			success: function(data) {
				if (data.retCode == 200) {
					location.reload();
				} else {
					warnOpnFn(data.retDesc);
				}
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});
	//教育经历-操作类型事件
	$myEducation.delegate('.educationtype21', 'change', function() {
		var educationtype = $.trim($(".educationtype21", $myEducation).val());
		$.ajax({
			type: 'post',
			url: '/resume/education/changeType',
			data: {
				educationtype: educationtype
			},
			dataType: 'json',
			success: function(data) {
				$('.educationPart', $myEducation).show();
				$(".school2", $myEducation).val(data.school);
				$(".sdatetime2", $myEducation).val(data.sdatetime);
				$(".edatetime2", $myEducation).val(data.edatetime);
				$(".major2", $myEducation).val(data.major);
				$(".majorinstr2", $myEducation).val(data.majorinstr);
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});
	$('.educationtype', $myEducation).change(function() {
		if ($(this).children('option:selected').val() == 1) {
			$('.delModule', $myEducation).hide();
			$('.changeModule', $myEducation).hide();
			$('.addModule', $myEducation).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.delModule', $myEducation).hide();
			$('.changeModule', $myEducation).show();
			$('.addModule', $myEducation).hide();
		} else if ($(this).children('option:selected').val() == 3) {
			$('.delModule', $myEducation).show();
			$('.changeModule', $myEducation).hide();
			$('.addModule', $myEducation).hide();
		} else {
			$('.delModule', $myEducation).hide();
			$('.changeModule', $myEducation).hide();
			$('.addModule', $myEducation).hide();
		}
	});


	//荣誉证书
	$myCertificate = $('#my-certificate');
	$myCertificate.delegate('#inputFile3', 'change', function() {
		$('.imgtip', $myCertificate).html($(this).val());
	})

	$myCertificate.delegate('#upload3', 'click', function(event) {
		$('#specialInstruc3', $myCertificate).ajaxForm({
			url: $('#specialInstruc3', $myCertificate).attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					warnOpnFn(res.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc3', $myCertificate).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc3', $myCertificate).clearForm();
			}
		});
	});

	//我的作品
	$myWorks = $('#my-works');
	$myWorks.delegate('#inputFile2', 'change', function() {
		var imgStr = "",
			fileObjs = $('#inputFile2', $myWorks).get(0);
		for (var j = 0, len = fileObjs.files.length; j < len; j++) {
			imgStr = imgStr + fileObjs.files[j].name + '<i style="margin-right:20px;"></i>';
		}
		$('.imgtip', $myWorks).html(imgStr);
	})

	$myWorks.delegate('#upload2', 'click', function(event) {
		$('#specialInstruc2', $myWorks).ajaxForm({
			url: $('#specialInstruc2', $myWorks).attr('action'),
			type: 'POST',
			success: function(res, status, xhr, $form) {
				if (res.retCode != 200) {
					warnOpnFn(res.retDesc);
				} else {
					location.reload();
				}
				$('#specialInstruc2', $myWorks).clearForm();
			},
			error: function(res, status, e) {
				alertOpnFn('err');
				$('#specialInstruc2', $myWorks).clearForm();
			}
		});
	});

	//项目经历
	$myProjects = $('#my-projects');
	$myProjects.delegate('.my-projects-btn', 'click', function(event) {
		var pname = $.trim($(".pname", $myProjects).val()),
			ptime = $.trim($(".ptime", $myProjects).val()),
			paddt = $.trim($(".paddt", $myProjects).val());
		if (pname && ptime && paddt) {
			$.ajax({
				type: 'post',
				url: '/resume/projects',
				data: {
					pname: $(".pname", '#my-projects').val(),
					ptime: $(".ptime", '#my-projects').val(),
					paddt: $(".paddt", '#my-projects').val()
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});

	//实践经历
	var $myUndergo = $('#my-undergo');
	$myUndergo.delegate('.my-undergo-btn', 'click', function(event) {
		var undergoname = $.trim($(".undergoname", $myUndergo).val()),
			undergotype = $.trim($(".undergotype", $myUndergo).val()),
			undergotime = $.trim($(".undergotime", $myUndergo).val()),
			undergoinstr = $.trim($(".undergoinstr", $myUndergo).val());
		if (undergoname && undergotype && undergotime && undergoinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/undergo',
				data: {
					undergoname: undergoname,
					undergotype: undergotype,
					undergotime: undergotime,
					undergoinstr: undergoinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});

	//论文专利
	var $myPaper = $('#my-paper');
	$myPaper.delegate('.my-paper-btn', 'click', function(event) {
		var papername = $.trim($(".papername", $myPaper).val()),
			papertype = $.trim($(".papertype", $myPaper).val()),
			papertime = $.trim($(".papertime", $myPaper).val()),
			paperinstr = $.trim($(".paperinstr", $myPaper).val());
		if (papername && papertype && papertime && paperinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/paper',
				data: {
					papername: papername,
					papertype: papertype,
					papertime: papertime,
					paperinstr: paperinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});

	//核心技能
	var $descriptioncon = $('#my-description');
	$descriptioncon.delegate('.my-description-btn', 'click', function(event) {
		var descVal = $.trim($descriptioncon.find(".descriptioncon").val());
		if (descVal) {
			$.ajax({
				type: 'post',
				url: '/resume/desc',
				data: {
					desCon: descVal
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});

	/*
	  实习经历相关操作
	 */
	//repractice-add
	var $myRepractice = $('#my-repractice');
	$myRepractice.delegate('.my-repractice-btn', 'click', function(event) {
		var practice = $.trim($(".practice", $myRepractice).val()),
			spracticetime = $.trim($(".spracticetime", $myRepractice).val()),
			epracticetime = $.trim($(".epracticetime", $myRepractice).val()),
			practiceposition = $.trim($(".practiceposition", $myRepractice).val()),
			practiceinstr = $.trim($(".practiceinstr", $myRepractice).val());
		if (practice && spracticetime && epracticetime && practiceposition && practiceinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/repractice/add',
				data: {
					practice: practice,
					spracticetime: spracticetime,
					epracticetime: epracticetime,
					practiceposition: practiceposition,
					practiceinstr: practiceinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});
	//repractice-change
	$myRepractice.delegate('.my-repractice2-btn', 'click', function(event) {
		var compChangeType = $.trim($(".compChangeType", $myRepractice).val()),
			spracticetime = $.trim($(".spracticetime2", $myRepractice).val()),
			epracticetime = $.trim($(".epracticetime2", $myRepractice).val()),
			practiceposition = $.trim($(".practiceposition2", $myRepractice).val()),
			practiceinstr = $.trim($(".practiceinstr2", $myRepractice).val());
		if (compChangeType && spracticetime && epracticetime && practiceposition && practiceinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/repractice/change',
				data: {
					compChangeType: compChangeType,
					spracticetime: spracticetime,
					epracticetime: epracticetime,
					practiceposition: practiceposition,
					practiceinstr: practiceinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});
	//repractice-del
	$myRepractice.delegate('.my-repractice1-btn', 'click', function(event) {
		var compType = $.trim($(".compType", $myRepractice).val());
		if (compType) {
			$.ajax({
				type: 'post',
				url: '/resume/repractice/dele',
				data: {
					compType: compType
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('请填写完整!');
		}
	});
	$('.operaType', $myRepractice).change(function() {
		if ($(this).children('option:selected').val() == 1) {
			$('.deleModule', $myRepractice).hide();
			$('.changeModule', $myRepractice).hide();
			$('.addModule', $myRepractice).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.deleModule', $myRepractice).hide();
			$('.changeModule', $myRepractice).show();
			$('.addModule', $myRepractice).hide();
		} else if ($(this).children('option:selected').val() == 3) {
			$('.deleModule', $myRepractice).show();
			$('.changeModule', $myRepractice).hide();
			$('.addModule', $myRepractice).hide();
		} else {
			$('.deleModule', $myRepractice).hide();
			$('.changeModule', $myRepractice).hide();
			$('.addModule', $myRepractice).hide();
		}
	});
	//repractice-changeType
	$myRepractice.delegate('.my-repractice', 'change', function(event) {
		var compChangeType = $.trim($(".compChangeType", $myRepractice).val());
		$.ajax({
			type: 'post',
			url: '/resume/repractice/changeType',
			data: {
				compChangeType: compChangeType
			},
			dataType: 'json',
			success: function(data) {
				$(".spracticetime2", $myRepractice).val(data.spracticetime);
				$(".epracticetime2", $myRepractice).val(data.epracticetime);
				$(".practiceposition2", $myRepractice).val(data.practiceposition);
				$(".practiceinstr2", $myRepractice).val(data.practiceinstr);
				$('.compPart', $myRepractice).show();
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});

	/*
	  gz经历相关操作
	 */
	//practice-add
	$myPractice = $('#my-practice');
	$myPractice.delegate('.my-practice3-btn', 'click', function(event) {
		var practice = $.trim($(".practice", $myPractice).val()),
			spracticetime = $.trim($(".spracticetime", $myPractice).val()),
			epracticetime = $.trim($(".epracticetime", $myPractice).val()),
			practiceposition = $.trim($(".practiceposition", $myPractice).val()),
			practiceinstr = $.trim($(".practiceinstr", $myPractice).val());
		if (practice && spracticetime && epracticetime && practiceposition && practiceinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/practice/add',
				data: {
					practice: practice,
					spracticetime: spracticetime,
					epracticetime: epracticetime,
					practiceposition: practiceposition,
					practiceinstr: practiceinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});
	//practice-change
	$myPractice.delegate('.my-practice2-btn', 'click', function(event) {
		var compChangeType = $.trim($(".compChangeType", $myPractice).val()),
			spracticetime = $.trim($(".spracticetime2", $myPractice).val()),
			epracticetime = $.trim($(".epracticetime2", $myPractice).val()),
			practiceposition = $.trim($(".practiceposition2", $myPractice).val()),
			practiceinstr = $.trim($(".practiceinstr2", $myPractice).val());
		if (compChangeType && spracticetime && epracticetime && practiceposition && practiceinstr) {
			$.ajax({
				type: 'post',
				url: '/resume/practice/change',
				data: {
					compChangeType: compChangeType,
					spracticetime: spracticetime,
					epracticetime: epracticetime,
					practiceposition: practiceposition,
					practiceinstr: practiceinstr
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});
	//practice-del
	$myPractice.delegate('.my-practice1-btn', 'click', function(event) {
		var compType = $.trim($(".compType", $myPractice).val());
		if (compType) {
			$.ajax({
				type: 'post',
				url: '/resume/practice/dele',
				data: {
					compType: compType
				},
				dataType: 'json',
				success: function(data) {
					if (data.retCode == 200) {
						location.reload();
					} else {
						warnOpnFn(data.retDesc);
					}
				},
				error: function(err) {
					alertOpnFn('err');
				}
			});
		} else {
			warnOpnFn('内容不能为空哦~');
		}
	});
	$myPractice.delegate('.operaType', 'change', function(event) {
		if ($(this).children('option:selected').val() == 1) {
			$('.deleModule', $myPractice).hide();
			$('.changeModule', $myPractice).hide();
			$('.addModule', $myPractice).show();
		} else if ($(this).children('option:selected').val() == 2) {
			$('.deleModule', $myPractice).hide();
			$('.changeModule', $myPractice).show();
			$('.addModule', $myPractice).hide();
		} else if ($(this).children('option:selected').val() == 3) {
			$('.deleModule', $myPractice).show();
			$('.changeModule', $myPractice).hide();
			$('.addModule', $myPractice).hide();
		} else {
			$('.deleModule', $myPractice).hide();
			$('.changeModule', $myPractice).hide();
			$('.addModule', $myPractice).hide();
		}
	});
	//practice-changeType
	$myPractice.delegate('.compChangeType', 'change', function(event) {
		$.ajax({
			type: 'post',
			url: '/resume/practice/changeType',
			data: {
				compChangeType: $(".compChangeType", $myPractice).val()
			},
			dataType: 'json',
			success: function(data) {
				$(".spracticetime2", $myPractice).val(data.spracticetime);
				$(".epracticetime2", $myPractice).val(data.epracticetime);
				$(".practiceposition2", $myPractice).val(data.practiceposition);
				$(".practiceinstr2", $myPractice).val(data.practiceinstr);
				$('.compPart', $myPractice).show();
			},
			error: function(err) {
				alertOpnFn('err');
			}
		});
	});


});

//分页模块
function pageStep(clickobj){
	var pagenum;

	pagenum = clickPagebtn($(clickobj));
	if(pagenum != 0){
		pageChange(pagenum);
		return pagenum;
	}else{
		return 0;
	}
}

function pageChange(clickNum){
	var pagetipHtml='共'+__data.allpage+'页&nbsp;';

	if(__data.allpage != __data.showpagetip){
		pagetipHtml+='<li class="J_pre-page"><a href="javascript:;">&laquo;</a></li>';
		pagetipHtml+= pagebtnShow(clickNum);
		pagetipHtml+='<li class="J_next-page"><a href="javascript:;">&raquo;</a></li>';
	}else{
		pagetipHtml+='<li class="J_pre-page"><a href="javascript:;">&laquo;</a></li>';
		for(var i=1; i<=__data.allpage; i++){
			pagetipHtml+=comCon(i, clickNum);
		}
		pagetipHtml+='<li class="J_next-page"><a href="javascript:;">&raquo;</a></li>';
	}

	$("#pageShow ul").html(pagetipHtml);
}

function pagebtnShow(clickNum){
	var pagetipHtml="";
	var curNum=clickNum;
	var	nextNumDeta=__data.allpage-curNum;
	var	preNumDeta=curNum-4;

	if(nextNumDeta>=4 && preNumDeta>0){
		for(var i=curNum-4;i<=curNum+4;i++){
			pagetipHtml+=comCon(i, clickNum);
		}
	}else if(preNumDeta<=0){
		for(var i=1;i<=curNum+5-preNumDeta;i++){
			pagetipHtml+=comCon(i, clickNum);
		}
	}else{
		for(var i=curNum-4-(4-nextNumDeta);i<=__data.allpage;i++){
			pagetipHtml+=comCon(i, clickNum);
		}
	}

	return pagetipHtml;
}

function comCon(i, clickNum){
	var htmlS="";
	if(i==clickNum){
		htmlS='<li class="am-active"><a href="javascript:;">'+i+'</a></li>';
	}else{
		htmlS='<li><a href="javascript:;">'+i+'</a></li>';
	}

	return htmlS;
}

function clickPagebtn(clickobj){
	var pagenum=0;
	var contain=$(clickobj).closest("#pageShow");
	var pagenum=$(contain).find(".am-active").text();

	if(isPrepage(clickobj) || isNextpage(clickobj)){
		if(isPrepage(clickobj) && parseInt(pagenum) != 1){
			pagenum = parseInt(pagenum) - 1;
		}
		if(isNextpage(clickobj) && parseInt(pagenum) != __data.allpage){
			pagenum = parseInt(pagenum) + 1;
		}
	}else{
		pagenum = parseInt($(clickobj).find("a").text());
	}

	return pagenum;
}

function isPrepage(clickobj){
	if($(clickobj).hasClass('J_pre-page')){
		return true;
	}else{
		return false;
	}
}

function isNextpage(clickobj){
	if($(clickobj).hasClass('J_next-page')){
		return true;
	}else{
		return false;
	}
}