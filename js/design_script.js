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

var x = 50;
var y = 250;
var sq_len = 20;
var tile_color = createArray(5);
var tile_images = createArray(5);
var cur_color = 0;
var rows;
var cols;
var grid;
var img;

function setup() {
  let img = createImg("https://firebasestorage.googleapis.com/v0/b/navtiles-bccb4.appspot.com/o/default_floorpan.jpeg?alt=media&token=6c871212-b3da-4859-bbb9-14e4abcc2913");
  let canvas = createCanvas(600, 400);

  rows = Math.floor(height / sq_len);
  cols = Math.floor(width / sq_len);
  grid = createArray(cols, rows);
  tile_color[0] = color(235, 64, 52); // red
  tile_color[1] = color(255, 221, 28); // yellow
  tile_color[2] = color(142, 235, 49); // green
  tile_color[3] = color(4, 214, 200); // blue
  tile_color[4] = color(199, 135, 255); //violet

  tile_images[0] = createImg("https://firebasestorage.googleapis.com/v0/b/navtiles-bccb4.appspot.com/o/tile_previews%2Fbump_pattern.png?alt=media&token=f0e422c5-00ff-42e4-91df-455ff3924603");
  tile_images[0].id("bump");
  tile_images[0].position(x + width, y);
  tile_images[0].size(AUTO, height);
  //tile_images[0].hide();

  tile_images[1] = createImg("https://firebasestorage.googleapis.com/v0/b/navtiles-bccb4.appspot.com/o/tile_previews%2Fraised_bars.png?alt=media&token=bab2c4a7-729d-4403-b5d8-8cfb88f19ff0");
  tile_images[1].id("bars");
  tile_images[1].position(x + width, y);
  tile_images[1].size(AUTO, height);
  tile_images[1].hide();

  tile_images[2] = createImg("https://firebasestorage.googleapis.com/v0/b/navtiles-bccb4.appspot.com/o/tile_previews%2Fquestion_mark.png?alt=media&token=a8fa8b8f-4108-4d3f-87b2-557dae58d431");
  tile_images[2].id("question");
  tile_images[2].position(x + width, y);
  tile_images[2].size(AUTO, height);
  tile_images[2].hide();

  tile_images[3] = createImg("https://firebasestorage.googleapis.com/v0/b/navtiles-bccb4.appspot.com/o/tile_previews%2Farrow_1.png?alt=media&token=6ee9a627-a36e-467f-ae55-c4284c83f8f0");
  tile_images[3].id("arrow_1");
  tile_images[3].position(x + width, y);
  tile_images[3].size(AUTO, height);
  tile_images[3].hide();

  tile_images[4] = createImg("https://firebasestorage.googleapis.com/v0/b/navtiles-bccb4.appspot.com/o/tile_previews%2Farrow_2.png?alt=media&token=1f81b714-b5c5-4c39-b41a-f13ac2cdccd5");
  tile_images[4].id("arrow_2");
  tile_images[4].position(x + width, y);
  tile_images[4].size(AUTO, height);
  tile_images[4].hide();

  canvas.position(x,y);

  img.position(x,y);
  img.size(width,height);
}

function draw_grid() {
  for (let i = 0; i < rows; i++) {
    stroke(245);
    strokeWeight(1);
    line(0, (i + 1) * sq_len, width, (i + 1) * sq_len);
  }
  for (let i = 0; i < cols; i++) {
    stroke(245);
    strokeWeight(1);
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
  stroke(tile_color[cur_color]);
  noFill();
  rect(get_pos(mouseX), get_pos(mouseY), sq_len, sq_len);
}

function changeColor() {
  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  if (grid[row][col] == 0) {
    grid[row][col] = cur_color + 1;
  } else {
    grid[row][col] = 0;
  }
}

function mouseClicked(){changeColor()}

function mouseDragged(){changeColor()}

function keyPressed() {
  if (keyCode === LEFT_ARROW && sq_len > 2) {
    sq_len--;
    rows = Math.floor(height / sq_len);
    cols = Math.floor(width / sq_len);
    grid = createArray(cols, rows);
    clear();
  } else if (keyCode === RIGHT_ARROW) {
    sq_len++;
    rows = Math.floor(height / sq_len);
    cols = Math.floor(width / sq_len);
    grid = createArray(cols, rows);
    clear();
  }

  if (keyCode === UP_ARROW) {
    tile_images[cur_color].hide();
    cur_color++;
    cur_color %= 5;
    tile_images[cur_color].show();
  }

}

function draw() {
  draw_grid();
  draw_cursor();
  noFill();
  stroke(0);
  strokeWeight(5);
  rect(0,0,width, height);
}
