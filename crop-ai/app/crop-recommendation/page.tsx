"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, ArrowLeft, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FormData {
  nitrogen: string
  phosphorus: string
  potassium: string
  temperature: string
  humidity: string
  ph: string
  rainfall: string
}

export default function CropRecommendationPage() {
  const initialFormData: FormData = {
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [recommendation, setRecommendation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        setError(`Please fill in the ${key} field`)
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      // Call our Next.js API route
      const response = await fetch("/api/recommend-crop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to get recommendations")
      const data = await response.json()

      setRecommendation(data)
    } catch (err) {
      setError("Failed to get recommendations. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setRecommendation(null)
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Crop Recommendation</h2>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen">Nitrogen (N) in kg/ha</Label>
                    <Input
                      id="nitrogen"
                      name="nitrogen"
                      type="number"
                      placeholder="e.g., 90"
                      value={formData.nitrogen}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phosphorus">Phosphorus (P) in kg/ha</Label>
                    <Input
                      id="phosphorus"
                      name="phosphorus"
                      type="number"
                      placeholder="e.g., 42"
                      value={formData.phosphorus}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="potassium">Potassium (K) in kg/ha</Label>
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
                    <Label htmlFor="temperature">Temperature in °C</Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 20.8"
                      value={formData.temperature}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity in %</Label>
                    <Input
                      id="humidity"
                      name="humidity"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 82.0"
                      value={formData.humidity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ph">pH value</Label>
                    <Input
                      id="ph"
                      name="ph"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 6.5"
                      value={formData.ph}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rainfall">Rainfall in mm</Label>
                    <Input
                      id="rainfall"
                      name="rainfall"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 202.9"
                      value={formData.rainfall}
                      onChange={handleChange}
                    />
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
                      "Get Recommendation"
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {recommendation && (
            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Recommendation Result</h3>
                    <p className="text-gray-500 text-sm">Based on your soil and climate data</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Recommended Crop</h4>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">{recommendation.recommended_crop}</span>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          {Math.round(recommendation.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Alternative Options</h4>
                      <ul className="space-y-1">
                        {recommendation.alternatives.map((alt: any, index: number) => (
                          <li key={index} className="flex justify-between">
                            <span className="text-gray-700">{alt.crop}</span>
                            <span className="text-gray-500">{Math.round(alt.confidence * 100)}% match</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">About {recommendation.recommended_crop}</h4>
                    <p className="text-gray-600 mb-4">{recommendation.description}</p>

                    <h4 className="font-medium text-gray-700 mb-2">Optimal Growing Conditions</h4>
                    <p className="text-gray-600">{recommendation.growing_conditions}</p>
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

