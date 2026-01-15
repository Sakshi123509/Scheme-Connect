// src/pages/AboutUs.jsx
import { Target, Eye, Heart, Users, Shield, Zap, CheckCircle, Award } from 'lucide-react';

const AboutUs = () => {
  const visionMission = [
    {
      icon: <Eye className="text-blue-600" size={40} />,
      title: "हमारा विज़न",
      titleEn: "Our Vision",
      description: "एक ऐसा भारत जहां हर नागरिक को सरकारी योजनाओं की जानकारी आसानी से मिले और वे अपने अधिकारों का लाभ उठा सकें।",
      descriptionEn: "An India where every citizen has easy access to government schemes and can benefit from their rights."
    },
    {
      icon: <Target className="text-orange-600" size={40} />,
      title: "हमारा मिशन",
      titleEn: "Our Mission",
      description: "सभी सरकारी योजनाओं को एक डिजिटल मंच पर लाकर पारदर्शिता, सरलता और पहुंच सुनिश्चित करना। प्रत्येक नागरिक को सशक्त बनाना।",
      descriptionEn: "To bring all government schemes on one digital platform ensuring transparency, simplicity and accessibility. Empowering every citizen."
    }
  ];

  const values = [
    {
      icon: <Shield size={32} />,
      title: "पारदर्शिता",
      description: "सभी जानकारी स्पष्ट और सत्यापित"
    },
    {
      icon: <Zap size={32} />,
      title: "सरलता",
      description: "आसान भाषा और सरल प्रक्रिया"
    },
    {
      icon: <Users size={32} />,
      title: "समावेशिता",
      description: "हर वर्ग के लिए योजनाएं"
    },
    {
      icon: <Heart size={32} />,
      title: "सेवा भावना",
      description: "नागरिक सेवा हमारा लक्ष्य"
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "खोजें",
      description: "अपनी पात्रता के अनुसार योजनाएं खोजें",
      icon: "🔍"
    },
    {
      step: "02",
      title: "जानें",
      description: "योजना की पूरी जानकारी और लाभ पढ़ें",
      icon: "📖"
    },
    {
      step: "03",
      title: "आवेदन करें",
      description: "ऑनलाइन फॉर्म भरें और दस्तावेज़ अपलोड करें",
      icon: "📝"
    },
    {
      step: "04",
      title: "ट्रैक करें",
      description: "अपने आवेदन की स्थिति देखें",
      icon: "📊"
    },
    {
      step: "05",
      title: "लाभ पाएं",
      description: "स्वीकृति के बाद योजना का लाभ उठाएं",
      icon: "🎉"
    }
  ];

  const stats = [
    { number: "500+", label: "सरकारी योजनाएं", labelEn: "Government Schemes" },
    { number: "10L+", label: "पंजीकृत उपयोगकर्ता", labelEn: "Registered Users" },
    { number: "50L+", label: "सफल आवेदन", labelEn: "Successful Applications" },
    { number: "99%", label: "संतुष्ट उपयोगकर्ता", labelEn: "Satisfied Users" }
  ];

  const features = [
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "सभी योजनाएं एक जगह",
      description: "केंद्र और राज्य सरकार की सभी योजनाएं"
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "स्मार्ट खोज",
      description: "अपनी पात्रता के अनुसार योजनाएं खोजें"
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "आसान आवेदन",
      description: "सरल ऑनलाइन आवेदन प्रक्रिया"
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "रियल-टाइम ट्रैकिंग",
      description: "अपने आवेदन की स्थिति देखें"
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "बहुभाषी समर्थन",
      description: "हिंदी और अंग्रेजी में उपलब्ध"
    },
    {
      icon: <CheckCircle className="text-green-600" size={24} />,
      title: "सुरक्षित डेटा",
      description: "आपकी जानकारी पूरी तरह सुरक्षित"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🇮🇳</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">हमारे बारे में</h1>
          <p className="text-xl text-blue-200 mb-2">About Us</p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            भारत सरकार की सभी योजनाओं को डिजिटल रूप से जोड़ने वाला एकीकृत मंच
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {visionMission.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600 hover:shadow-2xl transition">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 text-center mb-4">{item.titleEn}</p>
                <p className="text-gray-700 text-center leading-relaxed mb-2">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500 text-center italic">
                  {item.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">कैसे काम करता है?</h2>
            <p className="text-xl text-gray-600">How It Works</p>
            <p className="text-gray-600 mt-2">योजना का लाभ उठाने की सरल प्रक्रिया</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {workflow.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="text-blue-600 text-3xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">हमारे मूल्य</h2>
            <p className="text-xl text-gray-600">Our Core Values</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-md">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">हमारी विशेषताएं</h2>
            <p className="text-xl text-gray-600">Key Features</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="mx-auto mb-6 text-yellow-400" size={64} />
          <h2 className="text-4xl font-bold mb-4">आज ही शुरू करें</h2>
          <p className="text-xl text-blue-200 mb-8">
            अपने लिए उपयुक्त योजनाएं खोजें और लाभ उठाएं
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/schemes"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg"
            >
              योजनाएं देखें
            </a>
            <a
              href="/signup"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
            >
              अभी रजिस्टर करें
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;