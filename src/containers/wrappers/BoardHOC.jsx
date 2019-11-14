import React from 'react'

export default (WrappedComponent) => {
  return (props) => {
    const styles = props.styles; 
    return (
      <div className={styles + ' board container z-depth-5'}>
        <WrappedComponent {...props} />
      </div>
    )
  }
}
