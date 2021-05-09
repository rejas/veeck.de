import * as React from 'react';
import { graphql } from 'gatsby';
import { Grid } from '@material-ui/core';
import BasicLayout from '../components/layouts/BasicLayout';
import MetaData from '../components/page/MetaData';
import EntryCard from '../components/EntryCard';

const ProjectsIndex = (props) => {
  const { data } = props;
  const { edges: posts } = data.allMdx;

  return (
    <BasicLayout title="my side projects">
      <MetaData
        title="Projects"
        description="veeck tinkers"
        image={data.file}
      />
      <Grid container spacing={3}>
        {posts.map(({ node: post }, index) => (
          <EntryCard
            key={index}
            image={post.frontmatter.img.childImageSharp.gatsbyImageData}
            link={post.fields.slug}
            title={post.frontmatter.title}
          />
        ))}
      </Grid>
    </BasicLayout>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "categories/projects.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 768)
      }
    }
    allMdx(
      sort: { fields: fields___slug, order: DESC }
      filter: { fields: { slug: { regex: "/projects/" } } }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            img {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 768)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default ProjectsIndex;
