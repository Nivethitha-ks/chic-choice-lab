import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types/product';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === 0 && item.label === 'Home' ? (
            item.href ? (
              <Link
                to={item.href}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home size={14} />
                <span className="sr-only">Home</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1">
                <Home size={14} />
              </span>
            )
          ) : (
            <>
              {index > 0 && (
                <ChevronRight size={14} className="flex-shrink-0 text-muted-foreground/50" />
              )}
              {item.href ? (
                <Link
                  to={item.href}
                  className="hover:text-foreground transition-colors truncate max-w-[150px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
