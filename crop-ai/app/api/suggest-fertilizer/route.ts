import { type NextRequest, NextResponse } from "next/server"

// Mock fertilizer suggestion model
const suggestFertilizer = async (data: any) => {
  // In a real app, this would call a machine learning model
  // For now, we'll return mock data based on input

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Extract values for simple logic
  const n = Number.parseFloat(data.nitrogen)
  const p = Number.parseFloat(data.phosphorus)
  const k = Number.parseFloat(data.potassium)

  // Determine deficiencies
  const n_status = n < 50 ? "Low" : "Optimal"
  const p_status = p < 30 ? "Low" : "Optimal"
  const k_status = k < 30 ? "Low" : "Optimal"

  // Suggest fertilizer based on deficiencies
  let fertilizer, description, application_rate, alternatives

  if (n_status === "Low" && p_status === "Low" && k_status === "Low") {
    fertilizer = "NPK-10-26-26"
    description =
      "NPK-10-26-26 is a complex fertilizer containing 10% Nitrogen, 26% Phosphorus, and 26% Potassium. It's ideal for crops requiring higher phosphorus and potassium than nitrogen."
    application_rate = "250-300 kg/ha"
    alternatives = [
      { name: "DAP + MOP", ratio: "100 kg/ha + 50 kg/ha" },
      { name: "SSP + Urea", ratio: "250 kg/ha + 30 kg/ha" },
    ]
  } else if (n_status === "Low" && p_status === "Optimal" && k_status === "Optimal") {
    fertilizer = "Urea"
    description =
      "Urea is a nitrogen-rich fertilizer with 46% nitrogen content. It's suitable for crops that require a nitrogen boost without additional phosphorus or potassium."
    application_rate = "100-150 kg/ha"
    alternatives = [
      { name: "Ammonium Sulfate", ratio: "200 kg/ha" },
      { name: "Calcium Ammonium Nitrate", ratio: "180 kg/ha" },
    ]
  } else {
    fertilizer = "Balanced NPK 20-20-20"
    description =
      "A balanced fertilizer with equal parts nitrogen, phosphorus, and potassium. Suitable for maintaining overall soil fertility."
    application_rate = "200-250 kg/ha"
    alternatives = [
      { name: "Organic Compost", ratio: "5-10 tons/ha" },
      { name: "NPK 15-15-15", ratio: "300 kg/ha" },
    ]
  }

  const recommendations = [
    "Apply in two split doses: 60% as basal application and 40% after 30 days of sowing",
    "Incorporate into soil 5-10 cm deep for best results",
    "Consider adding organic matter to improve soil structure and nutrient retention",
    "Monitor crop response and adjust future applications accordingly",
  ]

  return {
    fertilizer,
    description,
    application_rate,
    deficiency: {
      nitrogen: n_status,
      phosphorus: p_status,
      potassium: k_status,
    },
    recommendations,
    alternatives,
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Basic validation
    const requiredFields = ["nitrogen", "phosphorus", "potassium", "cropType", "soilType"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Get fertilizer suggestion
    const suggestion = await suggestFertilizer(data)

    return NextResponse.json(suggestion)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

