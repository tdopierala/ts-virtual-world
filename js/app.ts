import Graph from './math/graph';
import GraphEditor from './graphEditor';
import Point from './primitives/point';
import Segment from './primitives/segment';

class App {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private graph: Graph;
	private graphEditor: GraphEditor;

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

		this.graphEditor = new GraphEditor(this.canvas, this.context, this.graph);
		this.animate();
	}

	animate(): void {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.graphEditor.display();
		requestAnimationFrame(this.animate.bind(this));
	}
}

new App();