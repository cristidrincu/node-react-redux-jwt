import React, { Component } from 'react';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class HeadlineTabUser extends Component {
    render() {
        return (
            <div>
                <h2 style={styles.headline}>{this.props.tabUserIdentifier}</h2>
                <p>
                    {this.props.message}
                </p>
            </div>
        );
    }
}

export default HeadlineTabUser;