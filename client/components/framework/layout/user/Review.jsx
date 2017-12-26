import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { NumInput } from 'form/NumInput.jsx';
import { Slider } from 'form/Slider.jsx';
import { CreateComment } from 'layout/user/CreateComment.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { Message } from 'layout/elements/Message.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Pay } from 'layout/user/Pay.jsx';
import ReviewStore from 'stores/user/Review.js';
import ReviewActions from 'actions/Review.js';


export class Review extends StoreObserver {

  constructor(props, context) {
    super(props, context, ReviewStore);

    this.id = props.visitId;
    this.canPay = props.canPay;
    this.advertId = props.advertId;
    this.for = props.for;
    this.state = { hidePay: !this.canPay, hideComment: !this.canPay, message: null };
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.visitId;
    this.canPay = nextProps.canPay;
    this.advertId = nextProps.advertId;
    this.for = nextProps.for;
    super.componentWillReceiveProps(nextProps);
  }

  onStore() {
    if (ReviewStore.getState().error) {
      this.setState({
        message: {
          title: 'Some error occurred when reviewing the visit',
          content: String(ReviewStore.getState().error),
          type: 'Alert',
        },
      });
    } else {
      browserHistory.goBack();
    }
  }

  comment() {
    this.setState({ hideComment: true });
  }

  pay() {
    this.setState({ hidePay: true });
  }

  onChangePayHide() {
    this.setState({ hidePay: !this.state.hidePay });
  }

  review(button) {
    const rate = button.target.parentNode.querySelector('#Rate').value;
    if (rate >= 0 && rate <= 5) {
      ReviewActions.review({
        rate: button.target.parentNode.querySelector('#Rate').value,
        for: this.for,
        visitId: this.id,
      });
    } else {
      this.setState({
        message: {
          title: 'Hold on',
          content: 'Your rate needs to be between 0 (included) and 5 (included)',
          type: 'Alert',
        },
      });
    }
  }

  render() {
    return (
      <div className="Review">

        {
          this.state.hideComment === false && this.advertId &&
            <div>
              <hr className="SpacedOverlay" />
              <CreateComment advertId={this.advertId} onSubmit={this.comment.bind(this)} />
            </div>
        }
        {
          this.canPay &&
            <div>
              <hr className="SpacedOverlay" />
              <Title smaller>Do you wish to make a payment to your guide ?</Title>
              <Slider checked={this.state.hidePay === false} onChange={this.onChangePayHide.bind(this)} />
            </div>
        }
        {
          this.canPay && this.state.hidePay === false &&
            <Layout layoutStyle="W30 Transparent MarginAuto">
              <Pay onPay={this.pay.bind(this)} visitId={this.id} />
            </Layout>
        }
        {
          this.state.hidePay &&
            <div>
              <hr className="SpacedOverlay" />
              <NumInput label="Rate" min={0} max={5} step={1} required />
              <Button buttonStyle="Auto Blue" label="Send" onCallback={this.review.bind(this)} />
              {
                this.state.message &&
                  <Message timed={false} {...this.state.message} />
              }
            </div>
        }
      </div>
    );
  }
}
