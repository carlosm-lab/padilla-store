import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex text-sm text-slate-500 dark:text-slate-400 gap-2 items-center whitespace-nowrap overflow-x-auto no-scrollbar pb-1">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className={`flex items-center gap-2 ${isLast ? 'min-w-0' : ''}`}>
              {isLast ? (
                item.url ? (
                  <Link
                    to={item.url}
                    className="text-primary font-medium hover:text-primary/80 transition-colors capitalize truncate block"
                    aria-current="page"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary font-medium capitalize truncate block" aria-current="page">
                    {item.label}
                  </span>
                )
              ) : (
                <>
                  {item.url ? (
                    <Link
                      to={item.url}
                      className="hover:text-primary transition-colors capitalize"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="capitalize">{item.label}</span>
                  )}
                  <span className="material-symbols-outlined text-xs shrink-0">chevron_right</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired
};
