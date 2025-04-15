import Link from "next/link"
import { Leaf, ArrowLeft, Brain, Database, LineChart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">CropAI</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium font-bold">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About CropAI</h2>

          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600 mb-8">
              CropAI is an advanced agricultural intelligence system that leverages machine learning to help farmers
              make data-driven decisions for improved crop yields and sustainability.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h3>
            <p className="mb-6">
              Our mission is to democratize access to agricultural technology and empower farmers of all scales with
              cutting-edge AI tools that were previously only available to large agricultural corporations. By providing
              accurate predictions and recommendations, we aim to increase crop yields, reduce resource waste, and
              promote sustainable farming practices.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Technology</h3>
            <div className="grid md:grid-cols-3 gap-8 my-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Brain className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Machine Learning</h4>
                <p className="text-gray-600">
                  Our models are trained on extensive agricultural datasets to provide accurate predictions and
                  recommendations tailored to your specific conditions.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Database className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Comprehensive Database</h4>
                <p className="text-gray-600">
                  We maintain an extensive database of crop diseases, soil conditions, and fertilizer formulations to
                  provide you with the most relevant information.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <LineChart className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Data-Driven Insights</h4>
                <p className="text-gray-600">
                  Transform raw agricultural data into actionable insights that help you make informed decisions about
                  your farming practices.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h3>
            <p className="mb-4">
              CropAI uses sophisticated machine learning algorithms to analyze various parameters and provide accurate
              predictions and recommendations:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Crop Disease Prediction:</strong> Our image recognition system can identify various crop
                diseases with high accuracy, helping you take preventive measures before the disease spreads.
              </li>
              <li>
                <strong>Crop Recommendation:</strong> By analyzing soil composition, climate conditions, and other
                relevant factors, we recommend the most suitable crops for your land.
              </li>
              <li>
                <strong>Fertilizer Suggestion:</strong> Based on soil nutrient levels and crop requirements, we suggest
                optimal fertilizer formulations to maximize yield while minimizing waste.
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Team</h3>
            <p className="mb-6">
              CropAI was developed by a multidisciplinary team of agricultural scientists, machine learning experts, and
              software engineers passionate about sustainable agriculture. Our team combines decades of experience in
              both agriculture and technology to create solutions that address real-world farming challenges.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <h2 className="text-xl font-bold">CropAI</h2>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/disease-prediction" className="text-gray-400 hover:text-green-400">
                      Disease Prediction
                    </Link>
                  </li>
                  <li>
                    <Link href="/crop-recommendation" className="text-gray-400 hover:text-green-400">
                      Crop Recommendation
                    </Link>
                  </li>
                  <li>
                    <Link href="/fertilizer-suggestion" className="text-gray-400 hover:text-green-400">
                      Fertilizer Suggestion
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog" className="text-gray-400 hover:text-green-400">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="text-gray-400 hover:text-green-400">
                      Research
                    </Link>
                  </li>
                  <li>
                    <Link href="/documentation" className="text-gray-400 hover:text-green-400">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-400 hover:text-green-400">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-green-400">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-green-400">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} CropAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

