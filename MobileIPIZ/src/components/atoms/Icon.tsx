/**
 * IPIZ Mobile App - Atomic Icon Component
 * Professional icon component with Tailwind CSS and Unicode symbols
 */

import React, { FC } from 'react';
import { View } from 'react-native';

type IconName =
  | 'home'
  | 'academic'
  | 'notification'
  | 'profile'
  | 'settings'
  | 'search'
  | 'menu'
  | 'back'
  | 'close'
  | 'check'
  | 'add'
  | 'remove'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-up'
  | 'filter'
  | 'sort'
  | 'more'
  | 'user'
  | 'bell'
  | 'calendar'
  | 'book'
  | 'grade'
  | 'announcement'
  | 'job'
  | 'briefcase'
  | 'certificate'
  | 'mentor'
  | 'logout'
  | 'edit'
  | 'delete'
  | 'visibility'
  | 'visibility-off'
  | 'star'
  | 'heart'
  | 'share'
  | 'download'
  | 'upload'
  | 'mail'
  | 'phone'
  | 'location'
  | 'time'
  | 'info'
  | 'warning'
  | 'error'
  | 'success';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type IconColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'inverse'
  | 'accent'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

interface Props {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  onPress?: () => void;
}

// Unicode icon mappings (professional symbols)
const iconMap: Record<IconName, string> = {
  home: '\u2302',
  academic: '\u{1F4DA}',
  notification: '\u{1F514}',
  profile: '\u{1F464}',
  settings: '\u{2699}\u{FE0F}',
  search: '\u{1F50D}',
  menu: '\u{2630}\u{FE0F}',
  back: '\u2190',
  close: '\u2715',
  check: '\u2713',
  add: '\u002B',
  remove: '\u2212',
  'chevron-right': '\u203A',
  'chevron-down': '\u203A',
  'chevron-left': '\u2039',
  'chevron-up': '\u2039',
  filter: '\u{1F50D}',
  sort: '\u2195',
  more: '\u22EE',
  user: '\u{1F464}',
  bell: '\u{1F514}',
  calendar: '\u{1F4C5}',
  book: '\u{1F4D6}',
  grade: '\u{1F4DD}',
  announcement: '\u{1F4E4}',
  job: '\u{1F4BC}',
  briefcase: '\u{1F4BC}',
  certificate: '\u{1F4C4}',
  mentor: '\u{1F465}',
  logout: '\u{1F6D1}\u{FE0F}',
  edit: '\u270E\u{FE0F}',
  delete: '\u{1F5D1}\u{FE0F}',
  visibility: '\u{1F441}\u{FE0F}',
  'visibility-off': '\u{1F648}',
  star: '\u2B50',
  heart: '\u2764\u{FE0F}',
  share: '\u{1F4E4}',
  download: '\u{1F4E5}',
  upload: '\u{1F4E4}',
  mail: '\u{1F4E7}',
  phone: '\u{1F4DE}',
  location: '\u{1F4CD}',
  time: '\u23F0',
  info: '\u2139\u{FE0F}',
  warning: '\u26A0\u{FE0F}',
  error: '\u274C',
  success: '\u2705',
};

export const Icon: FC<Props> = ({
  name,
  size = 'md',
  color = 'primary',
  className = '',
  onPress,
}) => {
  // Size classes mapping
  const getSizeClasses = (): string => {
    switch (size) {
      case 'xs':
        return 'w-3 h-3 text-xs';
      case 'sm':
        return 'w-4 h-4 text-sm';
      case 'md':
        return 'w-6 h-6 text-base';
      case 'lg':
        return 'w-8 h-8 text-lg';
      case 'xl':
        return 'w-10 h-10 text-xl';
      case '2xl':
        return 'w-12 h-12 text-2xl';
      default:
        return 'w-6 h-6 text-base';
    }
  };

  // Color classes mapping
  const getColorClasses = (): string => {
    switch (color) {
      case 'primary':
        return 'text-text-primary';
      case 'secondary':
        return 'text-text-secondary';
      case 'tertiary':
        return 'text-text-tertiary';
      case 'disabled':
        return 'text-text-disabled';
      case 'inverse':
        return 'text-text-inverse';
      case 'accent':
        return 'text-text-accent';
      case 'error':
        return 'text-error-500';
      case 'success':
        return 'text-success-500';
      case 'warning':
        return 'text-warning-500';
      case 'info':
        return 'text-info-500';
      default:
        return 'text-text-primary';
    }
  };

  // Combine classes
  const containerClasses = [
    'items-center justify-center',
    getSizeClasses(),
    onPress && 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  const textClasses = [
    'text-center leading-none',
    getColorClasses(),
  ].filter(Boolean).join(' ');

  const iconSymbol = iconMap[name] || '\u25CF'; // Default dot if icon not found

  if (onPress) {
    return (
      <View className={containerClasses} onTouchEnd={onPress}>
        <View className={textClasses}>
          {iconSymbol}
        </View>
      </View>
    );
  }

  return (
    <View className={containerClasses}>
      <View className={textClasses}>
        {iconSymbol}
      </View>
    </View>
  );
};

// Export convenience icon components
export const HomeIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="home" />
);

export const SearchIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="search" />
);

export const UserIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="user" />
);

export const SettingsIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="settings" />
);

export const NotificationIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="notification" />
);

export const BackIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="back" />
);

export const CloseIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="close" />
);

export const CheckIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="check" />
);

export const AddIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="add" />
);

export const ChevronRightIcon: FC<Omit<Props, 'name'>> = (props) => (
  <Icon {...props} name="chevron-right" />
);

export default Icon;

