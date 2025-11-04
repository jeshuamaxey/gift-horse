import { AnimatedCard, Avatar, Button, Card, Input, Text } from '@/components/design-system';
import { useThemeColors } from '@/utils/themeHelpers';
import { ScrollView } from 'react-native';
import { XStack, YStack } from 'tamagui';


export default function ComponentsShowcase() {
  const colors = useThemeColors();
  const bgColor = colors.background;

  // Only render in dev mode
  if (!__DEV__) {
    return null;
  }

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: bgColor }}
      contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
    >
      <YStack gap={4}>
        {/* Header */}
        <Text variant="largeTitle">Component Showcase</Text>
        <Text variant="caption" color="secondary">Dev-only page for reviewing design consistency</Text>

        {/* Text Component */}
        <Text variant="h2" marginTop="$md">Text Component</Text>
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
          <Text variant="body" color="primary">Primary color</Text>
          <Text variant="body" color="secondary">Secondary color</Text>
          <Text variant="body" color="tertiary">Tertiary color</Text>
          <Text variant="body" color="error">Error color</Text>
          <Text variant="body" color="success">Success color</Text>

          {/* Button Component */}
          <Text variant="h2" marginTop="$lg">Button Component</Text>
          <Text variant="caption" color="secondary">Variants</Text>
          <Button variant="primary" fullWidth onPress={() => {}}>Primary Button</Button>
          <Button variant="secondary" fullWidth onPress={() => {}}>Secondary Button</Button>
          <Button variant="destructive" fullWidth onPress={() => {}}>Destructive Button</Button>
          <Button variant="ghost" fullWidth onPress={() => {}}>Ghost Button</Button>
          
          <Text variant="caption" color="secondary" marginTop="$md">Sizes</Text>
          <Button variant="primary" size="small" fullWidth onPress={() => {}}>Small Button</Button>
          <Button variant="primary" size="medium" fullWidth onPress={() => {}}>Medium Button</Button>
          <Button variant="primary" size="large" fullWidth onPress={() => {}}>Large Button</Button>
          
          <Text variant="caption" color="secondary" marginTop="$md">States</Text>
          <Button variant="primary" fullWidth onPress={() => {}} disabled>Disabled Button</Button>
          <Button variant="primary" fullWidth onPress={() => {}}>Full Width Button</Button>

          {/* Input Component */}
          <Text variant="h2" marginTop="$lg">Input Component</Text>
          <Input placeholder="Default input" />
          <Input label="Input with label" placeholder="Enter text here" />
          <Input label="Input with helper text" placeholder="Enter text here" helperText="This is helpful information" />
          <Input label="Input with error" placeholder="Enter text here" error="This field is required" />
          <Input label="Disabled input" placeholder="Cannot edit this" editable={false} />

          {/* Card Component */}
          <Text variant="h2" marginTop="$lg">Card Component</Text>
          <Card elevation="none"><Text variant="body">Card with no elevation</Text></Card>
          <Card elevation="low"><Text variant="body">Card with low elevation</Text></Card>
          <Card elevation="medium"><Text variant="body">Card with medium elevation</Text></Card>
          <Card elevation="high"><Text variant="body">Card with high elevation</Text></Card>
          <Card elevation="low" bordered><Text variant="body">Card with border</Text></Card>

          {/* Avatar Component */}
          <Text variant="h2" marginTop="$lg">Avatar Component</Text>
          <Text variant="caption" color="secondary">Sizes</Text>
          <XStack gap={3} alignItems="center" flexWrap="wrap">
            <Avatar size="small" name="John Doe" />
            <Avatar size="medium" name="John Doe" />
            <Avatar size="large" name="John Doe" />
            <Avatar size="xlarge" name="John Doe" />
          </XStack>
          
          <Text variant="caption" color="secondary" marginTop="$md">With Emoji</Text>
          <XStack gap={3} alignItems="center" flexWrap="wrap">
            <Avatar size="small" emoji="🎉" />
            <Avatar size="medium" emoji="🎂" />
            <Avatar size="large" emoji="🎁" />
            <Avatar size="xlarge" emoji="❤️" />
          </XStack>
          
          <Text variant="caption" color="secondary" marginTop="$md">Initials</Text>
          <XStack gap={3} alignItems="center" flexWrap="wrap">
            <Avatar size="medium" name="John Doe" />
            <Avatar size="medium" name="Jane Smith" />
            <Avatar size="medium" name="Bob" />
            <Avatar size="medium" />
          </XStack>

          {/* AnimatedCard Component */}
          <Text variant="h2" marginTop="$lg">AnimatedCard Component</Text>
          <Text variant="caption" color="secondary">Tap the cards below to see the animation</Text>
          <AnimatedCard elevation="medium" onPress={() => {}} accessibilityLabel="Animated card example">
            <Text variant="h3">Animated Card</Text>
            <Text variant="body" color="secondary">This card has press animation</Text>
          </AnimatedCard>
          <AnimatedCard elevation="medium" onPress={() => {}} disabled accessibilityLabel="Disabled animated card">
            <Text variant="h3">Disabled Animated Card</Text>
            <Text variant="body" color="secondary">This card is disabled</Text>
          </AnimatedCard>
          <AnimatedCard elevation="low" bordered>
            <Text variant="h3">Non-interactive AnimatedCard</Text>
            <Text variant="body" color="secondary">This card has no onPress handler</Text>
          </AnimatedCard>

          {/* Component Combinations */}
          <Text variant="h2" marginTop="$lg">Component Combinations</Text>
          <Text variant="caption" color="secondary">Example form with multiple components</Text>
          <Input label="Name" placeholder="Enter recipient name" />
          <Input label="Email" placeholder="email@example.com" keyboardType="email-address" />
        <Button variant="primary" fullWidth onPress={() => {}}>Submit</Button>
      </YStack>
    </ScrollView>
  );
}

