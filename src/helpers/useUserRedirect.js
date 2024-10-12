// useUserRedirect.js
import { useEffect } from 'react';
// Correct import
import { useRouter } from 'next/router';

function useUserRedirect() {
  const router = useRouter();

  useEffect(() => {
    const userString = JSON.parse(localStorage.getItem('e-learning-user'));
    if (userString) {
      // User exists in local storage, navigate to '/home'
      router.push('/Admin');
    }
    else{
        router.push('/login');
    }
  }, [router]);

  // No need to return anything from this hook
}

export default useUserRedirect;
