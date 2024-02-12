import {dateUtils} from '@utils';
import {Duration, add, formatISO, sub} from 'date-fns';

const MOCKED_NOW = 1707593720;

function getDateISO(duration: Duration, op?: 'sub' | 'add') {
  op = op || 'sub';
  const time =
    op === 'sub' ? sub(Date.now(), duration) : add(Date.now(), duration);
  const timeISO = formatISO(time);

  return dateUtils.formatRelative(timeISO);
}
describe('dateUtils', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => MOCKED_NOW);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
  describe('formateRelative', () => {
    it('should display in seconds if less then 1 min ago', () => {
      expect(getDateISO({seconds: 30})).toEqual('30 s');
    });
    it('should display in minutes if less then 1 hour ago', () => {
      expect(getDateISO({minutes: 30})).toEqual('30 min');
    });

    it('should display in hours if less then 1 day ago', () => {
      expect(getDateISO({hours: 2})).toEqual('2 h');
    });

    it('should display in days if less then 1 week ago', () => {
      expect(getDateISO({days: 2})).toEqual('2 d');
    });

    it('should display in weeks if less then 1 month ago', () => {
      expect(getDateISO({weeks: 1})).toEqual('1 sem');
    });
    it('should display in months if less then 1 year ago', () => {
      const time = sub(Date.now(), {months: 10});
      const timeISO = formatISO(time);

      expect(dateUtils.formatRelative(timeISO)).toEqual('10 m');
    });

    it('should display in the format dd/MM/yyyy if more then 1 year', () => {
      expect(getDateISO({years: 2})).toEqual('20/01/1968');
    });

    it('should display in the format dd/MM/yyyy if future date', () => {
      expect(getDateISO({days: 2}, 'add')).toEqual('22/01/1970');
    });
  });
});
