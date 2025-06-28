// import { Router } from "next/router"

// export const navigationToGameDetails = (router: Router, gameId: number) => {
//     router.push(`/game/${gameId}`)
// }

import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();
  
  const navigateToGameDetails = (gameId: number) => {
    router.push(`/game/${gameId}`);
  };

  return { navigateToGameDetails };
};