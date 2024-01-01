import Point from "../primitives/point";
import Segment from "../primitives/segment";

export default class Graph {
	points: Point[];
	segments: Segment[];

	constructor(points: Point[] = [], segments: Segment[] = []) {
		this.points = points;
		this.segments = segments;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		for (const segment of this.segments) {
			segment.draw(ctx);
		}

		for (const point of this.points) {
			point.draw(ctx);
		}
	}

	addPoint(point: Point): void {
		this.points.push(point);
	}

	containsPoint(point: Point): boolean {
		return !!this.points.find((p: Point) => p.equals(point));
	}

	tryAddPoint(point: Point): boolean {
		if (!this.containsPoint(point)) {
			this.addPoint(point);
			return true;
		}
		return false;
	}

	addSegment(segment: Segment): void {
		this.segments.push(segment);
	}

	containtsSegment(segment: Segment): boolean {
		return !!this.segments.find((s: Segment) => s.equals(segment));
	}

	tryAddSegment(segment: Segment): boolean {
		if (!this.containtsSegment(segment) && !segment.p1.equals(segment.p2)) {
			this.addSegment(segment);
			return true;
		}
		return false;
	}

	removeSegment(segment: Segment) {
		this.segments.splice(this.segments.indexOf(segment), 1);
	}

	removePoint(point: Point): void {
		const segments: Segment[] = this.getSegmentWithPoint(point);
		
		for (const segment of segments) {
			this.removeSegment(segment);
		}

		this.points.splice(this.points.indexOf(point), 1);
	}

	getSegmentWithPoint(point: Point): Array<Segment> {
		const segments: Segment[] = [];

		for (const segment of this.segments) {
			if (segment.includes(point)) {
				segments.push(segment);
			}
		}

		return segments;
	}

	dispose(): void {
		this.points.length = 0;
		this.segments.length = 0;
	}
}
