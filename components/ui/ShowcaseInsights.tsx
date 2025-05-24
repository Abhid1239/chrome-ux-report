import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
type Props = {
    data: any
}
const CORE_WEB_VITALS = [
    {
        key: "website_name",
        label: "Website Name"
    },
    {
        key: "largest_contentful_paint",
        abbr: "LCP",
        label: "Largest Contentful Paint (LCP)",
        docs: "https://web.dev/lcp/",
        thresholds: [2500, 4000],
        unit: "ms",
        description: "Measures loading performance. Good: ≤2.5s, Needs Improvement: ≤4s, Poor: >4s."
    },
    {
        key: "first_contentful_paint",
        abbr: "FCP",
        label: "First Contentful Paint (FCP)",
        docs: "https://web.dev/fcp/",
        thresholds: [1800, 3000],
        unit: "ms",
        description: "Measures time to first content. Good: ≤1.8s, Needs Improvement: ≤3s, Poor: >3s."
    },
    {
        key: "interaction_to_next_paint",
        abbr: "INP",
        label: "Interaction to Next Paint (INP)",
        docs: "https://web.dev/inp/",
        thresholds: [200, 500],
        unit: "ms",
        description: "Measures responsiveness. Good: ≤200ms, Needs Improvement: ≤500ms, Poor: >500ms."
    },
    {
        key: "cumulative_layout_shift",
        abbr: "CLS",
        label: "Cumulative Layout Shift (CLS)",
        docs: "https://web.dev/cls/",
        thresholds: [0.1, 0.25],
        unit: "",
        description: "Measures visual stability. Good: ≤0.1, Needs Improvement: ≤0.25, Poor: >0.25."
    },
    {
        key: "experimental_time_to_first_byte",
        abbr: "TTFB",
        label: "Time to First Byte (TTFB)",
        docs: "https://web.dev/ttfb/",
        thresholds: [800, 1800],
        unit: "ms",
        description: "Measures server response. Good: ≤0.8s, Needs Improvement: ≤1.8s, Poor: >1.8s."
    }
];



const ShowcaseInsights = ({ data }: Props) => {
    const [dataStores, setDataStore] = useState(() => {
        return CORE_WEB_VITALS.map((vital, i) => {
            if (vital.key === "website_name") {
                return {
                    ...vital,
                    values: data.map(d => d.url)
                };
            } else {
                return {
                    ...vital,
                    values: data.map(d => d.data.record.metrics[vital.key].percentiles.p75)
                };
            }
        })
    })
    return (
        <div className="w-full max-w-5xl mx-auto mt-4">
            <h2 className="text-xl font-bold mb-2 text-center">Core Web Vitals Insights</h2>
            <div className="text-muted-foreground text-sm mb-4 text-center truncate">URLs: {data.map(d => d.url).join(", ")}</div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {dataStores.map((vital) => (
                                vital.key === "website_name"
                                    ? <TableHead key={vital.key}>{vital.label}</TableHead>
                                    : <TableHead key={vital.key} className="relative group cursor-pointer">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span>{vital.abbr}</span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="font-bold text-center">{vital.label}<br />{vital.description}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((d, i) => (
                            <TableRow key={i}>
                                {dataStores.map((vital, index) => (
                                    <TableCell key={vital.values[i]}>{vital.values[i]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div >)
}

export default ShowcaseInsights