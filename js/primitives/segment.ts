import ISegmentStyle from '../interfaces/ISegmentStyle';
import Point from './point';

export default class Segment {
	p1: Point;
	p2: Point;

	constructor(p1: Point, p2: Point) {
		this.p1 = p1;
		this.p2 = p2;
	}

	draw(ctx: CanvasRenderingContext2D, { width = 2, color = 'black', dash = [] }: ISegmentStyle = {}): void {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.setLineDash(dash);
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.stroke();
		ctx.setLineDash([]);
	}

	equals(segment: Segment): boolean {
		return this.includes(segment.p1) && this.includes(segment.p2);
	}

	includes(point: Point): boolean {
		return this.p1.equals(point) || this.p2.equals(point);
	}
}
