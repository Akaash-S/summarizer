import React, { useState } from 'react';
import Header from './Header';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent } from '../../components/ui/card';
import { Clipboard, Download } from 'lucide-react';

function Summariser() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    // Replace this with actual summarization logic (e.g., API call)
    const mockSummary = `Summary of: "${inputText.slice(0, 50)}..."`;
    setSummary(mockSummary);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        {/* Left: User Input */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Text to Summarize</h2>
            <Textarea
              rows={12}
              placeholder="Paste your text, transcript, or notes here..."
              className="mb-4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button className="w-full" onClick={handleSummarize} disabled={!inputText.trim()}>
              Summarize
            </Button>
          </CardContent>
        </Card>

        {/* Right: Summary Output */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
              {summary && (
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Clipboard className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="h-[240px] overflow-y-auto bg-gray-100 p-4 rounded text-gray-700 text-sm whitespace-pre-wrap">
              {summary || (
                <p className="text-gray-400 italic">
                  Summary will appear here once generated.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Summariser;
