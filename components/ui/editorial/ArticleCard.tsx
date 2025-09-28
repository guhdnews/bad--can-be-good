'use client'

import { useState } from 'react';
import { EditorialCard, EditorialHeadline, EditorialBody, EditorialCaption, ArticleMeta } from './index';
import { formatDate, calculateReadingTime, truncateText } from '@/lib/utils';

interface Article {
  title: string;
  content: string;
  imageUrl?: string;
  source?: string;
  pubDate?: string;
  link?: string;
}

interface ArticleCardProps {
  article: Article;
  onArticleClick?: (article: Article) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export default function EditorialArticleCard({ 
  article, 
  onArticleClick,
  variant = 'default'
}: ArticleCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const shareArticle = (platform: string) => {
    const url = encodeURIComponent(article.link || window.location.href);
    const title = encodeURIComponent(article.title);
    const text = encodeURIComponent(`Check out this positive news: ${article.title}`);

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      email: `mailto:?subject=${title}&body=${text}%0D%0A%0D%0A${url}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    setShowShareMenu(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(article.link || window.location.href);
    setShowShareMenu(false);
  };

  const handleImageError = () => {
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      const img = new Image();
      img.onload = () => setImageLoading(false);
      img.onerror = () => {
        setImageError(true);
        setImageLoading(false);
      };
      img.src = article.imageUrl || '';
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleClick = () => {
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  const readingTime = calculateReadingTime(article.content);
  const formattedDate = article.pubDate ? formatDate(article.pubDate) : 'Recently';

  // Render different variants
  if (variant === 'featured') {
    return (
      <EditorialCard className="group cursor-pointer" hover>
        <div className="md:flex h-full">
          {/* Featured Image */}
          <div className="md:flex-shrink-0 md:w-1/2">
            {article.imageUrl && !imageError ? (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 shimmer-loading rounded-l-lg" />
                )}
                <img 
                  className="h-64 md:h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={article.imageUrl} 
                  alt={article.title}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              </>
            ) : (
              <div className="h-64 md:h-full w-full bg-gradient-to-br from-editorial-200 to-editorial-300 dark:from-editorial-700 dark:to-editorial-600 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-editorial-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  </svg>
                  <p className="editorial-caption">Good News</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Featured Content */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center" onClick={handleClick}>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-editorial-highlight/20 text-editorial-highlight rounded-full mb-3">
                {article.source || 'Featured Story'}
              </span>
            </div>
            
            <EditorialHeadline level={2} className="mb-4 hover:text-editorial-primary transition-colors duration-200">
              {article.title}
            </EditorialHeadline>
            
            <EditorialBody className="mb-6">
              {truncateText(article.content, 200)}
            </EditorialBody>
            
            <ArticleMeta 
              author={article.source || 'Editorial Team'}
              date={formattedDate}
              readTime={readingTime}
              className="mb-4"
            />
            
            {article.link && article.link !== '#' && (
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="editorial-button-primary inline-flex items-center w-fit"
                onClick={(e) => e.stopPropagation()}
              >
                Read Full Story
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </EditorialCard>
    );
  }

  if (variant === 'compact') {
    return (
      <EditorialCard className="group cursor-pointer" hover>
        <div className="flex p-4 space-x-4" onClick={handleClick}>
          {/* Compact Image */}
          {article.imageUrl && !imageError ? (
            <div className="flex-shrink-0 w-16 h-16">
              <img 
                className="w-full h-full object-cover rounded-lg" 
                src={article.imageUrl} 
                alt={article.title}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-editorial-200 to-editorial-300 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-editorial-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          
          {/* Compact Content */}
          <div className="flex-1 min-w-0">
            <h3 className="editorial-subheadline text-base mb-1 line-clamp-2 group-hover:text-editorial-primary transition-colors duration-200">
              {article.title}
            </h3>
            <EditorialCaption className="mb-2">
              {truncateText(article.content, 100)}
            </EditorialCaption>
            <div className="flex items-center text-xs text-editorial-muted">
              <span>{article.source || 'Editorial'}</span>
              <span className="mx-2">•</span>
              <time>{formattedDate}</time>
            </div>
          </div>
        </div>
      </EditorialCard>
    );
  }

  // Default variant
  return (
    <EditorialCard className="group cursor-pointer animate-slide-in-view" hover>
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        {article.imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 shimmer-loading" />
            )}
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src={article.imageUrl} 
              alt={article.title}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-editorial-200 to-editorial-300 dark:from-editorial-700 dark:to-editorial-600 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2 text-editorial-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
              </svg>
              <EditorialCaption>☀️ Good News</EditorialCaption>
            </div>
          </div>
        )}
        
        {/* Source Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-editorial-900/90 backdrop-blur-sm text-editorial-primary border border-editorial-primary/30">
            {article.source || 'Good News'}
          </span>
        </div>

        {/* Share Button */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-editorial-900/90 backdrop-blur-sm text-editorial-muted hover:text-editorial-primary hover:bg-white dark:hover:bg-editorial-900 transition-all duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>

            {/* Share Menu */}
            {showShareMenu && (
              <div className="absolute top-10 right-0 z-20 w-48 bg-white dark:bg-editorial-900 rounded-lg shadow-editorial-lg border border-editorial-border py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    shareArticle('twitter');
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-editorial-text hover:bg-editorial-100 dark:hover:bg-editorial-800"
                >
                  <svg className="w-4 h-4 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Share on Twitter
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    shareArticle('facebook');
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-editorial-text hover:bg-editorial-100 dark:hover:bg-editorial-800"
                >
                  <svg className="w-4 h-4 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Share on Facebook
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard();
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-editorial-text hover:bg-editorial-100 dark:hover:bg-editorial-800 border-t border-editorial-border"
                >
                  <svg className="w-4 h-4 mr-3 text-editorial-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6" onClick={handleClick}>
        {/* Article Title */}
        <EditorialHeadline level={3} className="mb-3 line-clamp-2 group-hover:text-editorial-primary transition-colors duration-200">
          {article.title}
        </EditorialHeadline>

        {/* Article Content */}
        <EditorialBody className="text-sm mb-4 line-clamp-3 hover:text-editorial-text transition-colors duration-200">
          {truncateText(article.content, 150)}
        </EditorialBody>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <ArticleMeta 
            author={article.source || 'Editorial'}
            date={formattedDate}
            readTime={readingTime}
            className="text-xs"
          />

          {article.link && article.link !== '#' && (
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-editorial-primary hover:text-editorial-secondary transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </EditorialCard>
  );
}