(function(){
  'use strict';
  var module = angular.module('myApp', ['onsen']);

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
  })

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('detail.html', {title : selectedItem.title});
    }
  });

  module.factory('$data', function() {
      var data = {};
      
      data.items = [
          { 
              title: 'Item 1 Title',
              icon: 'comments-o',
              description: 'Item 1 Description'
          },
          { 
              title: 'Another Item Title',
              icon: 'desktop',
              description: 'Item 2 Description'
          },
          { 
              title: 'Yet Anoter Item Title',
              icon: 'heart-o',
              description: 'Item 3 Description'
          }
      ]; 
      
      return data;
  });
})();

$('#divSearch').ready(function(){
	
	$("#filter").keyup(function(){

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;
		// Loop through the comment list
		$(".commentlist li").each(function(){

			// If the list item does not contain the text phrase fade it out
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();

			// Show the list item if the phrase matches and increase the count by 1
			} else {
				$(this).show();
				count++;
			}
		});

		// Update the count
		var numberItems = count;
		$("#filter-count").text(count+ " results");
	});
});
// search user---------------
$('#divSearch').ready(function(){
	
	$("#filter").keyup(function(){

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;
		// Loop through the comment list
		$(".commentlist li").each(function(){

			// If the list item does not contain the text phrase fade it out
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();

			// Show the list item if the phrase matches and increase the count by 1
			} else {
				$(this).show();
				count++;
			}
		});

		// Update the count
		var numberItems = count;
		$("#filter-count").text(count+ " results");
	});
});