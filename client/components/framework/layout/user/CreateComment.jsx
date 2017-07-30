import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import CommentsActions from 'actions/Comments.js';

import 'scss/framework/comment.scss';


export class CreateComment extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.advertId = props.advertId;
    this.onAdd = this.onAdd.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this.onSubmit = props.onSubmit || function onSubmit() {};
  }

  onAdd() {
    const editor = document.getElementById('commentEditor');
    CommentsActions.create({ post: editor.value, advertId: this.advertId });
    editor.value = '';
    this.onSubmit();
  }

  _handleKeyPress(clickEvent) {
    if (clickEvent.key === 'Enter') {
      clickEvent.preventDefault();
      this.onAdd();
    }
  }

  render() {
    return (
      <div className="CreateComment">
        <form>
          <input placeholder="Your comment ..." id="commentEditor" onKeyPress={this._handleKeyPress} />
        </form>
      </div>
    );
  }
}

CreateComment.propTypes = {
  advertId: React.PropTypes.string.isRequired,
};
