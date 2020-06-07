import * as React from 'react';
import { graphql } from 'gatsby';
import { Divider, List } from '@material-ui/core';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby-theme-material-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Tweet } from 'react-twitter-widgets';
import Layout from '../components/page/Layout';
import SEO from '../components/page/Seo';
import {
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Paragraph,
} from '../components/shortcodes/Typography';
import Audio from '../components/shortcodes/Audio';
import CodeBlock from '../components/shortcodes/CodeBlock';
import ListItem from '../components/shortcodes/ListItem';
import WowFeed from '../components/shortcodes/WowFeed';

const MdxTemplate = (props) => {
  const mdx = props.data.mdx;

  return (
    <MDXProvider
      components={{
        h1: Headline1,
        h2: Headline2,
        h3: Headline3,
        h4: Headline4,
        h5: Headline5,
        h6: Headline6,
        p: Paragraph,
        a: Link,
        hr: Divider,
        ul: List,
        ol: List,
        li: ListItem,
        code: CodeBlock,
        Audio,
        Tweet,
        WowFeed,
      }}
    >
      <Layout
        title={mdx.frontmatter.title}
        lead={mdx.frontmatter.lead}
        image={mdx.frontmatter.img}
      >
        <SEO
          title={mdx.frontmatter.title}
          lang={mdx.frontmatter.lang}
          thumbnail={mdx.frontmatter.img}
        />
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  );
};

export const query = graphql`
  query MdxPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        lead
        lang
        img {
          childImageSharp {
            sizes(maxWidth: 600) {
              ...GatsbyImageSharpSizes
            }
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
              aspectRatio
            }
          }
        }
      }
    }
  }
`;

export default MdxTemplate;
