import React, { useState, useEffect } from 'react';
import Blog from '../components/Blog';
import TitleBar from '../components/TitleBar';
import BlogModel from '../types/models/BlogModel';

interface BlogsProp {
}

const Blogs = (props: BlogsProp) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        const blogData = data as BlogModel[];
        if (blogData == null) return;
        setBlogs(blogData);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // if (isLoading) return (
  //  <div>
  //    <TitleBar links={[{href: '/', disp: 'Home'},{href: '/Projects', disp: 'Projects'}]}/>
  //    <p>Loading blogs...</p>
  //  </div>
  // );
  // if (!blogs) return (
  //  <div>
  //    <TitleBar links={[{href: '/', disp: 'Home'},{href: '/Projects', disp: 'Projects'}]}/>
  //    <p>No blogs found...</p>
  //  </div>
  // )

  return (
    <div>
      <TitleBar links={[{ href: '/', disp: 'Home' }, { href: '/Projects', disp: 'Projects' }]} />
      {blogs.length > 0 ? blogs.map((blog) => <Blog key={`blog-${blog._id}`} model={blog} />) : "No blogs found..."}
    </div>
  );
};

export default Blogs;
