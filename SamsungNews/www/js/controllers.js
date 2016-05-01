angular.module('starter.controllers', [])

.controller('CategoriesCtrl', function($scope, Categories) {
  $scope.categories = Categories.all();
})

.controller('NewslettersCtrl', function($scope, Newsletters) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  Newsletters.all().async().then(function(d) {
    $scope.newsletters = d;
  });
  
  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('NewsletterBycatCtrl', function($scope, $stateParams, Newsletters) {
  $scope.newsletters = Newsletters.bycat($stateParams.category);
})

.controller('NewsletterCtrl', function($scope, $stateParams, Newsletters) {
  $scope.newsletter = Newsletters.get($stateParams.newsletterId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableNotify: true
  };
});
