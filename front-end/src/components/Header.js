import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="h-10 w-32 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">JobVip</span>
            </div>
          </div>

          {/* Thanh tìm kiếm và Điều hướng */}
          <div className="hidden md:flex items-center flex-grow mx-8">
            {/* Thanh tìm kiếm */}
            <div className="flex-grow max-w-2xl">
              <input
                type="text"
                placeholder="Tìm kiếm việc làm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Menu máy tính */}
            <nav className="ml-8 flex space-x-6">
              <a 
                href="/" 
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                Trang Chủ
              </a>
              <a 
                href="/company" 
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                Công Ty
              </a>
              <a 
                href="/job" 
                className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
              >
                Việc làm
              </a>
            </nav>
          </div>

          {/* Nút đăng nhập máy tính */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="/register" 
              className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              Đã ứng tuyển
            </a>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-lg">
              Đăng Nhập
            </button>
          </div>

          {/* Nút menu điện thoại */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu điện thoại */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700 rounded-lg mt-2">
              {/* Thanh tìm kiếm điện thoại */}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Tìm kiếm việc làm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <a 
                href="/" 
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Trang Chủ
              </a>
              <a 
                href="/company" 
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Công Ty
              </a>
              <a 
                href="/job" 
                className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium"
              >
                Việc làm
              </a>
              
              {/* Nút đăng nhập điện thoại */}
              <div className="pt-4 pb-3 border-t border-blue-500">
                <div className="flex flex-col space-y-2">
                  <a href="/register" className="text-white hover:text-blue-200 px-3 py-2 text-base font-medium">
                    Đã ứng tuyển
                  </a>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">
                    Đăng Nhập
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
