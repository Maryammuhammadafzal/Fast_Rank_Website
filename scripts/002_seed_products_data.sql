-- Insert sample products data
insert into public.products (name, url, da, dr, monthly_traffic, delivery_time, description, category, status, price) values
  ('TechCrunch', 'https://techcrunch.com', 92, 91, '15M', '3-5 days', 'Leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.', 'Technology', 'active', 850),
  ('Forbes', 'https://forbes.com', 95, 94, '45M', '5-7 days', 'American business magazine owned by Integrated Whale Media Investments and the Forbes family.', 'Business', 'active', 1200),
  ('Healthline', 'https://healthline.com', 89, 87, '85M', '2-4 days', 'Health information you can trust. Healthline is committed to being your most trusted ally in your pursuit of health and well-being.', 'Health', 'active', 650),
  ('Entrepreneur', 'https://entrepreneur.com', 88, 86, '12M', '4-6 days', 'Entrepreneur is your guide to starting and running a business. We inspire, educate and celebrate entrepreneurs.', 'Business', 'pending', 750),
  ('Mashable', 'https://mashable.com', 90, 89, '25M', '3-5 days', 'Mashable is a global, multi-platform media and entertainment company powered by its own proprietary technology platform.', 'Technology', 'inactive', 800);
