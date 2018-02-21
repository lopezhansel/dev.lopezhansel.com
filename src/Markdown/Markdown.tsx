import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import './Markdown.css';

export const Markdown = (prop: { source: string }) => (
    <div className="markdown-body">
      <ReactMarkdown source={prop.source} />
    </div>
  );
