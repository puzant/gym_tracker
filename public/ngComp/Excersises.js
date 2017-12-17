var app = angular.module("app");

app.controller("myCtrl", function ($scope, $http) {
    // get data from the database
    $http.get('http://localhost:7000/api/workout').then(function (res) {
        console.log(res.data); //the api object
        $scope.workouts = res.data;
    })
    
    $scope.add = function () { //on click on the add button
        //post the database and retrive infromation using GET
        var newWorkout = {
            ExcersiseName: $scope.d1,
            NoReps: $scope.d2,
            weight: $scope.d3
        }
        
        $http.post('http://localhost:7000/api/workout', newWorkout).then(function (res) {
            $http.get('http://localhost:7000/api/workout').then(function (res) {
                $scope.workouts = res.data;
            })
        })
        
        $scope.d1 = null;
        $scope.d2 = null;
        $scope.d3 = null;
        
     }
    


    //DELETE request: send from angular to Node and remove the element from the DB
    $scope.delete = function (x) {
        //  alert("helo there");
        $http.delete('http://localhost:7000/api/workout/' + x).then(function (res) { //do the delete request
            $http.get('http://localhost:7000/api/workout').then(function (res) { //display the new elemtns
                $scope.workouts = res.data;
            })
        })
    }

    // HTTP PUT request to
    $scope.Update = function (id, u1,u2,u3) {
        var newWorkout = {
            ExcersiseName: u1,
            NoReps: u2,
            weight: u3
        }
        console.log(newWorkout);
        $http.put('http://localhost:7000/api/workout/'+id, newWorkout).then(function (res) {
            $http.get('http://localhost:7000/api/workout').then(function (res) {
                $scope.workouts = res.data;
            })
        })
    }


})

