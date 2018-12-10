import Minute from "models/Minute";
import Speech from "models/Speech";
import MinuteIndex from "models/MinuteIndex";

const LATEST_VERSION = 1;
const MINUTE_PREFIX = "_MINUTE_:";

const ls = window.localStorage;

interface MinutesData {
  structVersion: number;
  timestamp: number;
  minute: Minute;
}

function emptyMinute() {
  return {"structVersion": LATEST_VERSION, "timestamp": +new Date(), "minute": new Minute([])};
}

function store(ms: MinutesStorage) {
  ls.setItem(`${MINUTE_PREFIX}${ms.title}`, JSON.stringify(ms.data));
}

function restore(title: string) {
  const item = ls.getItem(`${MINUTE_PREFIX}${title}`);
  if (item) {
    const { structVersion, timestamp, "minute": minuteRaw } = JSON.parse(item);
    const minute = new Minute(minuteRaw.speechList);
    return { structVersion, timestamp, minute };
  }
  return emptyMinute();

}

function keyToTitle(key: string) {
  return key.substring(MINUTE_PREFIX.length);
}

export function titleList(): MinuteIndex[] {
  return [...Array(ls.length).keys()]
    .map(x => ls.key(x))
    .filter((x: string) => x && x.startsWith(MINUTE_PREFIX))
    .map(minuteKey => {
      const item = minuteKey && ls.getItem(minuteKey);
      const { timestamp } = item ? JSON.parse(item) : {"timestamp": 0};
      return new MinuteIndex(keyToTitle(minuteKey || ""), timestamp);
    })
    .sort((a, b) => b.timestamp - a.timestamp);
}

export default class MinutesStorage {

  data: MinutesData;

  constructor(readonly title: string) {
    this.data = restore(title);
  }

  setMinute(minute: Minute) {
    this.data.minute = minute;
    store(this);
  }

  getMinute(): Minute {
    return this.data.minute.copy({});
  }

  record(speech: Speech) {
    this.data.minute = this.data.minute.copy({"speechList": [...this.data.minute.speechList, speech]});
    store(this);
  }

  clear() {
    this.data = emptyMinute();
    store(this);
  }

}

export function createNewMinute(title: string) {
  store(new MinutesStorage(title));
}
