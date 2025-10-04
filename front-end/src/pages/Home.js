import React, { useState, useEffect } from 'react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('industry');
  const [searchData, setSearchData] = useState({
    keywords: '',
    location: '',
    distance: ''
  });
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    candidates: 0,
    success: 0
  });
  const jobCategories = [
<<<<<<< HEAD
    ['Hàng không', 'Kế toán', 'Hành chính', 'Quảng cáo', 'Nông nghiệp'],
    ['Thực tập sinh', 'Quân đội', 'Ô tô', 'Ngân hàng', 'Nhà hàng'],
    ['Từ thiện', 'Công vụ', 'Vệ sinh', 'Xây dựng', 'Tư vấn'],
    ['Tâm lý', 'Sáng tạo', 'Dịch vụ khách hàng', 'Lái xe', 'Giáo dục']
=======
    ["Aviation", "Accountancy", "Administration", "Advertising", "Agriculture"],
    ["Apprenticeships", "Army", "Automotive", "Banking", "Catering"],
    ["Charity", "Civil service", "Cleaning", "Construction", "Consulting"],
    ["Counselling", "Creative", "Customer services", "Driving", "Education"],
    ["Hàng không", "Kế toán", "Hành chính", "Quảng cáo", "Nông nghiệp"],
    ["Thực tập sinh", "Quân đội", "Ô tô", "Ngân hàng", "Nhà hàng"],
    ["Từ thiện", "Công vụ", "Vệ sinh", "Xây dựng", "Tư vấn"],
    ["Tâm lý", "Sáng tạo", "Dịch vụ khách hàng", "Lái xe", "Giáo dục"],
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
  ];
  const featuredCompanies = [
    { name: 'TechCorp', logo: 'TC', jobs: 45, rating: 4.8 },
    { name: 'FinancePro', logo: 'FP', jobs: 32, rating: 4.9 },
    { name: 'HealthCare+', logo: 'HC', jobs: 28, rating: 4.7 },
    { name: 'EduTech', logo: 'ET', jobs: 51, rating: 4.6 },
    { name: 'RetailMax', logo: 'RM', jobs: 23, rating: 4.5 },
    { name: 'StartupHub', logo: 'SH', jobs: 67, rating: 4.8 }
  ];
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Kỹ sư phần mềm",
      company: "TechCorp",
<<<<<<< HEAD
      content: "Tìm được công việc mơ ước chỉ trong 2 tuần! Tính năng AI matching cực kỳ chính xác.",
=======
      content:
        "Found my dream job in just 2 weeks! The AI matching was incredibly accurate.",
      content:
        "Tìm được công việc mơ ước chỉ trong 2 tuần! Tính năng AI matching cực kỳ chính xác.",
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
      avatar: "SJ",
      rating: 5
    },
    {
<<<<<<< HEAD
      name: "Michael Chen",
      role: "Quản lý Marketing", 
      company: "FinancePro",
      content: "Nền tảng này giúp việc tìm việc dễ dàng hơn rất nhiều. Rất đáng để thử!",
      avatar: "MC",
      rating: 5
=======
      role: "Marketing Manager",
      company: "FinancePro",
      content:
        "The platform made job searching so much easier. Highly recommended!",
      role: "Quản lý Marketing",
      company: "FinancePro",
      content:
        "Nền tảng này giúp việc tìm việc dễ dàng hơn rất nhiều. Rất đáng để thử!",
      rating: 5,
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
    },
    {
      name: "Emily Rodriguez",
      role: "Nhà thiết kế UX",
      company: "StartupHub",
<<<<<<< HEAD
      content: "Trải nghiệm tuyệt vời! Tính năng CV video thực sự giúp tôi nổi bật.",
=======
      content:
        "Amazing experience! The video CV feature really helped me stand out.",
      content:
        "Trải nghiệm tuyệt vời! Tính năng CV video thực sự giúp tôi nổi bật.",
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
      avatar: "ER",
      rating: 5
    }
  ];
  const faqs = [
    {
<<<<<<< HEAD
=======
      question: "How does the AI job matching work?",
      answer:
        "Our AI analyzes your skills, experience, and preferences to match you with relevant job opportunities from our database of thousands of positions.",
    },
    {
      question: "Is it free to use?",
      answer:
        "Yes! Basic job searching and CV upload is completely free. Premium features are available for advanced matching and priority applications.",
    },
    {
      question: "How do I upload a video CV?",
      answer:
        "Simply go to your profile, click 'Upload Video CV', and record a 2-minute video introducing yourself and highlighting your key skills.",
    },
    {
      question: "Can employers see my profile?",
      answer:
        "Only if you choose to make it public. You have full control over your privacy settings and can choose who can view your profile.",
    },
    {
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
      question: "Tính năng AI matching việc làm hoạt động như thế nào?",
      answer:
        "AI của chúng tôi phân tích kỹ năng, kinh nghiệm và sở thích của bạn để kết nối bạn với các cơ hội việc làm phù hợp từ cơ sở dữ liệu hàng nghìn vị trí.",
    },
    {
      question: "Có miễn phí không?",
      answer:
        "Có! Tìm kiếm việc làm cơ bản và tải CV hoàn toàn miễn phí. Các tính năng cao cấp có sẵn cho matching nâng cao và ứng tuyển ưu tiên.",
    },
    {
      question: "Làm thế nào để tải CV video lên?",
      answer:
        "Chỉ cần vào hồ sơ của bạn, nhấp 'Tải CV Video', và quay video 2 phút giới thiệu bản thân và làm nổi bật các kỹ năng chính của bạn.",
    },
    {
      question: "Nhà tuyển dụng có thể xem hồ sơ của tôi không?",
<<<<<<< HEAD
      answer: "Chỉ khi bạn chọn công khai. Bạn có toàn quyền kiểm soát cài đặt quyền riêng tư và có thể chọn ai được xem hồ sơ của bạn."
    }
=======
      answer:
        "Chỉ khi bạn chọn công khai. Bạn có toàn quyền kiểm soát cài đặt quyền riêng tư và có thể chọn ai được xem hồ sơ của bạn.",
    },
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
<<<<<<< HEAD

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

