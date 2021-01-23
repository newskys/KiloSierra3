import * as React from 'react';
import styled from 'styled-components';

const Button = styled.button`
/* Adapt the colors based on primary prop */
background: ${props => props.primary ? "palevioletred" : "white"};
color: ${props => props.primary ? "white" : "palevioletred"};

font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid palevioletred;
border-radius: 3px;
`;

class ClassComponent extends React.Component {
    // constructor(props) {
    //     this.super(props);
    //     this.state = {
    //         a: '1',
    //     }
    //     this.b = 1;
    // }
    //
    // state = {
    //     a: '1',
    // }
    // b = 1

    // lifecycle
    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <>
            
            ClassComponent!

            <Button>Normal</Button>
            <Button primary>Primary</Button>
            
            </>
        )
    }
}

export default ClassComponent;