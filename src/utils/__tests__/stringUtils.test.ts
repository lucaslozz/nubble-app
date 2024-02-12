import {stringUtils} from '@utils';

describe('stringUtils', () => {
  describe('captalizeFirstLetter', () => {
    it('should capitalize the first letter of each word', () => {
      expect(stringUtils.captalizeFirstLetter('Ana maria')).toBe('Ana Maria');
      expect(stringUtils.captalizeFirstLetter('ANA MARIA')).toBe('Ana Maria');
      expect(stringUtils.captalizeFirstLetter('MaRIa')).toBe('Maria');
      expect(stringUtils.captalizeFirstLetter('maria')).toBe('Maria');
    });

    it('should remove leading and trailing spaces', () => {
      expect(stringUtils.captalizeFirstLetter(' Maria')).toBe('Maria');
      expect(stringUtils.captalizeFirstLetter(' Maria ')).toBe('Maria');
    });
  });
});
