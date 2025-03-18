import Navbar from "../layout/Navbar";

export default function TermsAndConditions() {
    return (
        <>
        <Navbar/>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-white">Nifty-Orbit - Terms and Conditions</h1>
        <p className="text-white mb-4">
          These Terms and Conditions govern your use of Nifty Orbit’s website and services. By accessing or using our services, you agree to comply with these terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-white">Use of Services</h2>
        <p className="text-white mb-4">
          You must use our services responsibly and in compliance with all applicable laws. Unauthorized use or tampering with our systems is strictly prohibited.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-white">Accounts and Security</h2>
        <ul className="list-disc pl-6 text-white mb-4">
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>Any unauthorized use of your account should be reported to us immediately.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 text-white">Purchases and Payments</h2>
        <p className="text-white mb-4">
          All purchases made through our website are subject to our refund and return policies. Prices may be subject to change without prior notice.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-white">Limitation of Liability</h2>
        <p className="text-white mb-4">
          Nifty Orbit is not liable for any direct, indirect, or consequential damages resulting from the use of our services or products.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-white">Changes to Terms</h2>
        <p className="text-white mb-4">
          We reserve the right to modify these terms at any time. Any changes will be posted on this page, and continued use of our services constitutes acceptance of the new terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-white">Contact Us</h2>
        <p className="text-white">
          If you have any questions about these Terms and Conditions, please contact us at support@niftyorbithardware.com.
        </p>
      </div>
        </>
    );
    
  }
  