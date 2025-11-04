import { useState } from 'react';
import { ScrollView, XStack, YStack } from 'tamagui';
import { Avatar, Button, Card, Input, Text } from './design-system';

/**
 * Demo component showing all design system components
 * This demonstrates proper usage and theme integration
 */
export function DesignSystemDemo() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  
  return (
    <ScrollView>
      <YStack padding="$md" gap="$lg">
        
        {/* Typography Examples */}
        <Card>
          <YStack gap="$sm">
            <Text variant="h2">Typography</Text>
            <Text variant="display">Display Text</Text>
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body">Body text - regular weight</Text>
            <Text variant="bodyEmphasis">Body text - emphasis</Text>
            <Text variant="caption">Caption text</Text>
            <Text variant="small">Small text</Text>
          </YStack>
        </Card>
        
        {/* Button Variants */}
        <Card>
          <YStack gap="$sm">
            <Text variant="h2">Buttons</Text>
            
            <Text variant="caption" color="secondary">Primary</Text>
            <Button variant="primary" onPress={() => console.log('Primary pressed')}>
              Primary Button
            </Button>
            
            <Text variant="caption" color="secondary">Secondary</Text>
            <Button variant="secondary" onPress={() => console.log('Secondary pressed')}>
              Secondary Button
            </Button>
            
            <Text variant="caption" color="secondary">Destructive</Text>
            <Button variant="destructive" onPress={() => console.log('Delete pressed')}>
              Delete
            </Button>
            
            <Text variant="caption" color="secondary">Sizes</Text>
            <XStack gap="$sm" flexWrap="wrap">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </XStack>
            
            <Button fullWidth>Full Width Button</Button>
            <Button disabled>Disabled Button</Button>
          </YStack>
        </Card>
        
        {/* Input Examples */}
        <Card>
          <YStack gap="$sm">
            <Text variant="h2">Input Fields</Text>
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                setInputError('');
              }}
              helperText="We'll never share your email"
            />
            
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              error={inputError}
            />
            
            <Button 
              onPress={() => setInputError('Invalid password')}
              variant="secondary"
              size="small"
            >
              Trigger Error
            </Button>
          </YStack>
        </Card>
        
        {/* Avatar Examples */}
        <Card>
          <YStack gap="$sm">
            <Text variant="h2">Avatars</Text>
            
            <Text variant="caption" color="secondary">With Emoji</Text>
            <XStack gap="$sm">
              <Avatar emoji="🎁" size="small" />
              <Avatar emoji="🎂" size="medium" />
              <Avatar emoji="❤️" size="large" />
              <Avatar emoji="🎉" size="xlarge" />
            </XStack>
            
            <Text variant="caption" color="secondary">With Initials</Text>
            <XStack gap="$sm">
              <Avatar name="John Doe" size="small" />
              <Avatar name="Jane Smith" size="medium" />
              <Avatar name="Bob Johnson" size="large" />
            </XStack>
          </YStack>
        </Card>
        
        {/* Card Elevations */}
        <YStack gap="$sm">
          <Text variant="h2">Card Elevations</Text>
          
          <Card elevation="none">
            <Text variant="body">No elevation</Text>
          </Card>
          
          <Card elevation="low">
            <Text variant="body">Low elevation (default)</Text>
          </Card>
          
          <Card elevation="medium">
            <Text variant="body">Medium elevation</Text>
          </Card>
          
          <Card elevation="high">
            <Text variant="body">High elevation</Text>
          </Card>
          
          <Card bordered elevation="none">
            <Text variant="body">Bordered card (no elevation)</Text>
          </Card>
        </YStack>
        
        {/* Color Variants */}
        <Card>
          <YStack gap="$sm">
            <Text variant="h2">Text Colors</Text>
            <Text color="primary">Primary color text</Text>
            <Text color="secondary">Secondary color text</Text>
            <Text color="tertiary">Tertiary color text</Text>
            <Text color="error">Error color text</Text>
            <Text color="success">Success color text</Text>
          </YStack>
        </Card>
        
      </YStack>
    </ScrollView>
  );
}

