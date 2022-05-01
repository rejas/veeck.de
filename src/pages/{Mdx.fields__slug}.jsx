import { MDXProvider } from '@mdx-js/react';
import { Divider, List } from '@mui/material';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

import { Headline1, Headline2, Headline3, Headline4, Headline5, Headline6, Paragraph } from '../components/Typography';
import Layout from '../components/layout/layout';
import MetaData from '../components/page/MetaData';
import AudioSC from '../components/shortcodes/AudioSC';
import CodeBlockSC from '../components/shortcodes/CodeBlockSC';
import ListItemSC from '../components/shortcodes/ListItemSC';
import WowFeedSC from '../components/shortcodes/WowFeedSC';

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
        li: ListItemSC,
        code: CodeBlockSC,
        Audio: AudioSC,
        WowFeed: WowFeedSC,
      }}
    >
      <Layout title={mdx.frontmatter.title} lead={mdx.frontmatter.lead} image={mdx.frontmatter.img}>
        <MetaData title={mdx.frontmatter.title} lang={mdx.frontmatter.lang} thumbnail={mdx.frontmatter.img} />
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Layout>
    </MDXProvider>
  );
};

export const query = graphql`
  query MdxPostBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        lead
        lang
        img {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`;

export default MdxTemplate;
