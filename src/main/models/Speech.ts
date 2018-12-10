import Copyable from "utils/Copyable";
import SpeechRecognition from "models/SpeechRecognition";

export default class Speech extends Copyable<Speech> {
  constructor(
    readonly speechRecognitions: SpeechRecognition[],
    readonly selectedRecognition: string,
    readonly wrote: boolean,
    readonly timestamp: number
  ) {
    super();
  }
}

