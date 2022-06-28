// TODO:: Improve all these functions and write tests!
/** Types */
type TAsyncFunction <A, O> = (...args: A[]) => Promise<O>;
export type TimeType = 'second' | 'minute' | 'hour' | 'day' | 'week';

interface IParallelLoopConfig {
  repeatEverydays?: number;
  wakeTime?: string;
}

export const mathFloor = (value: number, precision = 4): number => {
  const form = 10 ** precision;

  return Math.floor(value * form) / form || 0;
};

export const timeToDay = (timeStr: string): number => {
  const time = +timeStr;

  return time === 0 ? time : mathFloor(time / 86400);
};

// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

/** Convert time with time type to milliseconds */
export const timeToMillSec = (time: number, type: TimeType = 'second'): number => {
  switch (type) {
    case ('week'):
      return time * 1000 * 60 * 60 * 24 * 7;

    case ('day'):
      return time * 1000 * 60 * 60 * 24;

    case ('hour'):
      return time * 1000 * 60 * 60;

    case ('minute'):
      return time * 1000 * 60;

    default:
      return time * 1000;
  }
};

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

    await sleep(timeToMillSec(repeatEverydays, 'day')); // for other loops
  }
}
