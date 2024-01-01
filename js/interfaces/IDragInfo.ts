import Point from "../primitives/point";

export default interface IDragInfo {
	start: Point;
	end: Point;
	offset: Point;
	active: boolean;
}