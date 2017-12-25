import React from 'react';
import Button from './Button';

export default props => <Button {...props} fullWidth className={['section-button', props.className].join(' ')} />;