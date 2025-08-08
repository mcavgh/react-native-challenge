import React from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useUsers } from '../hooks/use-users';
import { UserCard } from '../components/user-card';
import { LoadingSpinner } from '../../../shared/components/loading-spinner';
import { ErrorMessage } from '../../../shared/components/error-message';
import { User } from '../../../shared/entities/user';

export const UsersScreen: React.FC = () => {
  const { data: users, isLoading, error, refetch } = useUsers();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Error al cargar los usuarios" onRetry={refetch} />;

  const renderUser = ({ item }: { item: User }) => (
    <UserCard user={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});