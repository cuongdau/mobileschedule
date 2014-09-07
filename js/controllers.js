// JavaScript Document
// The root URL for the RESTful services
//'http://baotrithuc.net/cellar/save.php'
var rootURL = "http://baotrithuc.net/mschedule/index.php";
//var rootURL = "http://localhost/mschedule/index.php";


////-------Action LOGIN-----------

			//alert(activities.activity[0].name);
			//alert(appUser[0].password);
$('#fLogin').submit(function() {
	var postData = $(this).serialize();
	console.log(postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: rootURL+'/cverifylogin',
		beforeSend: function(){
		loadPage();
		},
		success: function(data){
			hidePage();
			console.log(data);
			appData = JSON.parse(data);
			appUser = appData.user;
			if(appData.page=='home')
			{
				//localStorage.setItem("IdUser",appData.user[0].id);
				sessionStorage.setItem('user',JSON.stringify(appData.user));
				window.location = "home.html";
			}else
			{
				alert('Account is invalid...');
				location.reload();
			}
		},
		error: function(data){
			hidePage();
			console.log(data);
			alert('There was an error login');
			location.reload();
		}
	});
	return false;
});		 
////------- SING UP-----------
$('#fSignUp').submit(function(){
	var postData=$(this).serialize();
	console.log(postData);
	$.ajax({
		type:	'POST',
		data:	postData,
		url:	rootURL+'/cregister/signUp',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			if(appData.page == 'index')
			{
				alert(appData.message);
				window.location='index.html'; // this is login page
			}else if(appData.page=='signup')
			{
				alert(appData.message);
				location.reload();
			}
		},
		error: function(data)
		{
			hidePage();
			console.log(data);
			alert('Sign up is not successfully...123');
			alert(appData.message);
			location.reload();
		}
	});
	return false;
});
///------------- update account ---------
function saveUpdateAccount(){
	var postData=$('form').serialize();
	console.log(postData);
	$.ajax({
		type:	'POST',
		data:	postData,
		url:	rootURL+'/cusers/updateUser',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			sessionStorage.setItem('user',JSON.stringify(appData.user));
			location.load = 'account.html';
			
		},
		error: function(data)
		{
			hidePage();
			console.log(data);
			alert('update was not succesfuly');
			location.reload();
		}
	});
	return false;
	
}
///------------- Cancel update account ---------
function cancelUpdateAccount(){
	location.reload();
}
///------------- action call My Tasks ---------
$('#divMyTasks').click(function() {
	var postData = 'IdUser='+JSON.parse(sessionStorage.getItem("user"))[0].id;
	console.log(postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: rootURL+'/ctasks/GetTasksByUser',
		beforeSend: function(){
		loadPage();
		},
		success: function(data){
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			if(appData.page == 'task')
			{
				sessionStorage.setItem("tasks",JSON.stringify(appData.tasks));
				window.location='task.html'; // this is login page
			}else if(appData.page=='signup')
			{
				alert('User name was used');
				location.reload();
			}
		},
		error: function(data){
			hidePage();
		}
	});
	return false;
});
$('#divAccount').click(function() {
		window.location='account.html';
});

$('#divMyCalendar').click(function() {
	window.location='calendar.html';
});
function taskDetail(id) 
{
	var postData = 'IdTask='+id;//JSON.parse(sessionStorage.getItem('tasks'))[id].id;
	console.log(postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: rootURL+'/ctasks/GetTaskById',
		beforeSend: function(){
		loadPage();
		},
		success: function(data){
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			if(appData.page == 'taskDetail')
			{
				sessionStorage.setItem("TaskById",JSON.stringify(appData.TaskById));
				window.location='taskDetail.html'; // this is login page
			}else if(appData.page=='task')
			{
				alert('User name was used');
				location.reload();
			}
		},
		error: function(data){
			hidePage();
		}
	});
	return false;
	
}

