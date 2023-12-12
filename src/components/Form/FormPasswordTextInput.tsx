import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';
import {PasswordInput, PasswordInputProps} from '@components';

export function FormPasswordTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...passwordInputProps
}: PasswordInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => {
        return (
          <PasswordInput
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
            {...passwordInputProps}
          />
        );
      }}
    />
  );
}
