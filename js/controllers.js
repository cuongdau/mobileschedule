// JavaScript Document
// The root URL for the RESTful services
//'http://baotrithuc.net/cellar/save.php'
//var rootURL = "http://baotrithuc.net/mschedule/index.php";
var rootURL = "http://localhost/mschedule/index.php";

var activities = null;
var appData =null;

window.appPage=null;
window.appTasks=null;
var appUser;
var UserName='admin123';
var count=0;


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
	getGroupsByUser(JSON.parse(sessionStorage.getItem("user"))[0].id);
	if(JSON.parse(sessionStorage.getItem("groups")).length>0){
		window.location = 'createTask.html';
	}
}

function getGroupsByUser(id_user){
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

function mCircles() 
{
	getGroupsByUser(JSON.parse(sessionStorage.getItem("user"))[0].id);
	window.location='mCircle.html';
}


function loadPage()
{
	$('#loadPage').show();
}

function hidePage() {
	$('#loadPage').hide();
}

var isSearch = true;
function spanSearch(){
	if(!isSearch) {
		$('#divSearch').hide();
	} else {
		$('#divSearch').show(); 
	}
	isSearch = !isSearch;
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
