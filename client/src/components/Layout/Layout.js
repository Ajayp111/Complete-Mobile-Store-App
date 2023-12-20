import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      {/* Helmet component to manage document head metadata */}
      <Helmet>
        {/* Setting document metadata: description, keywords, author, and title */}
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header /> {/* Header component for the top section of the layout */}
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      {/* The content passed as children to the Layout component */}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Ajay Kumar",
};

export default Layout;
