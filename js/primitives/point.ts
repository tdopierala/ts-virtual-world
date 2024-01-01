import IPointStyle from "../interfaces/IPointStyle";

export default class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(ctx: CanvasRenderingContext2D, { size = 18, color = 'black', outline = false, fill = false }: IPointStyle = {}): void {
		const rad: number = size / 2;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
		ctx.fill();

		if (outline) {
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'white';
			ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
			ctx.stroke();
		}

		if (fill) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, rad * 0.5, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
		}
	}

	equals(point: Point): boolean {
		return this.x == point.x && this.y == point.y;
	}
}