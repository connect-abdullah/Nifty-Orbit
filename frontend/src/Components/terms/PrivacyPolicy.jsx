import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className=" p-8 px-50 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Nifty-Orbit - Privacy Policy
        </h1>
        <p className="text-white mb-4">
          At Nifty Orbit , we value your privacy. This Privacy Policy outlines
          how we collect, use, and safeguard your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white">
          Information We Collect
        </h2>
        <p className="text-white mb-4">
          We collect personal data when you interact with our website, purchase
          our products, or contact our support team.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-white mb-4">
          <li>To process and fulfill orders</li>
          <li>To provide customer support</li>
          <li>To improve our products and services</li>
          <li>To send updates and promotions</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-white">
          Sharing Your Information
        </h2>
        <p className="text-white mb-4">
          We do not sell or trade your information. However, we may share it
          with trusted partners for order fulfillment and payment processing.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white">
          Your Rights & Choices
        </h2>
        <p className="text-white mb-4">
          You can request access, modification, or deletion of your data.
          Contact us to manage your preferences.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white">
          Changes to This Policy
        </h2>
        <p className="text-white mb-4">
          Nifty Orbit may update this policy from time to time. Any changes will
          be posted on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-white">Contact Us</h2>
        <p className="text-white">
          For any questions about this Privacy Policy, contact us at
          support@gniftyorbit.com.
        </p>
      </div>
      <Footer />
    </>
  );
}
