import NewsCard from '@/components/NewsCard';
import { notFound } from 'next/navigation';
import { NEWS_API_BASE, type NewsItem } from '@/lib/news-api';

const CategoryPage = async ({ params }: { params: Promise<{ categoryId: string }> }) => {
    const { categoryId } = await params;

    const res = await fetch(`${NEWS_API_BASE}/api/category/${categoryId}`, {
        next: { revalidate: 300 },
    });

    if (!res.ok) {
        notFound();
    }

    const data = await res.json();
    const categoryNews: NewsItem[] = Array.isArray(data?.data) ? data.data : [];
    const title: string = data?.category?.title ?? categoryId;

    return (
        <div className="mx-auto max-w-7xl px-4 py-5">
            <h1 className="text-2xl font-bold border-b-2 mb-2 border-red-800">{title}</h1>

            {categoryNews.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {categoryNews.map((news) => <NewsCard key={news.id} news={news} />)}
                </div>
            ) : (
                <p className="py-12 text-center text-gray-500">
                    এই বিভাগে এই মুহূর্তে কোনো খবর পাওয়া যায়নি।
                </p>
            )}
        </div>
    );
};

export default CategoryPage;
