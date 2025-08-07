import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Projects",
  description: "Explore my portfolio of web development, graphics design, and 3D visualization projects. See how I bring creative ideas to life through code and design.",
  openGraph: {
    title: "Projects by NA-TI ናቲ - Creative Portfolio",
    description: "Explore my portfolio of web development, graphics design, and 3D visualization projects. See how I bring creative ideas to life through code and design.",
    url: '/projects',
  },
  twitter: {
    title: "Projects by NA-TI ናቲ - Creative Portfolio",
    description: "Explore my portfolio of web development, graphics design, and 3D visualization projects.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 