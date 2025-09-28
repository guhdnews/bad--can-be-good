import React from 'react';
import { cn } from '@/lib/utils';

// Editorial Button Component
interface EditorialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const EditorialButton: React.FC<EditorialButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'editorial-button focus-visible:focus';
  const variantClasses = {
    primary: 'editorial-button-primary',
    secondary: 'editorial-button-secondary',
    ghost: 'hover:bg-editorial-100 dark:hover:bg-editorial-800 text-editorial-700 dark:text-editorial-300'
  };
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Editorial Card Component
interface EditorialCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
  children,
  className,
  hover = true
}) => {
  return (
    <div
      className={cn(
        'editorial-card',
        hover && 'hover-lift',
        className
      )}
    >
      {children}
    </div>
  );
};

// Editorial Typography Components
interface EditorialHeadlineProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const EditorialHeadline: React.FC<EditorialHeadlineProps> = ({
  children,
  level = 1,
  className
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl'
  };

  return (
    <Component
      className={cn(
        'editorial-headline',
        sizeClasses[level],
        className
      )}
    >
      {children}
    </Component>
  );
};

export const EditorialSubheadline: React.FC<EditorialHeadlineProps> = ({
  children,
  level = 2,
  className
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Component
      className={cn(
        'editorial-subheadline text-xl md:text-2xl lg:text-3xl',
        className
      )}
    >
      {children}
    </Component>
  );
};

interface EditorialBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorialBody: React.FC<EditorialBodyProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('editorial-body', className)}>
      {children}
    </div>
  );
};

export const EditorialCaption: React.FC<EditorialBodyProps> = ({
  children,
  className
}) => {
  return (
    <p className={cn('editorial-caption', className)}>
      {children}
    </p>
  );
};

// Editorial Layout Components
interface EditorialContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const EditorialContainer: React.FC<EditorialContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('editorial-container', className)}>
      {children}
    </div>
  );
};

export const EditorialGrid: React.FC<EditorialContainerProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('editorial-grid', className)}>
      {children}
    </div>
  );
};

export const EditorialMain: React.FC<EditorialContainerProps> = ({
  children,
  className
}) => {
  return (
    <main className={cn('editorial-main', className)}>
      {children}
    </main>
  );
};

export const EditorialSidebar: React.FC<EditorialContainerProps> = ({
  children,
  className
}) => {
  return (
    <aside className={cn('editorial-sidebar', className)}>
      {children}
    </aside>
  );
};

// Loading Component
export const EditorialLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('shimmer-loading bg-editorial-200 dark:bg-editorial-700 h-4 rounded', className)} />
  );
};

// Breaking News Banner
interface BreakingNewsProps {
  children: React.ReactNode;
  className?: string;
}

export const BreakingNewsBanner: React.FC<BreakingNewsProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('breaking-news px-4 py-2 text-center font-bold', className)}>
      <span className="uppercase tracking-wide text-sm">Breaking News: </span>
      {children}
    </div>
  );
};

// Article Metadata Component
interface ArticleMetaProps {
  author: string;
  date: string;
  readTime?: string;
  className?: string;
}

export const ArticleMeta: React.FC<ArticleMetaProps> = ({
  author,
  date,
  readTime,
  className
}) => {
  return (
    <div className={cn('flex items-center space-x-4 text-sm text-editorial-muted', className)}>
      <span className="font-medium">{author}</span>
      <span>•</span>
      <time>{date}</time>
      {readTime && (
        <>
          <span>•</span>
          <span>{readTime} read</span>
        </>
      )}
    </div>
  );
};

// Byline Component
interface BylineProps {
  author: string;
  title?: string;
  avatar?: string;
  className?: string;
}

export const Byline: React.FC<BylineProps> = ({
  author,
  title,
  avatar,
  className
}) => {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      {avatar && (
        <img
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div>
        <div className="font-semibold text-editorial-text">{author}</div>
        {title && (
          <div className="text-sm text-editorial-muted">{title}</div>
        )}
      </div>
    </div>
  );
};