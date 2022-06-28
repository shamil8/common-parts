/** timeToMs & msToTime const and types */
const timeTypes = {
  second: 1000,
  minute: 60,
  hour: 60,
  day: 24,
  week: 7,
};

type UnitTime = keyof typeof timeTypes;

const timeUnits = Object.keys(timeTypes) as UnitTime[];

/** parallelLoop type and params interface */
type TAsyncFunction <A, O> = (...args: A[]) => Promise<O>;

interface IParallelLoopConfig {
  repeatEverydays?: number;
  wakeTime?: string;
}

/** Math floor with precision */
export const mathFloor = (value: number, precision = 4): number => {
  const form = 10 ** precision;

  return Math.floor(value * form) / form || 0;
};

/** The sleep func returns new promise for await something. */
export const sleep = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

/** Convert time with unit to milliseconds */
export const timeToMs = (time: number, unit: UnitTime = 'second'): number => {
  if (unit === 'second') {
    return time * timeTypes[unit];
  }

  return timeToMs(time * timeTypes[unit], timeUnits[timeUnits.indexOf(unit) - 1]);
};

/** Convert milliseconds to time with unit */
export const msToTime = (time: number, unit: UnitTime = 'second'): number => {
  if (unit === 'second') {
    return mathFloor(time / timeTypes[unit]);
  }

  return msToTime(time / timeTypes[unit], timeUnits[timeUnits.indexOf(unit) - 1]);
};

// TODO:: NEED TO CHECK FUNC AND WRITE TEST!
export async function parallelLoop(callFun: TAsyncFunction<any, void>, { repeatEverydays = 1, wakeTime = '21:00', }: IParallelLoopConfig = {}, ...p: unknown[]): Promise<void> {
  let diff: number | null = null;

  if (wakeTime) {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    const runDate = new Date(`${dateStr}T${wakeTime}`);

    if (runDate.getTime() < today.getTime()) {
      runDate.setDate(runDate.getDate() + 1);
    }

    diff = runDate.getTime() - today.getTime();

    console.log('today:', today, 'runDate:', runDate, 'difff:', diff);
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (diff) {
      await sleep(diff); // for first loop
    }

    await callFun(...p);

    diff = null;

    await sleep(timeToMs(repeatEverydays, 'day')); // for other loops
  }
}
