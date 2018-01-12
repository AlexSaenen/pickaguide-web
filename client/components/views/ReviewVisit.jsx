import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Information } from 'layout/elements/Information.jsx';
import Visit from 'layout/user/Visit.jsx';
import { Review } from 'layout/user/Review.jsx';
import VisitsStore from 'stores/user/Visits.js';
import AuthStore from 'stores/user/Auth.js';

const getVisitFromCache = (visitId) => {
  const store = VisitsStore.getState();
  const visits = store.theirVisits.concat(store.myVisits);
  return visits.find(visit => visit._id === visitId);
};


export class ReviewVisit extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.id = props.params.id;
    this.state.visit = getVisitFromCache(this.id);
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.params.id;
    this.setState({ visit: getVisitFromCache(this.id) });
  }

  render() {
    const visit = this.state.visit;

    if (visit === null) {
      return (
        <Layout layoutStyle="LayoutBlank">
          <Information infoStyle="Info Small MarginAuto LineSpaced">No such visit found ..</Information>
        </Layout>
      );
    }

    const me = AuthStore.getState().credentials.id;
    const owner = visit.about && visit.about.owner ? visit.about.owner : null;
    const forWhom = me === owner ? visit.by : owner;

    return (
      <div>

        <Visit visit={visit} clickable={false} />

        <Layout layoutStyle="LessPaddingTop">
          <Review
            visitId={visit._id}
            advertId={visit.about ? visit.about._id : null}
            canPay={owner !== me}
            for={forWhom}
          />
        </Layout>
      </div>
    );
  }
}
