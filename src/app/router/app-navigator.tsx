import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './tab-navigator';
import { PostDetailScreen } from '../../features/posts/screens/post-detail-screen';
import { CustomHeader } from '../../shared/components/custom-header';
import { RootStackParamList } from '../../shared/types/navigation';
import { useTranslation } from '../../shared/hooks/use-translation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="PostDetail" 
          component={PostDetailScreen} 
          options={{
            header: (props) => (
              <CustomHeader
                {...props}
                title={t('postDetail.title')}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
