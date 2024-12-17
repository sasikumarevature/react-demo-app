import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, badge, content, link, linkText, onActionClick, actionText,tags }) => {
  return (
    <div className="card hover:scale-105 hover:transition-all">
      <div className="card-header bg-transparent px-1 border-0 py-1 mb-0">
        <h2>{title}</h2>
        {badge && (
          <span className="duration-badge bg-blue-500 px-2 py-[0.1rem]">
            {badge}
          </span>
        )}
      </div>
      <div className="card-body px-1">
        {content && (
          <p className="border w-fit px-1 rounded-md bg-slate-200 text-xs">
            {content}
          </p>
        )}
        {tags && (
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="border w-fit px-1 rounded-md bg-slate-200 text-xs">
                {tag.name}
              </span>
            ))}
          </div>
        )}
        {link && (
          <Link to={link}>
            <button className="px-3 border-2 border-blue-500 rounded-md text-xs font-semibold py-1 my-2 mb-0 bg-transparent text-blue-800">
              {linkText}
            </button>
          </Link>
        )}
        {onActionClick && (
          <button
            className="px-3 border-2 border-blue-500 rounded-md text-xs font-semibold py-1 my-2 mb-0 bg-transparent text-blue-800"
            onClick={onActionClick}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;