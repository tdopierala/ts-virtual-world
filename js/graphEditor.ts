import Graph from "./math/graph";
import Point from "./primitives/point";
import Segment from "./primitives/segment";
import { getNearestPoint } from "./math/utils";
import __ from './static/helpers';
import Viewport from "./viewport";

export default class GraphEditor {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private graph: Graph;
	private selected: Point | null;
	private hovered: Point | null;
	private mouse: Point;
	private dragging: boolean;
	private viewport: Viewport;

	constructor(viewport: Viewport, context: CanvasRenderingContext2D, graph: Graph) {
		this.viewport = viewport;
		this.canvas = this.viewport.getCanvas();
		this.context = context;
		this.graph = graph;

		this.selected = null;
		this.hovered = null;
		this.mouse = new Point(0, 0);
		this.dragging = false;

		this.addEventListeners();
	}

	display(): void {
		this.graph.draw(this.context);

		if (this.hovered) {
			this.hovered.draw(this.context, { fill: true });
		}
		if (this.selected) {
			const intent: Point = this.hovered ? this.hovered : this.mouse;
			new Segment(this.selected, intent).draw(this.context, { dash: [4, 4] });
			this.selected.draw(this.context, { outline: true });
		}
	}

	dispose(): void {
		this.graph.dispose();
		this.selected = null;
		this.hovered = null;
	}

	private addEventListeners(): void {
		this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
		this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
		this.canvas.addEventListener('contextmenu', evt => evt.preventDefault());
		this.canvas.addEventListener('mouseup', () => this.dragging = false);
	}

	private handleMouseDown(evt: MouseEvent): void {
		if (evt.button === __.RIGHT_CLICK) {
			if (this.selected) {
				this.selected = null;
			} else if (this.hovered) {
				this.removePoint(this.hovered);
			}
		}

		if (evt.button === __.LEFT_CLICK) {
			if (this.hovered) {
				this.select(this.hovered);
				this.dragging = true;
				return;
			}

			this.graph.addPoint(this.mouse);
			this.select(this.mouse);
			this.hovered = this.mouse;
		}
	}

	private handleMouseMove(evt: MouseEvent): void {
		this.mouse = this.viewport.getMouse(evt, true);
		this.hovered = getNearestPoint(this.mouse, this.graph.points, 20 * this.viewport.getZoom());

		if (this.dragging) {
			this.selected!.x = this.mouse.x;
			this.selected!.y = this.mouse.y;
		}
	}

	private removePoint(point: Point): void {
		this.graph.removePoint(point);
		this.hovered = null;
		if (this.selected == point) {
			this.selected = null;
		}
	}

	private select(point: Point): void {
		if (this.selected) {
			this.graph.tryAddSegment(new Segment(this.selected, point));
		}
		this.selected = point;
	}
}