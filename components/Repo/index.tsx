import React, { useEffect, useState } from 'react';
import GithubData, { GithubRepo } from '../../types/models/GithubData';
import ReactHtmlParser from 'react-html-parser';
import styles from './Repo.module.css';

interface RepoProp {
  repo: GithubRepo;
}

const Repo = (props: RepoProp) => {
  const { repo } = props;
  const [readme, setReadme] = useState<string|null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    GithubData.GetRepoReadme(repo)
      .then(() => setReadme(repo.readme as string))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.repoBase}>
      <p>{repo.name}</p>
      {open ?
        <div className={styles.readmeBase}>
          <button onClick={() => setOpen(false)}>Close</button>
          <div>
            {readme ? ReactHtmlParser(readme) : "No readme"}
          </div>
        </div>
      :
      <div>
        <button onClick={() => setOpen(true)}>Open</button>
      </div>}
    </div>
  );
};

export default Repo;
