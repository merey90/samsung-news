angular.module('starter.controllers', [])

.controller('CategoriesCtrl', function($scope, Categories) {
  $scope.categories = Categories.all();
})

.controller('NewslettersCtrl', function($scope, Newsletters) {
  
  var newsParams = {'paged':'1', 'orderby': 'date', 'action': 'post_lists', 'posttype': 'post', 'postperpage': '30', 'from': 'main'};
  Newsletters.all().async(newsParams).then(function(d) {
    $scope.newsletters = d;
  });
})

.controller('NewsletterBycatCtrl', function($scope, $stateParams, Newsletters) {
  // $scope.newsletters = Newsletters.bycat($stateParams.category);
  var newsParams = {'paged':'1', 'orderby': 'date', 'action': 'post_lists', 'posttype': 'post', 'postperpage': '30', 'from': 'main', 'category':$stateParams.category};
  Newsletters.all().async(newsParams).then(function(d) {
    $scope.newsletters = d;
  });
})

.controller('NewsletterCtrl', function($scope, $stateParams, Newsletters) {
  $scope.newsletter = Newsletters.get($stateParams.newsletterId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableNotify: true,
    enableCountry: true
  };
});
