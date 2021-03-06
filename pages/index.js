/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import GradientHeadingText from "../components/GradientHeadingText";
import OGContainer from "../components/OGContainer";
import PostListItem from "../components/PostListItem";
import Socials from "../components/Socials";
import Wrapper from "../components/Wrapper";
import { projectData } from "../content/projectData";
import { getAllFilesFrontMatter } from "../lib/mdx";
import { fetchData } from "../lib/utlis";
import me from "../public/images/ccp.png";

export default function Home({ posts, snippets }) {
  return (
    <Wrapper>
      <OGContainer description="Muhammad Zourdy - Front End Software Engineer and OSINT Investigator">
        <header className="">
          <div className="mt-4">
            <div className="flex items-center">
              <h1 className="text-6xl font-extrabold text-white tracking-tight sm:text-8xl">
                Hi, I'm <span className="underline">Muhammad Zourdy</span>.
              </h1>
            </div>
            <Socials />
          </div>
          <p className="body-text mt-8 leading-10 mb-52 sm:mb-0">
            I'm a Front End Software Engineer & Web Security Penetration Tester. I am passionate
            about software architecture and software security, throughout the years I've been
            thinking that if we combined them we could create a secure and scalable big software
            applications.
          </p>
          <div className="grid grid-cols-3 border-l-8 border-cyan-300 bg-gray-800 rounded-r-md py-4 mt-8 relative">
            <div className="col-span-3 sm:col-span-2 pl-4 text-2xl font-medium text-gray-400 leading-10 font-mono ">
              The website is my place for blog posts, code snippets and my life journey in Poland
              🇵🇱.
            </div>

            <div className="absolute right-20 -top-40 sm:flex sm:right-0 sm:-top-2">
              <Image
                src={me}
                height={170}
                width={170}
                className="rounded-full"
                alt="Adam Richardson portrait"
                placeholder="blur"
              />
            </div>
          </div>
        </header>
        <main>
          <div className="mt-40">
            <GradientHeadingText text="Blog Posts" />
          </div>
          {posts && posts.map((post) => <PostListItem type="blog" key={post.slug} data={post} />)}

          {projectData && (
            <div className="mt-40">
              <GradientHeadingText text="Highlight Project" />
            </div>
          )}

          {projectData.slice(0, 4).map((data, index) => (
            <>
              <div
                key={index}
                className="grid grid-cols-3 items-center py-8 gap-4  border-b-2 border-gray-800">
                <div className="hidden sm:col-span-1 sm:flex sm:relative">
                  <Image
                    src={data.image}
                    width={320}
                    height={180}
                    alt={data.title}
                    className="absolute rounded-md"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <a href={data.link} target="none">
                    <h2 className="title-text">{data.title}</h2>
                    <p className="description-text">{data.description.substring(0, 100)} ...</p>
                  </a>
                </div>
              </div>
            </>
          ))}

          <div className="mt-24 mb-16">
            <GradientHeadingText text="Code Snippets" />
            {snippets &&
              snippets.map((snippet) => (
                <PostListItem type="code" key={snippet.slug} data={snippet} />
              ))}
          </div>
        </main>
      </OGContainer>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;
  const uploadsURL = `https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&channelId=${YOUTUBE_CHANNEL_ID}&type=video&maxResults=100&key=${YOUTUBE_API_KEY}`;

  const snippets = await getAllFilesFrontMatter("code");
  const posts = await getAllFilesFrontMatter("post");
  const orderedSnippets = snippets
    .sort((a, b) => Number(new Date(b.published)) - Number(new Date(a.published)))
    .slice(0, 5);
  const orderedPosts = posts
    .sort((a, b) => Number(new Date(b.published)) - Number(new Date(a.published)))
    .slice(0, 5)
    .reverse();
  const uploadData = await fetchData(uploadsURL);
  const orderedVideos = uploadData
    ? uploadData.items
        .sort(
          (a, b) =>
            Number(new Date(b.snippet.publishedAt)) - Number(new Date(a.snippet.publishedAt)),
        )
        .slice(0, 5)
    : null;

  return {
    props: {
      snippets: orderedSnippets,
      posts: orderedPosts,
      videos: orderedVideos,
    },
  };
};
