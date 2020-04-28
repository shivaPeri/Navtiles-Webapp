// design_script.js

// createArray modified from https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
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

// position and scale
var x = 100;
var y = 250;
var sq_len = 20;

// data
var tile_color = createArray(5);
var tile_images = createArray(5);
var tile_default_message = createArray(5);
var p_height = 50;
var tile_previews = createArray(5);
var cur_color = 0;
var rows, cols, grid;
var edit_mode = false;

// interface
let scale, clear_btn, tile_type, submit;
let img, new_img, canvas, upload;
let voice = new p5.Speech();
let inp, message;
var cursor_row = 0;
var cursor_col = 0;

function setup() {
  img = createImg("./images/default_floorpan.jpeg");
  canvas = createCanvas(600, 400);
  canvas.mouseClicked(changeColor);
  canvas.doubleClicked(editAudio);

  let y_off = 20

  inp = createInput();
  inp.position(x + width, y + height + y_off);
  inp.input(handleInput);
  inp.hide();
  submit = createButton('submit');
  submit.position(x + width, y + height + 2*y_off);
  submit.mousePressed(toggleEdit);
  submit.hide();
  message = createDiv('Tile Message: ');
  message.position(x + width, y + height + y_off);

  tile_default_message[0] = 'CAUTION';
  tile_default_message[1] = 'FOLLOW';
  tile_default_message[2] = 'HELP';
  tile_default_message[3] = 'TURN';
  tile_default_message[4] = 'FORWARD';

  rows = Math.floor(height / sq_len);
  cols = Math.floor(width / sq_len);
  grid = {};
  scale = createSlider(10, 100, 20);
  scale.position(x + 80, y + height + y_off);

  clear_btn = createButton('Clear Grid');
  clear_btn.mousePressed(clearGrid);
  clear_btn.position(x + width - 100, y + height + y_off);

  tile_type = createSelect();
  tile_type.position(x + 300, y + height + y_off);
  tile_type.option('Bump Pattern');
  tile_type.option('Raised Bars');
  tile_type.option('Question Mark');
  tile_type.option('Arrow 1');
  tile_type.option('Arrow 2');

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

  tile_images[1] = createImg("./images/raised_bars.png");
  tile_images[1].id("bars");
  tile_images[1].position(x + width, y);
  tile_images[1].size(AUTO, height);
  tile_images[1].hide();

  tile_images[2] = createImg("./images/question_mark.png");
  tile_images[2].id("question");
  tile_images[2].position(x + width, y);
  tile_images[2].size(AUTO, height);
  tile_images[2].hide();

  tile_images[3] = createImg("./images/arrow_1.png");
  tile_images[3].id("arrow_1");
  tile_images[3].position(x + width, y);
  tile_images[3].size(AUTO, height);
  tile_images[3].hide();

  tile_images[4] = createImg("./images/arrow_2.png");
  tile_images[4].id("arrow_2");
  tile_images[4].position(x + width, y);
  tile_images[4].size(AUTO, height);
  tile_images[4].hide();

  createPreviews();
  canvas.position(x,y);
  img.position(x,y);
  img.size(width,height);

  helpInfo();
  upload = createFileInput(handleFile);
  let text = createDiv('Upload a custom floor plan: ');
  text.position(x, y - 20);
  upload.position(x + 200, y - 20);
}

function helpInfo(){
  let text_1 = createDiv('Grid Scale: ');
  text_1.position(x , y + height + 20);
  let text_2 = createDiv('Tile: ');
  text_2.position(x + 260, y + height + 20);
  let text_3 = createDiv('**Double-click on a tile to edit its audio');
  text_3.position(x, y + height + 50);
}

function createPreviews(){
  tile_previews[0] = createImg("./images/bump_pattern.png");
  tile_previews[0].size(AUTO, p_height);
  tile_previews[0].hide();

  tile_previews[1] = createImg("./images/raised_bars.png");
  tile_previews[1].size(AUTO, p_height);
  tile_previews[1].hide();

  tile_previews[2] = createImg("./images/question_mark.png");
  tile_previews[2].size(AUTO, p_height);
  tile_previews[2].hide();

  tile_previews[3] = createImg("./images/arrow_1.png");
  tile_previews[3].size(AUTO, p_height);
  tile_previews[3].hide();

  tile_previews[4] = createImg("./images/arrow_2.png");
  tile_previews[4].size(AUTO, p_height);
  tile_previews[4].hide();
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    new_img = createImg(file.data, '');
    new_img.position(x,y);
    new_img.size(width,height);
    img = new_img;
    canvas = createCanvas(600, 400);
    grid = {};
    createPreviews();
  } else {
    new_img = null;
  }
}

