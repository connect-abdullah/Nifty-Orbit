import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const AboutUs = () => {
  return (
    <>
   <Navbar/>
    <div className=" text-white bg">
        
      {/* Hero Section */}
      <section className="text-center p-10">
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          Empowering  with Cutting-Edge IT Solutions
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Delivering innovative, reliable, and sustainable technology solutions.
        </p>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 px-10 py-10">
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-purple-500 hover:shadow-purple-500">
          <h2 className="text-xl font-bold text-white">Innovative Solutions</h2>
          <p className="text-gray-300 mt-2">
            Crafting IT solutions for efficiency, security, and performance.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-blue-500 hover:shadow-blue-500">
          <h2 className="text-xl font-bold text-white">Expert Team</h2>
          <p className="text-gray-300 mt-2">
            Industry-leading experts delivering tailored solutions.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-pink-500 hover:shadow-pink-500">
          <h2 className="text-xl font-bold text-white">Reliable Products</h2>
          <p className="text-gray-300 mt-2">
            High-quality IT products meeting government standards.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="px-10 py-10 text-center">
        <h2 className="text-3xl font-bold text-white">Our Vision & Mission</h2>
        <p className="text-gray-300 max-w-4xl mx-auto mt-4">
        Founded in 2016, we are a leading provider of Information and Communication Technology (ICT) solutions dedicated to delivering innovative, sustainable, and transformative services for various industries. Our mission is to empower governments and businesses with cutting-edge technology that drives efficiency, security, and long-term success. 
        </p>
       <p className="text-gray-300 max-w-4xl mx-auto mt-4">
          Over the years, we have successfully collaborated with global industry leaders, establishing a track record of excellence in system integration, digital transformation, and cybersecurity. We are committed to promoting digital innovation while prioritizing environmental sustainability, diversity, and social responsibility.
        </p>
        <p className="text-gray-300 max-w-4xl mx-auto mt-4">
          Our vision is to continue leading the way in technological advancements by staying at the forefront of emerging technologies such as Artificial Intelligence, Cloud Computing, and IoT. We strive to offer custom-tailored solutions that meet the evolving needs of our clients, ensuring their success in the rapidly changing digital landscape. </p>
          <p className="text-gray-300 max-w-4xl mx-auto mt-4">
          With a team of expert engineers, developers, and strategists, we are equipped to solve complex challenges and provide innovative solutions that have a lasting impact. Together, we envision a future where technology fosters growth, resilience, and sustainability for businesses and governments alike.
        </p>
   
      </section>

      {/* Trusted By Section */}
      <section className="px-10 py-10 text-center">
        <h2 className="text-3xl font-bold text-white">Trusted by Industry Leaders</h2>
        <div className="flex justify-center gap-6 mt-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/HP_LOGO.png" alt="NASA" className="h-13" />
          <img src="https://www.freeiconspng.com/uploads/dell-icon-10.png" alt="Government" className="h-16" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/HP_LOGO.png" alt="Defense" className="h-16" />
        </div>
      </section>

      {/* Footer */}
      <footer className=" text-center p-5 mt-10 ">
        <p className="text-gray-400">&copy; 2053. All Rights Reserved.</p>
      </footer>
    </div>
  <Footer/>
    </>
  );
};

export default AboutUs;
