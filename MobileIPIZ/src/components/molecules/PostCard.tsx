// IPIZ Mobile App - Molecule PostCard Component with Tailwind CSS
// Reusable card for feed posts notifications

import React, { FC } from 'react';
import { Pressable, View, Text } from 'react-native';

export interface Post {
  id: number;
  author: string;
  role: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  icon: string;
}

interface Props extends Post {
  onPress?: () => void;
}

const roleColorMap: Record<string, string> = {
  professor: 'blue',
  institutional: 'purple',
  student: 'emerald',
  system: 'gray',
};

const roleLabelMap: Record<string, string> = {
  professor: 'Professor',
  institutional: 'Institucional',
  student: 'Aluno',
  system: 'Sistema',
};

export const PostCard: FC<Props> = ({
  author,
  role,
  avatar,
  content,
  likes,
  comments,
  timestamp,
  icon,
  onPress,
}) => {
  const roleColor = roleColorMap[role] || 'gray';

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-700' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-700' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-700' },
    gray: { bg: 'bg-gray-50 dark:bg-slate-800', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-200 dark:border-slate-700' },
  };

  const colors = colorClasses[roleColor];

  return (
    <Pressable
      onPress={onPress}
      className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-4 mb-4 overflow-hidden shadow-sm`}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center space-x-3">
          <View className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full items-center justify-center">
            <Text className="text-2xl">{avatar}</Text>
          </View>
          <View className="flex-1">
            <Text className="font-bold text-gray-900 dark:text-gray-100">
              {author}
            </Text>
            <View className="flex-row items-center gap-2 mt-1">
              <View className={`${colors.bg} px-2 py-1 rounded`}> 
                <Text className={`text-xs font-semibold ${colors.text}`}> 
                  {roleLabelMap[role] || 'Outro'}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400">
                {timestamp}
              </Text>
            </View>
          </View>
        </View>
        <Text className="text-2xl">{icon}</Text>
      </View>

      <Text className="text-sm text-gray-900 dark:text-gray-100 leading-6 mb-4">
        {content}
      </Text>

      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
        <View className="flex-row items-center gap-4">
          <Pressable className="flex-row items-center gap-1">
            <Text className="text-lg">👍</Text>
            <Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {likes}
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-1">
            <Text className="text-lg">💬</Text>
            <Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {comments}
            </Text>
          </Pressable>
        </View>
        <Pressable className="flex-row items-center gap-1">
          <Text className="text-lg">↗️</Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Compartilhar
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default PostCard;
