import React, { FC } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';

export const SettingsScreen: FC = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()
    : 'JS';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>IPIZ</Text>
          </View>
          <Text style={styles.headerScreenTitle}>Configurações</Text>
        </View>
        <View style={styles.avatarSmall}>
          <Text style={styles.avatarSmallText}>{initials}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Row 1 - Notificações */}
        <View style={styles.settingRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.rowIcon}>🔔</Text>
          </View>
          <Text style={styles.rowLabel}>Notificações</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D5DB', true: TEAL }}
            thumbColor="#fff"
          />
        </View>

        {/* Row 2 - Privacidade */}
        <Pressable style={styles.settingRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.rowIcon}>🔒</Text>
          </View>
          <Text style={styles.rowLabel}>Privacidade</Text>
          <Text style={styles.rowArrow}>{'>'}</Text>
        </Pressable>

        {/* Row 3 - Idioma */}
        <Pressable style={styles.settingRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.rowIcon}>🌐</Text>
          </View>
          <Text style={styles.rowLabel}>Idioma</Text>
          <Text style={styles.rowValueArrow}>Português {'>'}</Text>
        </Pressable>

        {/* Row 4 - Tema */}
        <View style={styles.settingRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.rowIcon}>{isDark ? '🌙' : '☀️'}</Text>
          </View>
          <Text style={styles.rowLabel}>Tema</Text>
          <View style={styles.themeToggleGroup}>
            <Text style={styles.themeIcon}>☀️</Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D5DB', true: TEAL }}
              thumbColor="#fff"
            />
            <Text style={styles.themeIcon}>🌙</Text>
          </View>
        </View>

        {/* Row 5 - Sobre */}
        <Pressable style={styles.settingRow}>
          <View style={styles.iconCircle}>
            <Text style={styles.rowIcon}>ℹ️</Text>
          </View>
          <Text style={styles.rowLabel}>Sobre</Text>
          <Text style={styles.rowArrow}>{'>'}</Text>
        </Pressable>

        <Text style={styles.versionText}>IPIZ Mobile App v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const TEAL = '#0D9488';
const BG = '#F0FDFA';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TEAL,
  },
  header: {
    backgroundColor: TEAL,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 13,
    fontWeight: '800',
    color: TEAL,
  },
  headerScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: {
    fontSize: 14,
    fontWeight: '700',
    color: TEAL,
  },
  scroll: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 10,
  },
  settingRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowIcon: {
    fontSize: 18,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  rowArrow: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  rowValueArrow: {
    fontSize: 14,
    color: TEAL,
    fontWeight: '600',
  },
  themeToggleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  themeIcon: {
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 16,
  },
});

export default SettingsScreen;
