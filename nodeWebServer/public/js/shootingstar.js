var canvas;
var ctx;
var mouseX;
var mouseY;
var isBlush = false;
var socket;

window.onload = function(){

  socket = io.connect(window.location.hostname);
  
  canvas = document.getElementById("canvas");
  expandCanvas();  
  ctx = canvas.getContext('2d');

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

      var position = { "x": mouseX, "y": mouseY };
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

  socket.on('connect', function(){
    console.log('connected!');
  });


};

function expandCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}
