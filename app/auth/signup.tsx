import { Button, Input, Text } from '@/components/design-system';
import { supabase } from '@/lib/supabase';
import { useThemeColors } from '@/utils/themeHelpers';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { YStack } from 'tamagui';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const colors = useThemeColors();

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
      return;
    }

    // Create profile in public.profiles table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
        });

      if (profileError) {
        setLoading(false);
        Alert.alert('Error', 'Failed to create profile: ' + profileError.message);
        return;
      }
    }

    setLoading(false);
    Alert.alert('Success', 'Account created! Please sign in.', [
      {
        text: 'OK',
        onPress: () => router.replace('/auth/login'),
      },
    ]);
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
          Create account
        </Text>
        <Text variant="body" color="secondary" marginBottom="$xl">
          Sign up to get started
        </Text>

        <YStack width="100%" gap="$md">
          <Input
            label="Full Name"
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

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
            onPress={handleSignUp}
            disabled={loading}
            fullWidth
            accessibilityLabel="Sign Up"
            accessibilityHint="Double tap to create a new account with your email and password"
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Sign Up'}
          </Button>

          <Link href="/auth/login" asChild>
            <Button 
              variant="secondary" 
              fullWidth 
              hapticFeedback={false}
              accessibilityLabel="Sign In"
              accessibilityHint="Double tap to go to the sign in screen"
            >
              <Text variant="body" color="secondary">
                Already have an account? <Text variant="bodyEmphasis" color="primary">Sign In</Text>
              </Text>
            </Button>
          </Link>
        </YStack>
      </YStack>
    </YStack>
  );
}
