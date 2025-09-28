// app/api/newsletter/route.js - App Router API for newsletter
import { NextResponse } from 'next/server'
import { getDb } from '../../../lib/mongodb'

export async function GET(request) {
  try {
    const db = await getDb()
    
    const articles = await db
      .collection('articles')
      .find({ date: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } })
      .limit(3)
      .toArray()
      
    const quotes = await db.collection('quotes').aggregate([{ $sample: { size: 1 } }]).toArray()
    
    return NextResponse.json({ 
      articles, 
      quote: quotes[0] 
    })
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch newsletter data' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    const db = await getDb()
    
    // Check if email already exists
    const existingSubscriber = await db.collection('subscribers').findOne({ email })
    
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }
    
    // Add new subscriber
    await db.collection('subscribers').insertOne({
      email,
      subscribed: true,
      dateSubscribed: new Date(),
      source: 'website'
    })
    
    return NextResponse.json({ 
      message: 'Successfully subscribed to newsletter' 
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}