function Particle() {
    var potentialStartPoints = [0, windowWidth];
    this.pos = createVector(random(potentialStartPoints), random(height));
    // this.vel = p5.Vector.random2D();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;

    this.prevPos = this.pos.copy();

    this.startPos = this.pos.copy();

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    // This function is necessary because the p5 line function is broken with WebGL
    // Thanks to the following StackOverflow for a fix: https://stackoverflow.com/questions/42245579/how-to-draw-a-line-in-p5-js-using-webgl
    this.drawLine = function (x1, y1, x2, y2) {
        beginShape();
        vertex(x1, y1, 0);
        vertex(x2, y2, 0);
        endShape();
    }

    this.show = function () {
        fill('transparent');
        strokeWeight(1);
        this.drawLine(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    this.updatePrev = function () {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges = function () {
        if (this.startPos.x < windowWidth / 5) {
            var maxWidth = windowWidth / 5;
            if (this.pos.x === maxWidth || this.pos.x > maxWidth) {
                this.pos.x = 0;
                this.updatePrev();
            }
        } else {
            var maxWidth = (4 * windowWidth) / 5;
            if (this.pos.x === maxWidth || this.pos.x < maxWidth) {
                this.pos.x = windowWidth;
                this.updatePrev();
            }
        }
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }

    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }
}
