import React, { useState } from "react";
import { sanityClient, urlFor } from "../../sanity";
import Image from "next/image";
import PortableText from "react-portable-text";
import { useForm } from "react-hook-form";

const Post = ({ post }) => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <div className="w-full h-56 relative">
        <Image
          className=" absolute"
          layout="fill"
          objectFit="cover"
          src={urlFor(post.mainImage).url()}
          alt="banner"
          priority={true}
        />
      </div>

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-2xl md:text-3xl mt-10 mb-3">{post.title}</h1>
        <h1>
          <div className="text-base md:text-xl font-light text-gray-500 mb-2">
            {post.description}
          </div>
        </h1>
        <div className="my-3 flex items-center space-x-3">
          <div className="rounded-full overflow-hidden flex items-center">
            <Image
              width={80}
              className=" rounded-full"
              height={80}
              src={urlFor(post.author.image).url()}
              alt="author-img"
            />
          </div>
          <p className="font-extralight text-xs md:text-sm">
            Blog post by
            <span className=" text-green-600"> {post.author.name}</span> -
            Published at
            <span> </span>
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className=" mt-10 flex">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              image: (props) => {
                let imageSlug = props.asset._ref.slice(
                  props.asset._ref.indexOf("-") + 1
                );

                imageSlug = imageSlug.slice(0, imageSlug.lastIndexOf("-"));

                const mimetype = props.asset._ref.slice(
                  props.asset._ref.lastIndexOf("-") + 1
                );

                return (
                  <div className="my-4 text-center">
                    <Image
                      objectFit="contain"
                      className="h-60"
                      width={900}
                      height={300}
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${imageSlug}.${mimetype}`}
                    ></Image>
                  </div>
                );
              },

              h1: ({ children }) => {
                return (
                  <h1 className=" text-2xl font-bold my-5">
                    {children.map((element) => element)}
                  </h1>
                );
              },

              h2: ({ children }) => {
                return (
                  <h2 className=" text-xl font-bold my-5">
                    {children.map((element) => element)}
                  </h2>
                );
              },

              li: ({ children }) => (
                <li className="ml-4 list-disc">{children}</li>
              ),

              link: ({ href, children }) => (
                <a href={href} className=" text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="max-w-3xl my-5 mx-auto border border-yellow-500" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto rounded">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          noValidate
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-sm md:text-base text-yellow-500">
            Enjoyed this article ?
          </h3>
          <h4 className="text-xl md:text-3xl font-bold">
            Leave a comment below!
          </h4>
          <hr className="py-3 mt-2" />

          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <div className="block mb-5">
            <label
              htmlFor="name"
              className="text-sm md:text-base text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="text-sm md:text-base shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-300 outline-none focus:ring"
              {...register("name", { required: true })}
            />
          </div>
          <div className="block mb-5">
            <label
              htmlFor="email"
              className="text-sm md:text-base text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              className="text-sm md:text-base shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-300 outline-none focus:ring"
            />
          </div>
          <div className="block mb-5">
            <label
              htmlFor="comment"
              className="text-sm md:text-base text-gray-700"
            >
              Comment
            </label>
            <textarea
              placeholder="Your Comment"
              rows={8}
              name="comment"
              {...register("comment", { required: true })}
              className="text-sm md:text-base shadow border rounded py-2  form-input mt-1 block w-full ring-yellow-300 resize-none scrollbar scrollbar-thumb-yellow-300 scrollbar-track-yellow-100 px-4 scrollbar-thin outline-none focus:ring"
            />
          </div>

          {errors && (
            <div className="flex flex-col py-5">
              <div>
                {errors.name && (
                  <span className="text-sm md:text-base text-red-500">
                    The Name field is required
                  </span>
                )}
              </div>

              <div>
                {errors.email && (
                  <span className="text-sm md:text-base text-red-500">
                    The Email field is required
                  </span>
                )}
              </div>

              <div>
                {errors.comment && (
                  <span className="text-sm md:text-base text-red-500">
                    The Comment field is required
                  </span>
                )}
              </div>
            </div>
          )}

          <input
            type="submit"
            className="text-sm md:text-base shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </form>
      )}

      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow shadow-yellow-500 space-y-2">
        <h3 className="text-3xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name} : </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug{
        current
    }
   }`;

  const posts = await sanityClient.fetch(query);
  const pathsWithParams = posts.map((post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const query = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  author -> {
    name,
    image
  },
  'comments':*[
    _type == 'comment' && 
    post._ref == ^._id && 
    approved == true],
  description,
  body,
  mainImage,
  slug,
  _createdAt
 }`;

  const post = await sanityClient.fetch(query, { slug: params.slug || "" });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },

    revalidate: 60,
  };
};
