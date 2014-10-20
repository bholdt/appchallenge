app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('welcome', {
      url: "/welcome",
      templateUrl: "components/welcome/welcome.html"
    })
    .state('list', {
      url: '/',
      templateUrl: 'components/list/list.html'
    })
    .state('details', {
      url: '/details',
      templateUrl: 'components/details/details.html'
    })
    .state('edit', {
      url: '/edit',
      templateUrl: 'components/edit/edit.html'
    })
    .state('play', {
      url: '/play',
      templateUrl: 'components/play/play.html'
    })
    .state('finish', {
      url: '/finish',
      templateUrl: 'components/finish/finish.html'
    })
    .state('clue', {
      url: '/clue',
      templateUrl: 'components/clue/clue.html'
    })
    ;

  $urlRouterProvider.otherwise('/welcome');

});
