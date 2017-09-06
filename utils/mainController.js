app.controller('MainController', ['$state', '$scope', '$mdDialog', '$timeout', '$state', '$mdSidenav', 'locationService', '$rootScope',
	'progressService', '$http', 'AUTH_EVENTS',
	function($state, $scope, $mdDialog, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, $http, AUTH_EVENTS) {
		var showLoginDialog = function(ev) {
			$mdDialog.show({
				controller: 'LoginCtrl',
				templateUrl: 'auth/login.html',
				parent: angular.element(document.body),
				targetEvent: ev
			});
		};

		var setCurrentUser = function() {
			$scope.currentUser = $rootScope.currentUser;
			$state.go('home');
			$mdDialog.hide();
		};
		// initial start

		$state.go('home');

		//showLoginDialog()

		$scope.logout = function() {
			firebase.auth().signOut().then(function() {
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			}).catch(function(error) {
				// TBD
			});
		};

		$scope.toggleLeft = buildToggler('left');

		function buildToggler(componentId) {

			return function() {
				locationService.oLocation = {};
				$mdSidenav(componentId).toggle();
			};
		}

		$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
		$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);

		// for progress bar
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams) {
				progressService.getProgressAtState(fromState);
			});
	}
]);

app.controller('HomeHelp', ['$scope', '$mdDialog', '$timeout', '$state', '$mdSidenav', 'locationService', '$rootScope', 'progressService',
	'historyService', '$http', 'AUTH_EVENTS',
	function($scope, $mdDialog, $timeout, $state, $mdSidenav, locationService, $rootScope, progressService, historyService, $http,
		AUTH_EVENTS) {
	}
]);