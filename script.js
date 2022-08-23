const frame_rate = 60;

var isdrawing = false;

var starting_corner;
var ending_corner;

var rectangles = [];
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

function mouseup(e) {
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
    rectangles.push(rect);
    rect_id++;
    draw_rect(rect);
  }
}

function mouseout(e) {
  if (e.toElement.tagName != "rect" && e.toElement.tagName != "svg") {
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
      rectangles.push(rect);
      rect_id++;
      draw_rect(rect);
    }
  }
}

function draw_rect(rect) {
  canvas = document.getElementById("canvas");
  canvas.innerHTML += `<rect id = "${rect_id}" x="${rect[0]}" y="${rect[1]}" width="${rect[2]}" height="${rect[3]}" stroke="black" stroke-width="2" fill="none"/>`;
}

function drawing() {
  console.log("ta indo");
}
