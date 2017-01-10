// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'starter.configs'])

.run(function($ionicPlatform, CONFIG) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);


    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    firebase.initializeApp({
      apiKey: "AIzaSyCfai0rxfwqgxVrUmYuX27x65lq-a0n0YQ",
      authDomain: "bankingapp-b7bbd.firebaseapp.com",
      databaseURL: "https://bankingapp-b7bbd.firebaseio.com",
      storageBucket: "bankingapp-b7bbd.appspot.com",
      messagingSenderId: "97111388540"

    });


  });
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
  function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider

      .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'appController'
    })

    .state('login', {
      url: '/login',
      templateUrl: "templates/login.html",
      controller: "loginController"
    })

    .state('signup', {
      url: '/signup',
      templateUrl: "templates/signup.html",
      controller: "signupController"
    })

    .state('reset', {
      url: '/reset',
      templateUrl: "templates/resetemail.html",
      controller: "resetController"
    })

    .state('intro', {
      url: '/intro',
      templateUrl: "templates/intro.html",
      controller: "introController"
    })

    .state('app.dashboard', {
        url: '/app/dashboard',
        views: {
          'menuContent': {
            templateUrl: "templates/dashboard.html",
            controller: "dashboardController"
          }
        }
      })
      .state('app.reclamation', {
        url: '/app/reclamation',
        views: {
          'menuContent': {
            templateUrl: "templates/reclamation.html",
            controller: "reclamationController"
          }
        }
      })
      .state('app.bankmap', {
        url: '/app/bankmap',
        views: {
          'menuContent': {
            templateUrl: "templates/bankmap.html",
            controller: "mapController"
          }
        }
      })

    $urlRouterProvider.otherwise('/login');

  }
])

.controller('loginController', ['$scope', '$firebaseArray', 'CONFIG',
  '$document', '$state',
  function($scope, $firebaseArray, CONFIG, $document, $state) {



    // Perform the login action when the user submits the login form
    $scope.doLogin = function(userLogin) {



      console.log(userLogin);

      if ($document[0].getElementById("user_name").value != "" &&
        $document[0].getElementById("user_pass").value != "") {


        firebase.auth().signInWithEmailAndPassword(userLogin.username,
          userLogin.password).then(function() {
          // Sign-In successful.
          //console.log("Login successful");



          var user = firebase.auth().currentUser;

          var name, email, photoUrl, uid;

          if (user.emailVerified) { //check for verification email confirmed by user from the inbox

            console.log("email verified");
            $state.go("app.dashboard");

            name = user.displayName;
            email = user.email;
            photoUrl = '../img/avatar.jpg';
            uid = user.uid;

            //console.log(name + "<>" + email + "<>" +  photoUrl + "<>" +  uid);

            localStorage.setItem("photo", photoUrl);

          } else {

            alert(
              "Email not verified, please check your inbox or spam messages"
            )
            return false;

          } // end check verification email


        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === 'auth/invalid-email') {
            alert('Enter a valid email.');
            return false;
          } else if (errorCode === 'auth/wrong-password') {
            alert('Incorrect password.');
            return false;
          } else if (errorCode === 'auth/argument-error') {
            alert('Password must be string.');
            return false;
          } else if (errorCode === 'auth/user-not-found') {
            alert('No such user found.');
            return false;
          } else if (errorCode === 'auth/too-many-requests') {
            alert(
              'Too many failed login attempts, please try after sometime.'
            );
            return false;
          } else if (errorCode === 'auth/network-request-failed') {
            alert('Request timed out, please try again.');
            return false;
          } else {
            alert(errorMessage);
            return false;
          }
        });



      } else {

        alert('Please enter email and password');
        return false;

      } //end check client username password


    }; // end $scope.doLogin()

  }
])

.controller('appController', ['$scope', '$firebaseArray', 'CONFIG', '$document',
  '$state',
  function($scope, $firebaseArray, CONFIG, $document, $state) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $document[0].getElementById("photo_user").src = localStorage.getItem(
          "photo");


      } else {
        // No user is signed in.
        $state.go("intro");
      }
    });


    $scope.doLogout = function() {
        firebase.auth().signOut().then(function() {
          $state.go("login");
        }, function(error) {
          console.log(error);
        });
      } // end dologout()


  }
])

