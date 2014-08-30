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
///------------- action call My Tasks ---------
$('#divMyTasks').click(function() {
	var postData = 'IdUser='+JSON.parse(sessionStorage.getItem("user"))[0].id;
	console.log(postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: rootURL+'/ctasks/GetTasksByUser',
		success: function(data){
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
		}
	});
	return false;
});

function taskDetail(id) 
{
	var postData = 'IdTask='+id;//JSON.parse(sessionStorage.getItem('tasks'))[id].id;
	console.log(postData);
	$.ajax({
		type: 'POST',
		data: postData,
		url: rootURL+'/ctasks/GetTaskById',
		success: function(data){
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
		success: function(data)
		{
			console.log(data);
			appData=JSON.parse(data);
			sessionStorage.setItem("groups",JSON.stringify(appData.groups));
			alert(appData.counts[0].count+appData.counts[1].count);
			if(callback) {
				callback();
			}
		},
		error: function(data)
		{
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
		success: function(data)
		{
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
			alert('khong them duoc vao csdl 2...');
			location.reload();
		}
	});
	return false;
});
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
			success: function(data)
			{
				console.log(data);
				appData=JSON.parse(data);
				sessionStorage.setItem("searchUsers",JSON.stringify(appData.users));
				window.location = 'mCircle.html'; // goi den trang tim kiem
				
			},
			error: function(data)
			{
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
			success: function(data)
			{
				console.log(data);
				appData=JSON.parse(data);
				alert(appData.message +'cuong mai dang o day');
				//sessionStorage.setItem("searchUsers",JSON.stringify(appData.users));
				//window.location = 'mCircle.html'; // goi den trang tim kiem
				sessionStorage.removeItem("user_name");
				
			},
			error: function(data)
			{
				sessionStorage.removeItem("user_name");
				alert('khong dua len server de lay groupsByUser duoc..');
				location.reload();
			}
		});
		return false;	
	}
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








$(".form_post_comment").each(function() {
	alert("dang hoat dong");
	var form = $(this);
	form.submit(function(event) {
	event.preventDefault();
	var id = "44";
	$.ajax({
	type: "POST",
	url: "http://localhost/Ecowebjob/index.php/ccomment/add_comment/",
	data: $(this).serialize(),
	success: function (response) {
		alert("thanh cong ...");
	//$("#commentList" + id).append(response);
	
	},
	error: function(xhr, textStatus, errorThrown) {
	alert("that bai...");
	}
	});
	});
	
});

$('').click(function() {
});

$('#btnSave').click(function() {
	if ($('#wineId').val() == '')
		addWine();
	else
		updateWine();
	return false;
});

$('#btnDelete').click(function() {
	deleteWine();
	return false;
});

$('#wineList a').live('click', function() {
	findById($(this).data('identity'));
});

// Replace broken images with generic wine bottle
$("img").error(function(){
  $(this).attr("src", "pics/generic.jpg");

});

function search(searchKey) {
	if (searchKey == '') 
		findAll();
	else
		findByName(searchKey);
}

function newWine() {
	$('#btnDelete').hide();
	currentWine = {};
	renderDetails(currentWine); // Display empty form
}

function findAll() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderList
	});
}

function findByName(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
}

function findById(id) {
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.name);
			currentWine = data;
			renderDetails(currentWine);
		}
	});
}

function addWine() {
	console.log('addWine');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Wine created successfully');
			$('#btnDelete').show();
			$('#wineId').val(data.id);
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addWine error: that ko ba con ' + textStatus);
		}
	});
}

function updateWine() {
	console.log('updateWine');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#wineId').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Wine updated successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateWine error: ' + textStatus);
		}
	});
}

function deleteWine() {
	console.log('deleteWine');
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + $('#wineId').val(),
		success: function(data, textStatus, jqXHR){
			alert('Wine deleted successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteWine error');
		}
	});
}

function renderList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data.wine instanceof Array ? data.wine : [data.wine]);

	$('#wineList li').remove();
	$.each(list, function(index, wine) {
		$('#wineList').append('<li><a href="#" data-identity="' + wine.id + '">'+wine.name+'</a></li>');
	});
}

function renderDetails(wine) {
	$('#wineId').val(wine.id);
	$('#name').val(wine.name);
	$('#grapes').val(wine.grapes);
	$('#country').val(wine.country);
	$('#region').val(wine.region);
	$('#year').val(wine.year);
	$('#pic').attr('src', 'pics/' + wine.picture);
	$('#description').val(wine.description);
}

// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
	return JSON.stringify({
		"id": $('#wineId').val(), 
		"name": $('#name').val(), 
		"grapes": $('#grapes').val(),
		"country": $('#country').val(),
		"region": $('#region').val(),
		"year": $('#year').val(),
		"picture": currentWine.picture,
		"description": $('#description').val()
		});
}
