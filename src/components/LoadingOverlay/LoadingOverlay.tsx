import "./LoadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="loading-text">로딩 중...</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;