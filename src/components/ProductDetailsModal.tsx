import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, Star, ChevronLeft, ChevronRight, CheckCircle, Play, 
  ExternalLink, Download, ShoppingCart, MessageSquare, AlertCircle, Calendar
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const { addToCart, addReview, currentUser } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');

  const isPurchased = currentUser?.purchasedProducts?.includes(product.id);
  const images = [product.image, ...(product.gallery || []), ...(product.screenshots || [])];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    addReview(product.id, userRating, userComment);
    setUserComment('');
    setUserRating(5);
  };

  const priceToDisplay = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice !== undefined && product.discountPrice < product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl rounded-none border-2 border-slate-900 bg-white shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-none bg-white border-2 border-slate-900 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all z-20 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left Side: Images & Gallery & Video */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 border-b md:border-b-0 md:border-r-2 border-slate-900 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-full">
          
          <div className="space-y-4">
            {/* Main Stage */}
            <div className="relative aspect-[16/10] bg-slate-100 rounded-none overflow-hidden border-2 border-slate-900 flex items-center justify-center">
              {isPlayingVideo && product.demoVideo ? (
                <video
                  src={product.demoVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Gallery Navigations */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-none bg-white border-2 border-slate-900 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-none bg-white border-2 border-slate-900 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  {/* Demo Video Indicator Trigger */}
                  {product.demoVideo && (
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase rounded-none border border-slate-900 shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Play Video Demo</span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsPlayingVideo(false);
                  }}
                  className={`relative h-14 w-20 shrink-0 bg-slate-100 border-2 rounded-none overflow-hidden transition-all ${
                    idx === activeImageIndex && !isPlayingVideo
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-slate-900 hover:border-slate-800'
                  }`}
                >
                  <img src={img} alt="thumb" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Product Metadata */}
          <div className="mt-6 border-t-2 border-slate-900 pt-6 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-white rounded-none border-2 border-slate-900 text-center text-xs shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              <span className="block text-[9px] uppercase font-black text-slate-500 mb-0.5 font-mono tracking-widest">Release</span>
              <span className="font-mono text-slate-900 font-bold">{product.version}</span>
            </div>
            <div className="p-2.5 bg-white rounded-none border-2 border-slate-900 text-center text-xs shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              <span className="block text-[9px] uppercase font-black text-slate-500 mb-0.5 font-mono tracking-widest">Rating</span>
              <span className="font-semibold text-slate-900 flex items-center justify-center gap-1">
                {product.rating} <Star className="h-3 w-3 fill-current text-amber-500" />
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-none border-2 border-slate-900 text-center text-xs shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]">
              <span className="block text-[9px] uppercase font-black text-slate-500 mb-0.5 font-mono tracking-widest">File size</span>
              <span className="font-mono text-slate-900 font-bold">48.4 MB</span>
            </div>
          </div>

        </div>

        {/* Right Side: Details & Features & Review Composer */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[45vh] md:max-h-full">
          
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 inline-block font-mono">
                {product.category}
              </span>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight font-display mt-2 leading-none">
                {product.name}
              </h2>
            </div>

            {/* Price Panel */}
            <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-900 p-4 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-black text-slate-500 tracking-widest font-mono">Source code package</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    ${priceToDisplay.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-slate-400 line-through">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              
              <div className="ml-auto flex gap-2">
                {product.externalLink && (
                  <a
                    href={product.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white hover:bg-slate-50 border-2 border-slate-900 text-slate-700 hover:text-slate-900 rounded-none transition-all flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Demo</span>
                  </a>
                )}

                {isPurchased ? (
                  <button
                    onClick={() => alert(`Starting download of ${product.downloadFile}`)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 border-2 border-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Files</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart(product);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Product Overview</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {product.description}
              </p>
            </div>

            {/* Checklist of Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Engineered Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-bold">
                      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Reviews Segment */}
            <div className="border-t-2 border-slate-900 pt-6 space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                Customer Reviews ({product.reviewsCount})
              </h3>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {(!product.reviews || product.reviews.length === 0) ? (
                  <div className="py-6 text-center text-xs text-slate-500 font-medium">
                    No reviews yet. Be the first to express feedback!
                  </div>
                ) : (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 bg-slate-50 border-2 border-slate-900 rounded-none space-y-1.5 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 uppercase font-display tracking-tight">{rev.userName}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`h-3 w-3 ${idx < rev.rating ? 'text-amber-500 fill-current' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-normal font-medium">{rev.comment}</p>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono font-bold uppercase">
                        <Calendar className="h-3 w-3 text-indigo-600" />
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Leave a review composer */}
              <form onSubmit={handleSubmitReview} className="p-4 bg-slate-50 border-2 border-slate-900 rounded-none space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 uppercase font-mono tracking-widest">Rate this product:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setUserRating(starVal)}
                        className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star className={`h-4 w-4 ${starVal <= userRating ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder={currentUser ? "Share your feedback about code quality..." : "Log in to leave a review"}
                    disabled={!currentUser}
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="flex-1 bg-white border-2 border-slate-900 rounded-none px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-semibold"
                  />
                  <button
                    type="submit"
                    disabled={!currentUser || !userComment.trim()}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-300 text-white font-bold uppercase tracking-wider text-xs rounded-none border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    Post
                  </button>
                </div>
                {!currentUser && (
                  <p className="text-[10px] text-amber-700 font-bold uppercase font-mono flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-600" /> Please register/login to publish a star review.
                  </p>
                )}
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
