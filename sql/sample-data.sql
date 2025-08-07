
-- Insert Sample Skills
INSERT INTO skills (title, description, icon_name, color_gradient, "order") VALUES
('Web Design & Development', 'Creating responsive, user-focused websites with modern technologies and clean aesthetics.', 'web', 'from-blue-500 to-cyan-500', 1),
('Graphics Design', 'Crafting visual identities, branding materials, and digital graphics that tell compelling stories.', 'graphics', 'from-purple-500 to-pink-500', 2),
('3D Product Visualization', 'Bringing products to life with photorealistic 3D renders and interactive experiences.', '3d', 'from-orange-500 to-red-500', 3);

-- Insert Sample Profile (will be updated by setup script)
INSERT INTO profiles (name, title, bio, email, location, social_links, skills, experience_years, available_for_projects) VALUES
('Your Name', 'Creative Designer', 'I bring ideas to life through innovative design and development. From pixel-perfect websites to stunning graphics and immersive 3D experiences, I create digital solutions that captivate and convert.', 'hello@yourname.com', 'Your Location', '{"github": "https://github.com/yourname", "linkedin": "https://linkedin.com/in/yourname", "twitter": "https://twitter.com/yourname"}', '{"Web Design", "Graphics Design", "3D Visualization"}', 3, true);

-- Insert Sample Projects
INSERT INTO projects (title, description, category, image_url, live_url, github_url, technologies, featured) VALUES
('E-commerce Website', 'A modern e-commerce platform built with Next.js and Stripe integration. Features include user authentication, product catalog, shopping cart, and secure payment processing.', 'web', '/projects/ecommerce.jpg', 'https://project-demo.com', 'https://github.com/yourname/ecommerce', '{"Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"}', true),
('Brand Identity Design', 'Complete brand identity design for a tech startup, including logo design, color palette, typography, and brand guidelines.', 'graphics', '/projects/branding.jpg', NULL, NULL, '{"Adobe Illustrator", "Adobe Photoshop", "Figma"}', true),
('3D Product Render', 'Photorealistic 3D render of a modern smartphone with detailed materials and lighting setup.', '3d', '/projects/3d-phone.jpg', NULL, NULL, '{"Blender", "Substance Painter", "Cycles"}', false);
