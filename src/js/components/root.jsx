import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './header.jsx';
import Footer from './footer.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, children } = this.props;
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <Header></Header>
                <main>
                    <ReactCSSTransitionGroup 
                        component="div"
                        className="wrapper"
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                        { children }
                    </ReactCSSTransitionGroup>
                </main>
                <Footer></Footer>
            </div>
        );
    }
}

Root.propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired
};

export default connect()(Root);
