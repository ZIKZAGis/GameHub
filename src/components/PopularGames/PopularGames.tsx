export default function PopularGames () {
    return (
        <div className="bg-blue-100 w-full p-4">
            <h2 className="font-extrabold text-2xl mb-5">Популярные игры</h2>

            <div className="flex gap-8">
                <div>
                    <ul>
                        <li>Название игры</li>
                        <li>Краткое описание</li>
                        <li>рейтинг/дата релиза/жанр</li>
                        <li>Платформы</li>
                        <li>добавить в избранное</li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                    <div className="border rounded-1g border-amber-800 p-4 h-50">
                        Обложка игры
                    </div>
                </div>
            </div>
        </div>

    )
}