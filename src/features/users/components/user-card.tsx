import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../../shared/entities/user';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  
  return (
    <TouchableOpacity style={styles.container} >
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color="#fff" />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{`${user.firstname} ${user.lastname}`}</Text>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Ionicons name="mail" size={16} color="#666" />
            <Text style={styles.contactText}>{user.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call" size={16} color="#666" />
            <Text style={styles.contactText}>{user.phone}</Text>
          </View>
        </View>
        <Text style={styles.company}>{user.company.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contactInfo: {
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  company: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});