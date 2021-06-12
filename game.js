//initial variables

var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];

var firstclick = true;
var level = 0;


//playing all sounds

function playsound(name){
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}


//animation when clicked

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout( function(){ $("#"+currentColor).removeClass("pressed")}, 100);
}


//next game Pattern

function nextSequence(){
 level++;
 $("#level-title").text("Level "+level);

 var randomNumber = Math.floor(Math.random()*4);
 var randomChosenColor = buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);
 $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
 playsound(randomChosenColor);

}


//when user clicks

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


//first key-press event

$(document).on("keydown", function(){
  if(firstclick == true){
      $("#level-title").text("Level "+level);
       nextSequence();
       firstclick = false; }
});


//game restart

function startover() {
    firstclick = true;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


//checking and matching the patterns

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
  {
    if(currentLevel+1 == gamePattern.length)
    { userClickedPattern =[];
      setTimeout(function(){nextSequence();}, 1000);
    }
  }
  else{
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout( function(){$("body").removeClass("game-over")}, 500);
    $("#level-title").text("Game-Over! Press any key to Restart");
    startover();
  }
}
