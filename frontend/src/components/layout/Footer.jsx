const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold">RBAC Blog</h3>
              <p className="text-sm text-gray-400">A role-based blog platform</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                &copy; {currentYear} RBAC Blog. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Designed and developed for LiaPlusAI assignment
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;