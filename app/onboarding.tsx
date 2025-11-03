import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    // Small delay to ensure AsyncStorage is written before navigation
    setTimeout(() => {
      router.replace('/auth/signup');
    }, 100);
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    // Small delay to ensure AsyncStorage is written before navigation
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
      // On last slide, go to signup
      await handleGetStarted();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
        style={styles.scrollView}
      >
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.content}>
              <Text style={styles.emoji}>{benefit.emoji}</Text>
              <Text style={styles.title}>{benefit.title}</Text>
              <Text style={styles.description}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicators}>
        {benefits.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlide === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {currentSlide === benefits.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  indicatorActive: {
    backgroundColor: '#007AFF',
    width: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 48,
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#666',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flex: 1,
    marginLeft: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

