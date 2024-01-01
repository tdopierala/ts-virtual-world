export default class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(ctx: CanvasRenderingContext2D, size: number = 18, color: string = 'black'): void {
		const rad: number = size / 2;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
		ctx.fill();
	}

	equals(point: Point): boolean {
		return this.x == point.x && this.y == point.y;
	}
}