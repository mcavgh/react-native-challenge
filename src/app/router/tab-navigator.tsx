import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PostsScreen } from '../../features/posts/screens/posts-screen';
import { UsersScreen } from '../../features/users/screens/users-screen';
import { FavoritesScreen } from '../../features/favorites/screens/favorites-screen';
import { TabParamList } from '../../shared/types/navigation';
import { CustomHeader } from '../../shared/components/custom-header';
import { useTranslation } from '../../shared/hooks/use-translation';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Posts') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Users') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        routeName: route.name,
      })}
    >
      <Tab.Screen 
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={t('posts.title')}
            />
          ),
        }}
        name="Posts"
        component={PostsScreen} 
      />
      <Tab.Screen 
        name="Users" 
        component={UsersScreen} 
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={t('users.title')}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          header: (props) => (
            <CustomHeader
              {...props}
              title={t('favorites.title')}
            />
          ),
          
        }}  
      />
    </Tab.Navigator>
  );
};