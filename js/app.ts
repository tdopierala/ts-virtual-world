import Graph from './math/graph';
import GraphEditor from './graphEditor';
import Viewport from './viewport';
// import Point from './primitives/point';
// import Segment from './primitives/segment';

class App {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private graph: Graph;
	private graphEditor: GraphEditor;
	private viewport: Viewport;

	constructor() {
		this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
		this.canvas.width = 600;
		this.canvas.height = 600;

		this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

		// const p1: Point = new Point(200, 200);
		// const p2: Point = new Point(500, 200);
		// const p3: Point = new Point(400, 400);
		// const p4: Point = new Point(100, 300);

		// const s1: Segment = new Segment(p1, p2);
		// const s2: Segment = new Segment(p1, p3);

		const graphString: string | null = localStorage.getItem('graph');
		const graphInfo = graphString ? JSON.parse(graphString) : null;
		this.graph = graphInfo ? Graph.load(graphInfo) : new Graph();
		// this.graph = new Graph([p1, p2, p3, p4], [s1, s2]);

		this.viewport = new Viewport(this.canvas, this.context);
		this.graphEditor = new GraphEditor(this.viewport, this.context, this.graph);
		this.animate();
		this.addEventListeners();
	}

	addEventListeners(): void {
		document.getElementById('disposeBtn')?.addEventListener('click', this.handleDispose.bind(this));
		document.getElementById('saveBtn')?.addEventListener('click', this.handleSave.bind(this));
	}

	animate(): void {
		this.viewport.reset();
		this.graphEditor.display();
		requestAnimationFrame(this.animate.bind(this));
	}

	handleDispose(): void {
		this.graphEditor.dispose();
	}

	handleSave(): void {
		localStorage.setItem('graph', JSON.stringify(this.graph));
	}
}

new App();