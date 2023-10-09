import { useParams } from 'react-router-dom';
export function useNavigateRoute(route: string): string {
  const { id } = useParams();
  const currentPath = window.location.pathname;
  const baseLink = currentPath.match(/^(\/project\/\w+\/)/);
  if (baseLink && baseLink.length > 0) {
    if (id) {
      return `${baseLink[0]}${id}/${route}`;
    }
    return `${baseLink[0]}${route}`;
  }
  return '/';
}
