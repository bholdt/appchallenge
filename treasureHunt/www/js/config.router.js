app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('welcome', {
      url: "/welcome",
      templateUrl: "components/welcome/welcome.html"
    })
    .state('list', {
      url: '/',
      templateUrl: 'components/list/list.html',
      controller: 'ListController'
    })
    .state('details', {
      url: '/details',
      templateUrl: 'components/details/details.html',
      controller: 'DetailsController'
    })
    .state('edit', {
      url: '/details',
      templateUrl: 'components/details/details.html',
      controller: 'DetailsController'
    })
    .state('play', {
      url: '/play',
      templateUrl: 'components/play/play.html',
      controller: 'PlayController'
    })
    .state('finish', {
      url: '/finish',
      templateUrl: 'components/finish/finish.html'
    })
    .state('create-clue', {
      url: '/clue',
      templateUrl: 'components/clue/clue.html',
      controller: 'ClueController'
    })
    .state('edit-clue', {
      url: '/clue/:id',
      templateUrl: 'components/clue/clue.html',
      controller: 'ClueController'
    })
    ;

  $urlRouterProvider.otherwise('/');

});
