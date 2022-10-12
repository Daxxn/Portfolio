import React, { useEffect, useState } from 'react';
import Repo from '../components/Repo';
import TitleBar from '../components/TitleBar';
import GithubData, { GithubRepo, GithubRepos } from '../types/models/GithubData';

interface GithubProjectsProp {
  
}

const GithubProjects = (props: GithubProjectsProp) => {
  const {  } = props;
  const [repos, setRepos] = useState<GithubRepos|null>(null);

  useEffect(() => {
    try {
      GithubData.GetUserData()
        .then(() => {
          console.log('Done');
          GithubData.GetRepos()
            .then((repos) => {
              setRepos(repos);
              // const repo = GithubData.GetRepo(330066475);
              // if (repo) {
              //   GithubData.GetRepoReadme(repo)
              //     .then((repo) => {
              //       console.log(repo);
              //     });
              // }
            });
        });
      // if (!env.GITHUB_TOKEN) {
      //   console.log("No token found");
      //   return;
      // }
      // const run = async () => {
      //   const octo = new Octokit({auth: env.GITHUB_TOKEN});
      //   const {data: {login}} = await octo.rest.users.getAuthenticated();
      //   if (login)
      //   {
      //     console.log(login);
      //     const {data} = await octo.rest.projects.getCard();
      //     console.log(data);
      //   }
      // };
      // run();

      // The old way:
      // if (!process.env.REACT_APP_GITHUB_REPO){
      //   console.log("No repo found");
      //   return;
      // }
      // fetch('https://api.github.com/users/Daxxn/repos?', {
      //   method: 'GET',

      // })
      // .then(res => res.json())
      // .then(data => {
      //   console.log(data);
      // });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <TitleBar links={[{href: '/', disp: 'Home'}, {href: '/Blogs', disp: 'Blogs'}, {href: '/Projects', disp: 'Projects'}]}/>
      {repos ? Object.values(repos).map((repo) => <Repo repo={repo}/>) : "No repos"}
    </div>
  );
};

export default GithubProjects;
