import React from 'react';
import { Colors } from '../theme/colors';
import { useAppTheme } from '../contexts/ThemeContext';

/**
 * A tiny helper that creates memoized styles based on the current theme
 * colors.  The builder function receives the `colors` object and should
 * return the result of `StyleSheet.create(...)` (or any plain object if
 * you prefer).
 *
 * By moving style generation outside of the component body we avoid
 * rebuilding the style object on every render and keep components
 * declarative.  It also eliminates the need to pass `colors` around
 * manually.
 */
export function useStyles<T extends object>(builder: (colors: Colors) => T): T {
  const { colors } = useAppTheme();
  // builder is expected to be stable (either defined outside the component
  // or memoized itself).  If not, callers can wrap it in useCallback.
  return React.useMemo(() => builder(colors), [builder, colors]);
}
