const frame_rate = 60;

var image;
var isdrawing = false;
var starting_corner;
var ending_corner;
var rectangles = {};
var rect_id = 0;

function mousemove(e) {
  if (isdrawing) {
    ending_corner = [e.offsetX, e.offsetY];
    rect = [
      starting_corner[0] < ending_corner[0]
        ? starting_corner[0]
        : ending_corner[0],
      starting_corner[1] < ending_corner[1]
        ? starting_corner[1]
        : ending_corner[1],
      Math.abs(starting_corner[0] - ending_corner[0]),
      Math.abs(starting_corner[1] - ending_corner[1]),
    ];
    prev_rect = document.getElementById("0");
    prev_rect.remove();
    canvas = document.getElementById("canvas");
    canvas.innerHTML += `<rect id = "0" x="${rect[0]}" y="${rect[1]}" width="${rect[2]}" height="${rect[3]}" stroke="black" stroke-width="1" fill="none"/>`;
  }
}

function mousedown(e) {
  starting_corner = [e.offsetX, e.offsetY];
  canvas = document.getElementById("canvas");
  canvas.innerHTML += `<rect id = "0" x="${starting_corner[0]}" y="${starting_corner[1]}" width="0" height="0" stroke="black" stroke-width="1" fill="none"/>`;
  isdrawing = true;
}

function mouseup() {
  if (isdrawing) {
    isdrawing = false;
    prev_rect = document.getElementById("0");
    prev_rect.remove();
    rect = [
      starting_corner[0] < ending_corner[0]
        ? starting_corner[0]
        : ending_corner[0],
      starting_corner[1] < ending_corner[1]
        ? starting_corner[1]
        : ending_corner[1],
      Math.abs(starting_corner[0] - ending_corner[0]),
      Math.abs(starting_corner[1] - ending_corner[1]),
    ];
    rect_id++;
    draw_rect(rect);
  }
}

function mouseout(e) {
  if (
    e.toElement &&
    e.toElement.tagName != "rect" &&
    e.toElement.tagName != "svg"
  ) {
    mouseup();
  }
}

function draw_rect(rect) {
  canvas = document.getElementById("canvas");
  rectangles[rect_id] = rect;
  console.log(rectangles);
  canvas.innerHTML += `<rect id = "${rect_id}" x="${rect[0]}" y="${rect[1]}" width="${rect[2]}" height="${rect[3]}" stroke="black" stroke-width="2" fill="none"/>`;
}

function load() {
  const canvas = document.getElementById("canvas");
  const image_loader = document.getElementById("loader");
  image = image_loader.value.split("\\").pop();
  canvas.style.backgroundImage = `url("images/${image}")`;
}

function save() {
  var rect_list = [];
  for (var key in rectangles) {
    rect_list.push(rectangles[key]);
  }
  const a = document.createElement("a");
  const blob = new Blob([JSON.stringify(rect_list)]);
  a.href = URL.createObjectURL(blob);
  a.download = `${image.split(".")[0]}.json`;
  a.click();
}
