const StatsComponent = () => {
  return (
    <div className="p-10 rounded-3xl  mt-0 mb-10">
      <div className="text-center space-y-8">
        <h2 className="text-5xl font-bold text-white mb-6">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-b from-blue-400 to-blue-900 p-6 rounded-2xl shadow-xl">
            <p className="text-4xl font-semibold text-white">14+</p>
            <p className="text-xl text-gray-300">Years in Business</p>
          </div>
          <div className="bg-gradient-to-b from-blue-400 to-blue-900 p-6 rounded-2xl shadow-xl">
            <p className="text-4xl font-semibold text-white">500+</p>
            <p className="text-xl text-gray-300">Client Count</p>
          </div>
          <div className="bg-gradient-to-b from-blue-400 to-blue-900 p-6 rounded-2xl shadow-xl">
            <p className="text-4xl font-semibold text-white">15,000+</p>
            <p className="text-xl text-gray-300">Products Shipped</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;