import Copyable from "utils/Copyable";
import Speech from "models/Speech";

export default class Minute extends Copyable<Minute> {
  constructor(
    readonly speechList: Speech[]
  ) {
    super();
  }
}
