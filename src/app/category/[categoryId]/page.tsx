import NewsCard from '@/components/NewsCard';

interface News {
    id: string;
    title: string;
    categoryId?: string;
    params: string;
    category: string;
    description: string;
    imageUrl: string;
    lastPublished: string;
    link: string;
}

const CategoryPage = async ({params}:{params:{categoryId:string}}) => {
    const {categoryId} = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const categoryNews: News[] = data.data;
    console.log(data);

    return (
        <div className="mx-auto max-w-7xl px-4 py-5">
            <h1 className="text-2xl font-bold border-b-2 mb-2 border-red-800">{data.title}</h1>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {
                    categoryNews.map((news) => <NewsCard key={news.id} news={news} />)
                }
            </div>
        </div>
    );
};

export default CategoryPage;