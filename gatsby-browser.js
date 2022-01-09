/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import 'modern-css-reset';
import React from 'react';

import { DarkModeState } from './src/components/ui/ThemeHandler';
import './src/css/elements.css';
import './src/css/typography.css';

export function wrapRootElement({ element, props }) {
  return <DarkModeState {...props}>{element}</DarkModeState>;
}
