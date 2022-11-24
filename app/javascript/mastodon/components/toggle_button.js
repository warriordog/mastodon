import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

export default class ToggleButton extends React.PureComponent {
  static propTypes = Object.assign({
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
    onChange: PropTypes.func,
  }, Button.propTypes);

  static defaultProps = {
    type: Button.defaultProps.type,
  };

}
