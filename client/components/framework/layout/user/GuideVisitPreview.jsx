import { VisitPreview } from 'layout/user/VisitPreview.jsx';

import 'scss/views/visits.scss';


export class GuideVisitPreview extends VisitPreview {

  constructor(props, context) {
    super(props, context);

    this.statusMapping = {
      waiting: ['accept', 'deny'],
      accepted: ['finish', 'deny'],
    };

    this.type = 'guide';
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
  }
}
