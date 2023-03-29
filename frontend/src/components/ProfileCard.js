import React from 'react';
import { withRouter } from 'react-router-dom';

const ProfileCard = (props) => {
    const pathUserName = props.match.params.username;
    const loggedInUsername = props.username;
    let message = "We can not edit";
    if (pathUserName === loggedInUsername) {
        message = "We can edit";
    }
    return (
        <div>
            {message}
        </div>
    );
};

export default withRouter(ProfileCard);