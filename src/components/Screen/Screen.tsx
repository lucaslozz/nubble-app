import {Box} from '../Box/Box';

interface ScreenProps {
  children: React.ReactNode;
}

export function Screen({children}: ScreenProps) {
  return <Box p="s24">{children}</Box>;
}
