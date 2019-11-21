import React from 'react'

export default (WrappedComponent) => (props) => {
    const styles = props.styles; 
    return (
      <div className={styles + ' board container z-depth-5'}>
        <WrappedComponent {...props} />
      </div>
    )
}
