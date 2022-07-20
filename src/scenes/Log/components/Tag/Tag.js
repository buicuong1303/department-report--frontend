import { Button } from '@material-ui/core';
import React from 'react';
import './Tag.scss';
const Tag = ({content, onHashTagChange}) => {
  const handleHashTagChange = (content) => {
    if(!onHashTagChange) return;
    onHashTagChange(content);
  }
  return (
    <Button className="tag" style={{ textTransform: 'none', fontSize:11 }} onClick={() => handleHashTagChange(content)}>
      {content}
    </Button>
  );
};

export default Tag;
