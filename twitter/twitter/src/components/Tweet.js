import React from 'react';

function Tweet({ content, title , date}) {
    return (
        <div className="tweet-container">
            <h3 className="tweet-title">{title}</h3>
            <p className="tweet-content">{content}</p>
            <p className="tweet-date">{date}</p>
        </div>
    );
}

export default Tweet;
