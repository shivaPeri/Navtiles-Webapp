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

var x = 100;
var y = 200;
var sq_len = 20;
var tile_color = createArray(5);
var tile_images = createArray(5);
var p_height = 50;
var tile_previews = createArray(5);
var cur_color = 0;
var rows;
var cols;
var grid;
var img;

function setup() {
  let img = createImg("./images/default_floorpan.jpeg");
  let canvas = createCanvas(600, 400);

  rows = Math.floor(height / sq_len);
  cols = Math.floor(width / sq_len);
  grid = createArray(cols, rows);
  tile_color[0] = color(235, 64, 52); // red
  tile_color[1] = color(255, 221, 28); // yellow
  tile_color[2] = color(142, 235, 49); // green
  tile_color[3] = color(4, 214, 200); // blue
  tile_color[4] = color(199, 135, 255); //violet

  tile_images[0] = createImg("./images/bump_pattern.png");
  tile_images[0].id("bump");
  tile_images[0].position(x + width, y);
  tile_images[0].size(AUTO, height);
  //tile_images[0].hide();
  tile_previews[0] = createImg("./images/bump_pattern.png");
  tile_previews[0].size(AUTO, p_height);
  tile_previews[0].hide();

  tile_images[1] = createImg("./images/raised_bars.png");
  tile_images[1].id("bars");
  tile_images[1].position(x + width, y);
  tile_images[1].size(AUTO, height);
  tile_images[1].hide();
  tile_previews[1] = createImg("./images/raised_bars.png");
  tile_previews[1].size(AUTO, p_height);
  tile_previews[1].hide();

  tile_images[2] = createImg("./images/question_mark.png");
  tile_images[2].id("question");
  tile_images[2].position(x + width, y);
  tile_images[2].size(AUTO, height);
  tile_images[2].hide();
  tile_previews[2] = createImg("./images/question_mark.png");
  tile_previews[2].size(AUTO, p_height);
  tile_previews[2].hide();

  tile_images[3] = createImg("./images/arrow_1.png");
  tile_images[3].id("arrow_1");
  tile_images[3].position(x + width, y);
  tile_images[3].size(AUTO, height);
  tile_images[3].hide();
  tile_previews[3] = createImg("./images/arrow_1.png");
  tile_previews[3].size(AUTO, p_height);
  tile_previews[3].hide();

  tile_images[4] = createImg("./images/arrow_2.png");
  tile_images[4].id("arrow_2");
  tile_images[4].position(x + width, y);
  tile_images[4].size(AUTO, height);
  tile_images[4].hide();
  tile_previews[4] = createImg("./images/arrow_2.png");
  tile_previews[4].size(AUTO, p_height);
  tile_previews[4].hide();

  canvas.position(x,y);

  img.position(x,y);
  img.size(width,height);

  let x_off = 0;
  let text_1 = createDiv("KEYBOARD SHORTCUTS:");
  text_1.position(x + x_off, y+height + 20);
  let text_2 = createDiv("left/right arrows --> edit tile scale");
  text_2.position(x + x_off, y+height + 40);
  let text_3 = createDiv("up/down arrows --> change tile type");
  text_3.position(x + x_off, y+height + 60);

  // let upload = createInput('');
  // upload.input();
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

function showPreview(){
  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  if (0 <= row && row < cols && 0 <= col && col < rows){
    if (grid[row][col] != 0) {
      for (let i = 0; i < 5; i++){
        tile_previews[i].hide();
      }
      var x_pos = x + get_pos(mouseX) + sq_len;
      var y_pos = y + get_pos(mouseY) - p_height;
      tile_previews[grid[row][col]-1].position(x_pos, y_pos);
      tile_previews[grid[row][col]-1].show();
    }
    else {
      for (let i = 0; i < 5; i++){
        tile_previews[i].hide();
      }
    }
  }
}

function draw_cursor() {
  stroke(tile_color[cur_color]);
  noFill();
  rect(get_pos(mouseX), get_pos(mouseY), sq_len, sq_len);

  showPreview();
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

function mouseClicked(){changeColor();}

//function mouseDragged(){changeColor();}

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
  if (keyCode === DOWN_ARROW) {
    tile_images[cur_color].hide();
    if (cur_color == 0) {cur_color = 4;}
    else{cur_color--;}
    cur_color %= 5;
    tile_images[cur_color].show();
  }

}

function draw() {
  draw_grid();
  draw_cursor();
  noFill();
  stroke(tile_color[cur_color]);
  strokeWeight(5);
  rect(0,0,width, height);
}
