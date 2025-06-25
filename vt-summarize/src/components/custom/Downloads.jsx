import React from 'react';
import Header from './Header';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

function Downloads() {
  // Sample download items
  const downloadItems = [
    {
      id: 1,
      title: 'Meeting Summary - June 21',
      date: '2025-06-21',
      description: 'Summary of weekly team sync meeting.',
      fileUrl: '/downloads/meeting-summary-june21.pdf',
    },
    {
      id: 2,
      title: 'Podcast Digest - Ep. 45',
      date: '2025-06-18',
      description: 'Digest of “Tech Talks” Podcast, Episode 45.',
      fileUrl: '/downloads/tech-talks-ep45.pdf',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Downloads</h2>

        {downloadItems.length === 0 ? (
          <div className="text-gray-600 text-center mt-20">
            <p>No downloads available yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {downloadItems.map((item) => (
              <Card key={item.id} className="shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  <a href={item.fileUrl} download>
                    <Button className="w-full">Download</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Downloads;