.controller('resetController', ['$scope', '$state', '$document',
  '$firebaseArray', 'CONFIG',
  function($scope, $state, $document, $firebaseArray, CONFIG) {

    $scope.doResetemail = function(userReset) {



      //console.log(userReset);

      if ($document[0].getElementById("ruser_name").value != "") {


        firebase.auth().sendPasswordResetEmail(userReset.rusername).then(
          function() {
            // Sign-In successful.
            //console.log("Reset email sent successful");

            $state.go("login");


          },
          function(error) {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);


            if (errorCode === 'auth/user-not-found') {
              alert('No user found with provided email.');
              return false;
            } else if (errorCode === 'auth/invalid-email') {
              alert('Email you entered is not complete or invalid.');
              return false;
            }

          });



      } else {

        alert('Please enter registered email to send reset link');
        return false;

      } //end check client username password


    }; // end $scope.doSignup()



  }
])



.controller('signupController', ['$scope', '$state', '$document',
  '$firebaseArray', 'CONFIG',
  function($scope, $state, $document, $firebaseArray, CONFIG) {

    $scope.doSignup = function(userSignup) {



      //console.log(userSignup);

      if ($document[0].getElementById("cuser_name").value != "" &&
        $document[0].getElementById("cuser_pass").value != "") {


        firebase.auth().createUserWithEmailAndPassword(userSignup.cusername,
          userSignup.cpassword).then(function() {
          // Sign-In successful.
          //console.log("Signup successful");

          var user = firebase.auth().currentUser;

          user.sendEmailVerification().then(function(result) {
            console.log(result)
          }, function(error) {
            console.log(error)
          });

          user.updateProfile({
            displayName: userSignup.displayname,
            photoURL: userSignup.photoprofile
          }).then(function() {
            // Update successful.
            $state.go("login");
          }, function(error) {
            // An error happened.
            console.log(error);
          });



        }, function(error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);

          if (errorCode === 'auth/weak-password') {
            alert('Password is weak, choose a strong password.');
            return false;
          } else if (errorCode === 'auth/email-already-in-use') {
            alert('Email you entered is already in use.');
            return false;
          }



        });



      } else {

        alert('Please enter email and password');
        return false;

      } //end check client username password


    }; // end $scope.doSignup()



  }
])


.controller('dashboardController', ['$scope', '$firebaseArray', 'CONFIG',
    function($scope, $firebaseArray, CONFIG) {
      $scope.user = firebase.auth().currentUser;

      $scope.savetofirebase = function(a, b) {

        firebase.database().ref($scope.user.uid).set({
          name: a,
          message: b

        });
        alert(a);

      }

    }

  ])
  .controller('reclamationController', ['$scope', '$state', '$firebaseArray',
    'CONFIG',
    function($scope, $state, $firebaseArray, CONFIG) {
      $scope.user = firebase.auth().currentUser;

      $scope.savetofirebase = function(message) {

        firebase.database().ref($scope.user.uid).set({
          email: $scope.user.email,
          message: message

        });
        $state.go("intro");

      }

    }

  ])
  .controller('introController', ['$scope', '$firebaseArray', 'CONFIG',
    function($scope, $firebaseArray, CONFIG) {
      $scope.user = firebase.auth().currentUser;

    }

  ])


.controller('mapController', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {
    $scope.map = map;

    var locs = [
      ["51.38254", "-2.362804"],
      ["51.235249", "-2.297804"],
      ["51.086126", "-2.210767"]
    ]

    //var myLatLng = {lat: -25.363, lng: 131.044};
    for (i = 0; i < locs.length; i++) {

      var marker = "location" + i;
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locs[i][0], locs[i][1]),
        map: $scope.map,
        title: 'Hello World!'
      });
    };


  };

  $scope.centerOnMe = function() {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude,
        pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };
})



.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);


        $scope.onCreate({
          map: map
        });

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown',
          function(e) {
            e.preventDefault();
            return false;
          });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
