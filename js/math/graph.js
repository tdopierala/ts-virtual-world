class Graph {
	constructor(points = [], segments = []) {
		this.points = points;
		this.segments = segments;
	}

	draw(ctx) {
		for (const segment of this.segments) {
			segment.draw(ctx);
		}

		for (const point of this.points) {
			point.draw(ctx);
		}
	}

	addPoint(point) {
		this.points.push(point);
	}

	containsPoint(point) {
		return this.points.find((p) => p.equals(point));
	}

	tryAddPoint(point) {
		if (!this.containsPoint(point)) {
			this.addPoint(point);
			return true;
		}
		return false;
	}

	addSegment(segment) {
		this.segments.push(segment);
	}

	containtsSegment(segment) {
		return this.segments.find((s) => s.equals(segment));
	}

	tryAddSegment(segment) {
		if (!this.containtsSegment(segment) && !segment.p1.equals(segment.p2)) {
			this.addSegment(segment);
			return true;
		}
		return false;
	}
}
