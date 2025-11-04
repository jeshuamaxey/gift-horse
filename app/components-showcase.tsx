import { AnimatedCard, Avatar, Button, Card, Input, Text } from '@/components/design-system';
import { useThemeColors } from '@/utils/themeHelpers';
import { ScrollView, View } from 'react-native';
import { XStack, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ComponentsShowcase() {
  const colors = useThemeColors();
  const bgColor = colors.background;

  // Only render in dev mode
  if (!__DEV__) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} edges={['top']}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        <YStack gap="$xl" backgroundColor={bgColor}>
          {/* Header */}
          <YStack gap="$xs">
            <Text variant="largeTitle">Component Showcase</Text>
            <Text variant="caption" color="secondary">
              Dev-only page for reviewing design consistency
            </Text>
          </YStack>

          {/* Text Component */}
          <YStack gap="$md">
            <Text variant="h2">Text Component</Text>
            <Card elevation="low">
              <YStack gap="$md">
                <YStack gap="$xs">
                  <Text variant="largeTitle">Large Title</Text>
                  <Text variant="display">Display</Text>
                  <Text variant="h1">Heading 1</Text>
                  <Text variant="h2">Heading 2</Text>
                  <Text variant="h3">Heading 3</Text>
                  <Text variant="body">Body text - The quick brown fox jumps over the lazy dog</Text>
                  <Text variant="bodyEmphasis">Body Emphasis - The quick brown fox jumps over the lazy dog</Text>
                  <Text variant="caption">Caption text</Text>
                  <Text variant="small">Small text</Text>
                  <Text variant="button">Button text</Text>
                </YStack>
                
                <YStack gap="$xs" marginTop="$md">
                  <Text variant="body" color="primary">Primary color</Text>
                  <Text variant="body" color="secondary">Secondary color</Text>
                  <Text variant="body" color="tertiary">Tertiary color</Text>
                  <Text variant="body" color="error">Error color</Text>
                  <Text variant="body" color="success">Success color</Text>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Button Component */}
          <YStack gap="$md">
            <Text variant="h2">Button Component</Text>
            <Card elevation="low">
              <YStack gap="$md">
                <YStack gap="$sm">
                  <Text variant="caption" color="secondary" marginBottom="$xs">Variants</Text>
                  <Button variant="primary" onPress={() => {}}>Primary Button</Button>
                  <Button variant="secondary" onPress={() => {}}>Secondary Button</Button>
                  <Button variant="destructive" onPress={() => {}}>Destructive Button</Button>
                  <Button variant="ghost" onPress={() => {}}>Ghost Button</Button>
                </YStack>
                
                <YStack gap="$sm" marginTop="$md">
                  <Text variant="caption" color="secondary" marginBottom="$xs">Sizes</Text>
                  <Button variant="primary" size="small" onPress={() => {}}>Small Button</Button>
                  <Button variant="primary" size="medium" onPress={() => {}}>Medium Button</Button>
                  <Button variant="primary" size="large" onPress={() => {}}>Large Button</Button>
                </YStack>
                
                <YStack gap="$sm" marginTop="$md">
                  <Text variant="caption" color="secondary" marginBottom="$xs">States</Text>
                  <Button variant="primary" onPress={() => {}} disabled>Disabled Button</Button>
                  <Button variant="primary" fullWidth onPress={() => {}}>Full Width Button</Button>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* Input Component */}
          <YStack gap="$md">
            <Text variant="h2">Input Component</Text>
            <Card elevation="low">
              <YStack gap="$md">
                <Input 
                  placeholder="Default input"
                />
                <Input 
                  label="Input with label"
                  placeholder="Enter text here"
                />
                <Input 
                  label="Input with helper text"
                  placeholder="Enter text here"
                  helperText="This is helpful information"
                />
                <Input 
                  label="Input with error"
                  placeholder="Enter text here"
                  error="This field is required"
                />
                <Input 
                  label="Disabled input"
                  placeholder="Cannot edit this"
                  editable={false}
                />
              </YStack>
            </Card>
          </YStack>

          {/* Card Component */}
          <YStack gap="$md">
            <Text variant="h2">Card Component</Text>
            <YStack gap="$md">
              <Card elevation="none">
                <Text variant="body">Card with no elevation</Text>
              </Card>
              <Card elevation="low">
                <Text variant="body">Card with low elevation</Text>
              </Card>
              <Card elevation="medium">
                <Text variant="body">Card with medium elevation</Text>
              </Card>
              <Card elevation="high">
                <Text variant="body">Card with high elevation</Text>
              </Card>
              <Card elevation="low" bordered>
                <Text variant="body">Card with border</Text>
              </Card>
            </YStack>
          </YStack>

          {/* Avatar Component */}
          <YStack gap="$md">
            <Text variant="h2">Avatar Component</Text>
            <Card elevation="low">
              <YStack gap="$md">
                <YStack gap="$sm">
                  <Text variant="caption" color="secondary" marginBottom="$xs">Sizes</Text>
                  <XStack gap="$md" alignItems="center">
                    <Avatar size="small" name="John Doe" />
                    <Avatar size="medium" name="John Doe" />
                    <Avatar size="large" name="John Doe" />
                    <Avatar size="xlarge" name="John Doe" />
                  </XStack>
                </YStack>
                
                <YStack gap="$sm" marginTop="$md">
                  <Text variant="caption" color="secondary" marginBottom="$xs">With Emoji</Text>
                  <XStack gap="$md" alignItems="center">
                    <Avatar size="small" emoji="🎉" />
                    <Avatar size="medium" emoji="🎂" />
                    <Avatar size="large" emoji="🎁" />
                    <Avatar size="xlarge" emoji="❤️" />
                  </XStack>
                </YStack>
                
                <YStack gap="$sm" marginTop="$md">
                  <Text variant="caption" color="secondary" marginBottom="$xs">Initials</Text>
                  <XStack gap="$md" alignItems="center">
                    <Avatar size="medium" name="John Doe" />
                    <Avatar size="medium" name="Jane Smith" />
                    <Avatar size="medium" name="Bob" />
                    <Avatar size="medium" />
                  </XStack>
                </YStack>
              </YStack>
            </Card>
          </YStack>

          {/* AnimatedCard Component */}
          <YStack gap="$md">
            <Text variant="h2">AnimatedCard Component</Text>
            <Card elevation="low">
              <YStack gap="$md">
                <Text variant="caption" color="secondary">
                  Tap the cards below to see the animation
                </Text>
                <AnimatedCard 
                  elevation="medium"
                  onPress={() => {}}
                  accessibilityLabel="Animated card example"
                >
                  <YStack gap="$xs">
                    <Text variant="h3">Animated Card</Text>
                    <Text variant="body" color="secondary">
                      This card has press animation
                    </Text>
                  </YStack>
                </AnimatedCard>
                <AnimatedCard 
                  elevation="medium"
                  onPress={() => {}}
                  disabled
                  accessibilityLabel="Disabled animated card"
                >
                  <YStack gap="$xs">
                    <Text variant="h3">Disabled Animated Card</Text>
                    <Text variant="body" color="secondary">
                      This card is disabled
                    </Text>
                  </YStack>
                </AnimatedCard>
                <AnimatedCard 
                  elevation="low"
                  bordered
                >
                  <YStack gap="$xs">
                    <Text variant="h3">Non-interactive AnimatedCard</Text>
                    <Text variant="body" color="secondary">
                      This card has no onPress handler
                    </Text>
                  </YStack>
                </AnimatedCard>
              </YStack>
            </Card>
          </YStack>

          {/* Component Combinations */}
          <YStack gap="$md">
            <Text variant="h2">Component Combinations</Text>
            <Card elevation="medium">
              <YStack gap="$md">
                <YStack gap="$xs">
                  <Text variant="h3">Card with Avatar and Button</Text>
                  <Text variant="body" color="secondary">
                    Example of components working together
                  </Text>
                </YStack>
                <XStack gap="$md" alignItems="center">
                  <Avatar size="large" name="John Doe" emoji="🎁" />
                  <YStack flex={1} gap="$xs">
                    <Text variant="bodyEmphasis">John Doe</Text>
                    <Text variant="caption" color="secondary">Birthday coming up</Text>
                  </YStack>
                  <Button variant="secondary" size="small" onPress={() => {}}>
                    View
                  </Button>
                </XStack>
              </YStack>
            </Card>
            
            <Card elevation="low" bordered>
              <YStack gap="$md">
                <Text variant="h3">Form Example</Text>
                <Input 
                  label="Name"
                  placeholder="Enter recipient name"
                />
                <Input 
                  label="Email"
                  placeholder="email@example.com"
                  keyboardType="email-address"
                />
                <Button variant="primary" fullWidth onPress={() => {}}>
                  Submit
                </Button>
              </YStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

