import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import ChatProductCard from './ChatProductCard';
import { products } from '@/data/products';
import { Product } from '@/types/product';

interface ChatMessageContentProps {
  content: string;
}

const PRODUCT_TAG_REGEX = /\[\[product:(\d+)\]\]/g;

function getRelatedProducts(matched: Product[], limit = 3): Product[] {
  if (matched.length === 0) return [];
  const matchedIds = new Set(matched.map(p => p.id));
  const categories = new Set(matched.map(p => p.category));
  const tags = new Set(matched.flatMap(p => p.tags || []));

  const scored = products
    .filter(p => !matchedIds.has(p.id) && p.inStock)
    .map(p => {
      let score = 0;
      if (categories.has(p.category)) score += 2;
      (p.tags || []).forEach(t => { if (tags.has(t)) score += 1; });
      if (p.isBestSeller) score += 1;
      return { product: p, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(s => s.product);
}

const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ content }) => {
  const { cleanContent, matchedProducts, relatedProducts } = useMemo(() => {
    const ids = new Set<string>();
    let match: RegExpExecArray | null;
    const regex = new RegExp(PRODUCT_TAG_REGEX.source, 'g');
    while ((match = regex.exec(content)) !== null) {
      ids.add(match[1]);
    }

    const matched: Product[] = [];
    ids.forEach(id => {
      const p = products.find(pr => pr.id === id);
      if (p) matched.push(p);
    });

    const related = getRelatedProducts(matched, 3);
    const clean = content.replace(PRODUCT_TAG_REGEX, '').trim();
    return { cleanContent: clean, matchedProducts: matched, relatedProducts: related };
  }, [content]);

  return (
    <div>
      <div className="prose prose-sm max-w-none [&>p]:m-0 [&>p+p]:mt-1.5 [&>ul]:my-1 [&>ul]:pl-4">
        <ReactMarkdown>{cleanContent}</ReactMarkdown>
      </div>

      {/* Main product cards */}
      {matchedProducts.length > 0 && (
        <div className="mt-2.5 space-y-2">
          {matchedProducts.map(product => (
            <ChatProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Related product recommendations */}
      {relatedProducts.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-border">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            You might also like
          </p>
          <div className="space-y-1">
            {relatedProducts.map(product => (
              <ChatProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessageContent;
