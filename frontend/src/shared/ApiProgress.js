import React, { Component } from 'react';
import axios from 'axios';

class ApiProgress extends Component {

    state = {
        pendingApiCall: false
    }

    componentDidMount() {
        axios.interceptors.request.use((request) => {
            this.updateApiCallFor(request.url, true);
            // This is required to continue to request
            return request;
          });
          axios.interceptors.response.use((response) => {
            this.updateApiCallFor(response.config.url, false);
            // This is required to continue to response
            return response;
          }, (error) => {
            this.updateApiCallFor(error.config.url, false);
            throw error;
          });
    }

    updateApiCallFor = (url, inProgress) => {
        console.log(url);
        console.log("path:" + this.props.path);
        if (url === this.props.path) {
            this.setState({pendingApiCall: inProgress});
        }
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {pendingApiCall: this.state.pendingApiCall})}
            </div>
        );
    }
}

export default ApiProgress;