function spanCreateTask(){
	var callback = function() {
		window.location = 'createTask.html';
	}
	getGroupsByUser(JSON.parse(sessionStorage.getItem("user"))[0].id, callback);
}

function getGroupsByUser(id_user, callback){
	var postData =  'IdUser='+id_user;
	console.log(postData);
	$.ajax({
		type:'POST',
		data: postData,
		url: rootURL+'/cgroups/getGroupsByUser',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			sessionStorage.setItem("groups",JSON.stringify(appData.groups));
			if(callback) {
				callback();
			}
		},
		error: function(data)
		{
			hidePage();
			alert('khong dua len server de lay groupsByUser duoc..');
			location.reload();
		}
	});
	return false;
}
////------- Create Task -----------
$('#fCreateTask').submit(function(){
	
	var postData=$(this).serialize()+'&createBy='+JSON.parse(sessionStorage.getItem("user"))[0].id;
	console.log(postData);
	$.ajax({
		type:	'POST',
		data:	postData,
		url:	rootURL+'/ctasks/insertTask',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			if(appData.page == 'task')
			{
				sessionStorage.setItem("tasks",JSON.stringify(appData.tasks));
				window.location='task.html'; // this is login page
			}else
			{
				alert('khong them duoc vao csdl.1..');
				location.reload();
			}
		},
		error: function(data)
		{
			hidePage();
			alert('khong them duoc vao csdl 2...');
			location.reload();
		}
	});
	return false;
});
//------------ deleted task ----------------
function deleteTask(task_id)
{
	alert(task_id);	
}
//------------ change group to limit members ----------------
function createTaskChangeGroup(){
	var e = document.getElementById("lsGroup");
	var group_id = e.options[e.selectedIndex].value;
	
	var callback = function(data){
		var userList = data.usersInGroup;
		var select = $('#selectMember');
		select.html('');
		
		// In case NoGroup
		if(group_id == 'noGroup'){
			var option = $('<option>');
			option.attr('value', JSON.parse(sessionStorage['user'])[0].id);
			option.html(JSON.parse(sessionStorage['user'])[0].user_name);
			select.append(option);
		}else{
			for(var i=0; i < userList.length; i++) {
				var option = $('<option>');
				option.attr('value', userList[i].id);
				option.html(userList[i].user_name);
				select.append(option);
			}
		}
	}
	getMemberByGroup(group_id, callback);	
}
//-------------------------------
function mCircles() 
{
	var callback = function(){
		window.location='mCircle.html';
	}
	getGroupsByUser(JSON.parse(sessionStorage.getItem("user"))[0].id, callback);
}
////------- Create Group here -----------
$('#fCreateGroup').submit(function(){
	var postData=$(this).serialize()+'&IdUser='+JSON.parse(sessionStorage.getItem("user"))[0].id;
	console.log(postData);
	$.ajax({
		type:	'POST',
		data:	postData,
		url:	rootURL+'/cgroups/insertGroup',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			sessionStorage.setItem("groups",JSON.stringify(appData.groups));
			window.location = 'mCircle.html'; // this is login page
		},
		error: function(data)
		{
			hidePage();
			alert(appData.message);
			alert('it did not connect to server..');
			location.reload();
		}
	});
	return false;
});

