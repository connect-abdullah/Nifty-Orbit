import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from './Components/terms/Aboutus';
import ProductList from './Components/product/ProductList';
import CompletePage from './Components/CompletePage';
import Login from './Components/auth/Login';
import Signup from './Components/auth/Signup';
import bgimage from './assets/5418488_2828411.png';
import ContactUs from "./Components/terms/Contact";
import ITSectorPage from "./Components/ITSector";
import ProductDetail from "./Components/product/ProductDetail";
import Payment from "./Components/product/Payment";
import ShoppingCart from "./Components/product/AddToCart";
import Sidebar from "./Components/layout/Sidebar";
import GetAQuote from "./Components/GetQuote";
import TrackingPage from "./Components/product/Track";
import PrivacyPolicy from "./Components/terms/PrivacyPolicy";
import TermsAndConditions from "./Components/terms/TermsAndConditions";
import FAQS from "./Components/terms/FAQS";
// import Testing from "./Components/Testing";
import BrandData from "./Components/BrandData";
// import CiscoCategories from "./Components/CiscoCategories";


const App = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bgimage})`,
    backgroundPosition: 'center',
    minHeight: '200vh',
    
    };

  return (

    <Router>
        {/* Define Routes for each component */}
      <div style={backgroundStyle} className="min-h-screen   "> 

        <Routes>
  <Route path="/" element={<CompletePage />} />
  <Route path="/aboutus" element={<AboutUs />} />
  <Route path="/contactus" element={<ContactUs />} />
  <Route path="/itsector" element={<ITSectorPage />} />
  <Route path="/products/:brand" element={<ProductList />} />
  <Route path="/product/:id" element={<ProductDetail />} />  {/* Fix this */}
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/cart" element={<ShoppingCart/>} />
  <Route path="/payment" element={<Payment/>} />
  <Route path="/sidebar" element={<Sidebar/>} />
  <Route path="/quote" element={<GetAQuote/>} />
  <Route path="/track" element={<TrackingPage/>} />
  <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
  <Route path="/Termsandcondition" element={<TermsAndConditions/>} />
  <Route path="/faqs" element={<FAQS/>} />
  <Route path="/brand" element={<BrandData/> } />


</Routes>
      </div>

    </Router>
  );
};

export default App;
