import Copyable from "utils/Copyable";

export default class MinuteIndex extends Copyable<MinuteIndex> {
  constructor(
    readonly title: string,
    readonly timestamp: number
  ) {
    super();
  }
}
