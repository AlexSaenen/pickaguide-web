import React from 'react';

import { StateComponent } from 'base/StateComponent.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { NumInput } from 'layout/form/NumInput.jsx';
import { Form } from 'layout/form/Form.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Panel } from 'layout/containers/Panel.jsx';
import { Pay } from 'layout/user/Pay.jsx';


export class ReviewVisits extends StateComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      rated: false,
    };

    this.rate = this.rate.bind(this);
  }


  rate() {
  // rate(form) {
    const newState = Object.assign({}, this.state);
    newState.rated = true;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Layout layoutStyle="LayoutLight">
          <Title>Review your visit</Title>
        </Layout>

        <Layout layoutStyle="LayoutBlank">
          <hr className="Overlay" />
          <Panel>
            {
              this.state.rated === false ?
                <Form submitLabel="Rate" onSubmit={this.rate}>
                  <NumInput label="Rate" min={1} max={5} step={1} />
                </Form>
              :
                <Pay />
            }
          </Panel>
        </Layout>
      </div>
    );
  }
}
