import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Heart, Star, Eye, Download, ArrowUpRight } from 'lucide-react';

interface ProductCardProps { product: Product; onOpenDetails: (product: Product) => void; }

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, wishlist, toggleWishlist, currentUser } = useApp();
  const isWishlisted = wishlist.includes(product.id);
  const isPurchased = currentUser?.purchasedProducts?.includes(product.id);
  const priceToDisplay = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice !== undefined && product.discountPrice < product.price;

  return (
    <article id={`product-${product.id}`} className="premium-product-card group relative flex flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,.07)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/25 via-transparent to-white/10 z-10 pointer-events-none" />
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />

        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.isFeatured && <span className="rounded-full bg-slate-950/90 px-3 py-1 text-[8px] font-black text-white uppercase tracking-widest backdrop-blur">Featured</span>}
          {product.isNewArrival && <span className="rounded-full bg-emerald-500 px-3 py-1 text-[8px] font-black text-white uppercase tracking-widest">New</span>}
          {product.isBestSeller && <span className="rounded-full bg-amber-400 px-3 py-1 text-[8px] font-black text-slate-950 uppercase tracking-widest">Best Seller</span>}
        </div>

        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} className={`absolute right-3 top-3 z-20 h-10 w-10 rounded-full border border-white/70 flex items-center justify-center backdrop-blur-md shadow-lg transition-all ${isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/85 text-slate-900 hover:bg-white'}`} title="Wishlist">
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <span className="absolute bottom-3 left-3 z-20 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-700 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {product.reviewsCount > 0 ? <><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /><span className="text-xs font-bold text-slate-800">{product.rating}</span><span className="text-[10px] text-slate-400">({product.reviewsCount})</span></> : <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">No reviews yet</span>}
          </div>
          <span className="rounded-full bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-500 font-mono">{product.version}</span>
        </div>

        <h3 className="mt-3 text-lg font-black tracking-tight text-slate-950 line-clamp-1 font-display group-hover:text-emerald-600 transition-colors">{product.name}</h3>
        <p className="mt-2 text-xs leading-6 text-slate-500 line-clamp-2">{product.shortDesc}</p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            {hasDiscount && <span className="block text-[9px] font-bold text-slate-400 line-through">${product.price.toFixed(2)}</span>}
            <span className="text-xl font-black tracking-tight text-slate-950 font-display">${priceToDisplay.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onOpenDetails(product)} className="h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:border-emerald-300 hover:text-emerald-600 hover:shadow-md transition-all" title="View Product Details"><Eye className="h-4 w-4" /></button>
            {isPurchased ? (
              <a href="#" onClick={(e) => { e.preventDefault(); alert(`Starting download of ${product.downloadFile}. File size: 48.4 MB.`); }} className="rounded-xl bg-emerald-500 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-1.5"><Download className="h-3.5 w-3.5" />Download</a>
            ) : (
              <button onClick={() => addToCart(product)} className="rounded-xl bg-slate-950 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-emerald-600 transition-all flex items-center gap-1.5"><ShoppingCart className="h-3.5 w-3.5" />Buy Code</button>
            )}
          </div>
        </div>

        <button onClick={() => onOpenDetails(product)} className="mt-3 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-400 hover:text-emerald-600 transition-colors">
          <span>Explore product</span><ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};
