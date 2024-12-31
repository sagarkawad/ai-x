import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('twitter-clone');
    
    const tweets = await db
      .collection('tweets')
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    
    return NextResponse.json(tweets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 });
  }
}