import React from 'react';
import style from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={style.loadingContainer}>
      <div className={style.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={style.loadingText}>Loading Amazing Content...</p>
    </div>
  );
};

export default LoadingSpinner;
