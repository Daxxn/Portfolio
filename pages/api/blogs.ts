import clientPromise from "../../lib/mongodb"
import BlogModel from "../../types/models/BlogModel";

export default async (req: any, res: any) => {
  try {
    console.log('Getting blogs...');
    const client = await clientPromise;
    const db = client.db('portfolio');

    const blogs = await db
      .collection('Blogs')
      .find({})
      .toArray();

    console.log(blogs);
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
  }
}