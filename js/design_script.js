// design_script.js
// modified from https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
function createArray(rows, cols) {
  var x = new Array(rows);

  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(cols);
    for (var j = 0; j < x[i].length; j++) {
      x[i][j] = 0;
    }
  }
  return x;
}

//

var sq_len = 20;
var tile_color = createArray(5);
var cur_color = 0;
var rows;
var cols;
var grid;
let img;
// function preload() {
//   img = loadImage('default_floorplan.jpeg');
// }

function setup() {
  createCanvas(400, 400);
  var rows = Math.floor(height / sq_len);
  var cols = Math.floor(width / sq_len);
  var grid = createArray(cols, rows);
  tile_color[0] = color(235, 64, 52); // red
  tile_color[1] = color(255, 221, 28); // yellow
  tile_color[2] = color(142, 235, 49); // green
  tile_color[3] = color(4, 214, 200); // blue
  tile_color[4] = color(199, 135, 255); //violet
}

function draw_grid() {
  for (let i = 0; i < rows; i++) {
    stroke(245);
    line(0, (i + 1) * sq_len, width, (i + 1) * sq_len);
  }
  for (let i = 0; i < cols; i++) {
    stroke(245);
    line((i + 1) * sq_len, 0, (i + 1) * sq_len, height);
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[c][r] != 0) {
        fill(tile_color[grid[c][r] - 1]);
        rect(c * sq_len, r * sq_len, sq_len, sq_len);
      }
    }
  }
}

function get_pos(a) {
  return Math.floor(a / sq_len) * sq_len;
}

function draw_cursor() {
  fill(tile_color[cur_color]);
  noStroke();
  rect(get_pos(mouseX), get_pos(mouseY), sq_len, sq_len);
}

function mouseClicked() {
  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  if (grid[row][col] == 0) {
    grid[row][col] = cur_color + 1;
  } else {
    grid[row][col] = 0;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && sq_len > 2) {
    sq_len--;
    rows = Math.floor(height / sq_len);
    cols = Math.floor(width / sq_len);
    grid = createArray(cols, rows);
  } else if (keyCode === RIGHT_ARROW) {
    sq_len++;
    rows = Math.floor(height / sq_len);
    cols = Math.floor(width / sq_len);
    grid = createArray(cols, rows);
  }

  if (keyCode === UP_ARROW) {
    cur_color++;
    cur_color %= 5;
  }

}

function draw() {
  background(255);
  draw_grid();
  draw_cursor();
}
