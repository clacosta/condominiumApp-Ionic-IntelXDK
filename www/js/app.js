// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('condominiumApp', ['ionic', 'ngCordova', 'condominiumApp.controllers', 'condominiumApp.services'])

  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      $timeout(function () {
        $cordovaSplashscreen.hide();
      }, 2000);
    });

    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading ...'
      })
    });

    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
      console.log('Loading ...');
      $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log('done');
      $rootScope.$broadcast('loading:hide');
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/sidebar.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'mainContent': {
            templateUrl: 'templates/home.html',
            controller: 'IndexController'
          }
        }
      })

      .state('app.residents', {
        url: '/residents',
        views: {
          'mainContent': {
            templateUrl: 'templates/residents.html',
            controller: 'ResidentsController'
          }
        }
      })

      .state('app.residentdetails', {
        url: '/residents/:id',
        cache: false,
        views: {
          'mainContent': {
            templateUrl: 'templates/residentdetail.html',
            controller: 'ResidentDetailController'
          }
        }
      })

      .state('app.buildings', {
        url: '/buildings',
        views: {
          'mainContent': {
            templateUrl: 'templates/buildings.html',
            controller: 'BuildingsController'
          }
        }
      })

      .state('app.buildingdetails', {
        url: '/buildings/:id',
        cache: false,
        views: {
          'mainContent': {
            templateUrl: 'templates/buildingdetails.html',
            controller: 'BuildingDetailController'
          }
        }
      })

      .state('app.noticeboards', {
        url: '/noticeboards',
        views: {
          'mainContent': {
            templateUrl: 'templates/noticeboards.html',
            controller: 'NoticeBoardsController'
          }
        }
      })

      .state('app.letters', {
        url: '/letters',
        views: {
          'mainContent': {
            templateUrl: 'templates/letters.html',
            controller: 'LettersController'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
