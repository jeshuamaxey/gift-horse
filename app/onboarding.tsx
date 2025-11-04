import { Button, Text } from '@/components/design-system';
import { useThemeColors } from '@/utils/themeHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, Text as RNText, ScrollView } from 'react-native';
import { XStack, YStack } from 'tamagui';

const { width } = Dimensions.get('window');

const ONBOARDING_KEY = '@onboarding_seen';

interface BenefitSlide {
  title: string;
  description: string;
  emoji: string;
}

const benefits: BenefitSlide[] = [
  {
    title: 'Capture gift ideas in seconds',
    description: 'Quickly save gift ideas with photos, text, or shared images. Get ideas stored before you forget them.',
    emoji: '⚡',
  },
  {
    title: 'Become an incredibly organised gift giver',
    description: 'Keep all your gift ideas organized by person. Never lose track of what you wanted to get for someone.',
    emoji: '🎯',
  },
  {
    title: 'Set reminders so you never miss another birthday',
    description: 'Get notified ahead of birthdays and occasions so you always have time to plan and find the perfect gift.',
    emoji: '📅',
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setTimeout(() => {
      router.replace('/auth/signup');
    }, 100);
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setTimeout(() => {
      router.replace('/auth/login');
    }, 100);
  };

  const handleNext = async () => {
    if (currentSlide < benefits.length - 1) {
      const nextSlide = currentSlide + 1;
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
      setCurrentSlide(nextSlide);
    } else {
      await handleGetStarted();
    }
  };

  const colors = useThemeColors();
  const bgColor = colors.background;
  const primaryColor = colors.primary;
  const borderColor = colors.border;

  return (
    <YStack flex={1} backgroundColor={bgColor}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
        style={{ flex: 1 }}
      >
        {benefits.map((benefit, index) => (
          <YStack 
            key={index} 
            width={width}
            flex={1}
            justifyContent="center"
            alignItems="center"
            padding="$lg"
          >
            <YStack alignItems="center" maxWidth={320}>
              <RNText style={{ fontSize: 80, marginBottom: 32, lineHeight: 96 }}>
                {benefit.emoji}
              </RNText>
              <Text 
                variant="h1" 
                textAlign="center" 
                marginBottom="$md"
              >
                {benefit.title}
              </Text>
              <Text 
                variant="body" 
                color="secondary"
                textAlign="center"
                lineHeight={24}
              >
                {benefit.description}
              </Text>
            </YStack>
          </YStack>
        ))}
      </ScrollView>

      {/* Indicators */}
      <XStack
        justifyContent="center"
        alignItems="center"
        paddingVertical="$lg"
        gap="$sm"
      >
        {benefits.map((_, index) => (
          <YStack
            key={index}
            width={currentSlide === index ? 24 : 8}
            height={8}
            borderRadius={4}
            backgroundColor={currentSlide === index ? primaryColor : borderColor}
          />
        ))}
      </XStack>

      {/* Action buttons */}
      <XStack
        justifyContent="space-between"
        padding="$lg"
        paddingBottom="$xxl"
        gap="$md"
      >
        <Button 
          variant="ghost" 
          onPress={handleSkip}
          hapticFeedback={false}
        >
          Skip
        </Button>

        <YStack flex={1}>
          <Button 
            variant="primary" 
            onPress={handleNext}
            fullWidth
          >
            {currentSlide === benefits.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </YStack>
      </XStack>
    </YStack>
  );
}

