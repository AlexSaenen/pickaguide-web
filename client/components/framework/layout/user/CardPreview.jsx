import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import DeleteAction from 'layout/user/DeleteAction.jsx';

import 'scss/framework/payment.scss';


export class CardPreview extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.id = props.id;
    this.ctrl = props.controller;
    this.onClick = this.onClick.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      brand: props.brand,
      funding: props.funding,
      country: props.country,
      exp_month: props.exp_month,
      exp_year: props.exp_year,
      last4: props.last4,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.id;
    const nextState = Object.assign({}, this.state);
    nextState.brand = nextProps.brand;
    nextState.funding = nextProps.funding;
    nextState.country = nextProps.country;
    nextState.exp_month = nextProps.exp_month;
    nextState.exp_year = nextProps.exp_year;
    nextState.last4 = nextProps.last4;

    this.setState(nextState);
  }

  onClick(clickEvent) {
    clickEvent.stopPropagation();
    this.ctrl.callerId = this.id;
    this.ctrl.toggle(true);
  }

  onDelete(clickEvent) {
    clickEvent.stopPropagation();
    this.props.deleter.callerId = this.id;
    this.props.deleter.toggle(true);
  }

  render() {
    return (
      <div className="CardPreview" onClick={this.ctrl ? this.onClick : () => {}}>
        <DeleteAction onClick={this.onDelete} />
        <p className="Bold Inline OverflowHidden TextOverflow">{this.state.brand} {this.state.funding.capitalize()}</p>
        <p className="Inline OverflowHidden TextOverflow Italic"> card from </p>
        <p className="Bold Inline OverflowHidden TextOverflow">{this.state.country.capitalize()}</p>
        <br />
        <p className="Inline OverflowHidden TextOverflow Italic">expires on </p>
        <p className="Bold Inline OverflowHidden TextOverflow">{this.state.exp_month}/{this.state.exp_year}</p>
        <br />
        <p className="Inline OverflowHidden TextOverflow Italic">ends with </p>
        <p className="Bold Inline OverflowHidden TextOverflow">{this.state.last4}</p>
      </div>
    );
  }
}

CardPreview.propTypes = {
  id: React.PropTypes.string.isRequired,
  brand: React.PropTypes.string.isRequired,
  funding: React.PropTypes.string.isRequired,
  country: React.PropTypes.string.isRequired,
  exp_month: React.PropTypes.number.isRequired,
  exp_year: React.PropTypes.number.isRequired,
  last4: React.PropTypes.string.isRequired,
};
