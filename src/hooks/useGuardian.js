import { useIdentityContext } from 'react-netlify-identity';

export default function useGuardian() {
  return useIdentityContext().user.user_metadata.guardian;
}
