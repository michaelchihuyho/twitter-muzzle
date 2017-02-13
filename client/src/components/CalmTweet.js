import React, {Component, PropTypes} from 'react'
import moment from 'moment'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';

import filter from '../tweetFilter'

export default class CalmTweet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
        this.handleExpandChange = this.handleExpandChange.bind(this)
        this.toggleExpand = this.toggleExpand.bind(this)
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded})
    }

    handleExpandChange(expanded) {
        this.setState({expanded: expanded})
    }

    getReadableDate(time) {
        return moment(time).fromNow()
    }

    render() {
        var filteredText = filter(this.props.rawText)
          , hasBeenFiltered = filteredText !== this.props.rawText

        return (
            <div className='card-container'>
                <Card
                    expanded={this.state.expanded}
                    onExpandChange={this.handleExpandChange}
                >
                    <CardHeader
                        title={this.props.username}
                        subtitle={this.getReadableDate(this.props.created)}
                        avatar={this.props.profilePicUrl}
                    />
                    <CardText>
                        {filteredText}
                    </CardText>
                    <CardText
                        expandable={true}
                        style={{'backgroundColor': 'rgb(186, 91, 91)'}}
                    >
                        {this.props.rawText}
                    </CardText>
                    {hasBeenFiltered &&
                        <CardActions>
                            <FlatButton
                                label={this.state.expanded ? 'Hide' : 'Show unfiltered tweet'}
                                onTouchTap={this.toggleExpand}
                                secondary={true}
                            />
                        </CardActions>
                    }
                </Card>
            </div>
        )
    }
}
