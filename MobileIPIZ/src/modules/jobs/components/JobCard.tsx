import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Card } from '../../../core/ui/Card';
import { AppText } from '../../../core/ui/AppText';
import { useAppTheme } from '../../../core/theme';
import { Job } from '../types/job';

type JobCardProps = {
  item: Job;
  onPress: (jobId: string) => void;
};

export const JobCard = React.memo(function JobCard({ item, onPress }: JobCardProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable onPress={() => onPress(item.id)} style={({ pressed }) => [styles.pressable, { opacity: pressed ? 0.9 : 1 }]}> 
      <Card>
        <View style={styles.rowTop}>
          <AppText variant="h3">{item.title}</AppText>
          <View style={[styles.badge, { backgroundColor: theme.colors.background }]}> 
            <AppText variant="caption" tone="muted">{item.contract}</AppText>
          </View>
        </View>
        <AppText variant="label" tone="primary" style={styles.company}>{item.company}</AppText>
        <AppText variant="body" tone="muted" numberOfLines={2} style={styles.summary}>
          {item.summary}
        </AppText>
        <View style={styles.footer}>
          <AppText variant="caption" tone="muted">{item.location}</AppText>
          <AppText variant="caption" tone="muted">{item.salary}</AppText>
        </View>
      </Card>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 12,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  company: {
    marginTop: 8,
  },
  summary: {
    marginTop: 8,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
