import {ObjectId} from 'mongodb'

export default class BlogModel {
  _id: ObjectId = new ObjectId("nullID");
  title: string = "New Blog";
  body?: string;
}