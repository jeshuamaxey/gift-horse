import { useColorScheme } from 'react-native';
import { TamaguiProvider as TamaguiProviderBase, Theme } from 'tamagui';
import config from '../tamagui.config';

export function TamaguiProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const themeName = colorScheme === 'dark' ? 'dark' : 'light';
  
  return (
    <TamaguiProviderBase 
      key={themeName}
      config={config} 
      defaultTheme={themeName}
    >
      <Theme name={themeName}>
        {children}
      </Theme>
    </TamaguiProviderBase>
  );
}

