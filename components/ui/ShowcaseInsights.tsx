import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './button';

// Import constants, types, and utils from refactored files
import { CORE_WEB_VITALS } from '../../constants/coreWebVitals';
import { ShowcaseInsightsProps, CoreWebVital, WebVitalColumn, SortPosition } from '../../types/webVitals';
import { getBgClass } from '../../utils/webVitalsUtils';

// ShowcaseInsights component
const ShowcaseInsights = ({ data }: ShowcaseInsightsProps) => {
    const [dataStores, setDataStores] = useState<Record<string, number | string>[]>(() => {
        const urls = data.map(d => d.url);
        return urls.map((url, i) => {
            const obj: Record<string, number | string> = { website_name: url };
            CORE_WEB_VITALS.forEach(({ key }) => {
                const val = data[i].data?.record.metrics[key]?.percentiles.p75;
                obj[key] = typeof val === "number" ? val : Number(val) || 0;
            });
            return obj;
        });
    });
    const [sortPosition, setSortPosition] = useState<SortPosition | null>(null);
    const [columns, setColumns] = useState<WebVitalColumn[]>(
        CORE_WEB_VITALS.map((v: CoreWebVital) => ({
            key: v.key,
            visible: v.visible ?? false,
            label: v.label,
            abbr: v.abbr,
            description: v.description
        }))
    );

    const handleSort = (key: string) => {
        setSortPosition((prev) => {
            if (prev?.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc"
                }
            }
            return { key, direction: "asc" };
        });
        setDataStores((prev) => {
            const sorted = [...prev].sort((a, b) => {
                const valA = Number(a[key]);
                const valB = Number(b[key]);
                if (sortPosition?.direction === "asc") {
                    return valA - valB;
                } else {
                    return valB - valA;
                }
            });
            return sorted;
        });
    }

    const handleColumnVisbility = (key: string) => {
        setColumns(prev => prev.map((column) => ({
            ...column,
            visible: column.key === key ? !column.visible : column.visible
        })))
    }


    return (
        <div className="w-full max-w-5xl mx-auto mt-4">
            <h2 className="text-xl font-bold mb-2 text-center">Core Web Vitals Insights</h2>
            <div className="text-muted-foreground text-sm mb-4 text-center truncate">URLs: {data.map(d => d.url).join(", ")}</div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {columns
                        .map((column) => {
                            return (
                                // TODO: Need to handle this bug in shadcdn components where if we give key and data different the styles dont get applied
                                <DropdownMenuCheckboxItem
                                    key={column.label}
                                    className="capitalize"
                                    checked={column.visible}
                                    onCheckedChange={() => handleColumnVisbility(column.key)}
                                >
                                    {column.label}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead key="website_name">Website</TableHead>
                            {columns.map((vital) => (
                                <TableHead key={vital.key} className={"relative group cursor-pointer" + (vital.visible ? '' : ' hidden')}>
                                    <div className="flex justify-end items-center">
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
                                        <ArrowUpDown className={(sortPosition?.key === vital.key ? sortPosition.direction === 'asc' ? 'text-green-500' : 'text-red-500' : '') + ' size-4 ml-2 cursor-pointer'} onClick={() => handleSort(vital.key)} />
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataStores.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.website_name}</TableCell>
                                {columns.map((vital) => {
                                    const value = Number(row[vital.key]);
                                    return (
                                        <TableCell
                                            key={vital.key}
                                            className={vital.visible ? `text-right ${getBgClass(vital.key, value)}` : 'hidden'}
                                        >
                                            {row[vital.key]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        <TableRow className="bg-muted">
                            <TableCell>Avg</TableCell>
                            {columns.map((vital) => {
                                const values = dataStores.map(row => Number(row[vital.key]));
                                const avg = values.reduce((a, b) => a + b, 0) / values.length;
                                return <TableCell className={vital.visible ? 'text-right' : 'hidden'} key={vital.key}>{avg.toFixed(2)}</TableCell>;
                            })}
                        </TableRow>
                        <TableRow className="bg-muted">
                            <TableCell>Sum</TableCell>
                            {columns.map((vital) => {
                                const values = dataStores.map(row => Number(row[vital.key]));
                                const sum = values.reduce((a, b) => a + b, 0);
                                return <TableCell className={vital.visible ? 'text-right' : 'hidden'} key={vital.key}>{sum.toFixed(2)}</TableCell>;
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}

export default ShowcaseInsights