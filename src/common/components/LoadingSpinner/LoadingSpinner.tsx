import "./loadingSpinner.css";

export const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="spinner-container">
          <div className="loading-spinner"></div>
      </div>
    </div>
  )
}
