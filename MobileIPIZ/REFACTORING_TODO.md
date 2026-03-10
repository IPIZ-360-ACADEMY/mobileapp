# IPIZ Mobile App - Refactoring Plan

## Phase 1: Fix Bugs
- [x] 1. Clear Metro Bundler Cache (fix "colors doesn't exist" error) - DONE! Metro is now running on port 8083
- [x] 2. Verify all imports are correct - DONE! Fixed unused imports and navigation types in StudentDashboard and TeacherDashboard
- [x] 3. Test the app runs without errors - DONE! App starts successfully without TypeScript errors

## Phase 2: Navigation Refactoring
- [x] 1. Update AppNavigator.tsx to use Tab Navigator - DONE! Replaced Drawer with Bottom Tab Navigator
- [x] 2. Add bottom tabs (Home, Academic, Notifications, Profile) - DONE! Added tabs for Home (StudentDashboard), Academic (Jobs), Notifications (Feed), Profile
- [x] 3. Style the tab bar with custom colors - DONE! Styled with theme colors

## Phase 3: Component Refactoring
- [x] 1. Create missing atomic components - DONE! Fixed Button, Box, Text components
- [ ] 2. Create missing molecule components
- [ ] 3. Create missing organism components

## Phase 4: Screen Refactoring
- [ ] 1. Update LoginScreen with new design
- [ ] 2. Update all dashboards with consistent styling
- [ ] 3. Create missing screens

## Phase 5: Code Improvements
- [ ] 1. Add proper TypeScript types
- [ ] 2. Fix any circular dependencies
- [ ] 3. Optimize imports

## Commands to run:
```bash
# Clear Metro cache and start
cd MobileDirectoryIPIZ/MobileIPIZ
npx expo start -c --port 8082
