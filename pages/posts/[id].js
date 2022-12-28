import Layout from '../../components/layout';
import styles from '../../styles/Home.module.css';
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head';
import Image from 'next/image';

export async function getStaticPaths() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json()
    const paths = posts.map((post)=> ({
        params: {id: post.id.toString()},
    }))
    
    return {
        //The returned list is not just an array of strings — it must be an array of objects.
        paths, // contains the array of known paths
        fallback: false // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    }
}

export async function getStaticProps({params}) {
    const postData = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const data = await postData.json()
    return {
        props: {post: data}
    }
}

export default function Post({post}) {
    const src = `https://robohash.org/${post.title.split(" ").join("").slice(0, 5)}`;
    return <Layout>
        <Head>
        <title>{post.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{post.title}</h1>
            <div className={utilStyles.postImg}>
                <Image loader={() => src} src={src} width={200} height={200} alt='post image'/>
            </div>
            <p>{post.body}{post.body}{post.body}{post.body}</p>
            <p className={utilStyles.lightText}>2022-0{9-5+post.id%6}-0{10-(post.id%9+1)}</p>
        </article>
    </Layout>
}