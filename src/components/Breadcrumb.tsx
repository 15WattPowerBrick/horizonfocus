"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumb = () => {
  const pathname = usePathname();

  // Convert pathname to breadcrumb items
  const generateBreadcrumbs = () => {
    // Remove any query parameters
    const pathWithoutQuery = pathname.split("?")[0];

    // Split pathname into segments
    const segments = pathWithoutQuery
      .split("/")
      .filter((segment) => segment !== "");

    // Reduce the segments array into an array of breadcrumb items
    return segments.map((segment, index) => {
      // Build the URL for this segment
      const url = "/" + segments.slice(0, index + 1).join("/");

      // Convert segment to readable text
      const text = segment
        // Convert kebab/snake case to spaces
        .replace(/[-_]/g, " ")
        // Capitalize first letter of each word
        .replace(
          /\w\S*/g,
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );

      return { text, url };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-1 text-sm text-gray-500"
    >
      <Link
        href="/"
        className="flex items-center hover:text-gray-700 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.url}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link
            href={breadcrumb.url}
            className={`hover:text-gray-700 transition-colors ${
              index === breadcrumbs.length - 1
                ? "font-medium text-gray-900"
                : ""
            }`}
          >
            {breadcrumb.text}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
