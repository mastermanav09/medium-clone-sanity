import Head from "next/head";
import Layout from "../components/layout/Layout";
import Image from "next/image";
import { sanityClient, urlFor } from "../sanity";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Medium</title>
        <meta name="description" content="Medium Blog" />
      </Head>

      <div className=" mx-auto max-w-7xl">
        <div className="flex justify-between items-center bg-blue-200 border-y border-black py-8">
          <div className="px-8 space-y-5">
            <h1 className="text-4xl lg:text-5xl max-w-xl font-serif">
              <span className="underline decoration-black decoration-4">
                Medium
              </span>
              <span> </span> is a place to write, read and connect.
            </h1>
            <h2 className="text-sm md:text-base">
              It's easy and free to post your thinking on any topic and connect
              with million of readers.
            </h2>
          </div>

          <div className="hidden md:inline-flex w-64 h-64 lg:w-68 lg:h-68">
            <Image
              src="/assets/m-banner.png"
              width={440}
              height={440}
              objectFit="contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer rounded-lg overflow-hidden border">
                {post.mainImage && (
                  <div className="text-center group-hover:scale-105 transition-transform duration-200 ease-in-out rounded-lg">
                    <Image
                      objectFit="cover"
                      width={260}
                      height={260}
                      src={urlFor(post.mainImage).url()}
                      alt="post-img"
                    />
                  </div>
                )}

                <div className="flex justify-between p-3 md:p-2   bg-white items-center space-x-3">
                  <div>
                    <p className="text-sm md:text-base font-semibold">
                      {post.title}
                    </p>
                    <p className="text-xs md:text-sm">
                      {post.description} by {post.author.name}
                    </p>
                  </div>

                  <div className="rounded-full flex items-center md:w-16 md:h-16 justify-end">
                    <Image
                      className="rounded-full"
                      width={56}
                      height={56}
                      src={urlFor(post.author.image).url()}
                      alt="author-img"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
   }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts: posts,
    },
  };
};
