import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpDown,
  Download,
  Filter,
} from "lucide-react";

interface ChartProps {
  title?: string;
  description?: string;
  timeRange?: string;
  chartType?: "bar" | "line" | "pie";
  data?: any;
}

const PerformanceCharts = ({
  title = "Performance Overview",
  description = "Track your key performance metrics over time",
  timeRange = "last-30-days",
  chartType = "bar",
  data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        name: "Revenue",
        values: [4500, 5200, 4800, 5800, 6000, 6500],
      },
      {
        name: "Users",
        values: [1200, 1350, 1450, 1600, 1750, 1900],
      },
    ],
  },
}: ChartProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="year-to-date">Year to date</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={chartType} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bar" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              Bar
            </TabsTrigger>
            <TabsTrigger value="line" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              Line
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center gap-1">
              <PieChart className="h-4 w-4" />
              Pie
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bar" className="w-full">
            <div className="h-[300px] w-full bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center relative">
              {/* Bar Chart Placeholder */}
              <div className="absolute inset-0 p-4">
                <div className="flex justify-between mb-2">
                  {data.labels.map((label: string, index: number) => (
                    <div
                      key={index}
                      className="text-xs text-gray-500 flex flex-col items-center"
                    >
                      <div className="h-[200px] w-12 bg-gray-100 dark:bg-gray-800 rounded-t-sm relative">
                        <div
                          className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm"
                          style={{
                            height: `${(data.datasets[0].values[index] / Math.max(...data.datasets[0].values)) * 180}px`,
                          }}
                        ></div>
                        <div
                          className="absolute bottom-0 w-full bg-green-500 rounded-t-sm ml-2"
                          style={{
                            height: `${(data.datasets[1].values[index] / Math.max(...data.datasets[1].values)) * 180}px`,
                          }}
                        ></div>
                      </div>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 absolute bottom-4 right-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs">{data.datasets[0].name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-xs">{data.datasets[1].name}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="line" className="w-full">
            <div className="h-[300px] w-full bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center relative">
              {/* Line Chart Placeholder */}
              <div className="absolute inset-0 p-4">
                <svg className="w-full h-[250px]" viewBox="0 0 600 250">
                  {/* Grid lines */}
                  <line
                    x1="0"
                    y1="200"
                    x2="600"
                    y2="200"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="150"
                    x2="600"
                    y2="150"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="100"
                    x2="600"
                    y2="100"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="50"
                    x2="600"
                    y2="50"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />

                  {/* Line for first dataset */}
                  <path
                    d={`M ${100 / data.labels.length} ${200 - (data.datasets[0].values[0] / Math.max(...data.datasets[0].values)) * 150} 
                      ${data.datasets[0].values
                        .slice(1)
                        .map(
                          (value: number, i: number) =>
                            `L ${(i + 1 + 1) * (600 / data.labels.length)} ${200 - (value / Math.max(...data.datasets[0].values)) * 150}`,
                        )
                        .join(" ")}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />

                  {/* Line for second dataset */}
                  <path
                    d={`M ${100 / data.labels.length} ${200 - (data.datasets[1].values[0] / Math.max(...data.datasets[1].values)) * 150} 
                      ${data.datasets[1].values
                        .slice(1)
                        .map(
                          (value: number, i: number) =>
                            `L ${(i + 1 + 1) * (600 / data.labels.length)} ${200 - (value / Math.max(...data.datasets[1].values)) * 150}`,
                        )
                        .join(" ")}`}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />

                  {/* Data points for first dataset */}
                  {data.datasets[0].values.map((value: number, i: number) => (
                    <circle
                      key={`data1-${i}`}
                      cx={(i + 1) * (600 / data.labels.length)}
                      cy={
                        200 -
                        (value / Math.max(...data.datasets[0].values)) * 150
                      }
                      r="4"
                      fill="#3b82f6"
                    />
                  ))}

                  {/* Data points for second dataset */}
                  {data.datasets[1].values.map((value: number, i: number) => (
                    <circle
                      key={`data2-${i}`}
                      cx={(i + 1) * (600 / data.labels.length)}
                      cy={
                        200 -
                        (value / Math.max(...data.datasets[1].values)) * 150
                      }
                      r="4"
                      fill="#22c55e"
                    />
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between px-2">
                  {data.labels.map((label: string, i: number) => (
                    <div key={i} className="text-xs text-gray-500">
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 absolute bottom-4 right-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs">{data.datasets[0].name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-xs">{data.datasets[1].name}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pie" className="w-full">
            <div className="h-[300px] w-full bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center relative">
              {/* Pie Chart Placeholder */}
              <div className="relative w-[200px] h-[200px]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* First slice - 60% */}
                  <path
                    d="M 50 50 L 50 0 A 50 50 0 0 1 97.55 34.55 Z"
                    fill="#3b82f6"
                  />
                  {/* Second slice - 40% */}
                  <path
                    d="M 50 50 L 97.55 34.55 A 50 50 0 1 1 50 0 Z"
                    fill="#22c55e"
                  />
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
              </div>

              <div className="flex flex-col gap-2 absolute bottom-4 right-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs">{data.datasets[0].name} (60%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-xs">{data.datasets[1].name} (40%)</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium">Total Revenue:</span> $32,800
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowUpDown className="h-4 w-4" />
            Compare with previous period
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceCharts;
