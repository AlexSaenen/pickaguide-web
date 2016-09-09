import React from 'react';

export class HomeTest extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isTest: props.isTest || false,
        };
    }

    render() {
        return (
          <div>
            <p>Hello World !</p>
            <p>isTest est à {JSON.stringify(this.state.isTest)}</p>
          </div>
        );
    }
}

HomeTest.propTypes = {
    isTest: React.PropTypes.bool,
};
