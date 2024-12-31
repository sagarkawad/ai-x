"use client";

import { useEffect, useState } from "react";
import { Tweet } from "@/components/Tweet";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Twitter } from "lucide-react";

export default function Home() {
  const [tweets, setTweets] = useState([]);



  const fetchTweets = async () => {
    const response = await fetch("/api/tweets");
    const data = await response.json();
    setTweets(data);
  };

  const addTweets = async () => {
    const response = await fetch("/api/generate-tweet");
  }

  useEffect(() => {
    function addAndFetchTweets() {
      fetchTweets();
      addTweets();
    }

    //add and fetch
    addAndFetchTweets();
    
    // Fetch new tweets every 30 seconds
    const interval = setInterval(addAndFetchTweets, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-2xl">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b">
          <div className="p-4 flex items-center">
            <Twitter className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold ml-4">Home</h1>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-64px)]">
          {tweets.map((tweet: any) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
          
          {tweets.length === 0 && (
            <Card className="p-8 text-center text-gray-500">
              Loading tweets...
            </Card>
          )}
        </ScrollArea>
      </div>
    </main>
  );
}