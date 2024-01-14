import Point from "./point";
import IPolygonStyle from '../interfaces/IPolygonStyle';
import Segment from "./segment";
import { average, getIntersection, getRandomColor } from "../math/utils";

type Intersection = {
	x: number;
	y: number;
	offset: number;
} | null;

export default class Polygon {
	points: Point[];
	segments: Segment[];

	constructor(points: Point[]) {
		this.points = points;
		this.segments = [];
		for (let i = 1; i <= this.points.length; i++) {
			this.segments.push(
				new Segment(this.points[i - 1], this.points[i % this.points.length])
			);
		}
	}

	static break(poly1: Polygon, poly2: Polygon): Point[] {
		const segs1: Segment[] = poly1.segments;
		const segs2: Segment[] = poly2.segments;
		const intersections: Point[] = [];

		for (let i = 0; i < segs1.length; i++) {
			for (let j = 0; j < segs2.length; j++) {
				const intersection: Intersection = getIntersection(
					segs1[i].p1, segs1[i].p2, segs2[j].p1, segs2[j].p2
				);

				if (intersection && intersection.offset != 1 && intersection.offset != 0) {
					let aux: Point;
					const point: Point = new Point(intersection.x, intersection.y);
					intersections.push(point);

					aux = segs1[i].p2;
					segs1[i].p2 = point;
					segs1.splice(i + 1, 0, new Segment(point, aux));

					aux = segs2[j].p2;
					segs2[j].p2 = point;
					segs2.splice(j + 1, 0, new Segment(point, aux));
				}
			}
		}

		return intersections;
	}

	static multiBreak(polygons: Polygon[]): Point[] {
		let intersections: Point[] = [];

		for (let i = 0; i < polygons.length - 1; i++) {
			for (let j = i + 1; j < polygons.length; j++) {
				intersections = intersections.concat(Polygon.break(polygons[i], polygons[j]));
			}
		}

		return intersections;
	}

	static union(polygons: Polygon[]): { keptSegments: Segment[], intersections: Point[] } {
		const intersections: Point[] = Polygon.multiBreak(polygons);

		const keptSegments: Segment[] = [];

		for (let i = 0; i < polygons.length; i++) {
			for (const segment of polygons[i].segments) {
				let keep: boolean = true;
				for (let j = 0; j < polygons.length; j++) {
					if (i != j) {
						if (polygons[j].containsSegment(segment)) {
							keep = false;
							break;
						}
					}
				}

				if (keep) {
					keptSegments.push(segment);
				}
			}
		}

		return { keptSegments, intersections };
	}

	drawSegments(ctx: CanvasRenderingContext2D): void {
		for (const segment of this.segments) {
			segment.draw(ctx, { color: getRandomColor(), width: 4 });
		}
	}

	draw(ctx: CanvasRenderingContext2D, { stroke = 'blue', lineWidth = 2, fill = 'rgba(0,0,255,0.3)' }: IPolygonStyle = {}): void {
		ctx.beginPath();
		ctx.fillStyle = fill;
		ctx.strokeStyle = stroke;
		ctx.lineWidth = lineWidth;
		ctx.moveTo(this.points[0].x, this.points[0].y);
		for (let i = 1; i < this.points.length; i++) {
			ctx.lineTo(this.points[i].x, this.points[i].y);
		}
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	containsSegment(segment: Segment): boolean {
		return this.containsPoint(average(segment.p1, segment.p2));
	}

	containsPoint(point: Point): boolean {
		const outerPoint: Point = new Point(-1000, -1000);
		let intersectionCount: number = 0;

		for (const segment of this.segments) {
			if (getIntersection(outerPoint, point, segment.p1, segment.p2)) 
				intersectionCount++;
		}

		return intersectionCount % 2 == 1;
	}	
}
