import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Video, Music } from "lucide-react";

const BentoClone = () => {
  // Sample social media cards data
  const cards = [
    { 
      id: 1, 
      type: 'github',
      title: 'Mayank kadam',
      link: 'github.com',
      icon: <Github className="h-6 w-6" />,
      size: '1x1'
    },
    { 
      id: 2, 
      type: 'linkedin',
      title: 'www.linkedin.com',
      subtitle: 'linkedin.com',
      icon: <Linkedin className="h-6 w-6 text-blue-600" />,
      size: '1x1'
    },
    { 
      id: 3, 
      type: 'medium',
      title: 'Mayank Kadam on Medium curated some lists',
      subtitle: 'medium.com',
      icon: <Video className="h-6 w-6" />,
      size: '2x1'
    },
    { 
      id: 4, 
      type: 'spotify',
      title: 'Add Music',
      icon: <Music className="h-6 w-6 text-green-500" />,
      size: '1x1'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Fixed Profile Card */}
        <div className="w-80 shrink-0">
          <Card className="sticky top-8">
            <CardContent className="p-6 space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/api/placeholder/150/150" alt="Profile" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Mayank Kadam</h1>
                <p className="text-gray-600">First year IT undergrad at PCCOE Pune</p>
              </div>
              <div className="pt-4">
                <Card className="bg-gray-100">
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">pune, india</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid System */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-4 auto-rows-[100px]">
            {cards.map((card) => (
              <Card 
                key={card.id} 
                className={`hover:shadow-lg transition-shadow ${
                  card.size === '2x1' ? 'col-span-2' : 
                  card.size === '1x2' ? 'row-span-2' :
                  card.size === '2x2' ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    {card.icon}
                    {card.type === 'github' && (
                      <button className="px-4 py-1 text-sm border rounded-md hover:bg-gray-50">
                        Follow
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{card.title}</h3>
                    {card.subtitle && (
                      <p className="text-sm text-gray-500">{card.subtitle}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoClone;