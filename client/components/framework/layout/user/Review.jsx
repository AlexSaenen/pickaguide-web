import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
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
    this.state = {
      hidePay: !this.canPay,
      hideComment: !this.canPay,
      message: null,
      selectedScore: null,
    };

    this.selectScore = this.selectScore.bind(this);
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

  selectScore(score) {
    if (this.state.selectedScore === score) {
      this.setState({ selectedScore: null });
    } else {
      this.setState({ selectedScore: score });
    }
  }

  review() {
    const rate = this.state.selectedScore;
    ReviewActions.review({
      rate,
      for: this.for,
      visitId: this.id,
    });
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
              <Title smaller>Select a score to give and click "Rate" !</Title>

              {[0, 1, 2, 3, 4, 5].map(score =>
                <Button
                  buttonStyle={`Auto LessSpaced ${this.state.selectedScore === score ? 'Blue' : 'White'}`}
                  label={String(score)}
                  key={score}
                  onCallback={function click() { this.selectScore(score); }.bind(this)}
                />
              )}

              <Button buttonStyle="Auto Blue" label="Rate" onCallback={this.review.bind(this)} disabled={this.state.selectedScore === null} />
              {
                this.state.message &&
                  <Message messageStyle="MessageCenter TopMargin AutoWidthContent" timed={false} {...this.state.message} />
              }
            </div>
        }
      </div>
    );
  }
}
