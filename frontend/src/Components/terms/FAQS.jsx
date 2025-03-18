import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const faqs = [
    {
      category: "Shipping",
      questions: [
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we offer worldwide shipping on all hardware products.",
        },
        {
          question: "What are the delivery times?",
          answer: "Delivery times vary by location. Domestic shipping takes 2-3 days, while international shipping can take 5-10 days.",
        },
      ],
    },
    {
      category: "Orders",
      questions: [
        {
          question: "How can I track my order?",
          answer: "Once your order is shipped, you will receive a tracking number via email.",
        },
        {
          question: "Can I modify my order after placing it?",
          answer: "Orders can only be modified within 24 hours of placing them. Contact support for changes.",
        },
      ],
    },
    {
      category: "Warranty",
      questions: [
        {
          question: "Do your products come with a warranty?",
          answer: "Yes, all our hardware products come with a minimum one-year warranty.",
        },
        {
          question: "How do I claim a warranty?",
          answer: "To claim a warranty, contact our support team with proof of purchase and details of the issue.",
        },
      ],
    },
    {
      category: "Returns",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of purchase, provided the item is in its original condition.",
        },
        {
          question: "How long does it take to process a refund?",
          answer: "Refunds are typically processed within 5-7 business days after receiving the returned item.",
        },
      ],
    },
    {
      category: "Products",
      questions: [
        {
          question: "Do you sell refurbished hardware?",
          answer: "Yes, we offer high-quality refurbished hardware at discounted prices.",
        },
        {
          question: "How do I know if a product is compatible with my system?",
          answer: "Check the product description for compatibility details or contact our support team for assistance.",
        },
      ],
    },
  ];
  
  const FAQS = () => {
    return (
        <>
        <Navbar/>
      <div className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-6 ">Frequently Asked Questions</h1>
        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-purple-600">{section.category}</h2>
            {section.questions.map((faq, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{faq.question}</p>
                <p className="font-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer/>
        </>
    );
  };
  
  export default FAQS;
  