angular.module('starter.services', [])

.factory('Categories', function( $http) {
  var categories = [
    {'slug':'press-release', 'name':'Press Release','subscribe':true},
    {'slug':'technology', 'name':'Technology', 'subscribe':true},
    {'slug':'mobile', 'name':'Mobile', 'subscribe':true},
    {'slug':'view', 'name':'Views', 'subscribe':true},
    {'slug':'b2b', 'name':'B2B', 'subscribe':true},
    {'slug':'statements', 'name':'Statements', 'subscribe':true},
    {'slug':'camera-computing', 'name':'Camera & Computing', 'subscribe':true},
    {'slug':'home-appliances', 'name':'Home Appliances', 'subscribe':true},
    {'slug':'design', 'name':'Design', 'subscribe':true},
    {'slug':'infographics', 'name':'Infographics', 'subscribe':true},
    {'slug':'citizenship', 'name':'Citizenship', 'subscribe':true},
    {'slug':'semiconductors', 'name':'Semiconductors', 'subscribe':true},
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
  var news = [];
  
  var myService = {
    async: function(newsParams) {
      // http://news.samsung.com/global/wp-admin/admin-ajax.php
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
          console.log(response);
          news = response.data.content.list;
          return response.data.content.list;
        });
      
      // Return the promise to the controller
      return promise;
    }
  };
  
  return {
    all: function() {
      return  myService;
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
       return  myService;
    }
  };
});
