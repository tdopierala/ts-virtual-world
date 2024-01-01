import IDragInfo from "./interfaces/IDragInfo";
import Point from "./primitives/point";
import { add, subtract, scale } from "./math/utils";
import __ from './static/helpers';

export default class Viewport {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private zoom: number;
	private offset: Point;
	private center: Point;
	private drag: IDragInfo;

	constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.context = context;

		this.zoom = 1;
		this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
		this.offset = scale(this.center, -1);

		this.drag = {
			start: new Point(0, 0),
			end: new Point(0, 0),
			offset: new Point(0, 0),
			active: false,
		};

		this.addEventListeners();
	}

	private addEventListeners(): void {
		this.canvas.addEventListener('wheel', this.handleMouseWheel.bind(this));
		this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
		this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
		this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
	}

	private handleMouseWheel(evt: WheelEvent): void {
		const dir: number = Math.sign(evt.deltaY);
		const step: number = 0.1;
		this.zoom += dir * step;
		this.zoom = Math.max(1, Math.min(5, this.zoom));

		// console.log(evt.deltaY, Math.sign(evt.deltaY), this.zoom);
	}

	private handleMouseDown(evt: MouseEvent): void {
		if (evt.button === __.MIDDLE_CLICK) {
			this.drag.start = this.getMouse(evt);
			this.drag.active = true;
		}
	}

	private handleMouseMove(evt: MouseEvent): void {
		if (this.drag.active) {
			this.drag.end = this.getMouse(evt);
			this.drag.offset = subtract(this.drag.end, this.drag.start);
		}
	}

	private handleMouseUp(): void {
		if (this.drag.active) {
			this.offset = add(this.offset, this.drag.offset);
			this.drag = {
				start: new Point(0, 0),
				end: new Point(0, 0),
				offset: new Point(0, 0),
				active: false,
			};
		}
	}

	getZoom(): number {
		return this.zoom;
	}

	getCanvas(): HTMLCanvasElement {
		return this.canvas;
	}

	getOffset(): Point {
		return add(this.offset, this.drag.offset);
	}

	getMouse(evt: MouseEvent, subtractDragOffset: boolean = false): Point {
		const point: Point = new Point(
			(evt.offsetX - this.center.x) * this.zoom - this.offset.x, 
			(evt.offsetY - this.center.y) * this.zoom - this.offset.y
		);

		return subtractDragOffset ? subtract(point, this.drag.offset) : point;
	}

	reset(): void {
		this.context.restore();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.save();
		this.context.translate(this.center.x, this.center.y);
		this.context.scale(1 / this.zoom, 1 / this.zoom);

		const offset: Point = this.getOffset();
		this.context.translate(offset.x, offset.y);
	}
}