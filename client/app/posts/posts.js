angular.module('hackoverflow.posts', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('PostsController', function ($scope, $stateParams, $state, Posts, Comments, TimeService, ForumService) {
  $scope.posts = [];
  $scope.forums = [];
  $scope.numberOfComments = {};
  $scope.forum = ForumService.currentForum.model.forum;
  $scope.TimeService = TimeService;

  $scope.getPosts = function getPosts(forum) {
    Posts.getPosts('').then(function (data) {
      $scope.posts = data.data;

      for (var i = 0; i < $scope.posts.length; i++) {
        $scope.posts[i].numberOfComments = $scope.getNumberOfComments($scope.posts[i]._id);
      }
    });
  };

  $scope.getForums = function getForums(forum) {
    Posts.getForums().then(function (data) {
      $scope.forums = data.data.sort();
    });
  };

  $scope.switchForum = function switchForum(forum) {
    $scope.forum = forum;
    ForumService.currentForum.model.forum = forum;
    $scope.getForums();
  };

  $scope.getNumberOfComments = function getNumberOfComments(postId) {
    Comments.getNumberOfComments(postId).then(function (data) {
      $scope.numberOfComments[postId] = data.data;
    });
  };

  $scope.getPosts($scope.forum);
  $scope.getForums();
});
