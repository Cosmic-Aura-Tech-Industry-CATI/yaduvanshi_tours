import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log inquiry details on system stdout (placeholder database)
    console.log("=== NEW TOUR/VEHICLE INQUIRY SUBMISSION ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Details:", JSON.stringify(body, null, 2));
    console.log("=========================================");

    return NextResponse.json(
      { 
        success: true, 
        message: "Inquiry successfully recorded.",
        receivedAt: new Date().toISOString() 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Inquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry submission." },
      { status: 500 }
    );
  }
}
