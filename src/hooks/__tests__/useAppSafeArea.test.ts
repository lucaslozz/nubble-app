import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import {renderHook} from 'test-utils';

import {theme} from '@theme';

import {useAppSafeArea} from '../useAppSafeArea/useAppSafeArea';

jest.mock('react-native-safe-area-context');

const mockedUseSafeAreaInsets = jest.mocked(useSafeAreaInsets);

describe('useAppSafeArea', () => {
  it('should return the default value if the safe areas are less then the value default', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () =>
        ({
          top: 4,
          bottom: 2,
        } as EdgeInsets),
    );

    const {result} = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(theme.spacing.s20);
    expect(result.current.bottom).toEqual(theme.spacing.s20);
  });

  it('when the safe area is greater than minimum requirement, it returns the safe area', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(
      () =>
        ({
          top: 40,
          bottom: 40,
        } as EdgeInsets),
    );

    const {result} = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(40);
    expect(result.current.bottom).toEqual(40);
  });
});
