"use client";

import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

interface TweetProps {
  tweet: {
    content: string;
    user: {
      username: string;
      displayName: string;
      bio: string;
    };
    createdAt: string;
    likes: number;
    retweets: number;
    replies: number;
  };
}

export function Tweet({ tweet }: TweetProps) {
  return (
    <Card className="p-4 hover:bg-gray-50 cursor-pointer border-b rounded-none">
      <div className="flex space-x-3">
        <Avatar className="w-12 h-12">
          <div className="bg-gray-200 w-full h-full rounded-full flex items-center justify-center">
            {tweet.user.displayName[0]}
          </div>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{tweet.user.displayName}</span>
            <span className="text-gray-500">@{tweet.user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="mt-2 text-gray-900">{tweet.content}</p>
          <div className="flex justify-between mt-4 text-gray-500 max-w-md">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <MessageCircle className="w-5 h-5" />
              <span>{tweet.replies}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500">
              <Repeat2 className="w-5 h-5" />
              <span>{tweet.retweets}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-red-500">
              <Heart className="w-5 h-5" />
              <span>{tweet.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}