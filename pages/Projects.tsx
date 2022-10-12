import React, { useState, useEffect } from 'react';
import Project from '../components/Project';
import TitleBar from '../components/TitleBar';
import ProjectModel from '../types/models/ProjectModel';

interface ProjectsProp {
}

const Projects = (props: ProjectsProp) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      fetch('/api/projects')
        .then((res) => res.json())
        .then((data) => {
          const projData = data as ProjectModel[];
          if (projData == null) return;
          setProjects(projData);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  //  if (isLoading) return (
  //   <div>
  //     <TitleBar links={[{href: '/', disp: 'Home'},{href: '/Blogs', disp: 'Blogs'}]}/>
  //     <p>Loading Projects...</p>
  //   </div>
  //  );
  //  if (!projects) return (
  //   <div>
  //     <TitleBar links={[{href: '/', disp: 'Home'},{href: '/Blogs', disp: 'Blogs'}]}/>
  //     <p>No Projects found...</p>
  //   </div>
  //  )

  return (
    <div>
      <TitleBar links={[{href: '/', disp: 'Home'}, {href: '/Blogs', disp: 'Blogs'}]} />
      {projects.length > 0 ? projects.map((proj) => <Project key={`project-${proj._id}`} project={proj} />) : "No projects."}
    </div>
  );
};

export default Projects;
