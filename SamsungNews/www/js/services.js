angular.module('starter.services', [])

.factory('Categories', function( $http) {
  var categories = [
    {'slug':'press-release', 'name':'Press Release','subscribe':true},
    {'slug':'technology', 'name':'Technology', 'subscribe':true},
    {'slug':'tv-audio', 'name':'TV & Audio', 'subscribe':true},
    {'slug':'corporateothers', 'name':'Corporate Others', 'subscribe':true}
  ];
  return {
    all: function() {
      return categories;
    },
    subscribe: function(category) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].title === category) {
          categories[i].subscribe = true;
          return categories[i];
        }
      }
    },
    unsubscribe: function(category) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].title === category) {
          categories[i].subscribe = false;
          return categories[i];
        }
      }
    },
    get: function(category) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].title === category) {
          return categories[i];
        }
      }
      return null;
    }
  };
})
.factory('Newsletters', function($http) {
  var newsParams = {'paged':'1', 'orderby': 'date', 'action': 'post_lists', 'posttype': 'post', 'postperpage': '10', 'from': 'main'};
  var news = [];
  
  
  var myService = {
    async: function() {
      
        // $http returns a promise, which has a then function, which also returns a promise
        var promise = $http({
          method:"POST",
          url:"http://news.samsung.com/global/wp-admin/admin-ajax.php",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: newsParams    
        }).then(function (response) {
          // The return value gets picked up by the then in the controller.
          news = response.data.content.list;
          return response.data.content.list;
        });
      
      // Return the promise to the controller
      return promise;
    }
  };
  
  return {
    all: function() {
      return myService;
    },
    get: function(newsletterId) {
      console.log(news+" "+newsletterId);
      for (var i = 0; i < news.length; i++) {
        if (news[i].post_info.ID === parseInt(newsletterId)) {
          return news[i];
        }
      }
      return null;
    },
    bycat: function(category){
      var bycat = [];
      for (var i = 0; i < news.length; i++) {
        if (news[i].category_info.slug === category) {
          bycat.push(news[i]);
        }
      }
      return bycat;
    }
  };
});
