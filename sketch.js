let points = [
  [-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0],
  [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]
];

let fishes = [];
let song, amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3'); // 替換為你的音樂文件路徑
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 播放背景音樂
  song.loop();
  
  // 初始化振幅分析器
  amplitude = new p5.Amplitude();
  amplitude.setInput(song);
  
  // 初始化一百隻魚
  for (let i = 0; i < 100; i++) {
    fishes.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      scale: random(1, 3), // 隨機放大倍數
      color: color(random(255), random(255), random(255)) // 隨機顏色
    });
  }
}

function draw() {
  background(220);
  stroke(255, 204, 0);
  strokeWeight(5);

  // 繪製線條
  for (let i = 0; i < points.length - 1; i++) {
    let x1 = map(points[i][0], -10, 10, 0, width);
    let y1 = map(points[i][1], -10, 10, height, 0);
    let x2 = map(points[i + 1][0], -10, 10, 0, width);
    let y2 = map(points[i + 1][1], -10, 10, height, 0);
    line(x1, y1, x2, y2);
  }

  // 連接第一個點和最後一個點
  let x1 = map(points[points.length - 1][0], -10, 10, 0, width);
  let y1 = map(points[points.length - 1][1], -10, 10, height, 0);
  let x2 = map(points[0][0], -10, 10, 0, width);
  let y2 = map(points[0][1], -10, 10, height, 0);
  line(x1, y1, x2, y2);

  // 獲取當前振幅
  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 1, 3); // 將振幅映射到放大倍數

  // 更新並繪製每隻魚
  for (let fish of fishes) {
    fish.x += fish.dx;
    fish.y += fish.dy;

    // 確保魚在畫布內
    if (fish.x < 0 || fish.x > width) fish.dx *= -1;
    if (fish.y < 0 || fish.y > height) fish.dy *= -1;

    drawFish(fish.x, fish.y, fish.scale * sizeFactor, fish.color); // 根據振幅調整放大倍數繪製小魚
  }
}

function drawFish(x, y, scale, col) {
  fill(col);

  beginShape();
  for (let point of points) {
    let px = map(point[0], -10, 10, x - 20 * scale, x + 20 * scale); // 根據放大倍數調整大小
    let py = map(point[1], -10, 10, y - 20 * scale, y + 20 * scale); // 根據放大倍數調整大小
    vertex(px, py);
  }
  endShape(CLOSE);
}
