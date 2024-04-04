import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => (
  <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
      {items.map((item, index) => (
        <li key={index} className="breadcrumb-item">
          {index < items.length - 1 ? (
            <Link href={item.url}>{item.text}</Link>
          ) : (
            <span>{item.text}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
