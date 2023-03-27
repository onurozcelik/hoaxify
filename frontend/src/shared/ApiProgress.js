import React, { Component } from 'react';
import axios from 'axios';

class ApiProgress extends Component {

    state = {
        pendingApiCall: false
    }

    componentDidMount() {
        axios.interceptors.request.use((request) => {
            this.setState({ pendingApiCall: true });
            // This is required to continue to request
            return request;
          });
          axios.interceptors.response.use((response) => {
            this.setState({ pendingApiCall: false });
            // This is required to continue to response
            return response;
          }, (error) => {
            this.setState({ pendingApiCall: false });
            throw error;
          });
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