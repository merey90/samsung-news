angular.module('starter.services', [])

.factory('Chats', function( $http) {
  // console.log('ApiEndpoint', ApiEndpoint);
  // Might use a resource here that returns a JSON array
  var newsParams = {'paged':'1', 'orderby': 'date', 'action': 'post_lists', 'posttype': 'post', 'postperpage': '10', 'from': 'main'};
  var news = {};
  
  $http({
    method:"POST",
    url:"http://samsung-news-merey90.c9users.io/admin-ajax.php",
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
  transformRequest: function(obj) {
      var str = [];
      for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
  },
  data: newsParams    
  }).success(function(data){
    news = data;
    if(news.code==00){
      console.log(news.message);
    }
      
  });

  
    
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
// .constant('ApiEndpoint', {
//   url: 'http://samsung-news-merey90.c9users.io/admin-ajax.php'
// })
