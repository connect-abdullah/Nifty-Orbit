import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import img from '../assets/hardwarebanner.jpg'

const ITSectorPage = () => {
  return (
    <>
    <Navbar/>
    <div className="font-sans">
      
      {/* Hero Section */}
      <section className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
       
        </div>
      </section>
      
      <section className="container mx-auto py-16 px-4">
          <h2 className="text-3xl text-white font-bold mb-6">
            Hardware Sector Solutions
          </h2>
          <p className="text-lg text-gray-300">
            At Seventh Genius, we specialize in providing high-quality, durable, and innovative 
            hardware solutions for businesses, enterprises, and government sectors. From 
            cutting-edge computing hardware to advanced networking components, our solutions 
            are designed to enhance performance, security, and efficiency in all industries.
          </p>
          <p className="text-lg text-gray-300 mt-4">
            Our hardware solutions range from essential IT infrastructure, high-performance 
            computing devices, and security systems to IoT-enabled smart technologies, 
            ensuring that organizations stay ahead in the digital era.
          </p>
        </section>

        {/* Our Services */}
        <section className="container mx-auto py-8 px-4">
          <h2 className="text-3xl text-white font-bold mb-6">
            Our Hardware-Based Services
          </h2>
          <ul className="list-disc ml-5 text-gray-300 space-y-3 text-lg">
            <li>
              <strong>Enterprise IT Infrastructure:</strong> Scalable server and 
              storage solutions designed to optimize business operations.
            </li>
            <li>
              <strong>Networking & Security:</strong> Advanced firewalls, routers, and 
              cybersecurity hardware for a robust IT environment.
            </li>
            <li>
              <strong>Cloud Integration:</strong> Hardware solutions that seamlessly 
              integrate with cloud-based platforms for enhanced flexibility.
            </li>
            <li>
              <strong>High-Performance Computing:</strong> Custom-built workstations 
              and supercomputers for data-intensive industries.
            </li>
            <li>
              <strong>IoT & Smart Devices:</strong> Innovative smart hardware solutions 
              for industries including healthcare, finance, and manufacturing.
            </li>
            <li>
              <strong>Custom Hardware Solutions:</strong> Tailored hardware 
              configurations to meet unique client needs.
            </li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto py-8 px-4">
          <h2 className="text-3xl text-white font-bold mb-6">
            Why Choose Our IT Hardware Solutions?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Reliability & Performance</h3>
              <p className="text-gray-300 mt-2">
                We deliver enterprise-grade IT hardware designed to meet the 
                rigorous demands of modern businesses.
              </p>
            </div>
            <div className="bg-purple-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Security & Compliance</h3>
              <p className="text-gray-300 mt-2">
                Our solutions comply with global security standards, ensuring 
                safe and secure IT operations.
              </p>
            </div>
            <div className="bg-purple-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Scalability & Customization</h3>
              <p className="text-gray-300 mt-2">
                From startups to large enterprises, we provide scalable 
                hardware solutions tailored to unique needs.
              </p>
            </div>
            <div className="bg-purple-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Innovation & Future-Readiness</h3>
              <p className="text-gray-300 mt-2">
                Our commitment to innovation ensures that clients receive 
                state-of-the-art technology solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Industry Applications */}
        <section className="container mx-auto py-8 px-4">
          <h2 className="text-3xl text-white font-bold mb-6">
            Industry Applications
          </h2>
          <p className="text-lg text-gray-300 mb-4">
            Our IT hardware solutions cater to multiple industries, providing 
            specialized tools and infrastructure for enhanced efficiency.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Government & Defense</h3>
              <p className="text-gray-300 mt-2">
                Secure and high-performance IT hardware solutions for critical operations.
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Healthcare & Pharmaceuticals</h3>
              <p className="text-gray-300 mt-2">
                Advanced computing and security solutions for medical research and patient data management.
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Finance & Banking</h3>
              <p className="text-gray-300 mt-2">
                High-security IT hardware ensuring compliance and reliability in financial institutions.
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Education & Research</h3>
              <p className="text-gray-300 mt-2">
                Smart hardware solutions supporting e-learning, research, and cloud computing.
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Manufacturing & Engineering</h3>
              <p className="text-gray-300 mt-2">
                IoT and AI-powered hardware optimizing production and automation processes.
              </p>
            </div>
            <div className="bg-gray-600 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-white">Retail & E-commerce</h3>
              <p className="text-gray-300 mt-2">
                IT infrastructure enabling seamless digital transactions and data security.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className=" text-white py-8 px-4 text-center mt-10">
          <p>&copy; 2025. Seventh Genius. All Rights Reserved.</p>
        </footer>
      </div>
      <Footer/>
    </>
  );
};

export default ITSectorPage;







