export default function Article({ title, content, imageUrl }) {
    return (
      <div className="mb-8 p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 line-clamp-3">{content}</p>
      </div>
    );
  }