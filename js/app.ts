import Graph from './math/graph';
import Point from './primitives/point';
import Segment from './primitives/segment';

class App {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private graph: Graph;

	constructor() {
		this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
		this.canvas.width = 600;
		this.canvas.height = 600;

		this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

		const p1: Point = new Point(200, 200);
		const p2: Point = new Point(500, 200);
		const p3: Point = new Point(400, 400);
		const p4: Point = new Point(100, 300);

		const s1: Segment = new Segment(p1, p2);
		const s2: Segment = new Segment(p1, p3);

		this.graph = new Graph([p1, p2, p3, p4], [s1, s2]);
		this.graph.draw(this.context);

		this.setEventHandlers();
	}

	refreshCanvas(): void {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.graph.draw(this.context);
	}

	setEventHandlers(): void {
		document.getElementById('addRandomPoint')?.addEventListener('click', () => this.addRandomPoint());
		document.getElementById('addRandomSegment')?.addEventListener('click', () => this.addRandomSegment());
		document.getElementById('removeRandomSegment')?.addEventListener('click', () => this.removeRandomSegment());
		document.getElementById('removeRandomPoint')?.addEventListener('click', () => this.removeRandomPoint());
		document.getElementById('removeAll')?.addEventListener('click', () => this.removeAll());
	}

	addRandomPoint(): void {
		const success: boolean = this.graph.tryAddPoint(new Point(Math.random() * this.canvas.width, Math.random() * this.canvas.height));

		this.refreshCanvas();
		console.log('adding new point: ', success);
	}

	addRandomSegment(): void {
		const index1: number = Math.floor(Math.random() * this.graph.points.length);
		const index2: number = Math.floor(Math.random() * this.graph.points.length);
		const success: boolean = this.graph.tryAddSegment(new Segment(this.graph.points[index1], this.graph.points[index2]));
		
		this.refreshCanvas();
		console.log('adding new segment: ', success);
	}

	removeRandomSegment(): void {
		if (this.graph.segments.length == 0) {
			console.log("no segments");
			return;
		}
		
		const index: number = Math.floor(Math.random() * this.graph.segments.length);
		
		this.graph.removeSegment(this.graph.segments[index]);
		this.refreshCanvas();
	}

	removeRandomPoint(): void {
		if (this.graph.points.length == 0) {
			console.log("no point");
			return;
		}

		const index: number = Math.floor(Math.random() * this.graph.points.length);

		this.graph.removePoint(this.graph.points[index]);
		this.refreshCanvas();
	}

	removeAll(): void {
		this.graph.dispose();
		this.refreshCanvas();
	}
}

new App();