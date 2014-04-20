var canvas;
var ctx;
var mouseX;
var mouseY;
var isBlush = false;
var socket;
var timer;
var x = 0;
var y = 0;

var timerWindowResize = false;

$(window).resize(function(){
  if(timerWindowResize !== false){
    clearTimeout(timerWindowResize);
  }

  timerWindowResize = setTimeout(function(){
    expandCanvas();
  }, 200);
});

$(function(){

  setTimeout(function(){
    scrollTo(0, 1);
  }, 100);

  FastClick.attach(document.body);

  socket = io.connect(window.location.hostname);
  
  canvas = document.getElementById("canvas");
  expandCanvas();  
  ctx = canvas.getContext('2d');

  timer = setInterval(draw, 20);

  document.addEventListener("mousemove", function(event){
    mouseX = event.pageX;
    mouseY = event.pageY;
    if(isBlush){
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();

      var ratioX = mouseX / canvas.width;
      var ratioY = mouseY / canvas.height;

      var position = { "ratioX": ratioX, "ratioY": ratioY };
      socket.json.emit('message', position);
    }
    x = mouseX;
    y = mouseY;  
  
  });
  
  document.addEventListener("mousedown", function(){
    isBlush = true;
  });
  
  document.addEventListener("mouseup", function(){
    isBlush = false;
  });

  document.addEventListener("touchmove", function(event){
    event.preventDefault();
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
    if(isBlush){
      ctx.strokeStyle = "#eee";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();

      var ratioX = mouseX / canvas.width;
      var ratioY = mouseY / canvas.height;

      var position = { "ratioX": ratioX, "ratioY": ratioY };
      socket.json.emit('message', position);
    }
    x = mouseX;
    y = mouseY; 
  
  }, false);
  
  document.addEventListener("touchstart", function(){
    event.preventDefault();
    isBlush = true;
  }, false);
  
  document.addEventListener("touchend", function(){
    event.preventDefault();
    isBlush = false;
  }, false);
 
  socket.on('connect', function(){
    console.log('connected!');
  });

});

function draw(){
  //キャンバスを初期化
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}

function expandCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
