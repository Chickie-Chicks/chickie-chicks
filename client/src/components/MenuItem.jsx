export const MenuItem = ({ name, price, image, description, onOrder }) => (
  <div className="rounded-2xl shadow-lg p-4 w-full max-w-sm">
    <img src={image} alt={name} className="w-full h-48 object-cover rounded-xl mb-2" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="flex justify-between items-center mt-2">
      <span className="text-green-600 font-bold">ZMW {price}</span>
      <button
        onClick={() => onOrder({ name, price })}
        className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
      >Order</button>
    </div>
  </div>
);
