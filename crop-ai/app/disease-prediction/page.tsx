"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, ArrowLeft, Upload, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DiseasePredictionPage() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [prediction, setPrediction] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setPrediction(null)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select an image first")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      // Call our Next.js API route
      const response = await fetch("/api/predict-disease", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Failed to process image")
      const data = await response.json()

      setPrediction(data)
    } catch (err) {
      setError("Failed to process image. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setImage(null)
    setFile(null)
    setPrediction(null)
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Crop Disease Prediction</h2>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Upload an image of your crop</label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors
                      ${image ? "border-green-300" : "border-gray-300"}`}
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    {image ? (
                      <div className="space-y-4">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Uploaded crop"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-gray-500">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <p className="text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
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
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!image || loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Image"
                    )}
                  </Button>
                  {image && (
                    <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                      Reset
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {prediction && (
            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Prediction Result</h3>
                    <p className="text-gray-500 text-sm">Based on the uploaded image</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Detected Disease</h4>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">{prediction.disease}</span>
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          {Math.round(prediction.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                      <p className="text-gray-600">{prediction.description}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Recommended Treatment</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {prediction.treatment.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
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

