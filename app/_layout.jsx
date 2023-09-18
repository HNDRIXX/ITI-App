import { Stack } from 'expo-router';
import { COLORS } from '../constant';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
