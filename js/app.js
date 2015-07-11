
var songData;
var songLyrics;
var spotUrl = 'https://api.spotify.com/v1/search?type=track&query=';
var lyricUrl = 'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?song=';
var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {

    $scope.tracks = {};
    $scope.audioObject = {};

    //executes the spotify search
    $scope.getSongs = function() {
        $http.get(spotUrl + $scope.track).success(function(response){
            songData = $scope.tracks = response.tracks.items

        })
    }
    //end getSongs


    //when the user clicks on a row, a song is selected and passed to this function
    //the track starts to play
    //(if the user clicks another before the snippet ends, the previous one stops and the new one starts)
    //a hidden row slides down showing the album cover and the lyrics (if available)
    //(if lyrics aren't available? ...)
    //(when the user clicks another the previous row slides up and the new row slides down)
    $scope.play = function(song) {

        //handles snippet playing
        if($scope.currentSong == song) {
            $scope.audioObject.pause();
            $scope.currentSong = false;
            return;
        }
        else {
            if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
            $scope.audioObject = new Audio(song);
            $scope.audioObject.play();
            $scope.currentSong = song
        }



        //handles the request for lyrics given the clicked artist and song name
        //getLyrics
        //
        //function calls a second http get upon click to get the lyrics if available
        //this is called in play() upon user selection of a particular song from a particular album
        $scope.getLyrics = function(songName, artistName) {
            songData.artists[0].name = artistName;
            songData.track.name = songName;
            $http.get(lyricUrl + songName + '&artist=' + artistName)
                .success(function(dat) {
                    songLyrics = dat.Lyric;
                })
        }; //ends getLyrics

    }; //end play function

}); //ends myCtrl

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});