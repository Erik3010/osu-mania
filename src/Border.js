import Rect from "./Engine/Rect";

class Border extends Rect {
  constructor({ ctx, x, y, width, height, color, strokeColor }) {
    super({ ctx, x, y, width, height, color, strokeColor });
  }
}

export default Border;
