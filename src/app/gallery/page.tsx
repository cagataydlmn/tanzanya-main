import type { Metadata } from 'next';
import { getGalleryItems } from '@/app/actions/gallery';
import GalleryGrid from '@/components/GalleryGrid';
import { getPageHeader } from '@/app/actions/page-headers';

export const metadata: Metadata = {
  title: "Gallery | Star Decor",
  description: "Explore photography of our production facility, craftsmanship, and completed custom furniture and interior projects.",
};

export default async function Gallery() {
  const response = await getGalleryItems();
  const items = response.success && response.data ? response.data : [];

  const headerRes = await getPageHeader('gallery');
  const headerData = headerRes.success && headerRes.data ? headerRes.data : null;
  const pageTitle = headerData?.title || "Gallery";
  const pageDesc = headerData?.description || "Select photography showcasing custom furniture production from our factory and completed interior design projects.";

  return (
    <div className="min-h-screen bg-stone-50 pt-24 md:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">{pageTitle}</h1>
          <div className="w-20 h-1 bg-amber-700 mx-auto"></div>
          <p className="text-stone-600 mt-6 max-w-2xl mx-auto whitespace-pre-wrap">
            {pageDesc}
          </p>
        </div>

        {/* Gallery Grid Component */}
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200">
            <p className="text-stone-500">No images added to the gallery yet.</p>
          </div>
        ) : (
          <GalleryGrid items={items as any} />
        )}

      </div>
    </div>
  );
}

