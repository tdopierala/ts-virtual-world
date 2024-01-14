import Point from "../primitives/point";

export function getNearestPoint(loc: Point, points: Point[], threshhold: number = Number.MAX_SAFE_INTEGER): Point {
	let minDist: number = Number.MAX_SAFE_INTEGER;
	let nearest: Point | null = null;

	for (const point of points) {
		const dist = distance(point, loc);

		if (dist < minDist && dist < threshhold) {
			minDist = dist;
			nearest = point;
		}
	}

	return nearest as Point;
}

export function distance(p1: Point, p2: Point): number {
	return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function average(p1: Point, p2: Point): Point {
	return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

export function add(p1: Point, p2: Point): Point {
	return new Point(p1.x + p2.x, p1.y + p2.y);
}

export function subtract(p1: Point, p2: Point): Point {
	return new Point(p1.x - p2.x, p1.y - p2.y);
}

export function scale(p: Point, scaler: number): Point {
	return new Point(p.x * scaler, p.y * scaler);
}

export function translate(loc: Point, angle: number, offset: number): Point {
	return new Point(
		loc.x + Math.cos(angle) * offset,
		loc.y + Math.sin(angle) * offset
	);
}

export function angle(p: Point): number {
	return Math.atan2(p.y, p.x);
}

export function getIntersection(a: Point, b: Point, c: Point, d: Point) {
	const tTop: number = (d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x);
	const uTop: number = (c.y - a.y) * (a.x - b.x) - (c.x - a.x) * (a.y - b.y);
	const bottom: number = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

	if (bottom != 0) {
		const t: number = tTop / bottom;
		const u: number = uTop / bottom;

		if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
			return {
				x: lerp(a.x, b.x, t),
				y: lerp(a.y, b.y, t),
				offset: t,
			};
		}
	}

	return null;
}

export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

export function getRandomColor() {
	return `hsl(${(290 + Math.random() * 260)}, 100%, 60%)`;
}
