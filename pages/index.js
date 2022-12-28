import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

export default function Home({posts}) {
  let imgSources = posts.map((post)=>
    `https://robohash.org/${post.title.split(" ").join("").slice(0, 5)}`
  )
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I'm a full-stack developer and Math teacher. This is my blog.</p>
        <p>Robot stories written in Lorem.</p>
        <div>
          <h4>Posts</h4>
          {posts.map((post)=> (
            post.id < 20 && 
            <div key={post.id} className={styles.postLinkAndImg}>
              <div className={styles.postImg}>
                <Image  loader={() => imgSources[post.id-1]} src={imgSources[post.id-1]} width={50} height={50} alt='post image'/>
              </div>
              <div className={styles.postLink}>
                <Link href={`/posts/${post.id}`}>
                  <div className={styles.postTitle}>{post.title}</div>
                </Link>
                  <small className={utilStyles.lightText}>2022-0{9-5+post.id%6}-0{10-(post.id%9+1)}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

/* OLD VERSION with important coments:
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>
      /*!!!! images - no need 'public' in the route: /public/images/profile.png*/
      /* <Image
        src="/images/profile.png" 
        height={144}
        width={144}
        alt="Mr X."
      />
      <p>Hi, my name is Z P.</p>
      <p>Welcome my blog!</p>
      <h1>Next.js is great!</h1>
      <h2>See {' '} 
        <Link href="/posts/first-post"> /*!!!! no need 'pages' in the route: /pages/posts/first-post'*/
        /* in global.css you can style it with 'a' */
         /*  first post
        </Link>
      </h2>
    </Layout>
  );
} */

export async function getStaticProps() {
  // Call the fetch method and passing the json post API link
  const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts');

  // Parse the JSON
  const data = await response.json();

  // Finally we return the result
  // inside props as posts
  return {
      props: { posts: data},
  };
}
