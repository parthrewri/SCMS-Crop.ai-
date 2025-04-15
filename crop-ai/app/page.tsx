import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, Microscope, FlaskRoundIcon as Flask } from "lucide-react"

export default function Home() {
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
                <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium">
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
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Crop Management System</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leverage the power of machine learning to optimize your farming decisions, predict crop diseases, and get
            personalized recommendations.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Microscope className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Crop Disease Prediction</CardTitle>
              <CardDescription>
                Upload images of your crops to identify diseases and get treatment recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our advanced image recognition system can identify over 38 different crop diseases with 97.5% accuracy,
                helping you take action before it's too late.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/disease-prediction" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Detect Diseases
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Leaf className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Crop Recommendation</CardTitle>
              <CardDescription>
                Get personalized crop suggestions based on your soil and climate conditions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Input your soil parameters and local climate data to receive AI-powered recommendations for the most
                suitable crops for your land.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/crop-recommendation" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Get Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Flask className="h-12 w-12 text-green-600 mb-2" />
              <CardTitle>Fertilizer Suggestion</CardTitle>
              <CardDescription>
                Optimize your fertilizer usage based on soil composition and crop requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our system analyzes your soil nutrient levels and crop needs to suggest the most effective fertilizer
                mix, saving costs and improving yields.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/fertilizer-suggestion" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Get Fertilizer Plan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
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