function toggleEdit() {
  edit_mode = !edit_mode;
  message.show();
  inp.hide();
  submit.hide();
}

function handleInput(){
  var key = toKey(cursor_row, cursor_col);
  grid[key][1] = inp.value();
}

function editAudio(){
  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  cursor_row = row;
  cursor_col = col;
  print(cursor_row, cursor_col);
  var key = toKey(row, col);
  if (grid[key] != undefined) {
    edit_mode = !edit_mode;
    message.hide();
    inp.show();
    inp.value(grid[key][1]);
    submit.show();
  }
}

////////////////////////////////////////////////////////////////////////////////
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
  for(var key in grid) {
    var v = grid[key];
    fill(tile_color[v[0]]);
    var pos = fromKey(key);
    rect(pos[0] * sq_len, pos[1] * sq_len, sq_len, sq_len);
  }
}

function clearGrid(){
  grid = {};
}

function get_pos(a) {
  return Math.floor(a / sq_len) * sq_len;
}

////////////////////////////////////////////////////////////////////////////////
function showPreview(){
  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  var key = toKey(row, col);
  if (0 <= row && row < cols && 0 <= col && col < rows){
    if (grid[key] != undefined) {
      for (let i = 0; i < 5; i++){
        tile_previews[i].hide();
      }
      var x_pos = x + get_pos(mouseX) + sq_len;
      var y_pos = y + get_pos(mouseY) - p_height;
      tile_previews[grid[key][0]].position(x_pos, y_pos);
      tile_previews[grid[key][0]].show();
      var key = toKey(row, col);
      message.html(concat('Tile Message: ', grid[key][1]));
    }
    else {
      for (let i = 0; i < 5; i++){
        tile_previews[i].hide();
      }
      message.html('Tile Message: ');
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
function draw_cursor() {
  stroke(tile_color[cur_color]);
  noFill();
  rect(get_pos(mouseX), get_pos(mouseY), sq_len, sq_len);
  showPreview();

  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  var key = toKey(row, col);
  if (grid[key] != undefined) voice.speak(grid[key][1]);
  else voice.stop();
}

function toKey(row, col){
  return concat(concat(str(row), ','), str(col));
}

function fromKey(key){
  var res = key.split(',');
  return [int(res[0]), int(res[1])];
}

////////////////////////////////////////////////////////////////////////////////
function changeColor() {
  var row = Math.floor(get_pos(mouseX) / sq_len);
  var col = Math.floor(get_pos(mouseY) / sq_len);
  var key = toKey(row, col);
  grid[key] = [cur_color, tile_default_message[cur_color]];
}

// function keyPressed() {
//   if (keyCode === LEFT_ARROW) {
//     tile_images[cur_color].hide();
//     cur_color++;
//     cur_color %= 5;
//     tile_images[cur_color].show();
//   }
//   if (keyCode === RIGHT_ARROW) {
//     tile_images[cur_color].hide();
//     if (cur_color == 0) {cur_color = 4;}
//     else{cur_color--;}
//     cur_color %= 5;
//     tile_images[cur_color].show();
//   }
// }

function updateColorVal(){
  let prev = cur_color;
  if (tile_type.value() == 'Bump Pattern') cur_color = 0;
  if (tile_type.value() == 'Raised Bars') cur_color = 1;
  if (tile_type.value() == 'Question Mark') cur_color = 2;
  if (tile_type.value() == 'Arrow 1') cur_color = 3;
  if (tile_type.value() == 'Arrow 2') cur_color = 4;
  tile_images[prev].hide();
  tile_images[cur_color].show();
}

function draw() {
  if (!edit_mode)
  {sq_len = scale.value();
  rows = Math.floor(height / sq_len);
  cols = Math.floor(width / sq_len);
  clear();
  updateColorVal();
  draw_grid();
  draw_cursor();
  stroke(0);
  noFill();
  strokeWeight(5);
  rect(0,0,width, height);}
  else {
    voice.stop();
  }
}
