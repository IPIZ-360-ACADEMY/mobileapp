import React from 'react';
import { View, Text } from 'react-native';

// Legacy placeholder screen kept for navigation compatibility.  The
// real implementation has been moved to ProfessionalAdminDashboard.  This
// component simply renders an empty view to keep Metro from choking on an
// empty module.
export const AdminDashboard = () => (
  <View>
    <Text>Admin dashboard (legacy)</Text>
  </View>
);
