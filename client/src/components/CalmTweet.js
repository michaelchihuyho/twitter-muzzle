import React, {Component, PropTypes} from 'react'
import moment from 'moment'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

export default class CalmTweet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
        this.handleExpandChange = this.handleExpandChange.bind(this)
    }

    handleExpandChange(expanded) {
        this.setState({expanded: expanded});
    }

    getReadableDate(time) {
        return moment(time).fromNow()
    }

    render() {
        return (
            <div className='card-container'>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={this.props.username}
                        subtitle={this.getReadableDate(this.props.created)}
                        avatar={this.props.profilePicUrl}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText>
                        {this.props.rawText}
                    </CardText>
                    <CardText expandable={true}>
                        {this.props.rawText}
                    </CardText>
                </Card>
            </div>
        )
    }
}
