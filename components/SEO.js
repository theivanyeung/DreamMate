import Head from "next/head";
import { useRouter } from "next/router";

const SEO = (props) => {
  const router = useRouter();

  return (
    <Head>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={props.description} />
      <meta property="og:site_name" content={props.title} />
      <meta property="og:url" content={`${props.url}/${router.asPath}`} />
      <meta property="og:image" content={props.image} />
    </Head>
  );
};

export default SEO;
