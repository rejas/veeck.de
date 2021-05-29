import React, {useEffect}  from 'react';
import { GithubCard } from './github-card';

export const GHC = () => {

  useEffect(() => {
    window.customElements.define('github-card', GithubCard)
  }, [])

  return <github-card className="figure--github" user="rejas"></github-card>;
};

export default () => (
  <>
    <GHC />
  </>
)