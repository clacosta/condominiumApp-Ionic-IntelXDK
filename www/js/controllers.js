angular.module('condominiumApp.controllers', [])

    .controller('AppCtrl', function ($scope, $rootScope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker, AuthFactory) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = $localStorage.getObject('userinfo', '{}');
        $scope.registration = {};
        $scope.loggedIn = false;

        if (AuthFactory.isAuthenticated()) {
            $scope.loggedIn = true;
            $scope.username = AuthFactory.getUsername();
        }

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);
            $localStorage.storeObject('userinfo', $scope.loginData);

            AuthFactory.login($scope.loginData);

            $scope.closeLogin();
        };

        $scope.logOut = function () {
            AuthFactory.logout();
            $scope.loggedIn = false;
            $scope.username = '';
        };

        $rootScope.$on('login:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.registerform = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeRegister = function () {
            $scope.registerform.hide();
        };

        // Open the login modal
        $scope.register = function () {
            $scope.registerform.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doRegister = function () {
            console.log('Doing registration', $scope.registration);
            $scope.loginData.username = $scope.registration.username;
            $scope.loginData.password = $scope.registration.password;

            AuthFactory.register($scope.registration);
            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeRegister();
            }, 1000);
        };

        $rootScope.$on('registration:Successful', function () {
            $scope.loggedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $localStorage.storeObject('userinfo', $scope.loginData);
        });

        $ionicPlatform.ready(function () {

        });
    })

    .controller('ResidentsController', ['$scope', 'residentsFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, residentsFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

        $scope.baseURL = baseURL;

        $scope.residents = residentsFactory.query();

    }])

    .controller('ResidentDetailController', ['$scope', '$state', '$stateParams', 'residentsFactory', 'baseURL', '$ionicModal', '$ionicPlatform', function ($scope, $state, $stateParams, residentsFactory, baseURL, $ionicModal, $ionicPlatform) {

        $scope.baseURL = baseURL;
        $scope.resident = {};
        $scope.showResident = false;
        $scope.message = "Loading ...";


        $scope.baseURL = baseURL;

        $scope.resident = residentsFactory.get({
            id: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.resident = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }])

    .controller('BuildingsController', ['$scope', 'buildingsFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, buildingsFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

        $scope.baseURL = baseURL;

        $scope.buildings = buildingsFactory.query();

    }])

    .controller('BuildingDetailController', ['$scope', '$state', '$stateParams', 'buildingsFactory', 'residentsFactory', 'baseURL', '$ionicModal', '$ionicPlatform', function ($scope, $state, $stateParams, buildingsFactory, residentsFactory, baseURL, $ionicModal, $ionicPlatform) {

        $scope.baseURL = baseURL;
        $scope.building = {};
        $scope.residentesBuilding = {};
        $scope.showBuilding = false;
        $scope.message = "Loading ...";

        $scope.baseURL = baseURL;

        $scope.building = buildingsFactory.get({
            id: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.building = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        $scope.residentesBuilding = residentsFactory.query({
            building: $stateParams.id
        })
            .$promise.then(
            function (response) {
                $scope.residentesBuilding = response;
                $scope.showResidentes = ($scope.residentesBuilding.length > 0);
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }])

    .controller('NoticeBoardsController', ['$scope', 'noticeboardsFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, noticeboardsFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

        $scope.noticeboards = noticeboardsFactory.query();

    }])

    .controller('LettersController', ['$scope', 'lettersFactory', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, lettersFactory, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

        $scope.letters = lettersFactory.query();

        //var ctrl = this;
        $scope.ctrl = {};

        $scope.ctrl.add = add;
        $scope.ctrl.data = [
            {
                name: "AiA",
                code: "AI101",
                limit: 25000,
                account: "Life Insurance"
            },
            {
                name: "Cargills",
                code: "CF001",
                limit: 30000,
                account: "Food City"
            }
        ]

        ////////
        function add(index) {
            window.alert("Added: " + index);
        }

    }])

    .controller('IndexController', ['$scope', 'residentsFactory', 'buildingsFactory', 'noticeboardsFactory', 'baseURL', function ($scope, residentsFactory, buildingsFactory, noticeboardsFactory, baseURL) {

        $scope.baseURL = baseURL;
        $scope.residentsCount = 0;
        $scope.buildingsCount = 0;

        $scope.residentsCount = residentsFactory.query({
        })
            .$promise.then(
            function (response) {
                $scope.residentsCount = response.length;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        $scope.buildingsCount = buildingsFactory.query({
        })
            .$promise.then(
            function (response) {
                $scope.buildingsCount = response.length;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        $scope.noticeboards = noticeboardsFactory.query({
            messageType: 0
        })
            .$promise.then(
            function (response) {
                $scope.noticeboards = response;
                $scope.showNoticeBoards = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

    }]);