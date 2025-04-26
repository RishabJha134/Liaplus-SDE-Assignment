import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">RBAC Blog</h3>
            <p className="text-sm text-gray-400 mt-1">
              A role-based access control blog platform
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h4 className="font-semibold text-gray-300 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-gray-400 hover:text-white transition duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-sm text-gray-400 hover:text-white transition duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-sm text-gray-400 hover:text-white transition duration-200"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-300 mb-3">About</h4>
              <p className="text-sm text-gray-400 max-w-xs">
                RBAC Blog is a demonstration of role-based access control in a
                modern web application.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center md:text-right">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} RBAC Blog. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Designed and developed for LiaPlusAI assignment
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
