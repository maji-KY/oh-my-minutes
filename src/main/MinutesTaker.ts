
declare let webkitSpeechRecognition: any;

export default class MinutesTaker {

  readonly rec: any;
  isStarted: boolean;

  constructor(callback: Function) {
    const rec = new webkitSpeechRecognition(); // eslint-disable-line new-cap
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "ja-JP";
    rec.maxAlternatives = 3;

    rec.onstart = () => { console.log("on start") };
    rec.onend = () => { console.log("on end") };

    rec.onspeechstart = () => { console.log("on speech start") };
    rec.onspeechend = () => { console.log("on speech end") };

    rec.onosundstart = () => { console.log("on sound start") };
    rec.onsoundend = () => { console.log("on sound end") };

    rec.onaudiostart = () => { console.log("on audio start") };
    rec.onaudioend = () => { console.log("on audio end") };

    rec.onnomatch = () => { console.log("on nomatch") };
    rec.onerror = (e) => { console.log("on error", e) };

    rec.onresult = function(e) {
      console.log("on result");
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        const currentResults = [...Array(e.results[i].length).keys()].map(x => e.results[i][x]);
        currentResults.sort((a, b) => b.confidence - a.confidence);
        console.log(`Recognised[${i}]: ` + currentResults[0].transcript);
        console.log(currentResults);
        callback(currentResults.map(x => ({"transcript": x.transcript})));
      }
    };
    this.rec = rec;
    this.isStarted = false;
  }

  start() {
    console.log("MinutesTaker start");
    !this.isStarted ? this.rec.start() : "";
    this.isStarted = true;
  }

  stop() {
    console.log("MinutesTaker stop");
    this.rec.stop();
    this.isStarted = false;
  }

}
