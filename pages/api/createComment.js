import sanityClient from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
};

const client = sanityClient(config);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { _id, name, email, comment } = req.body;

    try {
      await client.create({
        _type: "comment",
        post: {
          _type: "reference",
          _ref: _id,
        },

        name,
        email,
        comment,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Couldn't submit comment", error });
    }

    return res.status(200).json({ message: "Comment submitted successfully!" });
  }
}
