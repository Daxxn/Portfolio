import { read } from 'fs';
import { Octokit, App } from 'octokit';
import props from '../../.myProps.json';

export type GithubUserData = {
  login: string,
  name: string,
  avatar_url: string,
  url: string,
  public_repos: number,
};

export type GithubRepo = {
  id: string,
  name: string,
  html_url: string,
  readme?: string,
};

export type GithubRepos = {
  [id: number]: GithubRepo;
};

export default class GithubData {
  private static octo?: Octokit;
  private static user?: GithubUserData;
  private static repos: GithubRepos = {};

  static async GetUserData()
  {
    try {
      if (!props.githubToken) {
        console.log('No token');
        return;
      }
      this.octo = new Octokit({
        auth: props.githubToken,
      });
      const {data: user} = await this.octo.rest.users.getAuthenticated();
      if (!user) {
        console.log('unable to authenticate');
        return;
      }
      this.user = user as GithubUserData;
      console.log(user);

      // const reposRes = await fetch(props.githubAPI);
      // const repos = await reposRes.json();
      // if (repos)
      // {
      //   console.log(repos);
      // }
      // return;
      // if (data)
      // {
      //   // octo.rest.repos.get({owner: })
      //   const response = await fetch(data.repos_url);
      //   const repos = await response.json();
        
      //   console.log(repos);

      //   repos.forEach((repo: any) => {
      //     this.GetRepo(repo.url);
      //   });
      // }
      // else {
      //   console.log('Login unsuccessfull?');
      // }
    } catch (err) {
      console.log(err);
    }
  }

  static async GetRepos() : Promise<GithubRepos|null>
  {
    try {
      if (!this.octo) {
        console.log('Not authenticated.');
        return null;
      }
      if (!this.user) {
        console.log('No user found.');
        return null;
      }
      const res = await this.octo.request('GET /users/{user}/repos', {user: this.user.login});
      const data = res.data;
      if (data)
      {
        console.log(data);
        this.repos = {};
        data.forEach((d: any) => this.repos[d.id] = (d as GithubRepo));
        return this.repos;
      }
      else {
        console.log('repo not found...');
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async GetRepoReadme(repo: GithubRepo)
  {
    if (!this.user) {
      console.log('Unable to get readme. No user found.');
      return null;
    }
    const readme = await this.octo?.rest.repos.getReadme({
      owner: this.user?.login,
      repo: repo.name,
      mediaType:{ format: 'html'}
    });
    if (readme) {
      console.log(readme);
      repo.readme = readme.data as unknown as string;
      return readme.data;
    }
    return null;
  }

  static GetRepo(id: number) : GithubRepo|null
  {
    return this.repos[id];
  }
}