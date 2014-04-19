var canvas;
var ctx;
var mouseX;
var mouseY;
var isBlush = false;
var socket;
var timer;

window.onload = function(){

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

  socket.on('connect', function(){
    console.log('connected!');
  });

};

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
