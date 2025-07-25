import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogPostItem from "@/components/BlogPostItem";
import { Metadata } from "next";
import { BlogPost } from "../utils/constants";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Blogs - Wajih Tarkhani",
  description:
    "Check out the latest blogs/articles on technology and development.",
  openGraph: {
    title: "Blogs - Wajih Tarkhani",
    description:
      "Check out the latest blogs/articles on technology and development.",
    url: "https://wajih.info/blogs",
    images: "https://wajih.info/api/og?type=Blogs",
  },
};

// Function to get all the blog post metadata from Markdown files
const getBlogPosts = (): BlogPost[] => {
  const contentDirectory = path.join(process.cwd(), "app", "content");
  const files = fs.readdirSync(contentDirectory);

  const blogPosts = files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      id: filename.replace(".md", ""),
      title: data.title,
      description: data.description,
      tags: data.tags,
      publishedDate: data.publishedDate,
      readTime: data.readTime,
      author: data.author,
      link: `/blogs/${filename.replace(".md", "")}`,
    };
  });

  return blogPosts;
};

export default async function BlogPage() {
  const blogPosts = getBlogPosts(); // Fetch blog post metadata

  return (
    <main className="flex flex-col items-start justify-start p-4 md:p-5 max-w-full md:max-w-2xl mx-auto">
      <div className="w-full">
        {blogPosts.map((post, index) => (
          <BlogPostItem key={post.id} post={post} index={index} />
        ))}
      </div>
    </main>
  );
}
