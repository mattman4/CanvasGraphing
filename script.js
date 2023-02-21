// SETTINGS //////
const width = 750;
const height = 750;
const midW = width/2;
const midH = height/2;
const max = 100;
const min = -100;
var scaleX = 10;
var scaleY = 10;
var precision = 0.1;
//////////////////
var expression = "x";
///////////////////
var exp = document.getElementById("expression");
var eqnButton = document.getElementById("eqnBut");
var yi = document.getElementById("yi"); //y-intercept
var gt = document.getElementById("gt"); //graph type
var errTxt = document.getElementById("err"); //error text

window.onload = () => {
  exp.value = expression;
  plot(expression);
}

function plot(e) {
  var canvas = document.getElementById("c");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  
  // expression without y=
  expression = e;
  if(expression == "0/0") {
    expression = "x"
    errTxt.innerHTML = "<i>What have you done...</i>"
    drawSecret();
    return;
  }
  var yintercept = "Error";
  console.log("Creating canvas")

  createCoordAxis(ctx);

  var coords = [];
  for(i = min; i<=max; i+=precision) {
    var y = expression.replaceAll("x", "(" + i + ")")
    if(y=="") {
      throwErr();
      break;
    }
    try {
      var y = math.evaluate(y);
      errTxt.innerHTML = "";
    } catch (e) {
      throwErr();
    }

    yintercept = math.evaluate(expression.replaceAll("x", "(0)"));
    coords.push([i,y]);
  }

  coords.forEach((c,i) => {
    if(i == 0) return;
    var beforeCoords = convertCoords(coords[i-1][0],coords[i-1][1]); 
    var currCoords = convertCoords(coords[i][0],coords[i][1]); 

    ctx.beginPath();
    ctx.moveTo(beforeCoords[0], beforeCoords[1]);
    ctx.lineTo(currCoords[0], currCoords[1]);
    ctx.stroke();

    if(expression.includes("x^3") || expression.includes("x*x*x")) {
      graphtype = "Cubic";
    } else if(expression.includes("x^2") || expression.includes("x*x")) {
      graphtype = "Quadratic";
    } else if(expression.includes("x")) {
      graphtype = "Linear/Other";
    } else {
      graphtype = "Y Line";
    }
    
    yi.innerHTML = "Y Intercept = " + yintercept;
    gt.innerHTML = "Graph Type = " + graphtype;
  })
}

function createCoordAxis(ctx) {
  // create axis X
  ctx.beginPath();
  ctx.moveTo(0, midH);
  ctx.lineTo(width, midH);
  ctx.stroke()
  // create axis Y
  ctx.beginPath();
  ctx.moveTo(midW, 0);
  ctx.lineTo(midW, height);
  ctx.stroke(); 
}

function convertCoords(x,y) {
  x *= scaleX;
  y *= scaleY;
  if(x < 0) {
    x = (midW - Math.abs(x));
  } else {
    x = (midW + Math.abs(x));
  }
  if(y < 0) {
    y = (midH + Math.abs(y));
  } else {
    y = (midH - Math.abs(y));
  }
  return [x,y];
}

function updateGraph() {
  expression = exp.value;
  plot(expression);
}

eqnBut.addEventListener("keyup", (e) => {
  e.preventDefault();
  if(e.keyCode == 13) { // enter key
    eqnBut.click();
  }
})

function throwErr() {
  errTxt.innerHTML = "Error parsing equation";
}

function drawSecret() {
  var canvas = document.getElementById("c");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(100,200);
  ctx.lineTo(100,300);
  ctx.lineTo(200,300);
  ctx.lineTo(200,400);
  ctx.lineTo(100,400);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(300,200);
  ctx.lineTo(300,400);
  ctx.lineTo(400,400);
  ctx.lineTo(400,200);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(600,200);
  ctx.lineTo(500,200);
  ctx.lineTo(500,300);
  ctx.lineTo(600,300);
  ctx.lineTo(600,400);
  ctx.lineTo(500,400);
  ctx.stroke();
  setTimeout(() => {
    reset()
  }, 1500)
}

function reset() {
  expression = "x";
  exp.value = "x";
  plot(expression);
}

/*
var xscaleslider = document.getElementById("xscales");
var xscalelab = document.getElementById("xscalelab");
xscaleslider.oninput = () => {
  xscalelab.innerHTML = "X Scale [" + xscaleslider.value + "]";
  scaleX = xscaleslider.value;
  plot(expression);
}

var yscaleslider = document.getElementById("yscales");
var yscalelab = document.getElementById("yscalelab");
yscaleslider.oninput = () => {
  yscalelab.innerHTML = "Y Scale [" + yscaleslider.value + "]";
  scaleY = yscaleslider.value;
  plot(expression);
}
*/