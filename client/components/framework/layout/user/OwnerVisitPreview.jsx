import { VisitPreview } from 'layout/user/VisitPreview.jsx';

import 'scss/views/visits.scss';


export class OwnerVisitPreview extends VisitPreview {

  constructor(props, context) {
    super(props, context);

    this.statusMapping = {
      waiting: ['cancel'],
      accepted: ['cancel'],
    };

    this.type = 'visitor';
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps._id;
    super.componentWillReceiveProps(nextProps);
  }
}
