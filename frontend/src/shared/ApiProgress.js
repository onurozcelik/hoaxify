import React, { Component } from 'react';
import axios from 'axios';

// Higher-order component
export function withApiProgress(WrappedComponent, apiUrl) {
    return class extends Component {

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
            if (url === apiUrl) {
                this.setState({pendingApiCall: inProgress});
            }
        }
    
        render() {
            return (<WrappedComponent pendingApiCall={this.state.pendingApiCall}{...this.props}/>);
        }
    }
}