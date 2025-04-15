import { type NextRequest, NextResponse } from "next/server"

// Mock disease prediction model
const predictDisease = async (imageData: string) => {
  // In a real app, this would call a machine learning model
  // For now, we'll return mock data

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock prediction
  return {
    disease: "Late Blight",
    confidence: 0.92,
    description:
      "Late blight is a plant disease caused by the oomycete pathogen Phytophthora infestans. It primarily affects potatoes and tomatoes, causing significant crop losses worldwide.",
    treatment: [
      "Apply fungicides containing chlorothalonil, mancozeb, or copper compounds",
      "Remove and destroy infected plant parts",
      "Ensure proper spacing between plants for good air circulation",
      "Avoid overhead irrigation to keep foliage dry",
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert file to base64 string
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")

    // Get prediction
    const prediction = await predictDisease(base64Image)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}

