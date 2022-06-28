import { timeToMillSec, } from './index';

test('timeToMillSec type tests', () => {
  /** Second tests */
  expect(timeToMillSec(3)).toBe(3000);
  expect(timeToMillSec(0)).toBe(0);
  expect(timeToMillSec(1, 'second')).toEqual(1000);
  expect(timeToMillSec(50, 'second')).toBe(50000);

  /** Minute tests */
  expect(timeToMillSec(15, 'minute')).toBe(15 * 60000);
  expect(timeToMillSec(0, 'minute')).toBe(0);
  expect(timeToMillSec(1, 'minute')).toEqual(60000);
  expect(timeToMillSec(50, 'minute')).toBe(3e6);

  /** Hour tests */
  expect(timeToMillSec(15, 'hour')).toBe(15 * 60000 * 60);
  expect(timeToMillSec(0, 'hour')).toBe(0);
  expect(timeToMillSec(1, 'hour')).toEqual(3600000);
  expect(timeToMillSec(50, 'hour')).toBe(18e7);

  /** Day tests */
  expect(timeToMillSec(15, 'day')).toBe(15 * 24 * 36e5);
  expect(timeToMillSec(0, 'day')).toBe(0);
  expect(timeToMillSec(1, 'day')).toEqual(24 * 36e5);
  expect(timeToMillSec(50, 'day')).toBe(50 * 24 * 36e5);

  /** Week tests */
  expect(timeToMillSec(15, 'week')).toBe(15 * 7 * 24 * 36e5);
  expect(timeToMillSec(0, 'week')).toBe(0);
  expect(timeToMillSec(1, 'week')).toEqual(7 * 24 * 36e5);
  expect(timeToMillSec(50, 'week')).toBe(50 * 7 * 24 * 36e5);
});
