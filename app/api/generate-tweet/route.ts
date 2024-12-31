import { NextResponse } from 'next/server';
import openai from '@/lib/openai';
import clientPromise from '@/lib/mongodb';

async function generateTweet() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a Twitter user. Generate a realistic tweet with current trends and topics. Keep it under 280 characters."
      },
      {
        role: "user",
        content: "Generate a tweet"
      }
    ],
  });

  return completion.choices[0].message.content;
}

async function generateUser() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Generate a JSON object for a Twitter user with the following fields: username, displayName, bio. Make it realistic and interesting."
      },
      {
        role: "user",
        content: "Generate a user"
      }
    ],
  });

  return JSON.parse(completion.choices[0].message.content as string);
}

export async function GET() {
  try {
    const tweet = await generateTweet();
    const user = await generateUser();
    const client = await clientPromise;
    const db = client.db('twitter-clone');
    
    const newTweet = {
      content: tweet,
      user,
      createdAt: new Date(),
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 500),
      replies: Math.floor(Math.random() * 100),
    };
    
    await db.collection('tweets').insertOne(newTweet);
    
    return NextResponse.json(newTweet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate tweet' }, { status: 500 });
  }
}