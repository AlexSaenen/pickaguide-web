import React from 'react';

import 'scss/components/menu/_menuEntry.scss';

export class MenuEntry extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            link: props.href,
            title: props.title,
        };
    }

    render() {
        return (
          <div className={'MenuEntry'}>
            <a href={this.state.link} >
              <p>{this.state.title}</p>
            </a>
          </div>
        );
    }
}

MenuEntry.propTypes = {
    href: React.PropTypes.string,
    title: React.PropTypes.string,
};
