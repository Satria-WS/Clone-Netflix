import useSwr from 'swr'; // Importing the useSwr hook from the SWR library
import fetcher from '@/lib/fetcher'; // Importing the fetcher function for making HTTP requests

// Define the custom hook useCurrentUser
const useCurrentUser = () => {
  // Destructure the properties returned by useSwr hook
  const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);

  // Return an object containing the data, error, loading state, and mutate function
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// Export the useCurrentUser hook as the default export of this module
export default useCurrentUser;
