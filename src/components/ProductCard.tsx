import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Heart, Star, ChevronRight, Eye, Download } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, wishlist, toggleWishlist, currentUser } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isPurchased = currentUser?.purchasedProducts?.includes(product.id);

  const priceToDisplay = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice !== undefined && product.discountPrice < product.price;

  return (
    <div id={`product-${product.id}`} className="group relative flex flex-col overflow-hidden rounded-none border-2 border-slate-900 bg-white hover:-translate-y-1 transition-all duration-200 geo-shadow-offset">
      
      {/* Product Card Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b-2 border-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
          referrerPolicy="no-referrer"
        />

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-none border-2 backdrop-blur-md transition-all cursor-pointer ${
            isWishlisted
              ? 'bg-rose-500 border-slate-900 text-white'
              : 'bg-white border-slate-900 text-slate-900 hover:bg-slate-50'
          }`}
          title="Wishlist"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Floating Badge */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-white border border-slate-200 rounded-none shadow-sm font-mono">
          {product.category}
        </span>

        {/* Labels Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isFeatured && (
            <span className="px-2.5 py-0.5 text-[8px] font-black text-white bg-indigo-600 rounded-none uppercase tracking-widest">
              Featured
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 text-[8px] font-black text-white bg-emerald-600 rounded-none uppercase tracking-widest">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 text-[8px] font-black text-white bg-amber-600 rounded-none uppercase tracking-widest">
              Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {/* Star rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
            <span className="text-[10px] text-slate-400 font-semibold">({product.reviewsCount})</span>
          </div>
          {/* Version badge */}
          <span className="text-[10px] text-slate-500 font-mono font-bold">{product.version}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors font-display">
          {product.name}
        </h3>

        {/* Description excerpt */}
        <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
          {product.shortDesc}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-200">
          {/* Price Panel */}
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-[9px] text-slate-400 font-bold line-through">${product.price.toFixed(2)}</span>
            )}
            <span className="text-lg font-black text-slate-900 tracking-tight font-display">
              ${priceToDisplay.toFixed(2)}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* Quick Details Trigger */}
            <button
              onClick={() => onOpenDetails(product)}
              className="p-2 bg-white border-2 border-slate-900 hover:bg-slate-50 text-slate-900 rounded-none transition-all cursor-pointer"
              title="View Product Details"
            >
              <Eye className="h-4 w-4" />
            </button>

            {/* Quick Buy or Download */}
            {isPurchased ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Starting download of ${product.downloadFile}. File size: 48.4 MB.`);
                }}
                className="p-2 bg-emerald-500 border-2 border-slate-900 text-slate-900 hover:bg-emerald-400 rounded-none transition-all flex items-center gap-1.5 px-3 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                title="Download Source Code"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </a>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="p-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white rounded-none transition-all flex items-center gap-1.5 px-3.5 text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Buy Code</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