//-------------for searching user --------
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
var keyWord;
$('#searchUser').keyup(function(){
    clearTimeout(typingTimer);
	keyWord = $(this).val();
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});
//on keydown, clear the countdown 
$('#searchUser').keydown(function(){
    clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
	if(keyWord.length>2){
		var postData =  'keyWord='+keyWord;
		console.log(postData);
		$.ajax({
			type:'POST',
			data: postData,
			url: rootURL+'/cusers/getUsersByKeyword',
			beforeSend: function(){
			loadPage();
			},
			success: function(data)
			{
				hidePage();
				console.log(data);
				appData=JSON.parse(data);
				sessionStorage.setItem("searchUsers",JSON.stringify(appData.users));
				window.location = 'mCircle.html'; // goi den trang tim kiem
				
			},
			error: function(data)
			{
				hidePage();
				alert('khong dua len server de lay groupsByUser duoc..');
				location.reload();
			}
		});
		return false;	
	}
}
//------ end for searching user
//------ add user from result of search
function spanAddUser(user_name){
	sessionStorage.removeItem("user_name");
	sessionStorage.setItem("user_name",user_name);
}
//
function addUserToGroup(id_group, id_user){
	var user_name = sessionStorage.getItem("user_name");
	if(user_name == null){
		alert('No people to add');
	}else{
		var postData =  'IdGroup='+id_group+'&UserName='+user_name;
		console.log(postData);
		$.ajax({
			type:'POST',
			data: postData,
			url: rootURL+'/cgroups/insertUserIntoGroup',
			beforeSend: function(){
			loadPage();
			},
			success: function(data)
			{
				hidePage();
				console.log(data);
				appData=JSON.parse(data);
				
				mCircles();
			},
			error: function(data)
			{
				hidePage();
				sessionStorage.removeItem("user_name");
				alert('khong dua len server de lay groupsByUser duoc..');
				location.reload();
			}
		});
		return false;	
	}
}
function getMemberByGroup(group_id, callback){
	var postData='&IdGroup='+group_id;
	console.log(postData);
	$.ajax({
		type:	'POST',
		data:	postData,
		url:	rootURL+'/cgroups/getUserByGroup',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			hidePage();
			console.log(data);
			appData=JSON.parse(data);
			sessionStorage.setItem("usersInGroup",JSON.stringify(appData.usersInGroup));
			if(callback) {
				callback(appData);
			}
		},
		error: function(data)
		{
			hidePage();
			alert('it did not connect to server..');
			location.reload();
		}
	});
	return false;
}
function detailGroup(group_id){
	var callback = function(){
		window.location='detailGroup.html';
	}
	getMemberByGroup(group_id, callback);
}
function removeUser(member_id,group_id){
	var postData='&IdMember='+member_id;
	console.log(postData);
	$.ajax({
		type:	'POST',
		data:	postData,
		url:	rootURL+'/cgroups/removeUserInGroup',
		beforeSend: function(){
		loadPage();
		},
		success: function(data)
		{
			console.log(data);
			appData=JSON.parse(data);
			detailGroup(group_id);
			
		},
		error: function(data)
		{
			hidePage();
			alert('it did not connect to server..');
			location.reload();
		}
	});
	return false;
}
//------ start load page, load div, load form, hide, show....
//------ page loading....
function loadPage()
{
	$('#loadPage').show();
}

function hidePage() {
	$('#loadPage').hide();
}
//------  hide, show div search
var isSearch = true;
function spanSearch(){
	if(!isSearch) {
		$('#divSearch').hide();
	} else {
		$('#divSearch').show(); 
	}
	isSearch = !isSearch;
}
//------ hide show div Create Group
var isCreateGroup = true;
function spanCreateGroup(){
	if(!isCreateGroup) {
		$('#fCreateGroup').hide();
	} else {
		$('#fCreateGroup').show(); 
	}
	isCreateGroup = !isCreateGroup;
}
//------ hide, show div result of users after search....
var isSearchUsers = true;
function spanSearchUsers(){
	if(isSearchUsers) {
		$('#divResultSearchUsers').hide();
	} else {
		$('#divResultSearchUsers').show(); 
	}
	isSearchUsers = !isSearchUsers;
}
//------ hide, show div result of group's users....
var isGoupOfUsers = true;
function spanGoupUsers(){
	if(!isGoupOfUsers) {
		$('#divGroupUsers').hide();
	} else {
		$('#divGroupUsers').show(); 
	}
	isGoupOfUsers = !isGoupOfUsers;
}





