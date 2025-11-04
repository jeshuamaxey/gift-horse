import { Button, Input, Text } from '@/components/design-system';
import { supabase } from '@/lib/supabase';
import { useThemeColors } from '@/utils/themeHelpers';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { YStack } from 'tamagui';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const colors = useThemeColors();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      router.replace('/(tabs)');
    }
  };

  const bgColor = colors.background;

  return (
    <YStack flex={1} backgroundColor={bgColor} style={{ backgroundColor: bgColor }}>
      <YStack 
        flex={1} 
        justifyContent="center" 
        padding="$lg"
      >
        <Text variant="display" marginBottom="$xs">
          Welcome back
        </Text>
        <Text variant="body" color="secondary" marginBottom="$xl">
          Sign in to continue
        </Text>

        <YStack width="100%" gap="$md">
          <Input
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
          />

          <Button
            variant="primary"
            onPress={handleLogin}
            disabled={loading}
            fullWidth
            accessibilityLabel="Sign In"
            accessibilityHint="Double tap to sign in with your email and password"
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Sign In'}
          </Button>

          <Link href="/auth/signup" asChild>
            <Button 
              variant="secondary" 
              fullWidth 
              hapticFeedback={false}
              accessibilityLabel="Sign Up"
              accessibilityHint="Double tap to create a new account"
            >
              <Text variant="body" color="secondary">
                Don&apos;t have an account? <Text variant="bodyEmphasis" color="primary">Sign Up</Text>
              </Text>
            </Button>
          </Link>
        </YStack>
      </YStack>
    </YStack>
  );
}
