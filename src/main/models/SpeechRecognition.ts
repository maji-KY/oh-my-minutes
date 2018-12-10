import Copyable from "utils/Copyable";

export default class SpeechRecognition extends Copyable<SpeechRecognition> {
  constructor(
    readonly transcript: string
  ) {
    super();
  }
}

