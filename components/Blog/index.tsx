import React from 'react';
import BlogModel from '../../types/models/BlogModel';

interface BlogProp {
  model: BlogModel;
}

const Blog = (props: BlogProp) => {
   const { model } = props;

  return (
    <div>
      <p>{model.title}</p>
      <p>{model.body ?? 'No Body...'}</p>
    </div>
  );
};

export default Blog;
