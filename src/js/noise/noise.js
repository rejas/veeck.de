var inc = 0.05;
// Scale
var scl = 10;
var cols, rows;

var zoff = 0;

var particles = [];

var colors = [];

var flowfield = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 2000; i++) {

        particles[i] = new Particle();
        colors[i] = {
            r: floor(noise(255) * 255),
            g: 0,
            b: floor(noise(255) * 255)
        }
    }
    document.documentElement.style.setProperty('--fps-color', 'rgb(' + colors[0].r + ', ' + colors[0].g + ', ' + colors[0].b + ')');
    background('white');

}

function addFPStoDOM() {
    var fps = frameRate();
    document.getElementById('fps').innerText = floor(fps);
}

function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var r = noise(xoff, yoff) * 255;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);

            flowfield[index] = v;

            xoff += inc;
        }
        yoff += inc;
        zoff += 0.0001;
    }
    for (var i = 0; i < particles.length; i++) {

        stroke(colors[i].r, colors[i].g, colors[i].b, 5);
        particles[i].follow(flowfield);
        particles[i].edges();
        particles[i].show();
        particles[i].update();
    }
    setTimeout(function () {
        return noLoop();
    }, 30000);
    addFPStoDOM();
}
