import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import TitleBar from '../components/TitleBar';
import styles from './Home.module.css';

export async function getServerSideProps(context: any) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  if (!isConnected)
  {
    console.log('Unable to connect to the database at this time. please check again later.');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TitleBar links={[{href: '/Blogs', disp: 'Blogs'}, {href: '/Projects', disp: 'Projects'}, {href: '/GithubProjects', disp: 'Repos'}]}/>

        {isConnected ? (
          <div>
            <h2 className={styles.subtitle}>You are connected to MongoDB</h2>
            <Link href="/Blogs">
              <a>Blogs</a>
            </Link>
          </div>
        ) : (
          <h2 className={styles.subtitle}>
            You are NOT connected to the database...
          </h2>
        )}

        <Link href='/GithubProjects'>
          <a>Github Projects</a>
        </Link>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
      main {
        padding: 1rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: whitesmoke;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
        color: whitesmoke;
      }
      
      footer img {
        margin-left: 0.5rem;
      }
      
      footer a {
        display: flex;
        color: gray;
        justify-content: center;
        align-items: center;
      }
      
      a {
        color: gray;
        text-decoration: none;
      }

      code {
        background: #164654;
        border-radius: 5px;
        color: whitesmoke;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      button {
        background-color: #153059;
        color: whitesmoke;
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem;
        transition: background-color 150ms ease-out;
      }
      
      button:hover {
        background-color: #1d4279;
      }
      `}</style>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Silkscreen&display=swap');
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          
          background-color: #0b2736;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
