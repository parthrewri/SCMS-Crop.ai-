"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, ArrowLeft, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormData {
  nitrogen: string
  phosphorus: string
  potassium: string
  cropType: string
  soilType: string
}

const cropTypes = [
  "Rice",
  "Maize",
  "Chickpea",
  "Kidney Beans",
  "Pigeon Peas",
  "Moth Beans",
  "Mung Bean",
  "Black Gram",
  "Lentil",
  "Pomegranate",
  "Banana",
  "Mango",
  "Grapes",
  "Watermelon",
  "Muskmelon",
  "Apple",
  "Orange",
  "Papaya",
  "Coconut",
  "Cotton",
  "Jute",
  "Coffee",
]

const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey", "Alluvial"]

export default function FertilizerSuggestionPage() {
  const initialFormData: FormData = {
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    cropType: "",
    soilType: "",
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [suggestion, setSuggestion] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.nitrogen || !formData.phosphorus || !formData.potassium) {
      setError("Please fill in all nutrient values")
      return
    }

    if (!formData.cropType) {
      setError("Please select a crop type")
      return
    }

    if (!formData.soilType) {
      setError("Please select a soil type")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Call our Next.js API route
      const response = await fetch("/api/suggest-fertilizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to get fertilizer suggestion")
      const data = await response.json()

      setSuggestion(data)
    } catch (err) {
      setError("Failed to get fertilizer suggestion. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setSuggestion(null)
    setError(null)
  }

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
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Fertilizer Suggestion</h2>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen">Nitrogen (N) in soil (mg/kg)</Label>
                    <Input
                      id="nitrogen"
                      name="nitrogen"
                      type="number"
                      placeholder="e.g., 40"
                      value={formData.nitrogen}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phosphorus">Phosphorus (P) in soil (mg/kg)</Label>
                    <Input
                      id="phosphorus"
                      name="phosphorus"
                      type="number"
                      placeholder="e.g., 85"
                      value={formData.phosphorus}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="potassium">Potassium (K) in soil (mg/kg)</Label>
                    <Input
                      id="potassium"
                      name="potassium"
                      type="number"
                      placeholder="e.g., 43"
                      value={formData.potassium}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Select value={formData.cropType} onValueChange={(value) => handleSelectChange("cropType", value)}>
                      <SelectTrigger id="cropType">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cropTypes.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={formData.soilType} onValueChange={(value) => handleSelectChange("soilType", value)}>
                      <SelectTrigger id="soilType">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {soilTypes.map((soil) => (
                          <SelectItem key={soil} value={soil}>
                            {soil}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Get Fertilizer Suggestion"
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {suggestion && (
            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Fertilizer Suggestion</h3>
                    <p className="text-gray-500 text-sm">Based on your soil nutrient levels and crop type</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Recommended Fertilizer</h4>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{suggestion.fertilizer}</div>
                      <p className="text-gray-600">{suggestion.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Application Rate</h4>
                      <div className="text-xl font-semibold text-gray-900 mb-4">{suggestion.application_rate}</div>

                      <h4 className="font-medium text-gray-700 mb-2">Nutrient Status</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Nitrogen (N):</span>
                          <span
                            className={`font-medium ${suggestion.deficiency.nitrogen === "Low" ? "text-red-600" : "text-green-600"}`}
                          >
                            {suggestion.deficiency.nitrogen}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Phosphorus (P):</span>
                          <span
                            className={`font-medium ${suggestion.deficiency.phosphorus === "Low" ? "text-red-600" : "text-green-600"}`}
                          >
                            {suggestion.deficiency.phosphorus}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Potassium (K):</span>
                          <span
                            className={`font-medium ${suggestion.deficiency.potassium === "Low" ? "text-red-600" : "text-green-600"}`}
                          >
                            {suggestion.deficiency.potassium}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Application Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {suggestion.recommendations.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Alternative Fertilizer Options</h4>
                    <div className="space-y-2">
                      {suggestion.alternatives.map((alt: any, index: number) => (
                        <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium text-gray-700">{alt.name}</span>
                          <span className="text-gray-600">{alt.ratio}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

