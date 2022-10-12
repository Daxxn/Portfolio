import { ObjectID } from "bson";

export default class ProjectModel {
  _id: ObjectID = new ObjectID();
  name: string = "Project";
  githubURL?: string;
}
