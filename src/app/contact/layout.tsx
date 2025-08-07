import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Me",
  description: "Get in touch with NA-TI ናቲ for creative projects, collaborations, or just to say hello. Let's create something amazing together.",
  openGraph: {
    title: "Contact NA-TI ናቲ - Let's Work Together",
    description: "Get in touch with NA-TI ናቲ for creative projects, collaborations, or just to say hello. Let's create something amazing together.",
    url: '/contact',
  },
  twitter: {
    title: "Contact NA-TI ናቲ - Let's Work Together",
    description: "Get in touch for creative projects, collaborations, or just to say hello.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 