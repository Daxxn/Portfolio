import clientPromise from "../../lib/mongodb"
import BlogModel from "../../types/models/ProjectModel";

export default async (req: any, res: any) => {
  try {
    console.log('Getting Projects...');
    const client = await clientPromise;
    const db = client.db('portfolio');

    const projects = await db
      .collection('Projects')
      .find({})
      .toArray();

    console.log(projects);
    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}