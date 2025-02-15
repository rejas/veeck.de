import { MDXProvider } from '@mdx-js/react';
import { Divider, List } from '@mui/material';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby-theme-material-ui';
import * as React from 'react';

import BasicLayout from '../components/layout/BasicLayout';
import MetaData from '../components/page/MetaData';
import AudioSC from '../components/shortcodes/AudioSC';
import CodeBlockSC from '../components/shortcodes/CodeBlockSC';
import ListItemSC from '../components/shortcodes/ListItemSC';
import WowFeedSC from '../components/shortcodes/WowFeedSC';
import {
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Paragraph,
} from '../components/ui/Typography';

const MdxTemplate = ({ data: { mdx } }) => {
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
      <BasicLayout title={mdx.frontmatter.title} lead={mdx.frontmatter.lead} image={mdx.frontmatter.img}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </BasicLayout>
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

export const Head = ({ data: { mdx } }) => (
  <MetaData title={mdx.frontmatter.title} lang={mdx.frontmatter.lang} thumbnail={mdx.frontmatter.img} />
);

export default MdxTemplate;
