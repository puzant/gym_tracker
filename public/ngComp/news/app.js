var app = angular.module('app');

app.controller('ctrl', function($scope, $http, news) {
    $scope.hello = 'hello there';
    $scope.news = news.func();
})

app.service('news', function($http, $rootScope) {
    this.func = function() {
        $http.get('https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=7aad33fa6af842568da28dab8a2befde').then(function(res) {
            console.log(res.data);
            console.log('this is working');
            $rootScope.img = res.data.articles[0].urlToImage;
            $rootScope.title = res.data.articles[0].title;
            $rootScope.description = res.data.articles[0].description;
            $rootScope.url = res.data.articles[0].url;
        })
    }
})

