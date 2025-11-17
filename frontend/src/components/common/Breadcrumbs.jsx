import { Link, useMatches } from "react-router-dom";
function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => {
      const crumb = match.handle.breadcrumb;

      return (
        <span key={match.pathname} className="flex items-center gap-2">
          <Link to={match.pathname} className="text-midnight hover:underline">
            {crumb}
          </Link>
          /
        </span>
      );
    });

  return <div className="flex items-center gap-2 text-sm">{crumbs}</div>;
}

export default Breadcrumbs;
