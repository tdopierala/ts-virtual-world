import Graph from "./math/graph";
import Envelope from "./primitives/envelope";
import Point from "./primitives/point";
import Polygon from "./primitives/polygon";
import Segment from "./primitives/segment";

export default class World {
	graph: Graph;
	roadWidth: number;
	roadRoundness: number;
	envelopes: Envelope[];
	intersections: Point[];
	roadBorders: Segment[];

	constructor(graph: Graph, roadWidth: number = 100, roadRoundness: number = 10) {
		this.graph = graph;
		this.roadWidth = roadWidth;
		this.roadRoundness = roadRoundness;
		this.envelopes = [];
		this.intersections = [];
		this.roadBorders = [];

		this.generate();
	}

	generate() {
		this.envelopes.length = 0;
		for (const segment of this.graph.segments) {
			this.envelopes.push(
				new Envelope(segment, this.roadWidth, this.roadRoundness)
			);
		}

		// this.intersections = Polygon.break(
		// 	this.envelopes[0].polygon,
		// 	this.envelopes[1].polygon
		// );

		// this.intersections = Polygon.multiBreak(this.envelopes.map(env => env.polygon));
		const { keptSegments, intersections } = Polygon.union(this.envelopes.map(env => env.polygon));
		this.roadBorders = keptSegments;
		this.intersections = intersections;
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (const envelope of this.envelopes) {
			envelope.draw(ctx, { fill: '#bbb', stroke: '#bbb', lineWidth: 15 });
		}
		for (const segment of this.roadBorders) {
			segment.draw(ctx, { color: 'white', width: 5 });
		}
		// for (const intersection of this.intersections) {
		// 	intersection.draw(ctx, { color: 'red', size: 6 });
		// }
	}
}
