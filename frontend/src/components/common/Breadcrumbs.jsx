import { Link, useMatches } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function Breadcrumbs() {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .map((match, index, arr) => {
      const isLast = index === arr.length - 1;
      // Handle both string and function breadcrumbs
      const breadcrumb = match.handle.breadcrumb;
      const label =
        typeof breadcrumb === "function" ? breadcrumb(match.data) : breadcrumb;
      return (
        <span key={match.pathname} className="flex items-center gap-2">
          {!isLast ? (
            <Link
              to={match.pathname}
              className=" text-gray-500 hover:underline"
            >
              {match.handle.breadcrumb}
            </Link>
          ) : (
            <span className=" text-midnight">{match.handle.breadcrumb}</span>
          )}
          {!isLast && (
            <span className="text-gray-400">
              <IoIosArrowForward />
            </span>
          )}
        </span>
      );
    });

  return (
    <div className="flex items-center justify-center gap-2 text-sm font-poppins">
      {crumbs}
    </div>
  );
}

export default Breadcrumbs;
