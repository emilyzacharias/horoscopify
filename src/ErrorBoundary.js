import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate error
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI here
      return(
        <div>
            <p>Something went wrong. Please try again later.</p>
            <Link to="/">
                    <button>Return to home</button>
                </Link>
        </div>
        
        
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