=======
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const animateCounters = () => {
      const targets = { jobs: 12500, companies: 2500, candidates: 50000, success: 95 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let current = { jobs: 0, companies: 0, candidates: 0, success: 0 };
      
      const timer = setInterval(() => {
        Object.keys(targets).forEach(key => {
          const increment = targets[key] / steps;
          current[key] += increment;
          if (current[key] >= targets[key]) {
            current[key] = targets[key];
          }
        });
        
        setStats(current);
        
        if (current.jobs >= targets.jobs) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    if (isVisible.stats) {
      animateCounters();
    }
  }, [isVisible.stats]);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchData);
  };
  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-300 via-purple-200 to-blue-100 text-gray-800 py-20 lg:py-32 overflow-hidden">
        {/* Add subtle pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Add animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            id="hero"
            data-animate
            className={`transform transition-all duration-1000 ${
              isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
              Tham gia thế hệ người tìm việc mới và Tải CV của bạn ngay!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Tăng cơ hội của bạn và để nhà tuyển dụng tìm thấy bạn với hệ thống matching AI của chúng tôi
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group backdrop-blur-sm bg-opacity-80">
              <span className="flex items-center">
                Đăng ký miễn phí
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        
      </section>


      {/* Job Search Filters */}
      <section 
        id="search"
        data-animate
        className={`py-12 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg transform transition-all duration-1000 ${
          isVisible.search ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tìm công việc mơ ước</h2>
            <p className="text-gray-600 text-lg">Tìm kiếm qua hàng nghìn cơ hội việc làm</p>
          </div>
          
          <form onSubmit={handleSearch} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="keywords"
                  placeholder="Từ khóa/chức danh"
                  value={searchData.keywords}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder="Địa điểm"
                  value={searchData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <select
                  name="distance"
                  value={searchData.distance}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 appearance-none bg-white"
                >
                  <option value="">Khoảng cách</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <span className="flex items-center justify-center">
                    Tìm việc làm
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
              >
                Bộ lọc nâng cao
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Browse Jobs Section */}
      <section 
        id="browse"
        data-animate
        className={`py-16 bg-white transform transition-all duration-1000 ${
          isVisible.browse ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Duyệt việc làm
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Khám phá cơ hội việc làm từ các ngành nghề và địa điểm khác nhau
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-12">
            {[
              { id: 'industry', label: 'Việc theo ngành', icon: '🏭' },
              { id: 'location', label: 'Việc theo địa điểm', icon: '📍' },
              { id: 'popular', label: 'Việc phổ biến', icon: '🔥' },
              { id: 'company', label: 'Việc theo công ty', icon: '🏢' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 mx-2 mb-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Job Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobCategories.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-3">
                {column.map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-300 group transform hover:scale-105 hover:shadow-md border border-transparent hover:border-blue-200"
=======
    <>
      <div
        className="min-h-screen bg-gray-50 overflow-x-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-300 via-purple-200 to-blue-100 text-gray-800 py-20 lg:py-32 overflow-hidden">
          {/* Add subtle pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              id="hero"
              data-animate
              className={`transform transition-all duration-1000 ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Join the next generation of jobhunters and Upload your Video CV
                now!
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-4xl mx-auto leading-relaxed">
                {/* Increase your chances and let employers find you with our */}
                AI-powered matching system
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group backdrop-blur-sm bg-opacity-80">
                <span className="flex items-center">
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                    Tham gia thế hệ người tìm việc mới và Tải CV của bạn ngay!
                  </svg>
                </span>
              </button>

              <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Tăng cơ hội của bạn và để nhà tuyển dụng tìm thấy bạn với hệ
                thống matching AI của chúng tôi
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl group backdrop-blur-sm bg-opacity-80">
                <span className="flex items-center">
                  Đăng ký miễn phí
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Job Search Filters */}
        <section
          id="search"
          data-animate
          className={`py-12 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg transform transition-all duration-1000 ${
            isVisible.search
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Find Your Dream Job
              </h2>
              <p className="text-gray-600 text-lg">
                {/* Search through thousands of opportunities */}
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tìm công việc mơ ước
              </h2>
              <p className="text-gray-600 text-lg">
                Tìm kiếm qua hàng nghìn cơ hội việc làm
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="keywords"
                    placeholder="Từ khóa/chức danh"
                    value={searchData.keywords}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="location"
                    placeholder="Địa điểm"
                    value={searchData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <select
                    name="distance"
                    value={searchData.distance}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 appearance-none bg-white"
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
                  >
                    <option value="">Khoảng cách</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="25">25 km</option>
                    <option value="50">50 km</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    <span className="flex items-center justify-center">
                      Find jobs
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        // stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          // strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      Tìm việc làm
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                >
                  Bộ lọc nâng cao
                </button>
              </div>
            </form>
          </div>
        </section>

<<<<<<< HEAD

      {/* Featured Companies */}
      <section 
        id="companies"
        data-animate
        className={`py-16 bg-gray-50 transform transition-all duration-1000 ${
          isVisible.companies ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Công ty nổi bật
            </h2>
            <p className="text-gray-600 text-lg">Được tin tưởng bởi các tổ chức hàng đầu trên toàn thế giới</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {featuredCompanies.map((company, index) => (
=======
        {/* Browse Jobs Section */}
        <section
          id="browse"
          data-animate
          className={`py-16 bg-white transform transition-all duration-1000 ${
            isVisible.browse
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Duyệt việc làm
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Khám phá cơ hội việc làm từ các ngành nghề và địa điểm khác nhau
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-12">
              {[
                { id: "industry", label: "Jobs by Industry", icon: "🏭" },
                { id: "location", label: "Jobs by Location", icon: "📍" },
                { id: "popular", label: "Popular Jobs", icon: "🔥" },
                { id: "company", label: "Jobs by Company", icon: "🏢" },
                { id: "industry", label: "Việc theo ngành", icon: "🏭" },
                { id: "location", label: "Việc theo địa điểm", icon: "📍" },
                { id: "popular", label: "Việc phổ biến", icon: "🔥" },
                { id: "company", label: "Việc theo công ty", icon: "🏢" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 mx-2 mb-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Job Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {jobCategories.map((column, columnIndex) => (
                <div key={columnIndex} className="space-y-3">
                  {column.map((category, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-300 group transform hover:scale-105 hover:shadow-md border border-transparent hover:border-blue-200"
                    >
                      <span className="text-gray-700 group-hover:text-blue-600 font-medium flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></span>
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Companies */}
        <section
          id="companies"
          data-animate
          className={`py-16 bg-gray-50 transform transition-all duration-1000 ${
            isVisible.companies
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Công ty nổi bật
              </h2>
              <p className="text-gray-600 text-lg">
                Trusted by leading organizations worldwide
              </p>
              {/* <p className="text-gray-600 text-lg">Được tin tưởng bởi các tổ chức hàng đầu trên toàn thế giới</p> */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              {/* {featuredCompanies.map((company, index) => ( */}
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group cursor-pointer transform hover:scale-105 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <span className="text-blue-600 font-bold text-lg group-hover:scale-110 transition-transform">{company.logo}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{company.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">{company.rating}</span>
                </div>
                <p className="text-sm text-gray-500">{company.jobs} việc làm</p>
              </div>
<<<<<<< HEAD
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 group">
              <span className="flex items-center">
                Xem thêm (15/30)
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>


      {/* Register CV Section */}
      <section 
        id="register"
        data-animate
        className={`py-16 bg-gradient-to-br from-blue-50 to-indigo-100 transform transition-all duration-1000 ${
          isVisible.register ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Đăng ký CV của bạn
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Tham gia cùng hàng nghìn người tìm việc đã tìm được công việc mơ ước qua nền tảng của chúng tôi. 
                  Tải CV của bạn lên và để các nhà tuyển dụng hàng đầu khám phá tiềm năng của bạn. Nhận gợi ý việc làm 
                  cá nhân hóa và không bỏ lỡ bất kỳ cơ hội nào.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 group">
                  <span className="flex items-center">
                    Đăng ký ngay
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Những gì bạn nhận được:</h3>
                  <div className="space-y-4">
                    {[
                      { text: 'Matching việc làm tức thì', icon: '⚡' },
                      { text: 'Thông báo qua email', icon: '📧' },
                      { text: 'Tư vấn nghề nghiệp', icon: '💡' },
                      { text: 'Ứng tuyển ưu tiên', icon: '⭐' },
                      { text: 'Hỗ trợ CV video', icon: '🎥' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 group">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <span className="text-green-600 text-sm">{item.icon}</span>
                        </div>
                        <span className="text-gray-700 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recruiting Section */}
      <section 
        id="recruiting"
        data-animate
        className={`py-16 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 transform transition-all duration-1000 ${
          isVisible.recruiting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="max-w-4xl w-full">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-white text-center border border-white border-opacity-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Đang tuyển dụng?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Tìm nhân tài tốt nhất cho công ty của bạn. Đăng tin tuyển dụng, tìm kiếm trong cơ sở dữ liệu 
                ứng viên có trình độ, và kết nối với các chuyên gia hàng đầu trong ngành của bạn. Tham gia cùng 
                hàng nghìn công ty tin tưởng chúng tôi cho nhu cầu tuyển dụng của họ.
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 group">
                <span className="flex items-center">
                  Bắt đầu tuyển dụng ngay
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
=======
            </div>

            <div className="text-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 group">
                <span className="flex items-center">
                  Load more (15/30)
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    // stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      // strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Xem thêm (15/30)
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Register CV Section */}
        <section
          id="register"
          data-animate
          className={`py-16 bg-gradient-to-br from-blue-50 to-indigo-100 transform transition-all duration-1000 ${
            isVisible.register
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Đăng ký CV của bạn
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Join thousands of job seekers who have found their dream
                    jobs through our platform. Upload your CV and let top
                    employers discover your potential. Get personalized job
                    recommendations and never miss an opportunity.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 group">
                    <span className="flex items-center">
                      Subscribe Now
                      <svg
                        // className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Tham gia cùng hàng nghìn người tìm việc đã tìm được công
                    việc mơ ước qua nền tảng của chúng tôi. Tải CV của bạn lên
                    và để các nhà tuyển dụng hàng đầu khám phá tiềm năng của
                    bạn. Nhận gợi ý việc làm cá nhân hóa và không bỏ lỡ bất kỳ
                    cơ hội nào.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 group">
                    <span className="flex items-center">
                      Đăng ký ngay
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      What you get:
                    </h3>
                    <div className="space-y-4">
                      {[
                        { text: "Instant job matching", icon: "⚡" },
                        { text: "Email notifications", icon: "📧" },
                        { text: "Career advice", icon: "💡" },
                        { text: "Priority applications", icon: "⭐" },
                        { text: "Video CV support", icon: "🎥" },
                      ]}
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Những gì bạn nhận được:
                      </h3>
                      <div className="space-y-4">
                        {[
                          { text: "Matching việc làm tức thì", icon: "⚡" },
                          { text: "Thông báo qua email", icon: "📧" },
                          { text: "Tư vấn nghề nghiệp", icon: "💡" },
                          { text: "Ứng tuyển ưu tiên", icon: "⭐" },
                          { text: "Hỗ trợ CV video", icon: "🎥" },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 group"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                              <span className="text-green-600 text-sm">
                                {item.icon}
                              </span>
                            </div>
                            <span className="text-gray-700 font-medium">
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recruiting Section */}
        <section
          id="recruiting"
          data-animate
          className={`py-16 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 transform transition-all duration-1000 ${
            isVisible.recruiting
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="max-w-4xl w-full">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-white text-center border border-white border-opacity-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Đang tuyển dụng?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Find the best talent for your company. Post jobs, search our
                  database of qualified candidates, and connect with top
                  professionals in your industry. Join thousands of companies
                  that trust us for their hiring needs.
                </p>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 group">
                  <span className="flex items-center">
                    Start recruiting now
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Bạn đang tuyển dụng? Tìm nhân tài tốt nhất cho công ty của
                  bạn. Đăng tin tuyển dụng, tìm kiếm trong cơ sở dữ liệu ứng
                  viên có trình độ, và kết nối với các chuyên gia hàng đầu trong
                  ngành của bạn. Tham gia cùng hàng nghìn công ty tin tưởng
                  chúng tôi cho nhu cầu tuyển dụng của họ.
                </p>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 group">
                  <span className="flex items-center">
                    Bắt đầu tuyển dụng ngay
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
<<<<<<< HEAD

export default Home;
=======
export default Home;
>>>>>>> de59b76 (Cập nhật code account và jobPosting)
