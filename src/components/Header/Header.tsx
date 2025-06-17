export default function Header () {
    return (
        <div className="flex justify-between w-full max-w-7xl items-center justify-items-center bg-blue-400">
            <div>Logo</div>
            <input type="text" className="border-2 border-gray-700 px-2 py-1" placeholder="Поиск..."/>
            <button type="button">Каталог игр</button>
            <div>Icon</div>
        </div>
    )
}