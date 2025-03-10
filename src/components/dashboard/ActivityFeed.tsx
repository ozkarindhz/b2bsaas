import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Clock, Filter, MoreHorizontal } from "lucide-react";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
  title?: string;
  showFilters?: boolean;
  currentPage?: number;
  totalPages?: number;
}

const ActivityFeed = ({
  activities = [
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        initials: "JD",
      },
      action: "updated",
      target: "Project Alpha",
      timestamp: "10 minutes ago",
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        initials: "JS",
      },
      action: "commented on",
      target: "Task #1234",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      user: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        initials: "MJ",
      },
      action: "completed",
      target: "Quarterly Report",
      timestamp: "3 hours ago",
    },
    {
      id: "4",
      user: {
        name: "Sarah Williams",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        initials: "SW",
      },
      action: "assigned",
      target: "New Feature Implementation",
      timestamp: "Yesterday",
    },
    {
      id: "5",
      user: {
        name: "David Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
        initials: "DB",
      },
      action: "created",
      target: "Marketing Campaign",
      timestamp: "2 days ago",
    },
  ],
  title = "Recent Activity",
  showFilters = true,
  currentPage = 1,
  totalPages = 3,
}: ActivityFeedProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {showFilters && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 px-2">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <Avatar>
                <AvatarImage
                  src={activity.user.avatar}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  <span>{activity.action}</span>{" "}
                  <span className="font-medium text-blue-600">
                    {activity.target}
                  </span>
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious href="#" />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationLink
                    key={page}
                    href="#"
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                ),
              )}
              <PaginationNext href="#" />
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
