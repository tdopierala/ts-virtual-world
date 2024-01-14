import Polygon from "./polygon";
import Segment from "./segment";
import Point from "./point";
import { angle, subtract, translate } from "../math/utils";
import IPolygonStyle from "../interfaces/IPolygonStyle";

export default class Envelope {
	skeleton: Segment;
	polygon: Polygon;

	constructor(skeleton: Segment, width: number, roundness: number = 1) {
		this.skeleton = skeleton;
		this.polygon = this.generatePolygon(width, roundness);
	}

	draw(ctx: CanvasRenderingContext2D, options: IPolygonStyle = {}): void {
		this.polygon.draw(ctx, options);
		// this.polygon.drawSegments(ctx);
	}

	private generatePolygon(width: number, roundness: number): Polygon {
		const { p1, p2 }: Segment = this.skeleton;

		const radius: number = width / 2;
		const alpha: number = angle(subtract(p1, p2));
		const alpha_cw: number = alpha + Math.PI / 2;
		const alpha_ccw: number = alpha - Math.PI / 2;
		// const p1_ccw: Point = translate(p1, alpha_ccw, radius);
		// const p2_ccw: Point = translate(p2, alpha_ccw, radius);
		// const p2_cw: Point = translate(p2, alpha_cw, radius);
		// const p1_cw: Point = translate(p1, alpha_cw, radius);

		const points: Point[] = [];
		const step: number = Math.PI / Math.max(1, roundness);
		const epsilon: number = step / 2;

		for (let i = alpha_ccw; i <= alpha_cw + epsilon; i += step) {
			points.push(translate(p1, i, radius));
		}
		for (let i = alpha_ccw; i <= alpha_cw + epsilon; i += step) {
			points.push(translate(p2, Math.PI + i, radius));
		}

		return new Polygon(points);
	}
}
