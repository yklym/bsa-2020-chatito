import React from 'react';
import { Spinner } from 'react-bootstrap';

interface ILoaderWrapperProps {
  loading: boolean;
  height?: string;
}

const LoaderWrapper: React.FC<ILoaderWrapperProps> = ({
  loading,
  children,
  height = '100vh'
}) => (
  loading
    ? (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ position: 'relative', height: `${height}`
        }}
      >
        <Spinner animation="border" role="status" />
      </div>
    ) : (
      <>
        {children}
      </>
    )
);

export default LoaderWrapper;
