"use client";
import ShowcaseInsights from '@/components/ui/ShowcaseInsights';
import React, { useState } from 'react';
const apiKey = process.env.NEXT_PUBLIC_CRUX_API_KEY;
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

export default function UXPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setData(null);
    const urls = url.split(',').map((u) => u.trim()).filter((u) => u);

    const results = await Promise.all(urls.map(async (url) => {
      try {
        const response = await fetch(
          `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          }
        );
        const result = await response.json();

        if (!response.ok) {
          return { url, error: result.error.message ?? "Unknown error" }
        }
        return { url, data: result };
      } catch (e: any) {
        return { url, error: e.message || "Unknown error" }
      }
    }));
    if (results.some((r) => r.error)) {
      setError(results.find((r) => r.error)?.error || "Unknown error");
    }
    else {
      setData(results);
      setUrl('');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2">
      <div className="w-full max-w-5xl mx-auto border bg-background rounded-xl shadow-sm p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Chrome UX Report Analyzer</h1>
        <p className="text-muted-foreground text-center text-base">Analyze Chrome UX Core Web Vitals for one or more URLs. Separate multiple URLs with commas.</p>
        <form className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter one or more URLs, separated by commas"
            className="flex-1 min-w-[200px]"
          />
          <Button
            type="submit"
            disabled={loading || !url}
            variant="default"
            size="default"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </form>
        {error && <div className="text-destructive border border-destructive/30 rounded-md p-3 text-center mt-2">{error}</div>}
        {loading && <div className="flex justify-center items-center mt-2"><span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 mr-2"></span>Loading...</div>}
        {data && <div className="mt-6"><ShowcaseInsights data={data} /></div>}
      </div>
    </div>
  );
}
