import { DefaultSeo } from "next-seo";
import { NextRouter } from "next/router";

type SEOHeaderProps = {
  router: NextRouter;
};

const SEOHeader = ({ router }: SEOHeaderProps) => {
  return (
    <DefaultSeo
      title='IQ GPT | The AI-Driven Search Engine for the Latest Crypto and Blockchain Content'
      description="IQ GPT is an AI-powered search engine that retrieves the latest crypto and blockchain insights from IQ Wiki - the world's largest blockchain and crypto encyclopedia. Discover your web3 curiosities with IQ GPT and stay up-to-date with the latest developments in the crypto space."
      canonical={`https://search.iq.wiki/${router.asPath || ""}`}
      openGraph={{
        title:
          "IQ GPT | The AI-Driven Search Engine for the Latest Crypto and Blockchain Content",
        description:
          "IQ GPT is an AI-powered search engine that retrieves the latest crypto and blockchain insights from IQ Wiki - the world's largest blockchain and crypto encyclopedia. Discover your web3 curiosities with IQ GPT and stay up-to-date with the latest developments in the crypto space.",
        type: "website",
        site_name: "IQ.GPT",
        images: [
          {
            url: "https://search.iq.wiki/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "IQ GPT | The AI-Driven Search Engine for the Latest Crypto and Blockchain Content",
          },
        ],
      }}
    />
  );
};

export default SEOHeader;
