import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();
  
  const navigateToGameDetails = (gameId: number) => {
    router.push(`/game/${gameId}`);
  };

  return { navigateToGameDetails };
};