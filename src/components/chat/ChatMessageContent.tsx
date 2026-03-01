import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import ChatProductCard from './ChatProductCard';
import { products } from '@/data/products';
import { Product } from '@/types/product';

interface ChatMessageContentProps {
  content: string;
}

const PRODUCT_TAG_REGEX = /\[\[product:(\d+)\]\]/g;

const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ content }) => {
  const { cleanContent, matchedProducts } = useMemo(() => {
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

    const clean = content.replace(PRODUCT_TAG_REGEX, '').trim();
    return { cleanContent: clean, matchedProducts: matched };
  }, [content]);

  return (
    <div>
      <div className="prose prose-sm max-w-none [&>p]:m-0 [&>p+p]:mt-1.5 [&>ul]:my-1 [&>ul]:pl-4">
        <ReactMarkdown>{cleanContent}</ReactMarkdown>
      </div>
      {matchedProducts.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {matchedProducts.map(product => (
            <ChatProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessageContent;
