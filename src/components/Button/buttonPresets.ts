import {ThemeColors} from '../../theme/theme';
import {TouchableOpacityBoxProps} from '../Box/Box';

import {ButtonPreset} from './Button';

interface ButtonUi {
  container: TouchableOpacityBoxProps;
  content: ThemeColors;
}

export const buttonPresets: Record<
  ButtonPreset,
  {default: ButtonUi; disabled: ButtonUi}
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'primaryContrast',
    },
    disabled: {container: {backgroundColor: 'gray4'}, content: 'gray2'},
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: 'primary',
    },
    disabled: {
      container: {borderWidth: 1, borderColor: 'gray4'},
      content: 'gray2',
    },
  },
};
