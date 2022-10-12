import React, { useEffect } from 'react';
import ProjectModel from '../../types/models/ProjectModel';

interface ProjectProp {
  project: ProjectModel;
}

const Project = (props: ProjectProp) => {
  const { project } = props;

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <p>{project.name}</p>
      <a href={project.githubURL} target="_blank">GitHub</a>
    </div>
  );
};

export default Project;
